import { Test } from '@nestjs/testing';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ValidateAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-in.request.dto';
import { ValidateAuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/validate-auth-identity-sign-in.response.dto';
import { InvalidAuthIdentitySessionError } from '@module/generic/auth-identity/error/invalid-auth-identity-session.error';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentitySessionJwtWithParsedContentOutputModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/output/auth-identity-session-jwt-with-parsed-content.output.model';
import { ValidateAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/validate-auth-identity-sign-in.use-case';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

describe(ValidateAuthIdentitySignInUseCase.name, () => {
  let useCase: ValidateAuthIdentitySignInUseCase;
  let sessionGateway: jest.Mocked<AuthIdentitySessionGateway>;

  const CALL_ONCE = 1 as const;

  const buildRequestDto = (
    jwt = 'valid.jwt.token',
  ): ValidateAuthIdentitySignInRequestDto =>
    ValidateAuthIdentitySignInRequestDto.build({ jwt });

  const buildSession = (): AuthIdentitySessionJwtWithParsedContentOutputModel =>
    AuthIdentitySessionJwtWithParsedContentOutputModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  beforeEach(async () => {
    // Mock MINIMALISTA: apenas o método usado pela use-case
    sessionGateway = {
      getSessionDataFromJwt: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentitySessionGateway>;

    const moduleRef = await Test.createTestingModule({
      providers: [
        ValidateAuthIdentitySignInUseCase,
        { provide: AuthIdentitySessionGateway, useValue: sessionGateway },
      ],
    }).compile();

    useCase = moduleRef.get(ValidateAuthIdentitySignInUseCase);
    jest.clearAllMocks();
  });

  it('retorna ValidateAuthIdentitySignInResponseDto quando a sessão existe', async () => {
    const dto = buildRequestDto();
    const session = buildSession();

    sessionGateway.getSessionDataFromJwt.mockResolvedValueOnce(session);

    const result = await useCase.execute(dto);

    expect(sessionGateway.getSessionDataFromJwt).toHaveBeenCalledTimes(
      CALL_ONCE,
    );
    expect(sessionGateway.getSessionDataFromJwt).toHaveBeenCalledWith(dto.jwt);

    expect(result).toBeInstanceOf(ValidateAuthIdentitySignInResponseDto);
    expect(result.authIdentityId).toEqual(session.authIdentityId);
    expect(result.sessionId).toEqual(session.sessionId);
    expect(result.userLevel).toEqual(session.userLevel);
  });

  it('lança InvalidAuthIdentitySessionError quando a sessão é null', async () => {
    const dto = buildRequestDto('invalid.jwt');

    sessionGateway.getSessionDataFromJwt.mockResolvedValueOnce(null);

    await expect(useCase.execute(dto)).rejects.toThrow(
      InvalidAuthIdentitySessionError,
    );

    expect(sessionGateway.getSessionDataFromJwt).toHaveBeenCalledTimes(
      CALL_ONCE,
    );
    expect(sessionGateway.getSessionDataFromJwt).toHaveBeenCalledWith(dto.jwt);
  });
});
