import {useContext, useEffect, useState} from "react";
import {TasksContext, TaskType} from "../tasksContext.tsx";

export default function TaskLine({ task }: {task: TaskType} ) {
    const { getTimeSpend, updateStatusTask, startTaskTimer, stopBreakTimer, startBreakTimer } = useContext(TasksContext)

    const [buttonStatusContent, setButtonStatusContent] = useState<string>(task.isCompleted ? 'Completed' : 'In progress')
    const [localTimeSpend, setLocalTimeSpend] = useState<number>(0)
    const [localTimer, setLocalTimer] = useState<any>(undefined)

    const startLocalTimer = () => {
        setLocalTimer(setInterval(() => setLocalTimeSpend(getTimeSpend(task)), 1000))
    }

    const onClickStatus = () => {
        clearInterval(localTimer)
        updateStatusTask(task)
        startBreakTimer(task)
    }

    const onClickTimeSpend = () => {
        if(!task.isTaskStarted) {
            startLocalTimer()
            startTaskTimer(task)
            return
        }

        if (task.isTaskStarted) {
            if ( task.isLongBreak || task.isShortBreak) {
                startLocalTimer()
                stopBreakTimer(task)
            }  else {
                clearInterval(localTimer)
                startBreakTimer(task, true)
            }
        }
    }

    useEffect(() => {
        setLocalTimeSpend(getTimeSpend(task))
        if(task.isTaskStarted && !task.isShortBreak && !task.isLongBreak) startLocalTimer()
    }, []);

    const formatTimeSpend = (timeSpendInMs: number) => {
        const timeSpendInSeconds = Math.floor(timeSpendInMs / 1000)
        if (timeSpendInSeconds === 0) return "Not started"
        if (timeSpendInSeconds < 60) return "Less than a minute"
        if (timeSpendInSeconds === 60) return "1 minute"

        const minutes = Math.floor(timeSpendInSeconds / 60)
        const seconds = timeSpendInSeconds % 60
        if (minutes < 60) return `${minutes}m ${seconds}s`

        const hours = Math.floor(minutes / 60)
        const minutesLeft = minutes % 60
        return `${hours}h ${minutesLeft}m ${seconds}s`
    }

    return (
        <tr className={`p-3 flex flex-row gap-1 items-center justify-between border hover:shadow-lg ${task.isCompleted ? 'border-emerald-600 text-lg' : 'border-black text-lg'} `}>
            <th className={"text-sm w-2 font-normal"}>#{task.id}</th>
            <td className={"w-1/4"}>{task.name}</td>
            {task.isCompleted
                ? <td className={"w-1/4"}>{formatTimeSpend(localTimeSpend)}</td>
                : (
                    <td
                        className={`w-1/4 cursor-pointer ${((task.isTaskStarted && task.isShortBreak || task.isLongBreak) || !task.isTaskStarted) ? 'hover:text-emerald-400' : 'hover:text-orange-600'}`}
                        onClick={onClickTimeSpend}>
                        {formatTimeSpend(localTimeSpend)}
                    </td>
                )
            }
            <td className={"w-1/4 "}>
                <span
                    className={`text-sm btn ${task.isCompleted ? 'btn-success-outline hover:btn-outline' : 'btn-outline hover:btn-success-outline'}`}
                    onMouseEnter={() => setButtonStatusContent(task.isCompleted ? 'Mark as in progress' : 'Mark as completed')}
                    onMouseLeave={() => setButtonStatusContent(task.isCompleted ? 'Completed' : 'In progress')}
                    onClick={onClickStatus}
                >
                    {buttonStatusContent}
                </span>
            </td>
        </tr>
    )
}
