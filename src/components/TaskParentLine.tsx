import {useState} from "react";
import {TaskType} from "../types/Task.tsx";
import TaskLine from "./TaskLine.tsx";

export default function TaskParentLine ({ childs, task, onClick }: { childs: TaskType[], task: TaskType, onClick: (task: TaskType) => void}) {
    const [isChildsDisplayed, setIsChildsDisplayed] = useState(true)

    return (
        <>
            <TaskLine
                key={task.id}
                task={task}
                onClick={() => onClick(task)}
            />
            {childs.length > 0 && (
                <div className={"p-2 -mt-2 mb-2 border border-black border-t-0 bg-gray-200 hover:bg-gray-400 hover:text-white hover:shadow-md text-center cursor-pointer"} onClick={() => setIsChildsDisplayed(!isChildsDisplayed)}>
                    {childs.length} child{childs.length > 1 ? 's' : ''} <span className={"underline"}>click</span> to {isChildsDisplayed ? 'hide' : 'show'}
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
        </>
    )
}
