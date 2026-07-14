import { TodoFilterValue } from '../types/TodoFilterValue';

interface Props {
  filter: TodoFilterValue;
}

export function TodoEmpty({ filter }: Props) {
  const emptyState = {
    all: {
      sign: '○',
      message: 'Add your first task above',
    },
    done: {
      sign: '✓',
      message: 'Nothing completed yet',
    },
    remaining: {
      sign: '○',
      message: 'Add your first task above',
    },
  };
  return (
    <div className="flex flex-col items-center gap-[8px] min-h-[200px]">
      <span className="text-muted text-5xl">{emptyState[filter].sign}</span>
      <span className="text-muted">{emptyState[filter].message}</span>
    </div>
  );
}
