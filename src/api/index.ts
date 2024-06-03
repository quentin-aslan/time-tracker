import supabase from "../supabaseClient.ts";
import { TaskType } from "../types/Task.tsx";
import { fetchedTasksToTasks } from "./tasksAdapter.ts";

export const fetchTasks = async () => {
  const { data, error } = await supabase.from("tasks").select();

  if (error) {
    console.error(error);
    throw error;
  }

  return fetchedTasksToTasks(data);
};

export const insertTask = async (task: TaskType) => {
  const { data, error } = await supabase.from("tasks").insert(task);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const updateTask = async (task: TaskType) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .match({ id: task.id });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const deleteTask = async (task: TaskType) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .match({ id: task.id });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
