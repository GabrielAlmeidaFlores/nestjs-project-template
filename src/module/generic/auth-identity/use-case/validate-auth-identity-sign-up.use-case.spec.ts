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

  const mockAuthIdentityId = new AuthIdentityId();

  const queryRepo: jest.Mocked<AuthIdentityQueryRepositoryGateway> = {
    findOneAuthIdentityById: jest.fn(),
    findOneAuthIdentityByEmailOrFederalDocument: jest.fn(),
    findOneAuthIdentityWithRelationsByEmailOrFederalDocument: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentityQueryRepositoryGateway>;

  const buildDto = (
    email: Email,
    federalDocument: FederalDocument,
  ): ValidateAuthIdentitySignUpRequestDto =>
    ValidateAuthIdentitySignUpRequestDto.build({
      email: email,
      federalDocument: federalDocument,
      password: 'ValidPassword123',
    });

  const createAuthIdentitySimple = (
    email: Email,
    federalDocument: FederalDocument,
  ): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: mockAuthIdentityId,
      email: email,
      federalDocument: federalDocument,
      password: new HashedPassword('MOCK_HASH'),
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

  it('should pass validation when email and federal document are available', async () => {
    const dto = buildDto(
      new Email('new@user.com'),
      new FederalDocument('12345678900'),
    );

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);

    await expect(useCase.execute(dto)).resolves.toBeUndefined();

    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.email);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.federalDocument);
  });

  it('should throw EmailAlreadyInUseError when email is already registered', async () => {
    const dto = buildDto(
      new Email('existing@user.com'),
      new FederalDocument('12345678900'),
    );
    const existingIdentity = createAuthIdentitySimple(
      dto.email,
      dto.federalDocument,
    );

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument.mockResolvedValueOnce(
      existingIdentity,
    );

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      EmailAlreadyInUseError,
    );

    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledTimes(1);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.email);
  });

  it('should throw FederalDocumentAlreadyInUseError when federal document is already registered', async () => {
    const dto = buildDto(
      new Email('new@user.com'),
      new FederalDocument('12345678900'),
    );
    const existingIdentity = createAuthIdentitySimple(
      dto.email,
      dto.federalDocument,
    );

    queryRepo.findOneAuthIdentityByEmailOrFederalDocument
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(existingIdentity);

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      FederalDocumentAlreadyInUseError,
    );

    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledTimes(2);
    expect(
      queryRepo.findOneAuthIdentityByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.federalDocument);
  });
});
