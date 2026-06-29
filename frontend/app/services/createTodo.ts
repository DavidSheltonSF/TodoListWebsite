import { API_URL } from "@/config/ApiUrl";
import { Todo } from "../types/Todo";

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, 
    {
      headers: {
        "content-type": "application/json"
      },
      method: "POST", 
      body: JSON.stringify({
        title
      })
    }
  );
  const json = await response.json();

  if(!response.ok){
    throw new Error(json.title);
  }

  return json
}