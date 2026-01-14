import { Inject, Injectable } from '@nestjs/common';

import { ValidateAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-in.request.dto';
import { ValidateAuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/validate-auth-identity-sign-in.response.dto';
import { InvalidAuthIdentitySessionError } from '@module/generic/auth-identity/error/invalid-auth-identity-session.error';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { ValidateAuthIdentitySignInUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-in.use-case-gateway';

@Injectable()
export class ValidateAuthIdentitySignInUseCase implements ValidateAuthIdentitySignInUseCaseGateway {
  protected readonly _type = ValidateAuthIdentitySignInUseCase.name;

  public constructor(
    @Inject(AuthIdentitySessionGateway)
    private readonly authIdentitySessionGateway: AuthIdentitySessionGateway,
  ) {}

  public async execute(
    dto: ValidateAuthIdentitySignInRequestDto,
  ): Promise<ValidateAuthIdentitySignInResponseDto> {
    const session = await this.authIdentitySessionGateway.getSessionDataFromJwt(
      dto.jwt,
    );

    if (session === null) {
      throw new InvalidAuthIdentitySessionError();
    }

    return ValidateAuthIdentitySignInResponseDto.build(session);
  }
}
