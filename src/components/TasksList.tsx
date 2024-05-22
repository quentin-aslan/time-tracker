import {FormEvent, useContext, useEffect, useState} from "react";
import {TasksContext} from "../tasksContext.tsx";
import TaskLine from "./TaskLine.tsx";
import TaskLightbox from "./TaskLightbox.tsx";
import {TaskType} from "../types/Task.tsx";
import TaskParentLine from "./TaskParentLine.tsx";

export default function TasksList() {
    const { addTask, getTasksCompleted, getTasksInProgress  } = useContext(TasksContext)

    const [taskName, setTaskName] = useState("")

    const [isTaskLightboxOpen, setIsTaskLightboxOpen] = useState(false)
    const [taskInLightbox, setTaskInLightbox] = useState<TaskType | undefined>(undefined)

    const [isCompletedTaskDisplayed, setIsCompletedTaskDisplayed] = useState(false)

    const openTaskLightbox = (task: TaskType) => {
        setIsTaskLightboxOpen(true)
        setTaskInLightbox(task)
    }

    const handleAddTask = (event: FormEvent) => {
        event.preventDefault(); //
        addTask(taskName)
        setTaskName("")
    }

    const completedTasksListComponent = (
        <ul className={"flex flex-col gap-3"}>
            {getTasksCompleted().filter(task => !task.parentTask || task.parentTask === 0).map(task => {
                const childs = [...getTasksInProgress().filter(t => t.parentTask === task.id), ...getTasksCompleted().filter(t => t.parentTask === task.id)]
                if (childs.length > 0) {
                    return (
                        <TaskParentLine
                            key={task.id}
                            task={task}
                            onClick={(t) => openTaskLightbox(t)}
                            childs={childs}
                        />
                    )
                }

                return (
                    <TaskLine
                        key={task.id}
                        task={task}
                        onClick={() => openTaskLightbox(task)}
                    />
                )

            })}
        </ul>
    )

    const inProgressTasksListComponent = (
        <ul className={"flex flex-col gap-3"}>
            {getTasksInProgress().filter(task => !task.parentTask || task.parentTask === 0).map(task => {
                const childs = [...getTasksInProgress().filter(t => t.parentTask === task.id), ...getTasksCompleted().filter(t => t.parentTask === task.id)]
                if (childs.length > 0) {
                    return (
                        <TaskParentLine
                            key={task.id}
                            task={task}
                            onClick={(t) => openTaskLightbox(t)}
                            childs={childs}
                        />
                    )
                }

                return (
                    <TaskLine
                        key={task.id}
                        task={task}
                        onClick={() => openTaskLightbox(task)}
                    />
                )

            })}
        </ul>
    )

    useEffect(() => {
        const isCompletedTaskDisplayed = JSON.parse(localStorage.getItem('isCompletedTaskDisplayed') || 'false')
        setIsCompletedTaskDisplayed(isCompletedTaskDisplayed)
    }, [])

    return (
        <>
            <div className={"flex flex-col gap-2 items-center"}>
                <h1 className={"text-3xl"}>Tasks</h1>
                <form onSubmit={handleAddTask} className={"flex flex-row justify-center w-11/12 md:w-4/5 gap-5"}>
                    <input type="text" placeholder="Type here" className="p-3 border border-black w-full"
                           name="taskName" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                    <button className={"btn btn-outline p-3"} type="submit">Add</button>
                </form>
                <div className={"w-11/12 md:w-4/5 flex flex-col gap-2"}>
                    {inProgressTasksListComponent}

                    <div
                        className={"flex flex-col gap-2 justify-between bg-emerald-100 border-2 border-emerald-600 text-lg p-3 hover:shadow-custom-shadow hover:shadow-emerald-600 cursor-pointer"}
                        onClick={() => {
                            setIsCompletedTaskDisplayed(!isCompletedTaskDisplayed)
                            localStorage.setItem('isCompletedTaskDisplayed', JSON.stringify(!isCompletedTaskDisplayed))
                        }}
                    >
                        <span className={"font-bold flex flex-col sm:flex-row justify-between sm:items-center"}>Completed tasks <span className={"text-sm text-black font-normal"}>Click to display completed task ⬇ ⬇ ⬇</span></span>

                        {isCompletedTaskDisplayed && (
                            <div onClick={(event) => event.stopPropagation()} className={"hidden sm:block"}>
                                {completedTasksListComponent}
                            </div>
                        )}
                    </div>

                    {isCompletedTaskDisplayed && (
                        <div onClick={(event) => event.stopPropagation()} className={"sm:hidden"}>
                            {completedTasksListComponent}
                        </div>
                    )}
                </div>

            </div>
            {isTaskLightboxOpen && <TaskLightbox isVisible={isTaskLightboxOpen} task={taskInLightbox} onClose={() => setIsTaskLightboxOpen(false)} /> }

        </>
    )
}
