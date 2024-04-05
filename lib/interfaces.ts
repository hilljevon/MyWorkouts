export type DashboardWorkoutTableInterface = {
    id: string,
    created_at: string,
    user_id: string,
    date: string,
    duration: number,
    calories: number,
    notes: any,
    avg_hr: number,
    splits: string[],
    workoutExercises: {
        id: string,
        reps: number | null,
        sets: number | null,
        time: number | null,
        weight: number | null,
        distance: number | null,
        created_at: string,
        workout_id: string,
        exercise_id: string
    }[]
}
export type SupabaseUserInterface = {
    id: string,
    aud: string,
    role: string,
    email: string,
    email_confirmed_at: string,
    phone: string,
    confirmed_at: string,
    last_sign_in_at: string,
    app_metadata: any,
    user_metadata: any,
    identities: any[],
    created_at: string,
    updated_at: string,
}

export type WorkoutExercisesInterface = {
    id: string,
    created_at: string,
    workout_id: string,
    exercise_id: string,
    reps: number | null,
    sets: number | null,
    weight: number | null,
    distance: number | null,
    time: number | null,
    user_id: string
}
export type WorkoutInterface = {
    id: string,
    created_at: string | Date,
    user_id: string | null,
    date: string | null,
    duration: number | null,
    calories: number | null,
    notes: string | null,
    avg_hr: number | null,
    splits: string[] | null
}
export type ExercisesListInterface = {
    exercise_id: string,
    selected: boolean,
    reps: number,
    sets: number,
    weight: number,
    distance: number,
    time: number
}