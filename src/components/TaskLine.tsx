import {useContext, useState} from "react";
import {TasksContext, TaskType} from "../tasksContext.tsx";

export default function TaskLine({ task }: {task: TaskType} ) {
    const { getTimeSpend, updateStatusTask, startTaskTimer, stopBreakTimer, startBreakTimer,  } = useContext(TasksContext)

    const [buttonStatusContent, setButtonStatusContent] = useState<string>(task.isCompleted ? 'Completed' : 'In progress')

    const onClickStatus = () => {
        // TODO : Don't forget, need to call stopBreakTimer if the task is completed
        updateStatusTask(task)
    }

    const onClickTimeSpend = () => {
        if(!task.isTaskStarted) {
            startTaskTimer(task)
            return
        }

        if (task.isTaskStarted) {
            if ( task.isLongBreak || task.isShortBreak) {
                stopBreakTimer(task)
            }  else {
                startBreakTimer(task)
            }
        }
    }


    const formatTimeSpend = (timeSpendInSc: number) => {
        if (timeSpendInSc === 0) {
            return "Not started"
        } else if (timeSpendInSc < 60) {
            return "Less than a minute"
        } else if (timeSpendInSc === 60) {
            return "1 minute"
        }

        const minutes = Math.floor(timeSpendInSc / 60)
        const seconds = timeSpendInSc % 60

        if (minutes < 60) {
            return `${minutes}m ${seconds}s`
        }

        const hours = Math.floor(minutes / 60)
        const minutesLeft = minutes % 60

        return `${hours}h${minutesLeft}m${seconds}s`
    }

    return (
        <tr className={`p-3 flex flex-row gap-1 items-center justify-between border hover:shadow-lg ${task.isCompleted ? 'border-emerald-600 text-lg' : 'border-black text-lg'} `}>
            <th className={"text-sm w-2 font-normal"}>#{task.id}</th>
            <td className={"w-1/4"}>{task.name}</td>
            <td className={"w-1/4"} onClick={() => onClickTimeSpend()}>{getTimeSpend(task)}</td>
            <td className={"w-1/4 "}>
                <span
                    className={`text-sm btn ${task.isCompleted ? 'btn-success-outline hover:btn-outline' : 'btn-outline hover:btn-success-outline'}`}
                    onMouseEnter={() => setButtonStatusContent(task.isCompleted ? 'Mark as in progress' : 'Mark as completed')}
                    onMouseLeave={() => setButtonStatusContent(task.isCompleted ? 'Completed' : 'In progress')}
                    onClick={() => onClickStatus()}
                >
                    {buttonStatusContent}
                </span>
            </td>
        </tr>
    )
}
