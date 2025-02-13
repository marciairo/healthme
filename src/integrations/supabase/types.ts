export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      budget_categories: {
        Row: {
          allocated: number | null
          budget_id: string | null
          created_at: string | null
          id: string
          name: string
          spent: number | null
          updated_at: string | null
        }
        Insert: {
          allocated?: number | null
          budget_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          spent?: number | null
          updated_at?: string | null
        }
        Update: {
          allocated?: number | null
          budget_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          spent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_categories_budget_id_fkey"
            columns: ["budget_id"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          month: number
          updated_at: string | null
          user_id: string | null
          year: number
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          month: number
          updated_at?: string | null
          user_id?: string | null
          year: number
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          month?: number
          updated_at?: string | null
          user_id?: string | null
          year?: number
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read_at: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      friends: {
        Row: {
          created_at: string | null
          friend_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          friend_id: string
          id?: string
          status: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          friend_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_lists: {
        Row: {
          created_at: string | null
          id: string
          list_id: string | null
          permission: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          list_id?: string | null
          permission?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          list_id?: string | null
          permission?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shared_lists_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_items: {
        Row: {
          category: string | null
          checked: boolean | null
          created_at: string | null
          id: string
          image_url: string | null
          list_id: string | null
          name: string
          notes: string | null
          price: number | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          checked?: boolean | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          list_id?: string | null
          name: string
          notes?: string | null
          price?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          checked?: boolean | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          list_id?: string | null
          name?: string
          notes?: string | null
          price?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_lists: {
        Row: {
          created_at: string | null
          current_spent: number | null
          id: string
          name: string
          total_budget: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_spent?: number | null
          id?: string
          name: string
          total_budget?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_spent?: number | null
          id?: string
          name?: string
          total_budget?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created_at: string | null
          id: string
          pause_collection: Json | null
          plan: string
          status: string
          stripe_subscription_id: string | null
          trial_end: string | null
          user_id: string
          valid_until: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          id?: string
          pause_collection?: Json | null
          plan: string
          status: string
          stripe_subscription_id?: string | null
          trial_end?: string | null
          user_id: string
          valid_until: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          id?: string
          pause_collection?: Json | null
          plan?: string
          status?: string
          stripe_subscription_id?: string | null
          trial_end?: string | null
          user_id?: string
          valid_until?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          id: string
          location: string | null
          name: string | null
          preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          id: string
          location?: string | null
          name?: string | null
          preferences?: Json | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          id?: string
          location?: string | null
          name?: string | null
          preferences?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      are_friends: {
        Args: {
          user_a: string
          user_b: string
        }
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
