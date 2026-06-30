import { API_URL } from "@/config/ApiUrl";
import { Todo } from "../types/Todo";

export async function toggleTodo(id: number): Promise<Todo>{
  const response = await fetch(`${API_URL}/todos/toggleCompletion/${id}`, {
    method: "PUT"
  });

  const json = await response.json();
  if(!response.ok){
    throw new Error(json.title);
  }

  return json;
}