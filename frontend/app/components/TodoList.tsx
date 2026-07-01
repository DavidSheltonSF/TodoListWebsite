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
  })

  var emptyListMessage = "Add your first task above";

  switch(todoFilterValue) {
    case 'done':
      emptyListMessage = "Nothing completed yet";
      break;

    case 'remaining':
      emptyListMessage = "All caught up!";
      break;

  }

  return <div className="flex flex-col gap-[8px] min-h-[200px]">
    {
    todos.length > 0 
    ? renderTodos
    : <div className="flex justify-center items-center size-full">
      <span className="text-muted">{emptyListMessage}</span>
      </div>}
  </div>
}