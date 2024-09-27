import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";

async function bootstrap() {
  // Carga las variables de entorno desde un archivo .env
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: "*", // Cambia esto a la URL de tu frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  });

  const config = new DocumentBuilder()
    .setTitle("TFM API")
    .setDescription("API de conexión a la DB del TFM")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Usa el puerto definido en las variables de entorno o el 3000 por defecto
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0"); // Escuchar en todas las interfaces
  console.log(`App is running on: http://localhost:${port}`);
}

bootstrap();
