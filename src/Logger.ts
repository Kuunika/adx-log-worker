import { Logger, createLogger, format, transports } from 'winston';
import Pusher = require('pusher');
import { DotenvParseOutput } from 'dotenv';
import { Message } from './log-worker/interface';
import * as redis from 'redis';
import { RedisClient } from 'redis';

// TODO: This will go into a ADX Logger
export class PusherLogger {
  private pusher: Pusher;
  private logger: Logger;
  private channelId = 'dhis2-integration-channelId';
  private redisClient: RedisClient;

  constructor(config: DotenvParseOutput, message: Message) {
    const { channelId, service } = message;
    this.redisClient = redis.createClient(
      {
        host: process.env.LOG_REDIS_HOST,
        port: Number(process.env.LOG_REDIS_PORT)
      }
    )
    this.channelId = channelId;
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service },
      transports: [
        new transports.File({
          filename: `./logs/${this.channelId}-error.log`,
          level: 'error',
        }),
        new transports.File({
          filename: `./logs/${this.channelId}-combined.log`,
        }),
      ],
    });
    if (config.NODE_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        })
      );
    }
    this.pusher = new Pusher({
      appId: config.PUSHER_APP_ID,
      key: config.PUSHER_KEY,
      secret: config.PUSHER_SECRET,
      cluster: config.PUSHER_CLUSTER,
      encrypted: Boolean(config.PUSHER_ENCRYPTED) || true,
    });
  }

  private async redisWrite(message: string) {
    //adding a timestamp to the redis message
    this.redisClient.rpush(this.channelId, message, (err, reply) => { });
  }

  public async info(message: string): Promise<void> {
    if (message) {
      const _message = JSON.stringfy({ ...JSON.parse(message), timestamp: Date.now() });
      await this.logger.info(_message);
      await this.redisWrite(_message);
      await this.pusher.trigger(this.channelId, 'my-event', _message);
    }
  }

  public async error(message: string): Promise<void> {
    await this.logger.error(message);
  }
}
