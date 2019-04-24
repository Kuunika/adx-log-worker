export interface Message {
  channelId: string;
  message: string;
  service: string;
}

export interface WorkerOptions {
  durable: boolean;
}

export interface CreateWorkerOptions {
  connectRetries: number;
  connectRetryInterval: number;
}
