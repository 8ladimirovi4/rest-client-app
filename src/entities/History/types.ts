import { ApiRequestState } from "shared/model/types";

export interface HistoryProps {
    history: ApiRequestState;
    handleClearHistoryItem: (id:string) => void
} 