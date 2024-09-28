import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    // Aquí puedes implementar cualquier lógica adicional si es necesario.
    return super.canActivate(context); // Verificar el token JWT
  }
}
