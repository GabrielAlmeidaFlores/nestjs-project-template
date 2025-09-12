import type { ValidateAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-in.request.dto';
import type { ValidateAuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/validate-auth-identity-sign-in.response.dto';

export abstract class ValidateAuthIdentitySignInUseCaseGateway {
  public abstract execute(
    dto: ValidateAuthIdentitySignInRequestDto,
  ): Promise<ValidateAuthIdentitySignInResponseDto>;
}
