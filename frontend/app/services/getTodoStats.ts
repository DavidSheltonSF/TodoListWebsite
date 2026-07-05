import { API_URL } from "@/config/ApiUrl";
import { TodoStats } from "../types/TodoStats";

export async function getTodoStats(): Promise<TodoStats>{
  const response = await fetch(`${API_URL}/todos/stats`);

  if(!response.ok){
    const error = await response.json();
    throw new Error(error.title);
  }

  return response.json();
}