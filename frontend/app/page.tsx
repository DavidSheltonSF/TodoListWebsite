import { TaskStats } from "./components/TaskStats";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
     <header className="flex flex-col">
       <h1 className="text-5xl">Todo-do</h1>
       <TaskStats>
        <TaskStats.Item label="Todos" value={0}/>
        <TaskStats.Item label="Done" value={0} highlight/>
        <TaskStats.Item label="Remaining" value={0}/>
       </TaskStats>
     </header>
      </main>
    </div>
  );
}
