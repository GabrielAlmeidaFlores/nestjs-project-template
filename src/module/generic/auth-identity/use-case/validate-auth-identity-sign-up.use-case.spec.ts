import { Test } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { EmailAlreadyInUseError } from '@module/generic/auth-identity/error/email-already-in-use.error';
import { FederalDocumentAlreadyInUseError } from '@module/generic/auth-identity/error/federal-document-already-in-use.error';
import { ValidateAuthIdentitySignUpUseCase } from '@module/generic/auth-identity/use-case/validate-auth-identity-sign-up.use-case';

describe(ValidateAuthIdentitySignUpUseCase.name, () => {
  let useCase: ValidateAuthIdentitySignUpUseCase;

  const CALL_ONCE = 1;
  const CALL_TWICE = 2;
  const FIRST_CALL = 1;
  const SECOND_CALL = 2;

  const queryRepo: jest.Mocked<AuthIdentityQueryRepositoryGateway> = {
    findOneAuthIdentityByEmailOrFederalDocument: jest.fn(),
    findOneAuthIdentityById: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

  const buildValidDto = (): ValidateAuthIdentitySignUpRequestDto =>
    ValidateAuthIdentitySignUpRequestDto.build({
      email: new Email('new.user@example.com'),
      federalDocument: new FederalDocument('98765432100'),
      password: 'StrongPassword123',
    });

  const makeQueryResult = (): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: new AuthIdentityId(),
      email: new Email('existing@example.com'),
      federalDocument: new FederalDocument('12345678900'),
      password: new HashedPassword(
        '$2b$10$zjZfs7ZyTbnKcECIr1FjNesPiJFFBgU2BeH45LZcKNFx0PEAsddE2',
      ),
      authenticatorAppSecret: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ValidateAuthIdentitySignUpUseCase,
        { provide: AuthIdentityQueryRepositoryGateway, useValue: queryRepo },
      ],
    }).compile();

    useCase = module.get(ValidateAuthIdentitySignUpUseCase);
    jest.clearAllMocks();
  });

  it('resolves when email and federal document are free', async () => {
    const dto = buildValidDto();
    queryRepo.findOneAuthIdentityByEmailOrFederalDocument
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);

    await expect(useCase.execute(dto)).resolves.toBeUndefined();

    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledTimes(CALL_TWICE);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenNthCalledWith(FIRST_CALL, dto.email);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenNthCalledWith(SECOND_CALL, dto.federalDocument);
  });

  it('throws EmailAlreadyInUseError when email exists', async () => {
    const dto = buildValidDto();
    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      makeQueryResult(),
    );

    await expect(useCase.execute(dto)).rejects.toThrow(EmailAlreadyInUseError);

    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledTimes(CALL_ONCE);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.email);
  });

  it('throws FederalDocumentAlreadyInUseError when federal document exists', async () => {
    const dto = buildValidDto();
    queryRepo.findOneAuthIdentityByEmailOrFederalDocument
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(makeQueryResult());

    await expect(useCase.execute(dto)).rejects.toThrow(
      FederalDocumentAlreadyInUseError,
    );

    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledTimes(CALL_TWICE);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenNthCalledWith(FIRST_CALL, dto.email);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenNthCalledWith(SECOND_CALL, dto.federalDocument);
  });
});
