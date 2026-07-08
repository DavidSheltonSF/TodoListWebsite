import { formatDateString } from '@/lib/formatDateString';
import { Todo } from '../types/Todo';
import { LoadingIcon } from './icons/LoadingIcon';

interface Props {
  todo: Todo;
}

export function TodoItemSkeleton({ todo }: Props) {
  return (
    <article className="flex items-center w-full p-[16px] border-gray-soft bg-color-gray-dark rounded-md fade-in-animation">
      <div className="flex flex-1 items-center gap-[16px]">
        <LoadingIcon className="size-[24px] animate-spin" />
        <span>{todo.title}</span>
      </div>
      <div className="flex justify-end items-center flex-1 text-muted">
        <span>{formatDateString(todo.createdAt.toString())}</span>
      </div>
    </article>
  );
}
