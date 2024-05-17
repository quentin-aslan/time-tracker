import {FormEvent, useContext, useState} from "react";
import {TasksContext} from "../tasksContext.tsx";
import TaskLine from "./TaskLine.tsx";

export default function TasksList() {
    const { addTask, getTasksCompleted, getTasksInProgress  } = useContext(TasksContext)

    const [taskName, setTaskName] = useState("")

    const handleAddTask = (event: FormEvent) => {
        event.preventDefault(); //
        addTask(taskName)
        setTaskName("")
    }

    const completedTasksListComponent = (
        <ul className={"flex flex-col gap-2"}>
            {getTasksCompleted().map(task => <TaskLine key={task.id} task={task}/>)}
        </ul>
    )

    const inProgressTasksListComponent = (
        <ul className={"flex flex-col gap-2"}>
            {getTasksInProgress().map(task => <TaskLine key={task.id} task={task}/>)}
        </ul>
    )

    return (
        <div className={"flex flex-col gap-5 items-center"}>
            <h1 className={"text-3xl"}>Tasks</h1>
            <form onSubmit={handleAddTask} className={"flex flex-row justify-center w-11/12 md:w-4/5 gap-5"}>
                <input type="text" placeholder="Type here" className="p-3 border border-black w-full" name="taskName" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                <button className={"btn btn-outline p-3"} type="submit">Add</button>
            </form>
            <div className={"w-11/12 md:w-4/5 flex flex-col gap-2"}>
                {inProgressTasksListComponent}

                <div className={"flex flex-col gap-2 justify-between border-2 border-emerald-600 text-lg p-3 shadow-md shadow-emerald-600"}>
                    <span className={"font-bold"}>✅ Completed tasks</span>
                    <div className={"hidden sm:block"}>
                        {completedTasksListComponent}
                    </div>
                </div>
                <div className={"sm:hidden"}>
                    {completedTasksListComponent}
                </div>
            </div>

        </div>
    )
}
