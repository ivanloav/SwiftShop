import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dotenv from "dotenv";

async function bootstrap() {
  // Carga las variables de entorno desde un archivo .env
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("TFM Mock API")
    .setDescription("API mockeada para la documentación de proyecto TFM")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Usa el puerto definido en las variables de entorno o el 3000 por defecto
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App is running on: http://localhost:${port}`);
}
bootstrap();
