export interface ChatSession {
  id: string;
  title: string;
  createAt: number;
}

export type onSend = (message: string) => void;
