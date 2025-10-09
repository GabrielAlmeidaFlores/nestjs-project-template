import type { AuthIdentityResetPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-reset-password.request.dto';
import type { AuthIdentityResetPasswordResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-reset-password.response.dto';
export abstract class AuthIdentityResetPasswordUseCaseGateway {
  public abstract execute(
    dto: AuthIdentityResetPasswordRequestDto,
  ): Promise<AuthIdentityResetPasswordResponseDto>;
}
