'use client';
import { useEffect, useState } from "react";
import { TaskStats } from "./TaskStats";
import { RequestState } from "../types/RequestState";
import { RequestStatusBar } from "./RequestStatusBar";
import { Todo } from "../types/Todo";
import { getTodos } from "../services/getTodos";
import { deleteTodo } from "../services/deleteTodo";
import { AddIcon } from "./icons/AddIcon";
import { TodoList } from "./TodoList";

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


  async function handleDelete(id: number) {
    const copy = todos;
    try {
      setTodos((prev) => prev.filter((todo) => todo.id != id));
      await deleteTodo(id);
      setRequestState({status: 'ok'});
      return true;
    } catch(error: any) {
      console.log(error)
      setTodos(copy)
      setRequestState({status: 'error', message: error.message});
      return false;
    }
  }

  const todoDone = todos.filter((todo) => todo.isCompleted === true);
  const todoRemaining = todos.filter((todo) => todo.isCompleted === false);

 return <div className="flex flex-col gap-[24px] w-full">
      <header className="flex flex-col w-full gap-">
       <h1 className="text-5xl">Todo-do</h1>
       <TaskStats>
        <TaskStats.Item label="Todos" value={todos.length}/>
        <TaskStats.Item label="Done" value={todoDone.length}/>
        <TaskStats.Item label="Remaining" value={todoRemaining.length}/>
       </TaskStats>
       <div className="border-divider"></div>
      <RequestStatusBar requestState={requestState}/>
     </header>
     <div className="flex flex-col gap-[24px]">
      <form className="flex gap-[16px]" action="">
        <input type="text" className="bg-color-gray-dark w-full rounded-md py-[8px] border border-[var(--color-gray)] focus:border-[var(--color-green)] transition-[border] duration-300"/>
        <button className="p-[8px] bg-color-green rounded-md cursor-pointer hover:brightness-110 transition-[filter] duration-300 ">
          <AddIcon className="stroke-black size-[24px]"/>
        </button>
      </form>
     </div>
  </div>
}