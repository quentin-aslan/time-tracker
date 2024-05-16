import {useContext, useEffect, useState} from "react";
import {TasksContext, TaskType} from "../tasksContext.tsx";
import {formatTimeSpend} from "../utils.ts";

export default function TaskLine({ task }: {task: TaskType} ) {
    const { getTimeSpendInMs, updateStatusTask, startTaskTimer, stopBreakTimer, startBreakTimer } = useContext(TasksContext)

    const [buttonStatusContent, setButtonStatusContent] = useState<string>(task.isCompleted ? 'Completed' : 'In progress')
    const [localTimeSpend, setLocalTimeSpend] = useState<number>(0)
    const [localTimer, setLocalTimer] = useState<any>(undefined)

    const startLocalTimer = () => {
        setLocalTimer(setInterval(() => setLocalTimeSpend(getTimeSpendInMs(task)), 1000))
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
        setLocalTimeSpend(getTimeSpendInMs(task))
        if(task.isTaskStarted && !task.isShortBreak && !task.isLongBreak) startLocalTimer()
    }, []);

    return (
        <tr className={`p-3 flex flex-row gap-1 items-center justify-between border hover:shadow-lg ${task.isCompleted ? 'border-emerald-600' : 'border-black'} md:text-lg`}>
            <th className={"text-sm w-2 font-normal"}>#{task.id}</th>
            <td className={"w-1/4 overflow-hidden text-overflow-ellipsis whitespace-nowrap"}>{task.name}</td>
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
            <td className={"w-1/4"}>
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
