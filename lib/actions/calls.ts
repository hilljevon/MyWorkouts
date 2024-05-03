'use server'

import { createClient } from "@/utils/supabase/server";
import { ExercisesListInterface, WorkoutInterface } from "../interfaces";
interface OverviewDataInterface {
    avg_hr: number,
    calories: number,
    date: string | Date,
    duration: number,
    splits: string[]
}
interface SupabaseExerciseInterface {
    exercise_id: string;
    reps: number;
    sets: number;
    weight: number;
    distance: number;
    time: number;
}
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
export async function createNewWorkout(overviewData: OverviewDataInterface, exercises: SupabaseExerciseInterface[]) {
    try {
        const supabase = createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (!user) return null
        const { data: workouts, error: workoutsError } = await supabase
            .from('workouts')
            .insert([
                {
                    user_id: user.id,
                    date: JSON.stringify(overviewData.date),
                    duration: overviewData.duration,
                    calories: overviewData.calories,
                    avg_hr: overviewData.avg_hr,
                    splits: overviewData.splits,
                }
            ])
            .select()
        if (workoutsError) {
            console.log('Workout error', workoutsError)
            return false
        }
        console.log('MY WORKOUTS HERE', workouts)
        const newWorkoutExercises = exercises.map((exercise: SupabaseExerciseInterface) => {
            const newExercise = { ...exercise, workout_id: workouts[0].id, user_id: user.id }
            return newExercise
        })
        const { data: workoutExercises, error: woroutExerciseError } = await supabase
            .from('workoutExercises')
            .insert([...newWorkoutExercises])
            .select()
        console.log('MY NEW WORKOUT EXERCISES HERE', workoutExercises)

    } catch (error: any) {
        throw new Error(`Cannot create new workout. Error here: ${error.message}`)
    }
}
export async function workoutsPage() {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null
        const { data: workouts } = await supabase
            .from('workouts')
            .select('*, workoutExercises(*)')
            .order('date', { ascending: false })
        console.log('inside server, workouts here', workouts)
        if (!workouts) return null
        const { data: workoutExercises } = await supabase
            .from('workoutExercises')
            .select('*')
            .eq('user_id', user?.id)
        console.log('Inside Server, workout Exercises here', workoutExercises)
        if (!workoutExercises) return null
        return { workouts, user, workoutExercises }
    } catch (error: any) {
        throw new Error(`Unable to get all recent workouts. Error here: ${error.message}`)
    }
}
export async function getExercises(muscleGroup: string) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null
        const { data: exercises } = await supabase
            .from('exercises')
            .select('id')
            .eq('muscleGroup', muscleGroup)
        if (!exercises) return null
        return exercises

    } catch (error: any) {
        throw new Error(`Unable to get exercises from supabase. Error here: ${error.message}`)
    }
}
export async function getExerciseData(exercise: string) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null
        const { data: workoutExercises } = await supabase
            .from('workoutExercises')
            .select('*, workouts(date, splits)')
            .eq('exercise_id', exercise)
        if (!workoutExercises) return null
        return workoutExercises
    } catch (error: any) {
        throw new Error(`Unable to get exercise data. Error here: ${error.message}`)
    }
}