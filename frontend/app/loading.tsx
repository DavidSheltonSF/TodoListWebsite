import { LoadingIcon } from "./components/icons/LoadingIcon";

export default function Loading(){
  return <div className="absolute flex flex-col items-center gap-[24px] justify-center size-full">
   <LoadingIcon className="size-[80px] animate-spin"/>
    <h1 className="text-4xl">Loading Server...</h1>
  </div>
}