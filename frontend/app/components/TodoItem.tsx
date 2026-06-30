import { Todo } from "../types/Todo"
import { CloseIcon } from "./icons/CloseIcon";

interface Props {
  onDelete: (id: number) => void;
  onToggleChecked: (id: number) => void;
  todo: Todo;
}

export function TodoItem({todo, onDelete, onToggleChecked}: Props){
  return <article className="flex items-center w-full p-[16px] border-gray-soft bg-color-gray-dark rounded-md">
    <div className="flex items-center gap-[16px]">
      <input checked={todo.isCompleted} onChange={() => onToggleChecked(todo.id)} type="checkbox" className="flex items-center justify-center appearance-none text-xl size-[24px] border-gray-soft rounded-md checked:bg-[var(--color-gray)] checked:before:content-['✓']" />
      <span>{todo.title}</span>
    </div>
    <button className="ml-auto cursor-pointer hover:brightness-120"
    onClick={() => onDelete(todo.id)}>
      <CloseIcon className="size-[24px] stroke-[var(--color-gray)]"/>
    </button>
  </article>
}