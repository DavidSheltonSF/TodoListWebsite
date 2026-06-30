import { TodoFilterValue } from "../types/TodoFilterValue";

interface Props {
  value: TodoFilterValue;
  selectedValue: TodoFilterValue;
  updateFilter: (value: TodoFilterValue) => void;
}

export function TodoFilterTag({value, updateFilter, selectedValue}: Props) {

  const baseStyle = "rounded-full py-[8px] px-[16px]"
  const unSelectedStyle = "border-gray-soft cursor-pointer"
  const selectedStyle = " border-green-soft text-color-green-light"

  const isSelected = selectedValue === value;

  return <span 
    onClick={() => updateFilter(value)}
    className={`${baseStyle} ${isSelected ? selectedStyle : unSelectedStyle}`}>
    {value.toUpperCase()}
  </span>
}