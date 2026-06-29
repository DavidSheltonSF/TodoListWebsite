'use client';
import { useEffect, useState } from "react";
import { TaskStats } from "./TaskStats";
import { RequestState } from "../types/RequestState";
import { RequestStatusBar } from "./RequestStatusBar";
import { Todo } from "../types/Todo";
import { getTodos } from "../services/getTodos";

export function TodoArea() {
 const [todos, setTodos] = useState<Todo[]>([])
  const [requestState, setRequestState] = useState<RequestState>({status: 'loading'});

  useEffect(() => {
   async function loadTodos(){
     try {
      const data = await getTodos();
      setTodos(data);
      setRequestState({status: 'ok'})
    } catch (error: any) {
      console.log(error)
      setRequestState({status: 'error', message: error.message});
    }
  }
   loadTodos();
  }, []);

  const todoDone = todos.filter((todo) => todo.isCompleted === true);
  const todoRemaining = todos.filter((todo) => todo.isCompleted === false);


  return <div className="w-full">
      <header className="flex flex-col w-full gap-">
       <h1 className="text-5xl">Todo-do</h1>
       <TaskStats>
        <TaskStats.Item label="Todos" value={todos.length}/>
        <TaskStats.Item label="Done" value={todoDone.length} highlight/>
        <TaskStats.Item label="Remaining" value={todoRemaining.length}/>
       </TaskStats>
       <div className="border-divider"></div>
      <RequestStatusBar requestState={requestState}/>
     </header>
  </div>
}