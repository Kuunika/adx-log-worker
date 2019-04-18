export interface Message {
  channelId: string;
  message: string;
}

export interface WorkerOptions {
  durable: boolean;
}

export interface CreateWorkerOptions {
  connectRetries: number;
  connectRetryInterval: number;
}
