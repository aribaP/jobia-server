import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: '*',
      methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
      credentials: true
    });
  const port = process.env.PORT || 5000;
  app.enableCors();
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });
}
bootstrap();
