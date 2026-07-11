'use client';
import { useState } from 'react';
import { TaskStats } from './TaskStats';
import { AddIcon } from './icons/AddIcon';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';
import { Button } from './Button';
import { useTodos } from '@/hooks/useTodos';
import { RequestStatusBar } from './RequestStatusBar';

export function TodoArea() {
  const {
    todos,
    filter,
    stats,
    nextPage,
    handleCreateTodo,
    handleDelete,
    handleChangeFilter,
    handleLoadMore,
    handleToggleTodo,
    requestState,
  } = useTodos();
  const [inputText, setInputText] = useState('');

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <header className="flex flex-col w-full gap-">
        <h1 className="text-5xl">Todo-do</h1>
        <TaskStats>
          <TaskStats.Item label="Todos" value={stats?.all ?? 0} />
          <TaskStats.Item label="Done" value={stats?.done ?? 0} highlight />
          <TaskStats.Item label="Remaining" value={stats?.remaining ?? 0} />
        </TaskStats>
        <div className="border-divider"></div>
        <RequestStatusBar requestState={requestState} />
      </header>
      <div className="flex flex-col gap-[24px]">
        <TodoFilter selectedValue={filter} updateFilter={handleChangeFilter} />
        <form
          className="flex gap-[16px]"
          onSubmit={async (e: any) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const title = data.get('todoTitle');
            if (!title) return;

            handleCreateTodo(String(title));

            setInputText('');
          }}
        >
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            name="todoTitle"
            type="text"
            className="bg-color-gray-dark w-full rounded-md p-[8px] border border-[var(--color-gray)] focus:border-[var(--color-green)] transition-[border] duration-300"
          />
          <Button type="submit" className="p-[8px] bg-color-green">
            <AddIcon className="stroke-black size-[24px]" />
          </Button>
        </form>
        <TodoList
          todos={todos}
          todoFilterValue={filter}
          onDelete={handleDelete}
          onToggleCompletion={handleToggleTodo}
        />
        {nextPage > 0 && (
          <Button
            className="bg-color-green-dark text-green"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
