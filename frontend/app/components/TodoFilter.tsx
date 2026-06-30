import { TodoFilterValue } from "../types/TodoFilterValue"
import { TodoFilterTag } from "./TodoFilterTag"

interface Props {
  selectedValue: TodoFilterValue;
  updateFilter: (value: TodoFilterValue) => void;
}

export function TodoFilter({selectedValue, updateFilter}: Props) {
  return <div className="flex gap-[16px]">
    <TodoFilterTag  value="all" selectedValue={selectedValue} updateFilter={updateFilter}/>
    <TodoFilterTag value="done" selectedValue={selectedValue} updateFilter={updateFilter}/>
    <TodoFilterTag value="remaining" selectedValue={selectedValue} updateFilter={updateFilter}/>
  </div>
}