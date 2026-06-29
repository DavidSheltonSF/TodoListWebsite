import { API_URL } from "@/config/ApiUrl";

export async function deleteTodo(id: number): Promise<void>{
 const response = await fetch(`${API_URL}/todos/${id}`, {method: "DELETE"});
 if(!response.ok){
  const json = await response.json();
  throw new Error(json.title);
 }
}