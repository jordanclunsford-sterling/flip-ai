export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      design_inspirations: {
        Row: {
          appeal: string | null
          difficulty: string | null
          est_material_cost: number | null
          id: string
          image_url: string | null
          is_demo: boolean
          rationale: string | null
          recommended: boolean
          scout_id: string | null
          style_name: string
          workspace_id: string
        }
        Insert: {
          appeal?: string | null
          difficulty?: string | null
          est_material_cost?: number | null
          id?: string
          image_url?: string | null
          is_demo?: boolean
          rationale?: string | null
          recommended?: boolean
          scout_id?: string | null
          style_name: string
          workspace_id: string
        }
        Update: {
          appeal?: string | null
          difficulty?: string | null
          est_material_cost?: number | null
          id?: string
          image_url?: string | null
          is_demo?: boolean
          rationale?: string | null
          recommended?: boolean
          scout_id?: string | null
          style_name?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "design_inspirations_scout_id_fkey"
            columns: ["scout_id"]
            isOneToOne: false
            referencedRelation: "scouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "design_inspirations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_demo: boolean
          kind: string
          name: string
          purchase_price: number | null
          purchased_at: string | null
          quantity_note: string | null
          status: string
          workspace_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          kind?: string
          name: string
          purchase_price?: number | null
          purchased_at?: string | null
          quantity_note?: string | null
          status?: string
          workspace_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          kind?: string
          name?: string
          purchase_price?: number | null
          purchased_at?: string | null
          quantity_note?: string | null
          status?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      labor_sessions: {
        Row: {
          created_at: string
          id: string
          minutes: number
          note: string | null
          project_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          minutes?: number
          note?: string | null
          project_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          minutes?: number
          note?: string | null
          project_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "labor_sessions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labor_sessions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          condition_note: string | null
          created_at: string
          description: string | null
          dimensions: string | null
          id: string
          keywords: string | null
          project_id: string
          suggested_price: number | null
          title: string | null
          workspace_id: string
        }
        Insert: {
          condition_note?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          keywords?: string | null
          project_id: string
          suggested_price?: number | null
          title?: string | null
          workspace_id: string
        }
        Update: {
          condition_note?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          keywords?: string | null
          project_id?: string
          suggested_price?: number | null
          title?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      market_comps: {
        Row: {
          comp_type: string
          id: string
          is_demo: boolean
          location: string | null
          observed_at: string
          price: number | null
          project_id: string | null
          scout_id: string | null
          source: string
          title: string | null
          url: string | null
          workspace_id: string
        }
        Insert: {
          comp_type?: string
          id?: string
          is_demo?: boolean
          location?: string | null
          observed_at?: string
          price?: number | null
          project_id?: string | null
          scout_id?: string | null
          source: string
          title?: string | null
          url?: string | null
          workspace_id: string
        }
        Update: {
          comp_type?: string
          id?: string
          is_demo?: boolean
          location?: string | null
          observed_at?: string
          price?: number | null
          project_id?: string | null
          scout_id?: string | null
          source?: string
          title?: string | null
          url?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_comps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_comps_scout_id_fkey"
            columns: ["scout_id"]
            isOneToOne: false
            referencedRelation: "scouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_comps_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_materials: {
        Row: {
          actual_cost: number | null
          category: string | null
          created_at: string
          est_cost: number | null
          have: boolean
          id: string
          is_demo: boolean
          name: string
          project_id: string
          quantity_note: string | null
          workspace_id: string
        }
        Insert: {
          actual_cost?: number | null
          category?: string | null
          created_at?: string
          est_cost?: number | null
          have?: boolean
          id?: string
          is_demo?: boolean
          name: string
          project_id: string
          quantity_note?: string | null
          workspace_id: string
        }
        Update: {
          actual_cost?: number | null
          category?: string | null
          created_at?: string
          est_cost?: number | null
          have?: boolean
          id?: string
          is_demo?: boolean
          name?: string
          project_id?: string
          quantity_note?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_materials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_materials_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_photos: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          is_demo: boolean
          phase: string
          project_id: string
          url: string
          workspace_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          phase?: string
          project_id: string
          url: string
          workspace_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          phase?: string
          project_id?: string
          url?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_photos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_photos_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_steps: {
        Row: {
          completed_at: string | null
          est_minutes: number | null
          id: string
          instructions: string | null
          is_demo: boolean
          position: number
          project_id: string
          stage: string | null
          title: string
          workspace_id: string
        }
        Insert: {
          completed_at?: string | null
          est_minutes?: number | null
          id?: string
          instructions?: string | null
          is_demo?: boolean
          position?: number
          project_id: string
          stage?: string | null
          title: string
          workspace_id: string
        }
        Update: {
          completed_at?: string | null
          est_minutes?: number | null
          id?: string
          instructions?: string | null
          is_demo?: boolean
          position?: number
          project_id?: string
          stage?: string | null
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_steps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_steps_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          acquisition_cost: number
          actual_hours: number
          category: string | null
          cover_image: string | null
          created_at: string
          design_direction: string | null
          est_hours: number | null
          est_materials_cost: number
          est_resale_high: number | null
          est_resale_low: number | null
          id: string
          is_demo: boolean
          list_price: number | null
          listed_at: string | null
          notes: string | null
          other_costs: number
          platform_fees: number
          sale_price: number | null
          scout_id: string | null
          sold_at: string | null
          stage: string
          title: string
          workspace_id: string
        }
        Insert: {
          acquisition_cost?: number
          actual_hours?: number
          category?: string | null
          cover_image?: string | null
          created_at?: string
          design_direction?: string | null
          est_hours?: number | null
          est_materials_cost?: number
          est_resale_high?: number | null
          est_resale_low?: number | null
          id?: string
          is_demo?: boolean
          list_price?: number | null
          listed_at?: string | null
          notes?: string | null
          other_costs?: number
          platform_fees?: number
          sale_price?: number | null
          scout_id?: string | null
          sold_at?: string | null
          stage?: string
          title: string
          workspace_id: string
        }
        Update: {
          acquisition_cost?: number
          actual_hours?: number
          category?: string | null
          cover_image?: string | null
          created_at?: string
          design_direction?: string | null
          est_hours?: number | null
          est_materials_cost?: number
          est_resale_high?: number | null
          est_resale_low?: number | null
          id?: string
          is_demo?: boolean
          list_price?: number | null
          listed_at?: string | null
          notes?: string | null
          other_costs?: number
          platform_fees?: number
          sale_price?: number | null
          scout_id?: string | null
          sold_at?: string | null
          stage?: string
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_scout_id_fkey"
            columns: ["scout_id"]
            isOneToOne: false
            referencedRelation: "scouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      scouts: {
        Row: {
          analysis: Json
          created_at: string
          created_by: string | null
          difficulty: string | null
          est_acquisition: number | null
          est_hours: number | null
          est_materials: number | null
          est_resale_high: number | null
          est_resale_low: number | null
          flip_score: number | null
          id: string
          images: Json
          is_demo: boolean
          listing: Json
          reasoning: string | null
          risk_level: string | null
          status: string
          title: string
          verdict: string | null
          workspace_id: string
        }
        Insert: {
          analysis?: Json
          created_at?: string
          created_by?: string | null
          difficulty?: string | null
          est_acquisition?: number | null
          est_hours?: number | null
          est_materials?: number | null
          est_resale_high?: number | null
          est_resale_low?: number | null
          flip_score?: number | null
          id?: string
          images?: Json
          is_demo?: boolean
          listing?: Json
          reasoning?: string | null
          risk_level?: string | null
          status?: string
          title?: string
          verdict?: string | null
          workspace_id: string
        }
        Update: {
          analysis?: Json
          created_at?: string
          created_by?: string | null
          difficulty?: string | null
          est_acquisition?: number | null
          est_hours?: number | null
          est_materials?: number | null
          est_resale_high?: number | null
          est_resale_low?: number | null
          flip_score?: number | null
          id?: string
          images?: Json
          is_demo?: boolean
          listing?: Json
          reasoning?: string | null
          risk_level?: string | null
          status?: string
          title?: string
          verdict?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scouts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          id: string
          max_active_projects: number
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_active_projects?: number
          name?: string
          owner_id: string
        }
        Update: {
          created_at?: string
          id?: string
          max_active_projects?: number
          name?: string
          owner_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_workspace_access: {
        Args: { _workspace_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
