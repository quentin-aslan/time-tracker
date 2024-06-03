import React, { useContext, useEffect, useState } from "react";
import { TasksContext } from "../tasksContext.tsx";
import { formatTimeSpend } from "../utils.ts";
import { TaskType } from "../types/Task.tsx";
import {
  PauseIcon,
  PlayIcon,
  StopIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

export default function TaskLine({
  task,
  onClick,
  isParentTask,
}: {
  task: TaskType;
  onClick: (task: TaskType) => void;
  isParentTask?: boolean;
}) {
  const {
    getTimeSpendInMs,
    updateStatusTask,
    startTaskTimer,
    stopBreakTimer,
    startBreakTimer,
    deleteTask,
  } = useContext(TasksContext);

  const [localTimeSpend, setLocalTimeSpend] = useState<number>(0);
  const [localTimer, setLocalTimer] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );

  const isBreak = (task.isShortBreak || task.isLongBreak) && task.isTaskStarted;

  const startLocalTimer = () => {
    setLocalTimer(
      setInterval(() => setLocalTimeSpend(getTimeSpendInMs(task)), 1000),
    );
  };

  const onClickStatus = () => {
    clearInterval(localTimer);
    updateStatusTask(task);
    startBreakTimer(task);
  };

  const onClickDelete = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task);
    }
  };

  const startShortBreak = (event: React.MouseEvent) => {
    event.stopPropagation();

    clearInterval(localTimer);
    startBreakTimer(task, true);
  };

  const startLongBreak = (event: React.MouseEvent) => {
    event.stopPropagation();

    clearInterval(localTimer);
    startBreakTimer(task, false);
  };

  const startTask = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!task.isTaskStarted) {
      startLocalTimer();
      startTaskTimer(task);
    } else {
      startLocalTimer();
      stopBreakTimer(task);
    }
  };

  useEffect(() => {
    setLocalTimeSpend(getTimeSpendInMs(task));
    if (task.isTaskStarted && !task.isShortBreak && !task.isLongBreak)
      startLocalTimer();
  }, []);

  return (
    <>
      {/* DESKTOP */}
      <li
        className={`hidden flex-row items-center justify-between gap-1 border bg-gray-50 p-3 sm:flex ${!isParentTask ? "duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-custom-shadow" : ""} ${task.isCompleted ? (isParentTask ? "border-emerald-600" : "border-emerald-600 hover:shadow-emerald-600") : task.isShortBreak ? "border-orange-600 hover:shadow-orange-600" : "border-black"} text-lg ${task.isShortBreak ? "animate-pulse" : ""} cursor-pointer rounded text-black ${isParentTask ? "rounded-b-none" : ""}`}
        onClick={() => onClick(task)}
      >
        <span className={"w-5 pt-0.5"}>
          {task.isCompleted ? (
            <input
              className="relative h-4 w-4 cursor-pointer appearance-none rounded-none border-2 border-emerald-600 bg-emerald-600 outline-none hover:bg-white"
              type="checkbox"
              checked={task.isCompleted}
              onChange={onClickStatus}
              onClick={(event) => event.stopPropagation()}
            />
          ) : (
            <input
              className="relative h-4 w-4 cursor-pointer appearance-none rounded-none border-2 border-black bg-white outline-none hover:border-emerald-600 hover:bg-emerald-600"
              type="checkbox"
              checked={task.isCompleted}
              onChange={onClickStatus}
              onClick={(event) => event.stopPropagation()}
            />
          )}
        </span>
        <span
          className={`${task.isCompleted ? "w-2/3" : "w-1/5"} text-overflow-ellipsis overflow-hidden whitespace-nowrap`}
        >
          {task.name}
        </span>
        <span className={`w-1/5`}>{formatTimeSpend(localTimeSpend)}</span>
        <span className={"ml-auto flex flex-row items-center gap-2"}>
          {!task.isCompleted && (
            <>
              {isBreak || !task.isTaskStarted ? (
                <span
                  className={
                    "text-md flex cursor-pointer flex-row items-center gap-1 border border-emerald-600 bg-transparent p-2 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                  }
                  onClick={startTask}
                >
                  Play
                  <PlayIcon className="size-5" />
                </span>
              ) : (
                <span
                  className={
                    "text-md flex cursor-pointer flex-row items-center gap-1 border border-orange-600 bg-transparent p-2 text-orange-600 hover:bg-orange-600 hover:text-white"
                  }
                  onClick={startShortBreak}
                >
                  Pause
                  <PauseIcon className="size-5" />
                </span>
              )}
              <span
                className={
                  "text-md flex cursor-pointer flex-row items-center gap-1 border border-black bg-transparent p-2 text-black hover:bg-gray-600 hover:text-white"
                }
                onClick={startLongBreak}
              >
                Stop
                <StopIcon className="size-5" />
              </span>
            </>
          )}
          <span
            className={
              "flex cursor-pointer flex-row items-center gap-1 bg-transparent p-2 text-red-600 hover:bg-red-500 hover:text-white"
            }
            onClick={onClickDelete}
          >
            <TrashIcon className="size-6" />
          </span>
        </span>
      </li>

      {/* MOBILE */}
      <li
        className={`flex flex-col gap-2 border bg-gray-50 p-3 text-lg sm:hidden ${!isParentTask ? "duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-custom-shadow" : ""} ${task.isCompleted ? (isParentTask ? "border-emerald-600" : "border-emerald-600 hover:shadow-emerald-600") : task.isShortBreak ? "border-orange-600" : "border-black"} ${task.isShortBreak ? "animate-pulse" : ""} cursor-pointer rounded text-black ${isParentTask ? "rounded-b-none" : ""}`}
        onClick={() => onClick(task)}
      >
        <div
          className={
            "flex flex-row items-center gap-3 border-b border-gray-600 pb-2"
          }
        >
          <span className={"mt-1.5 w-5"}>
            {task.isCompleted ? (
              <input
                className="relative h-5 w-5 cursor-pointer appearance-none rounded-none border-2 border-emerald-600 bg-emerald-600 outline-none hover:bg-white"
                type="checkbox"
                checked={task.isCompleted}
                onChange={onClickStatus}
                onClick={(event) => event.stopPropagation()}
              />
            ) : (
              <input
                className="relative h-5 w-5 cursor-pointer appearance-none rounded-none border-2 border-black bg-white outline-none hover:border-emerald-600 hover:bg-emerald-600"
                type="checkbox"
                checked={task.isCompleted}
                onChange={onClickStatus}
                onClick={(event) => event.stopPropagation()}
              />
            )}
          </span>

          <span
            className={`text-overflow-ellipsis overflow-hidden whitespace-nowrap`}
          >
            {task.name}
          </span>
        </div>
        <span className={`text-left`}>{formatTimeSpend(localTimeSpend)}</span>
        <span className={"flex flex-row items-center gap-2"}>
          {!task.isCompleted && (
            <>
              {isBreak || !task.isTaskStarted ? (
                <span
                  className={
                    "hover:shadow flex cursor-pointer flex-row items-center gap-1 border border-emerald-600 bg-transparent p-2 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-emerald-600"
                  }
                  onClick={startTask}
                >
                  Play
                  <PlayIcon className="size-5" />
                </span>
              ) : (
                <span
                  className={
                    "hover:shadow flex cursor-pointer flex-row items-center gap-1 border border-orange-600 bg-transparent p-2 text-orange-600 hover:bg-orange-600 hover:text-white hover:shadow-orange-600"
                  }
                  onClick={startShortBreak}
                >
                  Pause
                  <PauseIcon className="size-5" />
                </span>
              )}
              <span
                className={
                  "flex cursor-pointer flex-row items-center gap-1 border border-black bg-transparent p-2 text-black hover:bg-gray-600 hover:text-white"
                }
                onClick={startLongBreak}
              >
                Stop
                <StopIcon className="size-5" />
              </span>
            </>
          )}
          <span
            className={
              "ml-auto cursor-pointer items-center bg-transparent p-2 text-red-600 hover:bg-red-500 hover:text-white"
            }
            onClick={onClickDelete}
          >
            <TrashIcon className="size-7" />
          </span>
        </span>
      </li>
    </>
  );
}
