import React, {useContext, useEffect, useState} from "react";
import {TasksContext} from "../tasksContext.tsx";
import {formatTimeSpend} from "../utils.ts";
import {TaskType} from "../types/Task.tsx";
import {
    PauseIcon,
    PlayIcon,
    StopIcon, TrashIcon
} from "@heroicons/react/16/solid";

export default function TaskLine({ task, onClick }: {task: TaskType, onClick: (task: TaskType) => void} ) {
    const {
        getTimeSpendInMs,
        updateStatusTask,
        startTaskTimer,
        stopBreakTimer,
        startBreakTimer,
        deleteTask
    } = useContext(TasksContext)

    const [localTimeSpend, setLocalTimeSpend] = useState<number>(0)
    const [localTimer, setLocalTimer] = useState<NodeJS.Timeout | undefined>(undefined)

    const isBreak = (task.isShortBreak || task.isLongBreak) && task.isTaskStarted

    const startLocalTimer = () => {
        setLocalTimer(setInterval(() => setLocalTimeSpend(getTimeSpendInMs(task)), 1000))
    }

    const onClickStatus = () => {
        clearInterval(localTimer)
        updateStatusTask(task)
        startBreakTimer(task)
    }

    const onClickDelete = (event: React.MouseEvent) => {
        event.stopPropagation();

        if(confirm('Are you sure you want to delete this task?')) {
            deleteTask(task)
        }
    }

    const startShortBreak = (event: React.MouseEvent) => {
        event.stopPropagation();

        clearInterval(localTimer)
        startBreakTimer(task, true)
    }

    const startLongBreak = (event: React.MouseEvent) => {
        event.stopPropagation();

        clearInterval(localTimer)
        startBreakTimer(task, false)
    }

    const startTask = (event: React.MouseEvent) => {
        event.stopPropagation();

        if (!task.isTaskStarted) {
            startLocalTimer()
            startTaskTimer(task)
        } else {
            startLocalTimer()
            stopBreakTimer(task)
        }
    }

    useEffect(() => {
        setLocalTimeSpend(getTimeSpendInMs(task))
        if (task.isTaskStarted && !task.isShortBreak && !task.isLongBreak) startLocalTimer()
    }, []);

    return (
        <>
            <li
                className={`hidden sm:flex flex-row gap-1 items-center justify-between bg-gray-50 p-3 border hover:shadow ${task.isCompleted ? 'border-emerald-600 hover:shadow-emerald-600' : task.isShortBreak ? 'border-orange-600' : 'border-black'} text-lg ${task.isShortBreak ? 'animate-pulse' : ''} cursor-pointer text-black`}
                onClick={() => onClick(task)}
            >
            <span className={"w-5 pt-0.5"}>
                {task.isCompleted ? (
                    <input
                        className="w-4 h-4 bg-emerald-600 border-2 border-emerald-600 hover:bg-white rounded-none appearance-none outline-none cursor-pointer relative"
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={onClickStatus}
                        onClick={(event) => event.stopPropagation()}
                    />
                ) : (
                    <input
                        className="w-4 h-4 bg-white border-2 border-black hover:border-emerald-600 hover:bg-emerald-600 rounded-none appearance-none outline-none cursor-pointer relative"
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={onClickStatus}
                        onClick={(event) => event.stopPropagation()}
                    />
                )}


            </span>
                <span
                    className={`${task.isCompleted ? 'w-2/3' : 'w-1/5'} overflow-hidden text-overflow-ellipsis whitespace-nowrap`}>{task.name}</span>
                <span className={`w-1/5`}>{formatTimeSpend(localTimeSpend)}</span>
                <span className={"ml-auto flex flex-row gap-2 items-center"}>
                {!task.isCompleted && (
                    <>
                        {isBreak || !task.isTaskStarted ? (
                            <span
                                className={"flex flex-row gap-1 items-center p-2 border border-emerald-600 hover:shadow hover:shadow-emerald-600 text-emerald-600 hover:text-white text-md bg-transparent hover:bg-emerald-600 cursor-pointer"}
                                onClick={startTask}>
                                Play
                                <PlayIcon className="size-5"/>
                            </span>

                        ) : (
                            <span
                                className={"flex flex-row gap-1 items-center p-2 border border-orange-600 hover:shadow hover:shadow-orange-600 text-orange-600 hover:text-white text-md bg-transparent hover:bg-orange-600 cursor-pointer"}
                                onClick={startShortBreak}>
                                Pause
                                <PauseIcon className="size-5"/>
                            </span>
                        )
                        }
                        <span
                            className={"flex flex-row gap-1 items-center p-2 border border-black text-black hover:text-white bg-transparent text-md hover:bg-gray-600 cursor-pointer"}
                            onClick={startLongBreak}>
                            Stop
                            <StopIcon className="size-5"/>
                        </span>
                    </>
                )}
                    <span
                        className={"flex flex-row gap-1 items-center p-2 text-red-600 hover:text-white bg-transparent hover:bg-red-500 cursor-pointer"}
                        onClick={onClickDelete}>
                            <TrashIcon className="size-6"/>
                        </span>
            </span>
            </li>

            <li
                className={` sm:hidden bg-gray-50 text-lg p-3 flex flex-col gap-2 border hover:shadow ${task.isCompleted ? 'border-emerald-600 hover:shadow-emerald-600' : task.isShortBreak ? 'border-orange-600' : 'border-black'} ${task.isShortBreak ? 'animate-pulse' : ''} cursor-pointer text-black`}
                onClick={() => onClick(task)}
            >
                <div className={"flex flex-row gap-3 items-center border-b border-gray-600 pb-2"}>
                    <span className={"w-5 mt-1.5"}>
                        {task.isCompleted ? (
                            <input
                                className="w-5 h-5 bg-emerald-600 border-2 border-emerald-600 hover:bg-white rounded-none appearance-none outline-none cursor-pointer relative"
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={onClickStatus}
                                onClick={(event) => event.stopPropagation()}
                            />
                        ) : (
                            <input
                                className="w-5 h-5 bg-white border-2 border-black hover:border-emerald-600 hover:bg-emerald-600 rounded-none appearance-none outline-none cursor-pointer relative"
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={onClickStatus}
                                onClick={(event) => event.stopPropagation()}
                            />
                        )}
                    </span>

                    <span className={`overflow-hidden text-overflow-ellipsis whitespace-nowrap`}>{task.name}</span>
                </div>
                <span className={`text-left`}>{formatTimeSpend(localTimeSpend)}</span>
                <span className={"flex flex-row gap-2 items-center"}>
                {!task.isCompleted && (
                    <>
                        {isBreak || !task.isTaskStarted ? (
                            <span
                                className={"flex flex-row gap-1 items-center p-2 border border-emerald-600 hover:shadow hover:shadow-emerald-600 text-emerald-600 hover:text-white bg-transparent hover:bg-emerald-600 cursor-pointer"}
                                onClick={startTask}>
                                Play
                                <PlayIcon className="size-5"/>
                            </span>

                        ) : (
                            <span
                                className={"flex flex-row gap-1 items-center p-2 border border-orange-600 hover:shadow hover:shadow-orange-600 text-orange-600 hover:text-white bg-transparent hover:bg-orange-600 cursor-pointer"}
                                onClick={startShortBreak}>
                                Pause
                                <PauseIcon className="size-5"/>
                            </span>
                        )
                        }
                        <span
                            className={"flex flex-row gap-1 items-center p-2 border border-black text-black hover:text-white bg-transparent hover:bg-gray-600 cursor-pointer"}
                            onClick={startLongBreak}>
                            Stop
                            <StopIcon className="size-5"/>
                        </span>
                    </>
                )}
                    <span
                        className={"ml-auto items-center p-2 text-red-600 hover:text-white bg-transparent hover:bg-red-500 cursor-pointer"}
                        onClick={onClickDelete}>
                            <TrashIcon className="size-7"/>
                        </span>
            </span>
            </li>
        </>
    )
}
