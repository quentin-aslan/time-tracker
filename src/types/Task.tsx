export type TaskType = {
    id: number;
    created_at?: string;
    name: string;
    isCompleted: boolean;

    totalTimeSpend?: number; // (endDateTime - startDateTime) - totalTimeBreak in milliseconds
    startDateTime?: number; // Date.now() when task started
    endDateTime?: number; // Date.now() when task ended

    totalTimeBreak?: number; // (endDateBreakTime - startDateBreakTime) in milliseconds
    startDateBreakTime?: number; // Date.now() when break started
    endDateBreakTime?: number; // Date.now() when break ended

    isTaskStarted?: boolean;
    isShortBreak?: boolean;
    isLongBreak?: boolean;
    parentTask?: number;
}
