'use client';
import { useEffect, useState } from "react";
import { TaskStats } from "./TaskStats";
import { TodoStats } from "../types/TodoStats";
import { getTodoStats } from "../services/getTodoStats";
import { RequestState } from "../types/RequestState";
import { RequestStatusBar } from "./RequestStatusBar";

export function TodoArea() {
  const [todoStats, setTodoStats] = useState<TodoStats>({all: 0, done: 0, remaining: 0});
  const [requestState, setRequestState] = useState<RequestState>({status: 'loading'});

  useEffect(() => {
   async function loadTodoStats(){
     try {
      const stats = await getTodoStats();
      setTodoStats(stats);
      setRequestState({status: 'ok'})
    } catch (error: any) {
      console.log(error)
      setRequestState({status: 'error', message: error.message});
    }
    }
   loadTodoStats();
  }, []);



  return <div className="w-full">
      <header className="flex flex-col w-full gap-">
       <h1 className="text-5xl">Todo-do</h1>
       <TaskStats>
        <TaskStats.Item label="Todos" value={todoStats?.all || 0}/>
        <TaskStats.Item label="Done" value={todoStats?.done || 0} highlight/>
        <TaskStats.Item label="Remaining" value={todoStats?.remaining || 0}/>
       </TaskStats>
       <div className="border-divider"></div>
      <RequestStatusBar requestState={requestState}/>
     </header>
  </div>
}