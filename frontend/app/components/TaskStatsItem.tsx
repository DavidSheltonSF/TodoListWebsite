interface Props {
  value: number;
  label: string;
  highlight?: boolean;
}

export function TaskStatsItem({value, label, highlight=false}: Props) {
  return <div className="flex flex-col">
    <span className={`text-3xl ${highlight &&  'text-[var(--color-green)]'}`}>{value}</span>
    <span className="text-xl text-muted">{label}</span>
  </div>
}