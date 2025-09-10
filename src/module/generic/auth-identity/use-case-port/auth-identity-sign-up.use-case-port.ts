import type { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import type { AuthIdentitySignUpResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-up.response.dto';

export abstract class AuthIdentitySignUpUseCasePort {
  public abstract execute(
    dto: AuthIdentitySignUpRequestDto,
  ): Promise<AuthIdentitySignUpResponseDto>;
}
