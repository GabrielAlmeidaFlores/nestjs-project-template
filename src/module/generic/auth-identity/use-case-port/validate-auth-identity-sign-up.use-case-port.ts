import type { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';

export abstract class ValidateAuthIdentitySignUpUseCasePort {
  public abstract execute(
    dto: ValidateAuthIdentitySignUpRequestDto,
  ): Promise<void>;
}
