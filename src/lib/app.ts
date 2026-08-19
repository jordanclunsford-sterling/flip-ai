import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const STAGES = [
  "Picked Up",
  "Cleaning",
  "Repair",
  "Sanding",
  "Priming",
  "Painting / Finishing",
  "Hardware",
  "Photography",
  "Listed",
  "Sold",
] as const;

export type Stage = (typeof STAGES)[number];

export const money = (n: number | null | undefined) =>
  n == null ? "—" : `$${Math.round(Number(n)).toLocaleString()}`;

export const money2 = (n: number | null | undefined) =>
  n == null ? "—" : `$${Number(n).toFixed(2)}`;

export function netProfit(p: {
  sale_price: number | null;
  acquisition_cost: number | null;
  platform_fees: number | null;
  other_costs: number | null;
  materials_cost?: number;
}) {
  return (
    Number(p.sale_price ?? 0) -
    Number(p.acquisition_cost ?? 0) -
    Number(p.platform_fees ?? 0) -
    Number(p.other_costs ?? 0) -
    Number(p.materials_cost ?? 0)
  );
}

export function greeting(d = new Date()) {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function useWorkspace() {
  return useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, email, display_name, workspace_id")
        .eq("id", user.id)
        .maybeSingle();
      if (!profile?.workspace_id) return null;
      const { data: workspace } = await supabase
        .from("workspaces")
        .select("id, name, owner_id, max_active_projects")
        .eq("id", profile.workspace_id)
        .maybeSingle();
      return { user, profile, workspace };
    },
    staleTime: 60_000,
  });
}
