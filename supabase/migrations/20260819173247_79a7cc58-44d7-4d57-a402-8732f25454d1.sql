
-- ========== core ==========
CREATE TABLE public.workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'My Workshop',
  owner_id uuid NOT NULL,
  max_active_projects int NOT NULL DEFAULT 3,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, user_id)
);

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  email text,
  display_name text,
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.has_workspace_access(_workspace_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members m
    WHERE m.workspace_id = _workspace_id AND m.user_id = auth.uid()
  );
$$;

-- ========== domain ==========
CREATE TABLE public.scouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  created_by uuid,
  title text NOT NULL DEFAULT 'Untitled piece',
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  listing jsonb NOT NULL DEFAULT '{}'::jsonb,
  analysis jsonb NOT NULL DEFAULT '{}'::jsonb,
  verdict text,
  flip_score int,
  est_acquisition numeric,
  est_materials numeric,
  est_resale_low numeric,
  est_resale_high numeric,
  est_hours numeric,
  difficulty text,
  risk_level text,
  reasoning text,
  status text NOT NULL DEFAULT 'new',
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  scout_id uuid REFERENCES public.scouts(id) ON DELETE SET NULL,
  title text NOT NULL,
  category text,
  stage text NOT NULL DEFAULT 'Picked Up',
  cover_image text,
  design_direction text,
  acquisition_cost numeric NOT NULL DEFAULT 0,
  est_materials_cost numeric NOT NULL DEFAULT 0,
  est_resale_low numeric,
  est_resale_high numeric,
  est_hours numeric,
  actual_hours numeric NOT NULL DEFAULT 0,
  list_price numeric,
  sale_price numeric,
  platform_fees numeric NOT NULL DEFAULT 0,
  other_costs numeric NOT NULL DEFAULT 0,
  listed_at timestamptz,
  sold_at timestamptz,
  notes text,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.project_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  position int NOT NULL DEFAULT 0,
  title text NOT NULL,
  instructions text,
  est_minutes int,
  stage text,
  completed_at timestamptz,
  is_demo boolean NOT NULL DEFAULT false
);

CREATE TABLE public.project_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  phase text NOT NULL DEFAULT 'progress',
  caption text,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text,
  kind text NOT NULL DEFAULT 'consumable',
  status text NOT NULL DEFAULT 'plenty',
  quantity_note text,
  purchase_price numeric,
  purchased_at date,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, name)
);

CREATE TABLE public.project_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text,
  have boolean NOT NULL DEFAULT false,
  quantity_note text,
  est_cost numeric,
  actual_cost numeric,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.market_comps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  scout_id uuid REFERENCES public.scouts(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  source text NOT NULL,
  comp_type text NOT NULL DEFAULT 'asking',
  title text,
  price numeric,
  url text,
  location text,
  observed_at timestamptz NOT NULL DEFAULT now(),
  is_demo boolean NOT NULL DEFAULT false
);

CREATE TABLE public.design_inspirations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  scout_id uuid REFERENCES public.scouts(id) ON DELETE CASCADE,
  style_name text NOT NULL,
  rationale text,
  difficulty text,
  est_material_cost numeric,
  appeal text,
  image_url text,
  recommended boolean NOT NULL DEFAULT false,
  is_demo boolean NOT NULL DEFAULT false
);

CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text,
  description text,
  suggested_price numeric,
  keywords text,
  dimensions text,
  condition_note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.labor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  minutes int NOT NULL DEFAULT 0,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ========== grants + rls ==========
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['workspaces','workspace_members','profiles','scouts','projects','project_steps','project_photos','inventory_items','project_materials','market_comps','design_inspirations','listings','labor_sessions']
  LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated;', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role;', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
  END LOOP;

  FOREACH t IN ARRAY ARRAY['scouts','projects','project_steps','project_photos','inventory_items','project_materials','market_comps','design_inspirations','listings','labor_sessions']
  LOOP
    EXECUTE format('CREATE POLICY "workspace members manage %1$s" ON public.%1$I FOR ALL TO authenticated USING (public.has_workspace_access(workspace_id)) WITH CHECK (public.has_workspace_access(workspace_id));', t);
  END LOOP;
END $$;

CREATE POLICY "members read workspace" ON public.workspaces FOR SELECT TO authenticated USING (public.has_workspace_access(id) OR owner_id = auth.uid());
CREATE POLICY "owner updates workspace" ON public.workspaces FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "user creates workspace" ON public.workspaces FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "members read membership" ON public.workspace_members FOR SELECT TO authenticated USING (public.has_workspace_access(workspace_id) OR user_id = auth.uid());
CREATE POLICY "members add membership" ON public.workspace_members FOR INSERT TO authenticated WITH CHECK (public.has_workspace_access(workspace_id) OR user_id = auth.uid());
CREATE POLICY "self removes membership" ON public.workspace_members FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "read own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR (workspace_id IS NOT NULL AND public.has_workspace_access(workspace_id)));
CREATE POLICY "update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());

-- ========== new user bootstrap + demo data ==========
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  ws uuid;
  p1 uuid; p2 uuid; p3 uuid;
BEGIN
  INSERT INTO public.workspaces (name, owner_id) VALUES ('My Workshop', NEW.id) RETURNING id INTO ws;
  INSERT INTO public.workspace_members (workspace_id, user_id, role) VALUES (ws, NEW.id, 'owner');
  INSERT INTO public.profiles (id, email, display_name, workspace_id)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)), ws);

  -- demo project 1: dresser being sanded
  INSERT INTO public.projects (workspace_id, title, category, stage, cover_image, design_direction, acquisition_cost, est_materials_cost, est_resale_low, est_resale_high, est_hours, actual_hours, is_demo)
  VALUES (ws,'6-Drawer Dresser','Dresser','Sanding','https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80','Warm walnut refinish',0,32,175,225,4,1.5,true) RETURNING id INTO p1;
  INSERT INTO public.project_steps (workspace_id, project_id, position, title, instructions, est_minutes, stage, completed_at, is_demo) VALUES
    (ws,p1,1,'Remove hardware','Bag and label all pulls and screws so nothing goes missing.',15,'Picked Up',now()-interval '3 days',true),
    (ws,p1,2,'Clean and degrease','Wipe down every surface with a degreaser and let it dry fully.',30,'Cleaning',now()-interval '2 days',true),
    (ws,p1,3,'Repair loose joints','Re-glue the drawer boxes and clamp overnight.',45,'Repair',now()-interval '1 day',true),
    (ws,p1,4,'Scuff sand with 120 grit','Knock down the old finish. You are creating adhesion, not bare wood.',40,'Sanding',null,true),
    (ws,p1,5,'Finish sanding with 150 grit','Even out the surface and soften any scratch pattern.',25,'Sanding',null,true),
    (ws,p1,6,'Vacuum and tack cloth','Remove all sanding dust before any finish goes on.',10,'Sanding',null,true),
    (ws,p1,7,'Apply first coat of stain','Work with the grain, wipe back excess after 5 minutes.',35,'Painting / Finishing',null,true),
    (ws,p1,8,'Apply top coat','Two thin coats, light scuff between.',40,'Painting / Finishing',null,true),
    (ws,p1,9,'Install hardware','Reinstall the original pulls.',15,'Hardware',null,true),
    (ws,p1,10,'Stage and photograph','Neutral background, straight-on plus detail shots.',20,'Photography',null,true);
  INSERT INTO public.project_materials (workspace_id, project_id, name, category, have, est_cost, is_demo) VALUES
    (ws,p1,'120 grit sanding discs','Abrasives',true,0,true),
    (ws,p1,'150 grit sanding discs','Abrasives',true,0,true),
    (ws,p1,'Degreaser','Prep',true,0,true),
    (ws,p1,'Wood glue','Repair',true,0,true),
    (ws,p1,'Warm walnut stain','Finish',false,18,true),
    (ws,p1,'Wipe-on poly top coat','Finish',false,14,true);

  -- demo project 2: completed nightstand
  INSERT INTO public.projects (workspace_id, title, category, stage, cover_image, design_direction, acquisition_cost, est_materials_cost, est_resale_low, est_resale_high, est_hours, actual_hours, list_price, sale_price, platform_fees, listed_at, sold_at, is_demo)
  VALUES (ws,'Mid-Century Nightstand','Nightstand','Sold','https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&q=80','Preserved original teak',15,31,140,190,3,3.2,190,190,0,now()-interval '20 days',now()-interval '12 days',true) RETURNING id INTO p2;
  INSERT INTO public.project_steps (workspace_id, project_id, position, title, instructions, est_minutes, stage, completed_at, is_demo) VALUES
    (ws,p2,1,'Clean original finish','Mild soap, no stripper — the teak was worth saving.',30,'Cleaning',now()-interval '25 days',true),
    (ws,p2,2,'Oil the wood','Two coats of Danish oil, wiped back.',45,'Painting / Finishing',now()-interval '24 days',true),
    (ws,p2,3,'Photograph and list','Listed at $190.',30,'Listed',now()-interval '20 days',true);
  INSERT INTO public.project_materials (workspace_id, project_id, name, category, have, est_cost, actual_cost, is_demo) VALUES
    (ws,p2,'Danish oil','Finish',true,22,22,true),
    (ws,p2,'Microfiber rags','Prep',true,9,9,true);

  -- demo project 3: coffee table waiting for materials
  INSERT INTO public.projects (workspace_id, title, category, stage, cover_image, design_direction, acquisition_cost, est_materials_cost, est_resale_low, est_resale_high, est_hours, is_demo)
  VALUES (ws,'Oak Coffee Table','Coffee Table','Repair','https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200&q=80','CB2-inspired matte black base, natural oak top',20,46,180,240,5,true) RETURNING id INTO p3;
  INSERT INTO public.project_steps (workspace_id, project_id, position, title, instructions, est_minutes, stage, completed_at, is_demo) VALUES
    (ws,p3,1,'Tighten and re-glue the base','One leg has play at the joint.',40,'Repair',null,true),
    (ws,p3,2,'Fill the deep gouge on the top','Wood filler, slightly proud, sand flush when cured.',30,'Repair',null,true),
    (ws,p3,3,'Sand the top to bare wood','80 then 120 then 150 grit.',60,'Sanding',null,true),
    (ws,p3,4,'Mask top, spray base matte black','Thin even coats.',45,'Painting / Finishing',null,true),
    (ws,p3,5,'Hardwax oil the top','Bring back the oak without yellowing it.',30,'Painting / Finishing',null,true);
  INSERT INTO public.project_materials (workspace_id, project_id, name, category, have, est_cost, is_demo) VALUES
    (ws,p3,'Wood filler','Repair',true,0,true),
    (ws,p3,'80 grit sanding discs','Abrasives',false,8,true),
    (ws,p3,'Matte black furniture paint','Finish',false,24,true),
    (ws,p3,'Hardwax oil','Finish',false,14,true);

  INSERT INTO public.inventory_items (workspace_id, name, category, kind, status, quantity_note, is_demo) VALUES
    (ws,'120 grit sanding discs','Abrasives','consumable','plenty','Plenty',true),
    (ws,'150 grit sanding discs','Abrasives','consumable','low','3 remaining',true),
    (ws,'Degreaser','Prep','consumable','plenty',null,true),
    (ws,'Microfiber rags','Prep','consumable','plenty',null,true),
    (ws,'Wood glue','Repair','consumable','plenty',null,true),
    (ws,'Wood filler','Repair','consumable','plenty',null,true),
    (ws,'Shellac-based primer','Finish','consumable','plenty',null,true),
    (ws,'Danish oil','Finish','consumable','low','Getting low',true),
    (ws,'Random orbital sander','Tools','tool','plenty',null,true),
    (ws,'Respirator + safety glasses','PPE','tool','plenty',null,true),
    (ws,'Foam rollers','Application','consumable','plenty',null,true),
    (ws,'2 inch brush','Application','tool','plenty',null,true),
    (ws,'Nitrile gloves','PPE','consumable','plenty',null,true);

  RETURN NEW;
END $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
