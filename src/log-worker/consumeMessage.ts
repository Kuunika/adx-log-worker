import Worker = require('tortoise');
import { DotenvParseOutput } from 'dotenv';

export const consumeMessage = async (
  config: DotenvParseOutput,
  worker: Worker,
  callback: (message: string, acknowledgment: () => Promise<void>) => void
): Promise<void> => {
  const options: object = { durable: config.QUEUE_DURABLE || true };

  await worker
    .queue(config.QUEUE_NAME || 'ADX_LOG_WORKER', options)
    .prefetch(1)
    .subscribe(callback);
};
