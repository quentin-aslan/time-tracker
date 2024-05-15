import {TaskType} from "../mock.ts";
import TaskLine from "./TaskLine.tsx";

export default function TasksTable({tasks} : {tasks: TaskType[]}) {

    const handleTaskStatusUpdated = (task: TaskType) => tasks[tasks.findIndex(t => t.id === task.id)].completed = !task.completed

    const completedTasks = tasks.filter(task => task.completed).map(task => <TaskLine task={task} onTaskStatusUpdated={handleTaskStatusUpdated} />)
    const inProgressTask = tasks.filter(task => !task.completed).map(task => <TaskLine task={task} onTaskStatusUpdated={handleTaskStatusUpdated}/>)


    return (
        <table className={"w-full"}>
            <tbody className={"flex flex-col gap-5"}>
            {inProgressTask}

            <tr className={'flex flex-row gap-1 justify-between border-2 hover:shadow-lg border-emerald-600 text-lg p-3'}>
                <th className={"font-bold"}>
                    Completed task
                </th>
                <th>
                    ⬇️ ⬇️ ⬇️
                </th>
            </tr>

            {completedTasks}
            </tbody>
        </table>
    )

}
