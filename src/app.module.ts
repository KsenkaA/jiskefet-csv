import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvController } from './csv/csv.controller';

@Module({
  imports: [],
  controllers: [AppController, CsvController],
  providers: [AppService],
})
export class AppModule {}
