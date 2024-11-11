import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { OnApplicationShutdownHandler } from './common/utils/shutdown.hook';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AppConfigService } from './modules/app-config/app-config.service';
import { PriceProvidersModule } from './modules/price-providers/price-providers.module';
import { PricesModule } from './modules/prices/prices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfig: AppConfigService) => ({
        uri: appConfig.mongodbUri,
      }),
      inject: [AppConfigService],
    }),
    ScheduleModule.forRoot(),
    PriceProvidersModule,
    PricesModule,
  ],
  controllers: [AppController],
  providers: [OnApplicationShutdownHandler],
})
export class AppModule {}
