import Worker = require('tortoise');
import { DotenvParseOutput } from 'dotenv';
import { CreateWorkerOptions } from '.';

export const createWorker = async (
  config: DotenvParseOutput
): Promise<Worker> => {
  const connectRetries = Number(config.QUEUE_CONNECT_RETRIES) || 2;
  const connectRetryInterval =
    Number(config.QUEUE_CONNECT_RETRY_INTERVAL) || 100;

  const createWorkerOptions: CreateWorkerOptions = {
    connectRetries,
    connectRetryInterval,
  };

  const host = config.QUEUE_HOST || 'amqp://localhost';
  const worker = await new Worker(host, createWorkerOptions);

  worker.on(Worker.EVENTS.CONNECTIONDISCONNECTED, () =>
    console.log('disconnected')
  );

  return worker;
};
