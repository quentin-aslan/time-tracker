import {useEffect, useState} from "react";
import {TaskType} from "../types/Task.tsx";
import TaskLine from "./TaskLine.tsx";

export default function TaskParentLine ({ childs, task, onClick }: { childs: TaskType[], task: TaskType, onClick: (task: TaskType) => void}) {
    const [isChildsDisplayed, setIsChildsDisplayed] = useState(true)

    useEffect(() => {
        setIsChildsDisplayed(JSON.parse(localStorage.getItem(`task-${task.id}-isChildsDisplayed`) || 'true'))
    }, [])

    return (
        <article className={"hover:shadow-custom-shadow hover:-translate-y-1 hover:-translate-x-1"}>
            <TaskLine
                key={task.id}
                task={task}
                onClick={() => onClick(task)}
                isParentTask={true}
            />
            {childs.length > 0 && (
                <div
                    className={"flex flex-col gap-2 p-2 -mt-2 border border-black border-t-0 text-center cursor-pointer"}
                    onClick={() => {
                        localStorage.setItem(`task-${task.id}-isChildsDisplayed`, JSON.stringify(!isChildsDisplayed))
                        setIsChildsDisplayed(!isChildsDisplayed)
                    }}
                    >
                    <span>{childs.length} child{childs.length > 1 ? 's' : ''} <span className={"underline"}>click</span> to {isChildsDisplayed ? 'hide' : 'show'}</span>
                    {isChildsDisplayed && (
                        <div onClick={(event) => event.stopPropagation() } className={"flex flex-col gap-2"}>
                            {childs.map(child => (
                                <TaskLine
                                    key={child.id}
                                    task={child}
                                    onClick={() => onClick(child)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </article>
    )
}
