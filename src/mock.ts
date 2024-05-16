type TaskType = {
    id: number;
    name: string;
    isCompleted: boolean;
    timeSpendData: {
        totalTimeSpend?: number; // (endDateTime - startDateTime) - totalTimeBreak
        startDateTime?: number; // Date.now() when task started
        endDateTime?: number; // Date.now() when task ended

        totalTimeBreak?: number; // (endDateBreakTime - startDateBreakTime)
        startDateBreakTime?: number; // Date.now() when break started
        endDateBreakTime?: number; // Date.now() when break ended
    },
    isTaskStarted?: boolean;
    isShortBreak?: boolean;
    isLongBreak?: boolean;
}


export const TASKS: TaskType[] = [
    {
        id: 1,
        name: "Task 1",
        isCompleted: false,
        timeSpendData: {
            totalTimeSpend: 0,
            startDateTime: undefined,
            endDateTime: undefined,
            totalTimeBreak: 0,
            startDateBreakTime: undefined,
            endDateBreakTime: undefined
        },
        isTaskStarted: false,
        isShortBreak: false,
        isLongBreak: false
    },
    {
        id: 2,
        name: "Task 2",
        isCompleted: true,
        timeSpendData: {
            totalTimeSpend: 3600,
            startDateTime: Date.now() - 3600000,
            endDateTime: Date.now(),
            totalTimeBreak: 0,
            startDateBreakTime: undefined,
            endDateBreakTime: undefined
        },
        isTaskStarted: false,
        isShortBreak: false,
        isLongBreak: false
    },
    {
        id: 3,
        name: "Task 3",
        isCompleted: true,
        timeSpendData: {
            totalTimeSpend: 7200,
            startDateTime: Date.now() - 7200000,
            endDateTime: Date.now(),
            totalTimeBreak: 0,
            startDateBreakTime: undefined,
            endDateBreakTime: undefined
        },
        isTaskStarted: false,
        isShortBreak: false,
        isLongBreak: false
    },
    {
        id: 4,
        name: "Task 4",
        isCompleted: false,
        timeSpendData: {
            totalTimeSpend: 0,
            startDateTime: undefined,
            endDateTime: undefined,
            totalTimeBreak: 0,
            startDateBreakTime: undefined,
            endDateBreakTime: undefined
        },
        isTaskStarted: false,
        isShortBreak: false,
        isLongBreak: false
    },
    {
        id: 5,
        name: "Task 5",
        isCompleted: true,
        timeSpendData: {
            totalTimeSpend: 10800,
            startDateTime: Date.now() - 10800000,
            endDateTime: Date.now(),
            totalTimeBreak: 0,
            startDateBreakTime: undefined,
            endDateBreakTime: undefined
        },
        isTaskStarted: false,
        isShortBreak: false,
        isLongBreak: false
    }
]
