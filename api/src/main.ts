import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS liberado
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Config do Swagger
  const config = new DocumentBuilder()
    .setTitle('RecyTech API')
    .setDescription('Documentação da API do RecyTech')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Porta
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Nest application is running on: http://localhost:${port}`);
  console.log(`Swagger está rodando em: http://localhost:${port}/api`);
}

bootstrap();
