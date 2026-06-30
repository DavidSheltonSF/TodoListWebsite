import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggleChecked: (id: number) => void;
}

export function TodoList({todos, onDelete, onToggleChecked}: Props){
  const renderTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggleChecked={onToggleChecked}/>
  })
  return <div className="flex flex-col gap-[8px]">
    {renderTodos}
  </div>
}