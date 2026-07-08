import { LoadingIcon } from './icons/LoadingIcon';

interface Props {
  todoTitle: string;
}

export function TodoItemSkeleton({ todoTitle }: Props) {
  return (
    <article className="flex items-center w-full p-[16px] border-gray-soft bg-color-gray-dark rounded-md fade-in-animation">
      <div className="flex flex-1 items-center gap-[16px]">
        <LoadingIcon className="size-[24px] animate-spin" />
        <span>{todoTitle}</span>
      </div>
    </article>
  );
}
