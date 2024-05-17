import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import {useEffect, useRef} from 'react'
import {TaskType} from "../types/Task.tsx";

export default function TaskLightbox({ isVisible, onClose, task }: { isVisible: boolean, onClose: () => void, task?: TaskType }) {


    // Blur the background when the lightbox is open
    const appRoot = useRef(document.getElementById('root'))
    useEffect(() => {
        const currentAppRoot = appRoot.current;

        if (isVisible) {
            currentAppRoot?.classList.add('blur')
        } else {
            currentAppRoot?.classList.remove('blur')
        }

        // Cleanup function to remove the class when the component unmounts
        return () => {
            currentAppRoot?.classList.remove('blur')
        }
    }, [isVisible])


    // Date and Time
    const startDateTimeFormatted = () => {
        if (task && task.startDateTime) {
            const date = new Date(task.startDateTime)
            return `${date.toDateString()} ${date.toLocaleTimeString()}`

        }
        return "Not started yet"
    }

    const endDateTimeFormatted = () => {
        if (task && task.endDateTime) {
            const date = new Date(task.endDateTime)
            return `${date.toDateString()} ${date.toLocaleTimeString()}`
        }
        return "Not ended yet"
    }
    return (
        <>
            <Transition appear show={isVisible}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onClose} __demoMode>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full max-w-screen-lg bg-white border-2 border-black p-4">
                                    <DialogTitle as="h1" className="text-3xl text-black border-b-2 border-black mb-2 pb-2">
                                        {task ? task.name : "Task"}
                                    </DialogTitle>
                                    <ul className={"flex flex-col gap-2"}>
                                        <li className={"flex flex-row gap-2"}>
                                            <span className={"font-bold"}>Start Date Time:</span>
                                            <span>{startDateTimeFormatted()}</span>
                                        </li>
                                        <li className={"flex flex-row gap-2"}>
                                            <span className={"font-bold"}>End Date Time:</span>
                                            <span>{endDateTimeFormatted()}</span>
                                        </li>
                                    </ul>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button className={"p-3 border border-black hover:bg-black hover:text-white"} onClick={onClose}>Close</Button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
