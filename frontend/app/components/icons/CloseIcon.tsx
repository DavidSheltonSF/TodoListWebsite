import { Icon } from "./Icon";

interface Props {
  className?: string;
}

export function CloseIcon({className}: Props) {
  return <Icon className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </Icon>
}
