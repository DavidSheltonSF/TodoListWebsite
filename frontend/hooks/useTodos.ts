import { createTodo } from '@/app/services/createTodo';
import { deleteTodo } from '@/app/services/deleteTodo';
import { getTodos } from '@/app/services/getTodos';
import { getTodoStats } from '@/app/services/getTodoStats';
import { toggleTodo } from '@/app/services/toggleTodo';
import { RequestState } from '@/app/types/RequestState';
import { Todo } from '@/app/types/Todo';
import { TodoFilterValue } from '@/app/types/TodoFilterValue';
import { TodoStats } from '@/app/types/TodoStats';
import { formatDateString } from '@/lib/formatDateString';
import { generateTempId } from '@/lib/generateTempId';
import { useEffect, useState } from 'react';
import { useTodoStatistics } from './useTodoStatistics';

export function useTodos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilterValue>('all');
  const { stats, incrementTodos, decrementTodos, toggleCompletionStats } =
    useTodoStatistics();
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setRequestState({ status: 'loading' });
        const todosResponse = await getTodos(currentPage, 10, filter);

        const replace = currentPage === 1;

        setCurrentPage(todosResponse.currentPage);
        setNextPage(todosResponse.nextPage);
        setTodos((prev) =>
          replace ? todosResponse.items : [...prev, ...todosResponse.items]
        );

        setRequestState({ status: 'ok' });
      } catch (error: any) {
        console.log(error);
        setRequestState({ status: 'error', message: error.message });
      }
    }

    fetchTodos();
  }, [currentPage, filter]);

  function sortTodos() {
    setTodos((prev) =>
      prev.toSorted((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);

        return bDate.getTime() - aDate.getTime();
      })
    );
  }

  function handleLoadMore() {
    setCurrentPage((prev) => prev + 1);
  }

  async function handleCreateTodo(title: string) {
    const pendingTodo: Todo = {
      id: generateTempId(),
      title,
      isCompleted: false,
      createdAt: formatDateString(new Date().toString()),
      status: 'pending',
    };
    try {
      setTodos((prev) => [pendingTodo, ...prev]);
      incrementTodos();
      setRequestState({ status: 'loading' });
      const todo = await createTodo(title);
      setTodos((prev) => prev.map((t) => (t.id === pendingTodo.id ? todo : t)));
      sortTodos();
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      setTodos((prev) => prev.filter((t) => t.id !== pendingTodo.id));
      decrementTodos(false);
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  async function handleDelete(id: number) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      setRequestState({ status: 'loading' });
      setTodos((prev) => prev.filter((t) => t.id !== id));
      await deleteTodo(id);
      setRequestState({ status: 'ok' });

      decrementTodos(todo.isCompleted);
    } catch (error: any) {
      setTodos((prev) => [...prev, todo]);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  async function handleToggleTodo(id: number) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      setRequestState({ status: 'loading' });
      const updatedTodo = { ...todo };
      updatedTodo.isCompleted = !todo.isCompleted;
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));

      toggleCompletionStats(todo.isCompleted);
      await toggleTodo(id);
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
      setRequestState({ status: 'error', message: error.message });
    }
  }

  async function handleChangeFilter(value: TodoFilterValue) {
    setFilter(value);
    setCurrentPage(1);
  }

  function filterTodos() {
    if (filter === 'all') {
      return todos;
    }

    return todos.filter((todo) =>
      filter === 'done' ? todo.isCompleted : !todo.isCompleted
    );
  }

  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'done'
        ? todos.filter((t) => t.isCompleted)
        : todos.filter((t) => !t.isCompleted);

  return {
    todos: filteredTodos,
    stats,
    currentPage,
    nextPage,
    filter,
    requestState,
    handleCreateTodo,
    handleDelete,
    handleChangeFilter,
    handleLoadMore,
    handleToggleTodo,
  };
}
