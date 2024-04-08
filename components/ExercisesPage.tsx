'use client'

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from "react"
import { getExerciseData, getExercises } from "@/lib/actions/calls"
import ExercisesPageIndividual from "./tables/ExercisesPageIndividual"
import ExerciseOverviewTable from "./tables/ExerciseOverviewTable"
import { WorkoutExercisesInterface } from "@/lib/interfaces"
interface ExercisesArrayInterface {
    id: string
}

const ExercisesPage = () => {
    const [currentSplit, setCurrentSplit] = useState<string>('Chest')
    const [exercisesArray, setExercisesArray] = useState<ExercisesArrayInterface[] | null>([])
    const [selectedExercise, setSelectedExercise] = useState<string>('')
    const [displayType, setDisplayType] = useState<string>('Individual')
    const [fetchedExerciseData, setFetchedExerciseData] = useState<WorkoutExercisesInterface[] | null>([])
    // whenever we change the workout type, we make a call to our supabase client to fetch all the 
    useEffect(() => {
        const getAssociatedExercises = async () => {
            const associatedExercises = await getExercises(currentSplit)
            setExercisesArray(associatedExercises)
        }
        getAssociatedExercises()
    }, [currentSplit])
    const handleNewExercise = async () => {
        const exerciseData = await getExerciseData(selectedExercise)
        setFetchedExerciseData(exerciseData)
    }
    return (
        <>
            <div
                className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
            >
                <div className="grid w-full items-start gap-6">
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                            Config
                        </legend>
                        <div className="grid gap-3">
                            <Label htmlFor="model">Muscle Group</Label>
                            <Select
                                value={currentSplit}
                                onValueChange={setCurrentSplit}
                            >
                                <SelectTrigger
                                    id="muscleGroup"
                                    className="items-start [&_[data-description]]:hidden"

                                >
                                    <SelectValue placeholder="Select a muscle group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Chest">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Chest
                                            </p>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Back">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Back
                                            </p>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Legs">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Legs
                                            </p>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Biceps">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Biceps
                                            </p>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Triceps">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Triceps
                                            </p>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Cardio">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Cardio
                                            </p>
                                        </div>
                                    </SelectItem>


                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="model">Exercise</Label>
                            <Select
                                value={selectedExercise}
                                onValueChange={setSelectedExercise}
                            >
                                <SelectTrigger
                                    id="selectedExercise"
                                    className="items-start [&_[data-description]]:hidden"

                                >
                                    <SelectValue placeholder="Select an exercise" />
                                </SelectTrigger>
                                <SelectContent >
                                    {exercisesArray?.map((exercise: ExercisesArrayInterface) => (
                                        <SelectItem key={exercise.id} value={exercise.id}>
                                            <div className="flex items-center gap-3 text-muted-foreground">
                                                <p>
                                                    {exercise.id}
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="model">View</Label>
                            <Select
                                value={displayType}
                                onValueChange={setDisplayType}
                                disabled
                            >
                                <SelectTrigger
                                    id="exerciseOverview"
                                    className="items-start [&_[data-description]]:hidden"

                                >
                                    <SelectValue placeholder="Overview" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value='Overview'>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Overview
                                            </p>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='Individual'>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <p>
                                                Individual
                                            </p>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            onClick={handleNewExercise}
                        >
                            Submit
                        </Button>
                    </fieldset>

                </div>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <div className="flex w-full">
                    {fetchedExerciseData && (
                        <ExercisesPageIndividual exercises={fetchedExerciseData} />
                    )}
                </div>
            </div>
        </>
    )
}

export default ExercisesPage