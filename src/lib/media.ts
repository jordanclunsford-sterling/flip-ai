import { supabase } from "@/integrations/supabase/client";

const TEN_YEARS = 60 * 60 * 24 * 3650;

/** Downscales an image file to a JPEG data URL suitable for AI analysis and storage. */
export function compressImage(file: File, max = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not read that image."));
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not process that image."));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl: string) {
  const [head, body] = dataUrl.split(",");
  const mime = head.match(/:(.*?);/)?.[1] ?? "image/jpeg";
  const bytes = atob(body);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

/** Uploads a data URL to the workspace folder and returns a long-lived signed URL. */
export async function uploadImage(workspaceId: string, dataUrl: string): Promise<string> {
  const path = `${workspaceId}/${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage
    .from("furniture")
    .upload(path, dataUrlToBlob(dataUrl), { contentType: "image/jpeg" });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("furniture")
    .createSignedUrl(path, TEN_YEARS);
  if (signErr || !data) throw signErr ?? new Error("Could not save that photo.");
  return data.signedUrl;
}
