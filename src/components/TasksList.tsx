import TasksTable from "./TasksTable.tsx";
import {FormEvent, useContext, useState} from "react";
import {TasksContext} from "../tasksContext.tsx";

export default function TasksList() {
    const { addTask } = useContext(TasksContext)

    const [taskName, setTaskName] = useState("")

    const handleAddTask = (event: FormEvent) => {
        event.preventDefault(); //
        addTask(taskName)
        setTaskName("")
    }

    return (
        <div className={"flex flex-col gap-5 items-center"}>
            <h1 className={"text-3xl"}>Tasks</h1>
            <form onSubmit={handleAddTask} className={"flex flex-row justify-center w-4/5 gap-5"}>
                <input type="text" placeholder="Type here" className="p-3 border border-black w-full" name="taskName" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                <button className={"btn btn-outline p-3"} type="submit">Add</button>
            </form>
            <div className={"w-4/5"}>
                <TasksTable/>
            </div>

        </div>
    )
}
