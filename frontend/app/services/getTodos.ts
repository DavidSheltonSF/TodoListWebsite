import { API_URL } from "@/config/ApiUrl";
import { Todo } from "../types/Todo";
import { TodoFilterValue } from "../types/TodoFilterValue";
import { Page } from "../types/Page";

export async function getTodos(
  page: number, 
  pageSize: number, 
  todoFilter: TodoFilterValue
): Promise<Page<Todo>>{

  const queryParams =  new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    todoFilter: todoFilter
  });
  
  const response = await fetch(`${API_URL}/todos?${queryParams.toString()}`);

  if(!response.ok){
    const error = await response.json();
    throw new Error(error.title);
  }
 
  return response.json();
}