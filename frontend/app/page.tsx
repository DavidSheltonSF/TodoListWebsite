import { TodoArea } from "./components/TodoArea";

export default function Home() {

  try {
    return (
    <div className="flex flex-col flex-1 items-center justify-center text-white">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
        <TodoArea/>
      </main>
    </div>
  );
  } catch (error) {
    console.log(error);
    return null;
  }
}
