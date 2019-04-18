import Worker = require('tortoise');
import { DotenvParseOutput } from 'dotenv';
import { WorkerOptions } from '.';

export const consumeMessage = async (
  config: DotenvParseOutput,
  worker: Worker,
  callback: (message: string, acknowledgment: () => Promise<void>) => void
): Promise<void> => {
  const queueName = config.QUEUE_NAME || 'ADX_LOG_WORKER';
  const durable = Boolean(config.QUEUE_DURABLE) || true;
  const workerOptions: WorkerOptions = { durable };

  await worker
    .queue(queueName, workerOptions)
    .prefetch(1)
    .subscribe(callback);
};
