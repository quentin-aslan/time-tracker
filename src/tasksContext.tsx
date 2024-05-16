import React, {useState, useEffect, ReactNode} from 'react';
import {TASKS} from "./mock.ts";

export type TaskType = {
    id: number;
    name: string;
    isCompleted: boolean;
    timeSpendData: {
        totalTimeSpend?: number; // (endDateTime - startDateTime) - totalTimeBreak in milliseconds
        startDateTime?: number; // Date.now() when task started
        endDateTime?: number; // Date.now() when task ended

        totalTimeBreak?: number; // (endDateBreakTime - startDateBreakTime) in milliseconds
        startDateBreakTime?: number; // Date.now() when break started
        endDateBreakTime?: number; // Date.now() when break ended
    },
    isTaskStarted?: boolean;
    isShortBreak?: boolean;
    isLongBreak?: boolean;
}

export const TasksContext = React.createContext({
    tasks: [] as TaskType[],
    // @ts-ignore
    setTasks: (tasks: TaskType[]) => {},
    getTasksCompleted: () => [] as TaskType[],
    getTasksInProgress: () => [] as TaskType[],
    // @ts-ignore
    addTask: (name: string) => {},
    // @ts-ignore
    getTimeSpend: (task: TaskType) => 0 as number,
    // @ts-ignore
    startTaskTimer: (task: TaskType) => {},
    // @ts-ignore
    startBreakTimer: (task: TaskType, shortBreak?: boolean) => {},
    // @ts-ignore
    updateStatusTask: (task: TaskType) => {},
// @ts-ignore
    stopBreakTimer: (task: TaskType) => {}
});

const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const getTasksCompleted = () => tasks.filter(task => task.isCompleted);
    const getTasksInProgress = () => tasks.filter(task => !task.isCompleted);

    const addTask = (name: string) => {
        const task: TaskType = {
            id: tasks.length + 1,
            name,
            isCompleted: false,
            timeSpendData: { },
            isTaskStarted: false,
            isShortBreak: false,
            isLongBreak: false
        }


        setTasks([...tasks, task])
    }

    const updateStatusTask = (task: TaskType) => {
        const taskIndex = tasks.findIndex(t => t.id === task.id)
        tasks[taskIndex].isCompleted = !task.isCompleted
        setTasks([...tasks])
    }

    const getTimeSpend = (task: TaskType): number => {
        if (task.isTaskStarted) {
            const startDateBreakTime = Number(task.timeSpendData?.startDateBreakTime) || 0
            const startDateTime = Number(task.timeSpendData?.startDateTime) || 0
            const totalTimeBreak = Number(task.timeSpendData?.totalTimeBreak) || 0
            const totalTimeSpend = Number(task.timeSpendData?.totalTimeSpend) || 0


            if (task.isCompleted) {
                return totalTimeSpend
            } else if (task.isShortBreak || task.isLongBreak) {
                return startDateBreakTime - startDateTime - totalTimeBreak
            } else { // If the user is working on the task
                return Date.now() - startDateTime - totalTimeBreak
            }
        }
        return 0
    }

    // This function is called only if the user start the timer for the very first time
    const startTaskTimer = (task: TaskType) => {
        if (task.isLongBreak || task.isShortBreak) {
            stopBreakTimer(task)
            return
        }

        const taskIndex = tasks.findIndex(t => t.id === task.id)
        tasks[taskIndex].isTaskStarted = true
        tasks[taskIndex].timeSpendData = { startDateTime: Date.now() }
        setTasks([...tasks])
    }

    /*
        This function is called :
        - If the user start a short or long break
        - If the user mark the task as completed
     */
    const startBreakTimer = (task: TaskType, shortBreak?: boolean) => {
        const taskIndex = tasks.findIndex(t => t.id === task.id)

        if (shortBreak) {
            // TODO: Send notification every 15 mins
            tasks[taskIndex].isShortBreak = true
        } else {
            tasks[taskIndex].isLongBreak = true
        }

        tasks[taskIndex].timeSpendData.startDateBreakTime = Date.now()
        setTasks([...tasks])
    }

    /*
        This function is called :
        - If the user stop the short or long break
        - If the user mark the task as in progress
     */
    const stopBreakTimer = (task: TaskType) => {
        const taskIndex = tasks.findIndex(t => t.id === task.id)
        tasks[taskIndex].isShortBreak = false
        tasks[taskIndex].isLongBreak = false
        tasks[taskIndex].timeSpendData.endDateBreakTime = Date.now()

        const totalTimeBreak = Number(tasks[taskIndex].timeSpendData.totalTimeBreak) || 0
        const endDateBreakTime = Number(tasks[taskIndex].timeSpendData.endDateBreakTime) || 0
        const startDateBreakTime = Number(tasks[taskIndex].timeSpendData.startDateBreakTime) || 0

        tasks[taskIndex].timeSpendData.totalTimeBreak = totalTimeBreak + (endDateBreakTime - startDateBreakTime)

        tasks[taskIndex].timeSpendData.startDateBreakTime = undefined
        tasks[taskIndex].timeSpendData.endDateBreakTime = undefined
        setTasks([...tasks])
    }

    useEffect(() => {
        setTasks(TASKS)
    }, []);

    useEffect(() => {
        console.log(tasks)
    }, [tasks]);

    return (
        <TasksContext.Provider value={{ tasks, addTask, setTasks, getTasksCompleted, getTasksInProgress, getTimeSpend, startTaskTimer, startBreakTimer, updateStatusTask, stopBreakTimer }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
