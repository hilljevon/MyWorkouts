'use server'

import { createClient } from "@/utils/supabase/server";

export async function getAllRecentWorkouts() {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null
        const { data: workouts } = await supabase
            .from('workouts')
            .select('*, workoutExercises(*)')
            .order('date', { ascending: false })
        if (!workouts) return null
        const { data: workoutExercises } = await supabase
            .from('workoutExercises')
            .select()
            .eq('user_id', user?.id)
        if (!workoutExercises) return null
        return { workouts, user, workoutExercises }
    } catch (error: any) {
        throw new Error(`Unable to get all recent workouts. Error here: ${error.message}`)
    }
}
