import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import type { AuthIdentitySignUpResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-up.response.dto';

export abstract class AuthIdentityValidateCodeGateway {
  public abstract execute(
    dto: AuthIdentityForgotPasswordRequestDto,
  ): Promise<AuthIdentitySignUpResponseDto>;
}
