import { API_URL } from "@/config/ApiUrl";
import { Todo } from "../types/Todo";

export async function getTodos(): Promise<Todo[]>{
  const response = await fetch(`${API_URL}/todos`);
  const json = await response.json();
  return json;
}