import { RequestState } from '../types/RequestState';

interface Props {
  requestState: RequestState | null;
}

export function RequestStatusBar({ requestState }: Props) {
  const requestMap = {
    loading: {
      label: 'Loading...',
      styles: 'border-gray-soft',
    },
    error: {
      label: 'error',
      styles: 'border-red-soft text-red bg-color-red-dark',
    },
    ok: {
      label: 'API reached successfully',
      styles: 'border-green-soft text-green bg-color-green-dark',
    },
  };

  if (!requestState) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center w-full rounded-md mt-[24px]
  py-[16px] ${requestMap[requestState.status].styles}`}
    >
      {requestState.status === 'error'
        ? requestState.message
        : requestMap[requestState.status].label}
    </div>
  );
}
