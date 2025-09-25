import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );

  const config = new DocumentBuilder()
    .setTitle('MESSAGING API')
    .setDescription('MESSAGING API Services.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Message', 'Messages related endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  // Serve the Swagger JSON at /swagger.json
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/swagger.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  const swaggerOptions = process.env.ENVIRONMENT_LEVEL == 'production' ? {
    swaggerOptions: {
      defaultModelsExpandDepth: -1, // Hides models
      defaultModelExpandDepth: -1, // Hides model properties
    },
    customSiteTitle: 'Welcome to the CTM CORE API', 
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .scheme-container .schemes .auth-wrapper .authorize  { display: none; }
      .swagger-ui .opblock-tag-section { display: none; }
    `,
    customJs: [
      `document.getElementById("swagger-ui").innerHTML = 
      "<h1>Welcome to CTM CORE API</h1>";`
    ]
  } : {};
  
  SwaggerModule.setup('/', app, document, swaggerOptions);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
