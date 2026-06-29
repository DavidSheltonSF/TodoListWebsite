 type ErrorRequest = {
  status: 'error',
  message: string;
}

type LoadingRequest = {
  status: 'loading';
}

type OkRequest = {
  status: 'ok';
}

export type RequestState = LoadingRequest | OkRequest | ErrorRequest;