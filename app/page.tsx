export const dynamic = 'force-dynamic';


import { redirect } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit2Icon,
  File,
  ListFilter,
  MoreVertical,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { getAllRecentWorkouts } from "@/lib/actions/calls";
import { DashboardWorkoutTableInterface, SupabaseUserInterface, WorkoutExercisesInterface } from "@/lib/interfaces";
import NewWorkoutForm from "@/components/forms/NewWorkoutForm";
import { createClient } from "@/utils/supabase/server";

interface DashboardWorkoutData {
  workouts: DashboardWorkoutTableInterface[] | null,
  user: SupabaseUserInterface | null,
  workoutExercises: WorkoutExercisesInterface[] | null
}
interface WorkoutOverviewInterface {
  id: string,
  created_at: string,
  workout_id: string,
  exercise_id: string,
  reps: number | null,
  sets: number | null,
  weight: number | null,
  distance: number | null,
  time: number | null,
}
export default async function Home() {

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null
  const { data: workouts, count: workoutCount } = await supabase
    .from('workouts')
    .select("*, workoutExercises(*)", { count: 'exact' })
    .order('date', { ascending: false })
  if (!workouts) return null
  const { data: workoutExercises, count: exercisesCount } = await supabase
    .from('workoutExercises')
    .select('*', { count: 'exact' })
    .eq('user_id', user?.id)
  if (!workoutExercises) return null
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Dashboard</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Select below to log your most recent workout.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-8">
                <Sheet>
                  <SheetTrigger className="basic-button" >
                    Create New Workout
                  </SheetTrigger>
                  <SheetContent side='bottom'>
                    <SheetTitle>New Workout</SheetTitle>
                    <NewWorkoutForm />
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Workouts</CardDescription>
                <CardTitle className="text-4xl"> {workoutCount} </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={75} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Exercises</CardDescription>
                <CardTitle className="text-3xl"> {exercisesCount} </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={57} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {/* <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger> */}
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                      disabled
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Refunded
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button> */}
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Workouts</CardTitle>
                  <CardDescription>
                    Recent Workouts from your log.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Workouts table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Duration
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Calories
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workouts && (
                        workouts.map((workout) => (
                          <TableRow key={workout.id} className="bg-accent">
                            <TableCell>
                              <div className="font-medium text-md">
                                {workout.splits?.join(' + ')}
                              </div>
                              <div className="hidden text-xs text-slate-400 md:inline">
                                {workout.date}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {workout.duration}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {workout.calories}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Last Workout: {workouts[0].splits}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>Date: {workouts[0].date}</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Edit2Icon className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Edit
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Trash</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Strength and Conditioning</div>
                <ul className="grid gap-3">
                  {workouts[0].workoutExercises.map((workoutExercise: WorkoutOverviewInterface) => (
                    <li key={workoutExercise.id} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {workoutExercise.exercise_id} <span className="text-xs text-slate-400"> {workoutExercise.sets} x {workoutExercise.reps} </span>
                      </span>
                      <span> {workoutExercise.weight} lbs </span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <div className="font-semibold">Statistics</div>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Calories Burned
                    </span>
                    <span>
                      {workouts[0].calories}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Duration
                    </span>
                    <span>
                      {workouts[0].duration}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Average Heart Rate
                    </span>
                    <span>
                      {workouts[0].avg_hr}
                    </span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                <time dateTime="2023-11-23">Page 1</time>
              </div>
              <Pagination className="ml-auto mr-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span className="sr-only">Previous Order</span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="sr-only">Next Order</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
