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
import { createTodo } from "../services/createTodo";
import { toggleTodo } from "../services/toggleTodo";
import { TodoFilterValue } from "../types/TodoFilterValue";
import { TodoFilter } from "./TodoFilter";

export function TodoArea() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [requestState, setRequestState] = useState<RequestState>({status: 'loading'});
  const [filterValue, setFilterValue] = useState<TodoFilterValue>("all")

  useEffect(() => {
   async function loadTodos(){
     try {
      const data = await getTodos();
      setTodos(data);
      setRequestState({status: 'ok'})
    } catch (error: any) {
      console.log(error)
      setRequestState({status: 'error', message: `Couldn't load tasks: ${error.message}`});
    }
  }
   loadTodos();
  }, []);

  async function handleCreateTodo(e: any){
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const title = data.get('todoTitle');
      if(!title) return;
      setRequestState({status: 'loading'});
      const todo = await createTodo(title.toString());
      setTodoTitle("");
      setRequestState({status: 'ok'});
      setTodos(prev => ([...prev, todo]));
    } catch (error: any) {
     setRequestState({status: 'error', message: `Couldn't create task: ${error.message}`});
    }
    
  }

  async function handleDelete(id: number) {
    const todoCopy = todos.find((todo) => todo.id === id);
    if(!todoCopy) return;

    try {
      setTodos((prev) => prev.filter((todo) => todo.id != id));
      await deleteTodo(id);
      setRequestState({status: 'ok'});
      return true;
    } catch(error: any) {
      console.log(error)
      setTodos((prev) => ([...prev, todoCopy]))
     setRequestState({status: 'error', message: `Couldn't delete task: ${error.message}`});
      return false;
    }
  }

  async function handleToggleTodo(id: number){
    const todoCopy = todos.find((todo) => todo.id === id);
    if(!todoCopy) return;

    try {
      setTodos((prev) => prev.map((t) => (t.id === id ? {...t, isCompleted: !t.isCompleted} : t)));
      await toggleTodo(id);
      return true;
    } catch(error: any) {
      console.log(error)
      setTodos((prev) => prev.map((t) => t.id === id ? todoCopy : t))
      setRequestState({status: 'error', message: `Couldn't update task: ${error.message}`});
      return false;
    }
  }

  const todoDone = todos.filter((todo) => todo.isCompleted === true);
  const todoRemaining = todos.filter((todo) => todo.isCompleted === false);
  const todosFiltered = filterValue === 'done' ? todoDone : todoRemaining;

 return <div className="flex flex-col gap-[24px] w-full">
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
     <div className="flex flex-col gap-[24px]">
      <TodoFilter selectedValue={filterValue} updateFilter={(value) => setFilterValue(value)}/>
      <form className="flex gap-[16px]" onSubmit={handleCreateTodo}>
        <input 
        value={todoTitle} 
        onChange={(e) => setTodoTitle(e.target.value)} 
        name='todoTitle' type="text" className="bg-color-gray-dark w-full rounded-md p-[8px] border border-[var(--color-gray)] focus:border-[var(--color-green)] transition-[border] duration-300"/>
        <button type="submit" className="p-[8px] bg-color-green rounded-md cursor-pointer hover:brightness-110 transition-[filter] duration-300 ">
          <AddIcon className="stroke-black size-[24px]"/>
        </button>
      </form>
      <TodoList 
      todos={filterValue === "all" ? todos : todosFiltered} 
      todoFilterValue={filterValue}
      onDelete={handleDelete} 
      onToggleCompletion={handleToggleTodo}/>
     </div>
  </div>
}