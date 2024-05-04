'use client'
import { WorkoutExercisesInterface } from '@/lib/interfaces'
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
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
import { ExercisesPageTableInterface } from '@/lib/interfaces'


const ExercisePageTable = ({ exercises }: { exercises: ExercisesPageTableInterface[] | null }) => {

    if (!exercises) return null
    console.log('my exercises here', exercises)
    return (
        <>
            <Card className='w-full'>
                <CardHeader className="px-7">
                    <CardTitle> Exercise: {exercises[0].exercise_id} </CardTitle>
                    <CardDescription>All workouts</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Reps</TableHead>
                                <TableHead className="hidden sm:table-cell">Sets</TableHead>
                                <TableHead className="">Weight</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {exercises.map((exercise) => (
                                <TableRow className="bg-accent">
                                    <TableCell>
                                        <div className="font-medium">
                                            {exercise.workouts?.date}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {exercise.reps}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {exercise.sets}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{exercise.weight}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default ExercisePageTable





