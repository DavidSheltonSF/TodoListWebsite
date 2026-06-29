import { TaskStats } from "./components/TaskStats";
import { getTodoStats } from "./services/getTodoStats";

export default async function Home() {

  try {
    const todoStats = await getTodoStats();
    return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
     <header className="flex flex-col w-full">
       <h1 className="text-5xl">Todo-do</h1>
       <TaskStats>
        <TaskStats.Item label="Todos" value={todoStats?.all || 0}/>
        <TaskStats.Item label="Done" value={todoStats?.done || 0} highlight/>
        <TaskStats.Item label="Remaining" value={todoStats?.remaining || 0}/>
       </TaskStats>
     </header>
      </main>
    </div>
  );
  } catch (error) {
    console.log(error);
    return null;
  }
}
