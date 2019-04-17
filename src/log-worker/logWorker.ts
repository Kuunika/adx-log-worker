import Worker = require('tortoise');
import { DotenvParseOutput } from 'dotenv';

import { createWorker, Message, consumeMessage } from '.';

const { log, error } = console;

export const logWorker = async (config: DotenvParseOutput): Promise<void> => {
  const worker: Worker = await createWorker(config).catch(e => error(e));

  const processLog = async (message: string, acknowledgment: () => void) => {
    try {
      const parsedMessage: Message = JSON.parse(message);
      log('\n', parsedMessage);
    } catch (err) {
      error(err.message);
    }
    acknowledgment();
  };
  await consumeMessage(config, worker, processLog);
};
