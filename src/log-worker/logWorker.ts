import Worker = require('tortoise');
import { DotenvParseOutput } from 'dotenv';
import { createWorker, Message, consumeMessage } from '.';

const { log, error } = console;

export const logWorker = async (config: DotenvParseOutput): Promise<void> => {
  try {
    const worker: Worker = await createWorker(config);

    const processLog = async (message: string, acknowledgment: () => void) => {
      const parsedMessage: Message = JSON.parse(message);
      log('\n', parsedMessage);
      acknowledgment();
    };

    await consumeMessage(config, worker, processLog);
  } catch (e) {
    error(e.message);
    return;
  }
};
