export interface Message {
  channelId: string;
  message: string;
}

export interface WorkerOptions {
  durable: boolean;
}
