import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
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
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { DashboardWorkoutTableInterface, SupabaseUserInterface, WorkoutExercisesInterface } from "@/lib/interfaces";
import { getAllRecentWorkouts, workoutsPage } from '@/lib/actions/calls'
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
import WorkoutTableRow from '@/components/WorkoutTableRow'
interface DashboardWorkoutData {
    workouts: DashboardWorkoutTableInterface[] | null,
    user: SupabaseUserInterface | null,
    workoutExercises: WorkoutExercisesInterface[] | null
}

const page = async () => {
    const { workouts, user, workoutExercises } = await workoutsPage() as DashboardWorkoutData
    if (!workouts) return null
    console.log('First workout here', workouts[0])
    return (
        <>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    {/* filter + export + add workout button */}
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Week</TabsTrigger>
                            <TabsTrigger value="draft">Month</TabsTrigger>
                            <TabsTrigger value="archived" className="hidden sm:flex">
                                Year
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filter
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Active
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Archived
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Workout
                                </span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Workouts</CardTitle>
                                <CardDescription>
                                    Manage your workouts and view ongoing performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Splits</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Calories
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Average HR
                                            </TableHead>

                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {workouts.map((workout: DashboardWorkoutTableInterface) => (
                                            <WorkoutTableRow key={workout.id} workout={workout} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            {/* <CardFooter>
                                <div className="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                    products
                                </div>
                            </CardFooter> */}
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </>
    )
}

export default page