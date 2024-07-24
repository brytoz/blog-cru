import { Module } from '@nestjs/common';
import { Apiv1Module } from './apiv1/apiv1.module';
import { ConfigModule } from '@nestjs/config';

 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Apiv1Module,
  ],
})
export class AppModule {}