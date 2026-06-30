import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggleCompletion: (id: number) => void;
}

export function TodoList({todos, onDelete, onToggleCompletion}: Props){
  const renderTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggleCompletion={onToggleCompletion}/>
  })
  return <div className="flex flex-col gap-[8px]">
    {renderTodos}
  </div>
}