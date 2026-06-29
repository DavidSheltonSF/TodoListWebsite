import { Icon } from "./Icon";

interface Props {
  className?: string;
}

export function AddIcon({className}: Props) {
  return <Icon className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </Icon>
}