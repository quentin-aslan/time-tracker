import {TaskType} from "../types/Task.tsx";
import {Database} from "../types/supabase.ts";

export const fetchedTasksToTasks = (fetchedTasks: Database['public']['Tables']['tasks']['Row'][]): TaskType[] => {
return fetchedTasks.map((task) => {
        return {
            id: task.id,
            created_at: task.created_at,
            name: task.name ?? '',
            isCompleted: task.isCompleted ?? false,
            totalTimeSpend: task.totalTimeSpend ?? 0,
            startDateTime: task.startDateTime ?? 0,
            endDateTime: task.endDateTime ?? 0,
            totalTimeBreak: task.totalTimeBreak ?? 0,
            startDateBreakTime: task.startDateBreakTime ?? 0,
            endDateBreakTime: task.endDateBreakTime ?? 0,
            isTaskStarted: task.isTaskStarted ?? false,
            isShortBreak: task.isShortBreak ?? false,
            isLongBreak: task.isLongBreak ?? false,
            parentTask: task.parentTask ?? undefined
        }
    })
}
