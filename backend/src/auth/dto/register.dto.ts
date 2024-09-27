import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ description: "Correo electrónico del usuario" })
  email: string;

  @ApiProperty({ description: "Contraseña del usuario" })
  password: string;

  @ApiProperty({ description: "Nombre del usuario" })
  name: string;
}
