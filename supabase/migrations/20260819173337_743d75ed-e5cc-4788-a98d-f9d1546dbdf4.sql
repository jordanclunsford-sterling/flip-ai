
CREATE POLICY "workspace members read furniture photos" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'furniture' AND public.has_workspace_access(((storage.foldername(name))[1])::uuid));
CREATE POLICY "workspace members upload furniture photos" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'furniture' AND public.has_workspace_access(((storage.foldername(name))[1])::uuid));
CREATE POLICY "workspace members delete furniture photos" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'furniture' AND public.has_workspace_access(((storage.foldername(name))[1])::uuid));
