import { HeadersType, QueryParam } from "features/RestfulClient/types";


export type ResCompleteCallback<T = unknown> = (res: ApiResponse<T>) => void;
export type CatchCompleteCallback = (error: Error) => void;
export type FinallyCompleteCallback = () => void;

export type ApiResponse<T = unknown> = {
    status:  string;
    statusText?: string;
    headers?: Record<string, string>;
    data: T;
  };

  export type ApiRequestType<T = unknown> = {
    resComplite: ResCompleteCallback<T>;
    catchComplite: CatchCompleteCallback;
    finnalyComplite: FinallyCompleteCallback;
    browserUrl: string;
    method: string;
    query?: QueryParam[];
    body?: string | null;
    headers?: HeadersType[];
  }