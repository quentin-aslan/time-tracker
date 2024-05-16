import TaskLine from "./TaskLine.tsx";
import {useContext} from "react";
import {TasksContext} from "../tasksContext.tsx";

export default function TasksTable() {

    const { getTasksCompleted, getTasksInProgress } = useContext(TasksContext)

    return (
        <table className={"w-full"}>
            <tbody className={"flex flex-col gap-5"}>
            {getTasksInProgress().map(task => <TaskLine key={task.id} task={task} />)}

            <tr className={'flex flex-row gap-1 justify-between border-2 hover:shadow-lg border-emerald-600 text-lg p-3'}>
                <th className={"font-bold"}>
                    ✅ Completed tasks
                </th>
                <th>
                    ⬇️ ⬇️ ⬇️
                </th>
            </tr>

            {getTasksCompleted().map(task => <TaskLine key={task.id} task={task} />)}
            </tbody>
        </table>
    )

}
