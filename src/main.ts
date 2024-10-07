import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const PORT = process.env.SERVER_PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: ['*'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  });

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe({transform: true, transformOptions: { enableImplicitConversion: true }}));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SKINPORT REST API')
    .setVersion('0.0.1')
    .addTag('AUTH')
    .addBasicAuth({
      type: 'http',
      in: 'header',
      "x-tokenName": 'Authorization',
      description: 'Enter BASIC token',
      bearerFormat: 'Basic <token>'
    }, 'basic')
    .addSecurityRequirements('basic')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    customSiteTitle: 'SKINPORT REST API.',
    swaggerOptions: {
      defaultModelsExpandDepth: -1
    }
  });

  await app.listen(PORT, () => {
    logger.log(`Server started on port :${PORT}`);
    logger.log(`Swagger started on port :${PORT}/api/docs`);
  });
}
bootstrap();
