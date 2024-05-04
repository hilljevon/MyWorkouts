'use client'
import { DashboardWorkoutTableInterface, WorkoutExercisesInterface } from '@/lib/interfaces'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, DollarSign, Minus, MoreHorizontal, Plus, PlusCircle } from 'lucide-react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
]
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import { Label } from './ui/label'
import { Input } from './ui/input'
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
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'


const WorkoutTableRow = ({ workout }: { workout: DashboardWorkoutTableInterface }) => {
    const router = useRouter()
    const handleDelete = async () => {
        if (workout == null) return null
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null
        const { data, error } = await supabase
            .from('workouts')
            .delete()
            .eq('id', workout.id)
            .select()
        console.log('workout deleted')
        router.push('/workouts')
    }
    return (
        <>
            <Drawer key={workout.id}>
                <DrawerTrigger asChild>
                    <TableRow
                        key={workout.id}
                        className='hover:cursor-pointer'
                    >
                        <TableCell className="font-medium">
                            {workout.splits?.join(' + ')}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {workout.date}
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline"> {workout.calories} </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {workout.avg_hr}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-2xl max-h-screen">
                        <DrawerHeader className='flex justify-center items-center flex-col mt-2'>
                            <DrawerTitle>Workout: {workout.splits?.join(' + ')} </DrawerTitle>
                            <DrawerDescription> {workout.date} </DrawerDescription>
                        </DrawerHeader>
                        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                            {/* CALORIES CARD */}
                            <Card x-chunk="dashboard-01-chunk-0">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm">
                                        Calories
                                    </CardTitle>
                                    {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg font-bold"> {workout.calories} </div>
                                    {/* <p className="text-xs text-muted-foreground">
                                        +20.1%
                                    </p> */}
                                </CardContent>
                            </Card>
                            {/* AVERAGE HR CARD */}
                            <Card x-chunk="dashboard-01-chunk-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Average HR
                                    </CardTitle>
                                    {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-bold"> {workout.avg_hr} </div>
                                    {/* <p className="text-xs text-muted-foreground">
                                        +180.1%
                                    </p> */}
                                </CardContent>
                            </Card>
                            {/* DURATION CARD */}
                            <Card x-chunk="dashboard-01-chunk-2">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Duration</CardTitle>
                                    {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-bold"> {workout.duration} mins </div>
                                    {/* <p className="text-xs text-muted-foreground">
                                        +2.7%
                                    </p> */}
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-01-chunk-3">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Exercises</CardTitle>
                                    {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold"> {workout.workoutExercises.length} </div>
                                    {/* <p className="text-xs text-muted-foreground">
                                        +20%
                                    </p> */}
                                </CardContent>
                            </Card>
                        </div>
                        <Card className='mt-8 py-2'>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead>Reps</TableHead>
                                            <TableHead>Sets</TableHead>
                                            <TableHead>Weight</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {workout.workoutExercises.map((exercise) => (
                                            <TableRow key={exercise.id}>
                                                <TableCell className="font-semibold">
                                                    {exercise.exercise_id}
                                                </TableCell>
                                                <TableCell>
                                                    <Label htmlFor="stock-1" className="sr-only">
                                                        Reps
                                                    </Label>
                                                    <Input id="stock-1" readOnly value={exercise.reps ? `${exercise.reps}` : '0'} />
                                                </TableCell>
                                                <TableCell>
                                                    <Label htmlFor="price-1" className="sr-only">
                                                        Sets
                                                    </Label>
                                                    <Input id="stock-1" readOnly value={exercise.sets ? `${exercise.sets}` : '0'} />
                                                </TableCell>
                                                <TableCell>
                                                    <Label htmlFor="price-1" className="sr-only">
                                                        Sets
                                                    </Label>
                                                    <Input id="stock-1" readOnly value={exercise.weight ? `${exercise.weight}` : '0'} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            {/* <CardFooter className="justify-center border-t p-4">
                                <Button size="sm" variant="ghost" className="gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    Add Variant
                                </Button>
                            </CardFooter> */}
                        </Card>
                        <DrawerFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Delete</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Are you sure you want to delete this workout?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex items-center space-x-2">
                                        {/* <div className="grid flex-1 gap-2">
                                            <Label htmlFor="link" className="sr-only">
                                                Link
                                            </Label>
                                            <Input
                                                id="link"
                                                defaultValue="https://ui.shadcn.com/docs/installation"
                                                readOnly
                                            />
                                        </div> */}

                                        {/* <Button type="button" size="sm" className="px-3">
                                            Yes
                                        </Button> */}
                                    </div>
                                    <DialogFooter className="sm:justify-start">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant='destructive'
                                            className="px-3"
                                            onClick={handleDelete}
                                        >

                                            Yes
                                        </Button>
                                        <DialogClose>
                                            <Button type="button" size="sm" variant="secondary">
                                                No
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default WorkoutTableRow