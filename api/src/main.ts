import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para aceitar requisições de qualquer origem
  app.enableCors({
    origin: '*', // ou coloque seu domínio específico, ex: 'http://localhost:3000'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Definir a porta padrão (pode alterar conforme necessidade)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Nest application is running on: http://localhost:${port}`);
}

bootstrap();
