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

import { splits } from "@/lib"
import { useState } from "react"

const formSchema = z.object({
    date: z.date(),
    duration: z.coerce.number(),
    calories: z.coerce.number(),
    avg_hr: z.coerce.number(),
    splits: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})
interface ExercisesListInterface {
    name: string,
    selected: boolean
}

const NewWorkoutForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date(),
            duration: 0,
            calories: 0,
            avg_hr: 0,
            splits: []
        },
    })

    const [exercisesList, setExercisesList] = useState([
        {
            name: 'DB Bench Press',
            selected: false
        },
        {
            name: 'DB Incline Bench Press',
            selected: false
        },
        {
            name: "DB Fly's",
            selected: false
        },
        {
            name: "DB Pullover's",
            selected: false
        },
        {
            name: "Stairmaster",
            selected: false
        },
        {
            name: "Running",
            selected: false
        },
        {
            name: "Cable Rows",
            selected: false
        },
        {
            name: "Lat Pull Downs",
            selected: false
        },
        {
            name: "Lat Pullovers",
            selected: false
        },
        {
            name: "Neutral Grip T-Bar Rows",
            selected: false
        },
        {
            name: "Angle Grip T-Bar Rows",
            selected: false
        },
        {
            name: "Single Arm Row Machine",
            selected: false
        },
        {
            name: "Hack Squat",
            selected: false
        },
        {
            name: "Leg Extensions",
            selected: false
        },
        {
            name: "Hamstring Curls",
            selected: false
        },
        {
            name: "Hamstring Curls (Lying Down)",
            selected: false
        },
        {
            name: "Barbell Lunges",
            selected: false
        },
        {
            name: "DB Shoulder Press",
            selected: false
        },
        {
            name: "DB Back Lateral Raises",
            selected: false
        },
        {
            name: "DB Side Lateral Raises",
            selected: false
        },
        {
            name: "DB Front Lateral Raises",
            selected: false
        },
    ])
    const [submittedExercises, setSubmittedExercises] = useState([''])
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([''])
    const handleExerciseClick = (clickedName: string) => {
        setExercisesList((oldList) => {
            const newList = oldList.map((exercise: ExercisesListInterface) => {
                if (exercise.name == clickedName) {
                    return {
                        name: exercise.name,
                        selected: !exercise.selected
                    }
                } else {
                    return exercise
                }
            })
            return newList
        })
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        const selectedExercises: string[] = []
        exercisesList.forEach((exercise: ExercisesListInterface) => {
            if (exercise.selected) {
                selectedExercises.push(exercise.name)
            }
        })
        setSubmittedExercises(selectedExercises)
        setSelectedMuscleGroups(values.splits)
        // console.log(values)
        // console.log('MY EXERCISES HERE', selectedExercises)
    }
    function finalSubmission() {
        const data = form.getValues()
        console.log('MY DATA HERRE', data)
        console.log('submitted exercises', submittedExercises)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" action="">
                <div className="grid sm:grid-cols-6 gap-x-6 gap-y-8">
                    <div className="col-span-full">
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
                                    key={exercise.name}
                                    className="col-span-1 mx-2">
                                    <Button
                                        key={exercise.name}
                                        variant={exercise.selected ? 'default' : 'outline'}
                                        size={'sm'}
                                        onClick={() => handleExerciseClick(exercise.name)}
                                        type="button"
                                    >
                                        {exercise.name}
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
                        <div className="grid grid-cols-6 gap-x-6 gap-y-8 text-sm text-slate-500 dark:text-slate-400">
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
                                        <div key={idx} className="col-span-3">
                                            <span className="m-2" key={idx}>
                                                {idx + 1}. {muscleGroup}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-full px-0-2">
                                <p className="font-bold">Exercises</p>
                                <div className="grid grid-cols-6 gap-x-2 gap-y-2 py-2">
                                    {submittedExercises.map((exercise: string, idx) => (
                                        <div key={exercise} className="col-span-3">
                                            <span className="m-2" key={idx}>
                                                {idx + 1}. {exercise}
                                            </span>
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