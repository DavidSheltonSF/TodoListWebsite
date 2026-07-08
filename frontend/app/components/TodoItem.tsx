import { formatDateString } from "@/lib/formatDateString";
import { Todo } from "../types/Todo"
import { CloseIcon } from "./icons/CloseIcon";
import { TodoItemSkeleton } from "./TofoItemSkeleton";

interface Props {
  onDelete: (id: number) => void;
  onToggleCompletion: (id: number) => void;
  todo: Todo;
}

export function TodoItem({todo, onDelete, onToggleCompletion}: Props){

  if(todo.status === 'pending'){
    return  <TodoItemSkeleton todo={todo}/>
  }

  return <article className="flex items-center w-full p-[16px] border-gray-soft bg-color-gray-dark rounded-md fade-in-animation">
    <div className="flex flex-1 items-center gap-[16px]">
      <input checked={todo.isCompleted} onChange={() => onToggleCompletion(todo.id)} type="checkbox" className="flex items-center justify-center appearance-none text-xl size-[24px] border-gray-soft rounded-md checked:bg-[var(--color-gray)] checked:before:content-['✓']" />
      <span>{todo.title}</span>
    </div>
   <div className="flex justify-end items-center flex-1 text-muted">
     <span>{formatDateString(todo.createdAt.toString())}</span>
   </div>
    <div className="flex justify-end items-center ml-[8px]">
      <button className="cursor-pointer hover:brightness-120"
    onClick={() => onDelete(todo.id)}>
      <CloseIcon className="size-[24px] stroke-[var(--color-gray)]"/>
    </button>
    </div>
  </article>
}