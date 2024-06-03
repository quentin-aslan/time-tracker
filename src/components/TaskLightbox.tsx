import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useContext, useEffect, useRef } from "react";
import { TaskType } from "../types/Task.tsx";
import { TasksContext } from "../tasksContext.tsx";

export default function TaskLightbox({
  isVisible,
  onClose,
  task,
}: {
  isVisible: boolean;
  onClose: () => void;
  task?: TaskType;
}) {
  const { tasks, updateParentTask } = useContext(TasksContext);

  const onChangeParentTask = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!task) return;
    updateParentTask(task, Number(event.target.value));
  };

  // Blur the background when the lightbox is open
  const appRoot = useRef(document.getElementById("root"));
  useEffect(() => {
    const currentAppRoot = appRoot.current;

    if (isVisible) {
      currentAppRoot?.classList.add("blur");
    } else {
      currentAppRoot?.classList.remove("blur");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      currentAppRoot?.classList.remove("blur");
    };
  }, [isVisible]);

  // Date and Time
  const startDateTimeFormatted = () => {
    if (task && task.startDateTime) {
      const date = new Date(task.startDateTime);
      return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    }
    return "Not started yet";
  };

  const endDateTimeFormatted = () => {
    if (task && task.endDateTime) {
      const date = new Date(task.endDateTime);
      return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    }
    return "Not ended yet";
  };
  return (
    <>
      <Transition appear show={isVisible}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={onClose}
          __demoMode
        >
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
                <DialogPanel className="w-full max-w-screen-lg border-2 border-black bg-white p-4">
                  <DialogTitle
                    as="h1"
                    className="mb-2 border-b-2 border-black pb-2 text-3xl text-black"
                  >
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
                    <li
                      className={
                        "flex flex-col gap-2 sm:flex-row sm:items-center"
                      }
                    >
                      <span className={"font-bold"}>Parent Task:</span>
                      <span>
                        <select
                          className={"w-full border border-black p-2"}
                          value={task?.parentTask}
                          onChange={onChangeParentTask}
                        >
                          <option value={0}>None</option>
                          {tasks
                            .filter((t) => t.id != task?.id)
                            .map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                        </select>
                      </span>
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      className={
                        "border border-black p-3 hover:bg-black hover:text-white"
                      }
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
