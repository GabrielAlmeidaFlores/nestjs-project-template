import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { AuthIdentitySignUpResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-up.response.dto';
import { AuthIdentitySignUpUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-up.use-case';
import { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

describe(AuthIdentitySignUpUseCase.name, () => {
  let useCase: AuthIdentitySignUpUseCase;

  const validator: jest.Mocked<ValidateAuthIdentitySignUpUseCaseGateway> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<ValidateAuthIdentitySignUpUseCaseGateway>;

  const commandRepo: jest.Mocked<AuthIdentityCommandRepositoryGateway> = {
    createAuthIdentity: jest.fn(),
    updateAuthenticatorAppSecret: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentityCommandRepositoryGateway>;

  const txRepo: jest.Mocked<BaseTransactionRepositoryGateway> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const makeDto = (): AuthIdentitySignUpRequestDto =>
    AuthIdentitySignUpRequestDto.build({
      email: new Email('new.user@example.com'),
      federalDocument: new FederalDocument('12345678900'),
      password: 'ValidPassword123',
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthIdentitySignUpUseCase,
        {
          provide: ValidateAuthIdentitySignUpUseCaseGateway,
          useValue: validator,
        },
        {
          provide: AuthIdentityCommandRepositoryGateway,
          useValue: commandRepo,
        },
        { provide: BaseTransactionRepositoryGateway, useValue: txRepo },
      ],
    }).compile();

    useCase = module.get(AuthIdentitySignUpUseCase);
    jest.clearAllMocks();
  });

  it('should validate, persist within a transaction and return the created id', async () => {
    const dto = makeDto();

    validator.execute.mockResolvedValueOnce();

    const txCallback: TransactionType = jest.fn().mockResolvedValue(undefined);
    commandRepo.createAuthIdentity.mockReturnValueOnce(txCallback);

    const commit = jest.fn().mockResolvedValue(undefined);
    const rollback = jest.fn().mockResolvedValue(undefined);
    txRepo.execute.mockResolvedValueOnce(
      new TransactionOutputModel(commit, rollback),
    );

    const result = await useCase.execute(dto);

    const [[validatorArg]] = validator.execute.mock.calls as [
      [ValidateAuthIdentitySignUpRequestDto],
    ];
    expect(validatorArg).toBeInstanceOf(ValidateAuthIdentitySignUpRequestDto);

    const [[entityArg]] = commandRepo.createAuthIdentity.mock.calls as [
      [AuthIdentityEntity],
    ];
    expect(entityArg).toBeInstanceOf(AuthIdentityEntity);

    expect(txRepo.execute).toHaveBeenCalledWith(txCallback);
    expect(commit).toHaveBeenCalledTimes(1);

    expect(result).toBeInstanceOf(AuthIdentitySignUpResponseDto);
    expect(result.authIdentity).toBeInstanceOf(AuthIdentityId);
  });

  it('should propagate validator rejections', async () => {
    const dto = makeDto();
    const validationError = new Error('validation failed');
    validator.execute.mockRejectedValueOnce(validationError);

    await expect(useCase.execute(dto)).rejects.toBe(validationError);

    expect(commandRepo.createAuthIdentity).not.toHaveBeenCalled();
    expect(txRepo.execute).not.toHaveBeenCalled();
  });
});
