# Time Tracking Application

A simple and effective time tracking application to manage tasks, track time, and analyze productivity.

## Overview

The time tracking application is a productivity tool that allows users to manage tasks, track time spent on each task, and analyze productivity.

## Time Tracking Logic

The time tracking logic is primarily handled in the `TaskLine` component and the `TasksContext`. Here's a high-level overview of how it works:

- **Task Creation**: A new task is initialized with various properties related to the task's progress and breaks.

- **Task Start**: When a task is started for the first time, the `startTaskTimer` function is called. This function sets the `startDateTime` to the current timestamp and marks the task as started.

- **Task Progress**: As the task progresses, the `getTimeSpendInMs` function calculates the time spent on the task. This function takes into account whether the task is currently in a break or not.

- **Breaks**: Breaks can be started and stopped using the `startBreakTimer` and `stopBreakTimer` functions. These functions update the `startDateBreakTime`, `endDateBreakTime`, and `totalTimeBreak` properties of the task.

- **Task Completion**: When a task is marked as completed, the `stopBreakTimer` is called first to finalize the `totalTimeSpend` property of the task. Finally `startBreakTimer` is called to track the time when the task was marked as completed, in case the task status is later updated to in progress.

## Supabase Integration

The time tracking application uses Supabase for user authentication and data storage. The `useSupabase` hook provides access to the Supabase client and user session information. The `TasksContext` component uses the Supabase client to interact with the database.

### Get Data types with supabase CLI

[Supabase Documentation](https://supabase.com/docs/guides/api/rest/generating-types)

```bash
npx supabase login

npx supabase gen types typescript --project-id "XXXX" --schema public > src/types/supabase.ts
```
