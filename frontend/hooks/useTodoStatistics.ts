import { getTodoStats } from '@/app/services/getTodoStats';
import { TodoStats } from '@/app/types/TodoStats';
import { useEffect, useState } from 'react';

export function useTodoStatistics() {
  const [stats, setStats] = useState<TodoStats>({
    all: 0,
    done: 0,
    remaining: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        setStats(await getTodoStats());
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchStats();
  }, []);

  function toggleCompletionStats(currentlyCompleted: boolean) {
    setStats((prev) => {
      const done = currentlyCompleted ? prev.done - 1 : prev.done + 1;
      return {
        ...prev,
        done,
        remaining: prev.all - done,
      };
    });
  }

  function incrementTodos() {
    setStats((prev) => {
      const all = prev.all + 1;
      return { ...prev, all, remaining: all - prev.done };
    });
  }

  function decrementTodos(currentlyCompleted: boolean) {
    setStats((prev) => {
      const all = prev.all - 1;
      const done = currentlyCompleted ? prev.done - 1 : prev.done;
      return { all, done, remaining: all - prev.done };
    });
  }

  return {
    stats,
    toggleCompletionStats,
    incrementTodos,
    decrementTodos,
  };
}
