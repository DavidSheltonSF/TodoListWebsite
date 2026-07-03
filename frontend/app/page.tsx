import { TodoArea } from "./components/TodoArea";

export default function Home() {

  try {
    return (
    <div className="flex flex-col flex-1 items-center justify-center text-white ">
      <main className="flex flex-1 w-full md:max-w-2xl flex-col items-center justify-between py-[56px] px-[24px]">
        <TodoArea/>
      </main>
    </div>
  );
  } catch (error) {
    console.log(error);
    return null;
  }
}
