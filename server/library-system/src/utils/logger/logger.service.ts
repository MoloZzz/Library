import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly logger: winston.Logger;

  constructor(context: string) {
    super();

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string, context?: string, meta?: any) {
    this.logger.info(message, { context, ...meta });
  }

  error(message: string, trace?: string, context?: string, meta?: any) {
    this.logger.error(message, { context, trace, ...meta });
  }

  warn(message: string, context?: string, meta?: any) {
    this.logger.warn(message, { context, ...meta });
  }

  debug(message: string, context?: string, meta?: any) {
    this.logger.debug(message, { context, ...meta });
  }

  logHttpRequest(config: any) {
    this.logger.info(`HTTP Request: ${config.method} ${config.url}`, {
      data: config.data,
    });
  }

  logHttpResponse(response: any) {
    this.logger.info(
      `HTTP Response: ${response.status}, ${response.statusText}`,
    );
  }

  logHttpError(error: any) {
    this.logger.error(`HTTP Error: ${error.message}`, {
      stack: error.stack,
      response: error.response ? { status: error.response.status } : null,
    });
  }
}
