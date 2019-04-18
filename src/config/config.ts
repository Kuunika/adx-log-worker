import { config, DotenvParseOutput } from 'dotenv';
import { existsSync } from 'fs';
import { ConfigFileNotFound, ConfigParseError } from '.';

export const loadConfig = async (path: string): Promise<DotenvParseOutput> => {
  checkConfigFile(path);

  const { error, parsed } = await config({ path });

  handleParseError(error);
  return parsed;
};

const checkConfigFile = (path: string): void => {
  if (!existsSync(path)) {
    throw new ConfigFileNotFound();
  }
};

const handleParseError = (error: Error): void => {
  if (error) {
    throw new ConfigParseError(error.message);
  }
};
