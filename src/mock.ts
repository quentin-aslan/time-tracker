export type TaskType = {
    id: number;
    name: string;
    completed: boolean;
    timeSpend: number;
    isTimerRunning: boolean;
}

export const TASKS: TaskType[] = [
    {
        id: 1,
        name: "Task 1",
        completed: false,
        timeSpend: 0,
        isTimerRunning: false
    },
    {
        id: 2,
        name: "Task 2",
        completed: true,
        timeSpend: 61,
        isTimerRunning: true
    },
    {
        id: 3,
        name: "Task 3",
        completed: false,
        timeSpend: 0,
        isTimerRunning: false
    },
    {
        id: 4,
        name: "Task 4",
        completed: false,
        timeSpend: 0,
        isTimerRunning: false
    },
    {
        id: 5,
        name: "Task 5",
        completed: false,
        timeSpend: 0,
        isTimerRunning: true
    }
]
