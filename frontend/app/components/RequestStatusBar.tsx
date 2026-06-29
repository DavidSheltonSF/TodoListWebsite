import { RequestState } from "../types/RequestState";

interface Props {
  requestState: RequestState;
}

export function RequestStatusBar({requestState}: Props){
  const errorStyles = 'border-red-soft text-red bg-color-red-dark';
  const successStyles = 'border-green-soft text-green bg-color-green-dark';

  if(requestState.status === 'loading'){
    return <div className='flex justify-center items-center w-full rounded-md mt-[24px]
  py-[16px] border-gray-soft' >
    Loading...
  </div>
  }

  return  <div className={`flex justify-center items-center w-full rounded-md mt-[24px]
  py-[16px] ${requestState.status === 'error' ? errorStyles : successStyles}`}>
    {requestState.status === 'error' ? "Couldn't reach the API" : 'API reached successfuly'}
  </div>
}