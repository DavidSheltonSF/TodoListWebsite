import { Todo } from "../types/Todo";
import { TodoFilterValue } from "../types/TodoFilterValue";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  todoFilterValue: TodoFilterValue;
  onDelete: (id: number) => void;
  onToggleCompletion: (id: number) => void;
}

export function TodoList({todos, todoFilterValue, onDelete, onToggleCompletion}: Props){
  const renderTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggleCompletion={onToggleCompletion}/>
  });

  const emptyState = {
    all: {
      sign: "○",
      message:"Add your first task above"
    },
    done: {
      sign: "✓",
      message: "Nothing completed yet"
    },
    remaining: {
      sign: "○",
      message: "Add your first task above"
    }
  }

  return <div className="flex flex-col gap-[8px] min-h-[200px]">
    {
    todos.length > 0 
    ? renderTodos
    : <div className="flex flex-col gap-[16px] justify-center items-center size-full">
      <span className="text-muted text-5xl">{emptyState[todoFilterValue].sign}</span>
      <span className="text-muted">{emptyState[todoFilterValue].message}</span>
      </div>}
  </div>
}