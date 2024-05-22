import React, {useState, useEffect, ReactNode} from 'react';
import {TaskType} from "./types/Task.tsx";
import {fetchTasks as apiFetchTasks, insertTask as apiInsertTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask} from "./api";
export const TasksContext = React.createContext({
    tasks: [] as TaskType[],
    // @ts-expect-error task is used.
    setTasks: (tasks: TaskType[]) => {},
    getTasksCompleted: () => [] as TaskType[],
    getTasksInProgress: () => [] as TaskType[],
    // @ts-expect-error name is used.
    addTask: (name: string) => {},
    // @ts-expect-error task is used.
    getTimeSpendInMs: (task: TaskType) => 0 as number,
    // @ts-expect-error task is used.
    startTaskTimer: (task: TaskType) => {},
    // @ts-expect-error task and shortBreak is used.
    startBreakTimer: (task: TaskType, shortBreak?: boolean) => {},
    // @ts-expect-error task is used.
    updateStatusTask: (task: TaskType) => {},
    // @ts-expect-error task is used.
    stopBreakTimer: (task: TaskType) => {},
    // @ts-expect-error task is used.
    deleteTask: (task: TaskType) => {},
    // @ts-expect-error task is used.
    updateParentTask: (task: TaskType, parentId: number) => {}
});

const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const getTasksCompleted = () => tasks.filter(task => task.isCompleted);
    const getTasksInProgress = () => tasks.filter(task => !task.isCompleted);

    const addTask = async (name: string) => {
        try {
            const task: TaskType = {
                id: Date.now(),
                name,
                isCompleted: false,
                isTaskStarted: false,
                isShortBreak: false,
                isLongBreak: false
            }

            await apiInsertTask(task)

            setTasks([...tasks, task])
        } catch (error) {
            alert('An error occurred while adding the task')
        }
    }

    const updateTask = async (task: TaskType) => {
        try {
            const taskIndex = tasks.findIndex(t => t.id === task.id)
            await apiUpdateTask(tasks[taskIndex])
            setTasks([...tasks])
        } catch (error) {
            alert('An error occurred while updating the task')
        }
    }

    const updateParentTask = async (task: TaskType, parentId: number) => {
        try {
            const taskIndex = tasks.findIndex(t => t.id === task.id)
            tasks[taskIndex].parentTask = parentId

            updateTask(tasks[taskIndex])
        } catch (error) {
            alert('An error occurred while updating the task')
        }
    }

    const updateStatusTask = (task: TaskType) => {
        try {
            const taskIndex = tasks.findIndex(t => t.id === task.id)
            tasks[taskIndex].isCompleted = !task.isCompleted

            updateTask(tasks[taskIndex])
        } catch (error) {
            alert('An error occurred while updating the task')
        }
    }

    const getTimeSpendInMs = (task: TaskType): number => {
        if (task.isTaskStarted) {
            const startDateBreakTime = Number(task.startDateBreakTime) || 0
            const startDateTime = Number(task.startDateTime) || 0
            const totalTimeBreak = Number(task.totalTimeBreak) || 0
            const totalTimeSpend = Number(task.totalTimeSpend) || 0


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
        tasks[taskIndex].startDateTime = Date.now()

        updateTask(tasks[taskIndex])
    }

    /*
        This function is called :
        - If the user start a short or long break
        - If the user mark the task as completed
     */
    const startBreakTimer = (task: TaskType, shortBreak?: boolean) => {
        const taskIndex = tasks.findIndex(t => t.id === task.id)
        if(task.isShortBreak || task.isLongBreak) stopBreakTimer(task) // First, stop the current break to calculate the time spend during the break and start the new one

        if (shortBreak) {
            // TODO: Send notification every 15 mins
            tasks[taskIndex].isShortBreak = true
        } else {
            tasks[taskIndex].isLongBreak = true
            if(task.isShortBreak) tasks[taskIndex].isShortBreak = false
        }

        const startDateTime = Number(task.startDateTime) || 0
        const totalTimeBreak = Number(task.totalTimeBreak) || 0

        if (task.isCompleted) {
            const endDateTime = Number(Date.now()) || 0
            tasks[taskIndex].endDateTime = endDateTime
            tasks[taskIndex].totalTimeSpend = (endDateTime - startDateTime) - totalTimeBreak
        }

        tasks[taskIndex].startDateBreakTime = Date.now()
        updateTask(tasks[taskIndex])
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
        tasks[taskIndex].endDateBreakTime = Date.now()

        const totalTimeBreak = Number(tasks[taskIndex].totalTimeBreak) || 0
        const endDateBreakTime = Number(tasks[taskIndex].endDateBreakTime) || 0
        const startDateBreakTime = Number(tasks[taskIndex].startDateBreakTime) || 0

        tasks[taskIndex].totalTimeBreak = totalTimeBreak + (endDateBreakTime - startDateBreakTime)

        tasks[taskIndex].startDateBreakTime = undefined
        tasks[taskIndex].endDateBreakTime = undefined
        updateTask(tasks[taskIndex])
    }

    const deleteTask = async (task: TaskType) => {
        try {
            const taskIndex = tasks.findIndex(t => t.id === task.id)
            tasks.splice(taskIndex, 1)

            await apiDeleteTask(task)
            setTasks([...tasks])
        } catch (error) {
            alert('An error occurred while deleting the task')
        }
    }

    useEffect(() => {
        const _fetchTasks = async () => {
            const tasks = await apiFetchTasks()
            setTasks(tasks)
        }

        _fetchTasks()
    }, []);

    return (
        <TasksContext.Provider value={{
            tasks,
            addTask,
            setTasks,
            getTasksCompleted,
            getTasksInProgress,
            getTimeSpendInMs,
            startTaskTimer,
            startBreakTimer,
            updateStatusTask,
            stopBreakTimer,
            deleteTask,
            updateParentTask
        }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
