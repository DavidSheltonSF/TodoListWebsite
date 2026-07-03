import { API_URL } from "@/config/ApiUrl";
import { Todo } from "../types/Todo";

export async function getTodos(page: number, pageSize: number): Promise<Todo[]>{

  const queryParams =  new URLSearchParams({
    page: String(page) ?? '',
    pageSice: String(pageSize ) || ''
  });
  
  queryParams.set("page", String(page));

  const response = await fetch(`${API_URL}/todos?${queryParams.toString()}`);
  const json = await response.json();
  return json;
}