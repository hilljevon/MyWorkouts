'use client'
import { WorkoutExercisesInterface } from '@/lib/interfaces'
import React, { useEffect } from 'react'
import { Crosshair, Repeat, Repeat1, Repeat2Icon } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card'
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
    {
        average: 400,
        today: 240,
    },
    {
        average: 300,
        today: 139,
    },
    {
        average: 200,
        today: 980,
    },
    {
        average: 278,
        today: 390,
    },
    {
        average: 189,
        today: 480,
    },
    {
        average: 239,
        today: 380,
    },
    {
        average: 349,
        today: 430,
    },
]

const ExercisesPageIndividual = ({ exercises }: { exercises: WorkoutExercisesInterface[] }) => {
    console.log('My exercises here', exercises)
    return (
        <>
            <div className='w-full grid grid-cols-6 space-x-4'>
                <div className="col-span-2">
                    <Card className='flex flex-col'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Max</CardTitle>
                            <Crosshair className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className='flex flex-col h-full justify-around'>
                            <div className="text-4xl font-bold">75 lbs</div>
                            <p className="text-xs text-muted-foreground">on 03-24-2024</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-2">
                    <Card className='flex flex-col'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Reps</CardTitle>
                            <Repeat className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className='flex flex-col h-full justify-around'>
                            <div className="text-4xl font-bold">26</div>
                            <p className="text-xs text-muted-foreground">Average: 4</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-2">
                    <Card className='flex flex-col'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sets</CardTitle>
                            <Repeat2Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className='flex flex-col h-full justify-around '>
                            <div className="text-4xl font-bold">15</div>
                            <p className="text-xs text-muted-foreground">Average: 3</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-full py-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Over Time</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="h-[200px]">
                                <ResponsiveContainer width="85%" height="85%">
                                    <LineChart
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 10,
                                            left: 10,
                                            bottom: 0,
                                        }}
                                    >
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                        Average
                                                                    </span>
                                                                    <span className="font-bold text-muted-foreground">
                                                                        {payload[0].value}
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                        Today
                                                                    </span>
                                                                    <span className="font-bold">
                                                                        {payload[1].value}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                return null
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            strokeWidth={2}
                                            dataKey="average"
                                            activeDot={{
                                                r: 6,
                                                style: { fill: "var(--theme-primary)", opacity: 0.25 },
                                            }}
                                            style={
                                                {
                                                    stroke: "var(--theme-primary)",
                                                } as React.CSSProperties
                                            }
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="today"
                                            strokeWidth={2}
                                            activeDot={{
                                                r: 8,
                                                style: { fill: "var(--theme-primary)" },
                                            }}
                                            style={
                                                {

                                                } as React.CSSProperties
                                            }
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </>
    )
}

export default ExercisesPageIndividual




