"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("TFM Mock API")
        .setDescription("API mockeada para la documentación de proyecto TFM")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`App is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map