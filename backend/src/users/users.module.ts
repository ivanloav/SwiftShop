import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registro de la entidad User
  providers: [UsersService], // Proveedor de servicio de usuarios
  exports: [UsersService, TypeOrmModule], // Exportar el servicio y TypeOrmModule para otros módulos
})
export class UsersModule {}
