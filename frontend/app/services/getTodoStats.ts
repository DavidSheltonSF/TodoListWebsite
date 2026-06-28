import { API_URL } from "@/config/ApiUrl";
import { TodoStats } from "../types/TodoStats";

export async function getTodoStats(): Promise<TodoStats>{
  const response = await fetch(`${API_URL}/todos/stats`);
  return await response.json();
}