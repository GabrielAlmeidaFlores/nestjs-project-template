import { Test, TestingModule } from '@nestjs/testing';

import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentitySessionJwtOutputModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/output/auth-identity-session-jwt.output.model';
import { ValidateAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-in.request.dto';
import { InvalidAuthIdentitySessionError } from '@module/generic/auth-identity/error/invalid-auth-identity-session.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import { ValidateAuthIdentitySignInUseCase } from './validate-auth-identity-sign-in.use-case';

describe('ValidateAuthIdentitySignInUseCase', () => {
  let useCase: ValidateAuthIdentitySignInUseCase;
  let authIdentitySessionGateway: jest.Mocked<AuthIdentitySessionGateway>;

  const authIdentityId = new AuthIdentityId();

  const mockSession = AuthIdentitySessionJwtOutputModel.build({
    authIdentityId,
    sessionId: authIdentityId,
    userLevel: UserLevelEnum.USER,
  });

  beforeEach(async () => {
    authIdentitySessionGateway = {
      createSession: jest.fn(),
      getSessionDataFromJwt: jest.fn(),
      deleteSession: jest.fn(),
      getSession: jest.fn(),
    } as unknown as jest.Mocked<AuthIdentitySessionGateway>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateAuthIdentitySignInUseCase,
        { provide: AuthIdentitySessionGateway, useValue: authIdentitySessionGateway },
      ],
    }).compile();

    useCase = module.get(ValidateAuthIdentitySignInUseCase);
  });

  describe('execute', () => {
    it('should return session data when the JWT is valid', async () => {
      authIdentitySessionGateway.getSessionDataFromJwt.mockResolvedValue(mockSession);
      const dto = ValidateAuthIdentitySignInRequestDto.build({ jwt: 'valid.jwt.token' });

      const result = await useCase.execute(dto);

      expect(result.authIdentityId).toEqual(authIdentityId);
      expect(result.userLevel).toBe(UserLevelEnum.USER);
      expect(authIdentitySessionGateway.getSessionDataFromJwt).toHaveBeenCalledWith('valid.jwt.token');
    });

    it('should throw InvalidAuthIdentitySessionError when the JWT is invalid or expired', async () => {
      authIdentitySessionGateway.getSessionDataFromJwt.mockResolvedValue(null);
      const dto = ValidateAuthIdentitySignInRequestDto.build({ jwt: 'invalid.jwt.token' });

      await expect(useCase.execute(dto)).rejects.toThrow(InvalidAuthIdentitySessionError);
    });
  });
});
