import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import { AuthIdentityForgotPasswordResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-forgot-password.response.dto';
export abstract class AuthIdentityForgotPasswordUseCaseGateway {
  public abstract execute(
    dto: AuthIdentityForgotPasswordRequestDto,
  ): Promise<AuthIdentityForgotPasswordResponseDto>;
}
