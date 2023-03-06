import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [MainModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
