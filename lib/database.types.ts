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
      exercises: {
        Row: {
          id: string
          muscleGroup: string | null
          type: string | null
        }
        Insert: {
          id: string
          muscleGroup?: string | null
          type?: string | null
        }
        Update: {
          id?: string
          muscleGroup?: string | null
          type?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          age: number | null
          created_at: string
          email: string
          id: string
          splits: Json | null
          username: string | null
          weekly_target: number | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          email: string
          id?: string
          splits?: Json | null
          username?: string | null
          weekly_target?: number | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string
          id?: string
          splits?: Json | null
          username?: string | null
          weekly_target?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      workoutExercises: {
        Row: {
          created_at: string
          distance: number | null
          exercise_id: string
          id: string
          reps: number | null
          sets: number | null
          time: number | null
          user_id: string
          weight: number | null
          workout_id: string
        }
        Insert: {
          created_at?: string
          distance?: number | null
          exercise_id: string
          id?: string
          reps?: number | null
          sets?: number | null
          time?: number | null
          user_id?: string
          weight?: number | null
          workout_id?: string
        }
        Update: {
          created_at?: string
          distance?: number | null
          exercise_id?: string
          id?: string
          reps?: number | null
          sets?: number | null
          time?: number | null
          user_id?: string
          weight?: number | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_workoutExercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workoutExercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workoutExercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          avg_hr: number | null
          calories: number | null
          created_at: string
          date: string | null
          duration: number | null
          id: string
          notes: string | null
          splits: string[] | null
          user_id: string
        }
        Insert: {
          avg_hr?: number | null
          calories?: number | null
          created_at?: string
          date?: string | null
          duration?: number | null
          id?: string
          notes?: string | null
          splits?: string[] | null
          user_id?: string
        }
        Update: {
          avg_hr?: number | null
          calories?: number | null
          created_at?: string
          date?: string | null
          duration?: number | null
          id?: string
          notes?: string | null
          splits?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
