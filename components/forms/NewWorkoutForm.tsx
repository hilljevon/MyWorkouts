'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Copy } from "lucide-react"

import { Label } from "@/components/ui/label"

import { masterExerciseList, splits } from "@/lib"
import { ChangeEvent, useEffect, useState } from "react"
import { createNewWorkout } from "@/lib/actions/calls"
import { ExercisesListInterface } from "@/lib/interfaces"
import { createClient } from "@/utils/supabase/client"
const formSchema = z.object({
    date: z.date(),
    duration: z.coerce.number(),
    calories: z.coerce.number(),
    avg_hr: z.coerce.number(),
    splits: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})


const NewWorkoutForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date(),
            duration: 60,
            calories: 1000,
            avg_hr: 130,
            splits: []
        },
    })
    const [exercisesList, setExercisesList] = useState<ExercisesListInterface[]>([])
    const [submittedExercises, setSubmittedExercises] = useState<ExercisesListInterface[]>([])
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([''])
    const [currentSplit, setCurrentSplit] = useState<string>('Chest')
    useEffect(() => {
        setExercisesList(masterExerciseList)
    }, [])
    // HERE IS WHERE WE CAN GRAB ALL EXERCISES ACCORDING TO MUSCLE GROUP
    // useEffect(() => {
    //     const getAssociatedExercises = async () => {
    //         const supabase = createClient()
    //         const { data: { user } } = await supabase.auth.getUser();
    //         if (!user) return null
    //         const { data: exercises } = await supabase
    //             .from('exercises')
    //             .select('id')
    //             .eq('muscleGroup', currentSplit)
    //         if (!exercises) return null
    //         setExercisesArray(exercises)
    //     }
    //     getAssociatedExercises()
    // }, [currentSplit])
    const handleExerciseClick = (clickedName: string) => {
        setExercisesList((oldList) => {
            const newList = oldList.map((exercise: ExercisesListInterface) => {
                if (exercise.exercise_id == clickedName) {
                    return { ...exercise, selected: !exercise.selected }
                } else {
                    return exercise
                }
            })
            return newList
        })
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        const selectedExercises: ExercisesListInterface[] = []
        exercisesList.forEach((exercise: ExercisesListInterface) => {
            if (exercise.selected) {
                selectedExercises.push(exercise)
            }
        })
        setSubmittedExercises(selectedExercises)
        setSelectedMuscleGroups(values.splits)
    }
    async function finalSubmission() {
        const vals = form.getValues()
        const exercises = submittedExercises.map((exercise: ExercisesListInterface) => {
            const newExercise = {
                distance: exercise.distance,
                exercise_id: exercise.exercise_id,
                reps: exercise.reps,
                sets: exercise.sets,
                time: exercise.time,
                weight: exercise.weight
            }
            return newExercise
        })
        const res = await createNewWorkout(vals, exercises)
        console.log('MY return statement here', res)
    }
    function handleExerciseChange(e: ChangeEvent<HTMLInputElement>, name: string, type: string) {
        const val = e.target.value
        setSubmittedExercises((oldExercises) => {
            const updatedExercises = oldExercises.map((exercise: ExercisesListInterface) => {
                if (exercise.exercise_id == name) {
                    return { ...exercise, [type]: parseInt(val) }
                } else {
                    return exercise
                }
            })
            return updatedExercises
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" action="">
                <div className="grid sm:grid-cols-6 gap-x-6 gap-y-8">
                    <div className="col-span-3">
                        {/* date */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-3">
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
                    <div className="col-span-2">
                        {/* duration */}
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2">
                        {/* calories */}
                        <FormField
                            control={form.control}
                            name="calories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Calories</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2">
                        {/* average HR */}
                        <FormField
                            control={form.control}
                            name="avg_hr"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Average Heart Rate</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-3">
                        {/* splits */}
                        <FormField
                            control={form.control}
                            name="splits"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Muscle Groups</FormLabel>
                                        <FormDescription>
                                            Select your splits
                                        </FormDescription>
                                    </div>
                                    {splits.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="splits"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3">
                            {exercisesList.map((exercise: ExercisesListInterface) => (
                                <div
                                    key={exercise.exercise_id}
                                    className="col-span-1 mx-2">
                                    <Button
                                        key={exercise.exercise_id}
                                        variant={exercise.selected ? 'default' : 'outline'}
                                        size={'sm'}
                                        onClick={() => handleExerciseClick(exercise.exercise_id)}
                                        type="button"
                                    >
                                        {exercise.exercise_id}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'secondary'} type="submit">
                            Submit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogTitle>Please confirm workout details</DialogTitle>
                        <div className="grid grid-cols-6 gap-x-4 gap-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <div className="col-span-full">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={true}
                                                        initialFocus
                                                        disableNavigation
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-2">
                                {/* duration */}
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-2">
                                {/* calories */}
                                <FormField
                                    control={form.control}
                                    name="calories"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Calories</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-2">
                                {/* average HR */}
                                <FormField
                                    control={form.control}
                                    name="avg_hr"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Avg HR</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-full px-2">
                                <p className="font-bold">Muscle Groups</p>
                                <div className="grid grid-cols-6 gap-x-2 gap-y-2 py-2">
                                    {selectedMuscleGroups.map((muscleGroup: string, idx) => (
                                        <div key={idx} className="col-span-2">
                                            <span className="m-2" key={idx}>
                                                {idx + 1}. {muscleGroup}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-full px-0-2">
                                <p className="font-bold">Exercises</p>
                                <div className="">
                                    {submittedExercises.map((exercise: ExercisesListInterface, idx) => (
                                        <div className="w-full grid grid-cols-8 gap-x-2 gap-y-2 py-2">
                                            <div className="col-span-2">
                                                {idx + 1}. {exercise.exercise_id}
                                            </div>
                                            {/* REPS */}
                                            <div className="col-span-2">
                                                <Label htmlFor="">Reps</Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => handleExerciseChange(e, exercise.exercise_id, 'reps')}
                                                    value={exercise.reps}
                                                />
                                            </div>
                                            {/* SETS  */}
                                            <div className="col-span-2">
                                                <Label htmlFor="">Sets</Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => handleExerciseChange(e, exercise.exercise_id, 'sets')}
                                                    value={exercise.sets}
                                                />
                                            </div>
                                            {/* WEIGHT */}
                                            <div className="col-span-2">
                                                <Label htmlFor="">Weight</Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => handleExerciseChange(e, exercise.exercise_id, 'weight')}
                                                    value={exercise.weight}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button className="bg-green-400" type="button" onClick={finalSubmission}>
                                Create
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </form>
        </Form>
    )
}

export default NewWorkoutForm