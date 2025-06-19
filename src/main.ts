import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: `${process.env.FRONT_HOST}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(port, "0.0.0.0");
  console.log('server is listening on port: ', port)
}
bootstrap();
