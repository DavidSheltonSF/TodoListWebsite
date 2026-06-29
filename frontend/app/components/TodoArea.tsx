'use client';
import { useEffect, useState } from "react";
import { TaskStats } from "./TaskStats";
import { TodoStats } from "../types/TodoStats";
import { getTodoStats } from "../services/getTodoStats";

export function TodoArea() {
  const [todoStats, setTodoStats] = useState<TodoStats>({all: 0, done: 0, remaining: 0});
  const [error, setError] = useState<Error>();

  useEffect(() => {
   async function loadTodoStats(){
     try {
      const stats = await getTodoStats();
      setTodoStats(stats);
    } catch (error: any) {
      setError(error);
    }
   }

   loadTodoStats();
  }, []);

  return <div className="w-full">
      <header className="flex flex-col w-full">
       <h1 className="text-5xl">Todo-do</h1>
       <TaskStats>
        <TaskStats.Item label="Todos" value={todoStats?.all || 0}/>
        <TaskStats.Item label="Done" value={todoStats?.done || 0} highlight/>
        <TaskStats.Item label="Remaining" value={todoStats?.remaining || 0}/>
       </TaskStats>
       <div className="border-divider"></div>
     </header>
  </div>
}