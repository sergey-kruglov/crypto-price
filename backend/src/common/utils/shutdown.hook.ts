import { Injectable, OnApplicationShutdown, Logger } from '@nestjs/common';

@Injectable()
export class OnApplicationShutdownHandler implements OnApplicationShutdown {
  onApplicationShutdown(signal: string) {
    Logger.warn('Shutdown signal: ' + signal); // e.g. "SIGINT"
  }
}
