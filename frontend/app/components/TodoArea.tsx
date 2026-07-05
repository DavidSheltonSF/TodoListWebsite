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
import { Button } from "./Button";
import { Page } from "../types/Page";
import { TodoStats } from "../types/TodoStats";
import { getTodoStats } from "../services/getTodoStats";

export function TodoArea() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStats, setTodoStats] = useState<TodoStats>()
  const [todoTitle, setTodoTitle] = useState("");
  const [requestState, setRequestState] = useState<RequestState>({status: 'loading'});
  const [filterValue, setFilterValue] = useState<TodoFilterValue>("all");
  const [page, setPage] = useState<Page<Todo>>({
    items: [],
    currentPage: 1,
    totalPages: 1,
    nextPage: 1
  });

  useEffect(() => {
   async function fetchData(){
     try {
      const replaceList = page?.currentPage === 1;
      const [todosPage, stats] = await Promise.all(
        [
          getTodos(page.currentPage, 10, filterValue), getTodoStats()
        ])
      const sortedTodos = todosPage.items.slice().sort((a, b) => {
      const aDate = new Date(a.createdAt)
      const bDate = new Date(b.createdAt)
      return bDate.getTime() - aDate.getTime();
    });

      setPage(todosPage);
      setTodos((prev) => replaceList ? sortedTodos : ([...prev, ...sortedTodos]));
      setTodoStats(stats);
      setRequestState({status: 'ok'})
    } catch (error: any) {
      console.log(error)
      setRequestState({status: 'error', message: `Couldn't load tasks: ${error.message}`});
    }
  }

   fetchData();

  }, [page.currentPage, filterValue]);


  function handleLoadMore(){
    setPage((prev) => ({...prev, currentPage: prev.currentPage + 1}));
  }

  function handleChangeFilter(value: TodoFilterValue){
    setFilterValue(value)
    setPage((prev) => ({...prev, currentPage: 1}));
  }

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
      setTodos(prev => ([todo, ...prev]));
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

  const sortedTodos = todos

  const doneTodos = sortedTodos.filter((todo) => todo.isCompleted);
  const remainingTodos = sortedTodos.filter((todo) => !todo.isCompleted);
  const filteredTodos = filterValue === 'done' ? doneTodos: remainingTodos

  return <div className="flex flex-col gap-[24px] w-full">
      <header className="flex flex-col w-full gap-">
       <h1 className="text-5xl">Todo-do</h1>
       <TaskStats>
        <TaskStats.Item label="Todos" value={todoStats?.all ?? 0}/>
        <TaskStats.Item label="Done" value={todoStats?.done ?? 0} highlight/>
        <TaskStats.Item label="Remaining" value={todoStats?.remaining ?? 0}/>
       </TaskStats>
       <div className="border-divider"></div>
      <RequestStatusBar requestState={requestState}/>
     </header>
     <div className="flex flex-col gap-[24px]">
      <TodoFilter selectedValue={filterValue} updateFilter={handleChangeFilter}/>
      <form className="flex gap-[16px]" onSubmit={handleCreateTodo}>
        <input 
        value={todoTitle} 
        onChange={(e) => setTodoTitle(e.target.value)} 
        name='todoTitle' type="text" className="bg-color-gray-dark w-full rounded-md p-[8px] border border-[var(--color-gray)] focus:border-[var(--color-green)] transition-[border] duration-300"/>
        <Button type="submit" className="p-[8px] bg-color-green">
          <AddIcon className="stroke-black size-[24px]"/>
        </Button>
      </form>
      <TodoList 
      todos={filterValue === 'all' ? todos : filteredTodos} 
      todoFilterValue={filterValue}
      onDelete={handleDelete} 
      onToggleCompletion={handleToggleTodo}/>
     {
      page.nextPage > 0 
      && <Button className="bg-color-green-dark text-green" onClick={handleLoadMore}>Load More</Button>
     }
     </div>
  </div>
}