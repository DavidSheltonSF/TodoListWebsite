import { PropsWithChildren } from "react";
import { TaskStatsItem } from "./TaskStatsItem";


TaskStats.Item = TaskStatsItem;

export function TaskStats({children}: PropsWithChildren){
  return <div className="flex gap-[24px]">
    {children}
  </div>
}