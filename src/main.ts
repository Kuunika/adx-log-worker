import { join } from 'path';
import { loadConfig } from './config';
import { logWorker } from './log-worker';

const { error } = console;
const logError = (err: Error) => error(err.message);

export const main = async (): Promise<void> => {
  const path = join(__dirname, '..', '.env');
  const config = await loadConfig(path).catch(logError);

  if (!config) {
    error('something went wrong with the configurations');
    process.exit(1);
  }

  if (config) {
    await logWorker(config);
  }
};
