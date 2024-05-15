import {TaskType} from "../mock.ts";
import {useState} from "react";

export default function TaskLine({ task, onTaskStatusUpdated }: {task: TaskType, onTaskStatusUpdated: (task: TaskType) => void}) {
    const [buttonStatusContent, setButtonStatusContent] = useState<string>(task.completed ? 'Completed' : 'In progress')

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
        <tr className={`p-3 flex flex-row gap-1 items-center justify-between border hover:shadow-lg ${task.completed ? 'border-emerald-600 text-lg' : 'border-black text-lg'} `}>
            <th className={" w-2"}>#{task.id}</th>
            <td className={"w-1/4"}>{task.name}</td>
            <td className={"w-1/4"}>{formatTimeSpend(task.timeSpend)}</td>
            <td className={"w-1/4 "}>
                <span
                    className={`text-sm btn ${task.completed ? 'btn-success-outline hover:btn-outline' : 'btn-outline hover:btn-success-outline'}`}
                    onMouseEnter={() => setButtonStatusContent(task.completed ? 'Mark as in progress' : 'Mark as completed')}
                    onMouseLeave={() => setButtonStatusContent(task.completed ? 'Completed' : 'In progress')}
                    onClick={() => onTaskStatusUpdated(task)}
                >
                    {buttonStatusContent}
                </span>
            </td>
        </tr>
    )
}
