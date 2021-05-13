import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  console.log("Server is starting on port : ")
  console.log(process.env.PORT || serverConfig.port);
  await app.listen(process.env.PORT || serverConfig.port);
}
bootstrap();
