# timetracking
A simple and effective time tracking application to manage tasks, track time, and analyze productivity.

## Time Tracking Application Documentation

### Overview

The time tracking application is a productivity tool that allows users to manage tasks, track time spent on each task, and analyze productivity.

### Time Tracking Logic

The time tracking logic is primarily handled in the `TaskLine` component and the `TasksContext`. Here's a high-level overview of how it works:

- **Task Creation**: A new task is initialized with a `timeSpendData` object. This object will later hold various timestamps related to the task's progress and breaks.


- **Task Start**: When a task is started for the first time, the [startTaskTimer]() function is called. This function sets the `startDateTime` to the current timestamp and marks the task as started.


- **Task Progress**: As the task progresses, the `getTimeSpend` function calculates the time spent on the task. This function takes into account whether the task is currently in a break or not.


- **Breaks**: Breaks can be started and stopped using the `startBreakTimer` and `stopBreakTimer` functions. These functions update the `startDateBreakTime`, `endDateBreakTime`, and `totalTimeBreak` fields in the timeSpendData object.


- **Task Completion**: When a task is marked as completed, the `stopBreakTimer` is called first to finalize the `totalTimeSpend` field in the timeSpendData object. Finally `startBreakTimer` is called to track the time when the task was marked as completed, in case the task status is later updated to in progress.
