import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';
import {
  CustomerSignUpRequestDto,
  CustomerAddressSignUpRequestDto,
} from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';
import { AuthIdentitySignUpResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-up.response.dto';
import { AuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-sign-up.use-case-gateway';
import { ValidateAuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/validate-auth-identity-sign-up.use-case-gateway';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

describe(CustomerSignUpUseCase.name, () => {
  let useCase: CustomerSignUpUseCase;

  const txRepo: jest.Mocked<BaseTransactionRepositoryGateway> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const customerCmdRepo: jest.Mocked<CustomerCommandRepositoryGateway> = {
    createCustomer: jest.fn(),
  } as unknown as jest.Mocked<CustomerCommandRepositoryGateway>;

  const addressCmdRepo: jest.Mocked<CustomerAddressCommandRepositoryGateway> = {
    createCustomerAddress: jest.fn(),
  } as unknown as jest.Mocked<CustomerAddressCommandRepositoryGateway>;

  const validateSignUp: jest.Mocked<ValidateAuthIdentitySignUpUseCaseGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ValidateAuthIdentitySignUpUseCaseGateway>;

  const authIdentitySignUp: jest.Mocked<AuthIdentitySignUpUseCaseGateway> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<AuthIdentitySignUpUseCaseGateway>;

  const makeDto = (): CustomerSignUpRequestDto =>
    CustomerSignUpRequestDto.build({
      name: 'Maria Silva',
      email: new Email('maria.silva@example.com'),
      phoneNumber: new PhoneNumber('5511999999999'),
      federalDocument: new FederalDocument('12345678900'),
      password: 'StrongPassword123',
      customerAddress: CustomerAddressSignUpRequestDto.build({
        city: 'São Paulo',
        neighborhood: 'Centro',
        stateCode: StateCodeEnum.SP,
        postalCode: new PostalCode('01001000'),
        addressNumber: 123,
      }),
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomerSignUpUseCase,
        { provide: BaseTransactionRepositoryGateway, useValue: txRepo },
        {
          provide: CustomerCommandRepositoryGateway,
          useValue: customerCmdRepo,
        },
        {
          provide: CustomerAddressCommandRepositoryGateway,
          useValue: addressCmdRepo,
        },
        {
          provide: ValidateAuthIdentitySignUpUseCaseGateway,
          useValue: validateSignUp,
        },
        {
          provide: AuthIdentitySignUpUseCaseGateway,
          useValue: authIdentitySignUp,
        },
      ],
    }).compile();

    useCase = module.get(CustomerSignUpUseCase);
    jest.clearAllMocks();
  });

  it('should validate, persist address and customer in a transaction, create auth identity and return response', async () => {
    const dto = makeDto();

    validateSignUp.execute.mockResolvedValueOnce();

    const addressTx: TransactionType = jest.fn().mockResolvedValue(undefined);
    const customerTx: TransactionType = jest.fn().mockResolvedValue(undefined);
    addressCmdRepo.createCustomerAddress.mockReturnValueOnce(addressTx);
    customerCmdRepo.createCustomer.mockReturnValueOnce(customerTx);

    const commit = jest.fn().mockResolvedValue(undefined);
    const rollback = jest.fn().mockResolvedValue(undefined);
    txRepo.execute.mockResolvedValueOnce(
      new TransactionOutputModel(commit, rollback),
    );

    authIdentitySignUp.execute.mockResolvedValueOnce(
      AuthIdentitySignUpResponseDto.build({
        authIdentity: new AuthIdentityId(),
      }),
    );

    const result = await useCase.execute(dto);

    expect(validateSignUp.execute).toHaveBeenCalledTimes(1);
    const [[validateArg]] = validateSignUp.execute.mock.calls as [
      [ValidateAuthIdentitySignUpRequestDto],
    ];
    expect(validateArg).toBeInstanceOf(ValidateAuthIdentitySignUpRequestDto);

    expect(addressCmdRepo.createCustomerAddress).toHaveBeenCalledTimes(1);
    const [[addressEntityArg]] = addressCmdRepo.createCustomerAddress.mock
      .calls as [[CustomerAddressEntity]];
    expect(addressEntityArg).toBeInstanceOf(CustomerAddressEntity);

    expect(customerCmdRepo.createCustomer).toHaveBeenCalledTimes(1);
    const [[customerEntityArg]] = customerCmdRepo.createCustomer.mock.calls as [
      [CustomerEntity],
    ];
    expect(customerEntityArg).toBeInstanceOf(CustomerEntity);

    expect(txRepo.execute).toHaveBeenCalledWith([addressTx, customerTx]);
    expect(commit).toHaveBeenCalledTimes(1);

    expect(authIdentitySignUp.execute).toHaveBeenCalledTimes(1);
    const [[authDtoArg]] = authIdentitySignUp.execute.mock.calls as [
      [AuthIdentitySignUpRequestDto],
    ];
    expect(authDtoArg).toBeInstanceOf(AuthIdentitySignUpRequestDto);

    expect(result).toBeInstanceOf(CustomerSignUpResponseDto);
    expect(result.customer).toBe(customerEntityArg.id);
  });

  it('should propagate validator errors and not try to persist', async () => {
    const dto = makeDto();
    const error = new Error('validation failed');
    validateSignUp.execute.mockRejectedValueOnce(error);

    await expect(useCase.execute(dto)).rejects.toBe(error);

    expect(addressCmdRepo.createCustomerAddress).not.toHaveBeenCalled();
    expect(customerCmdRepo.createCustomer).not.toHaveBeenCalled();
    expect(txRepo.execute).not.toHaveBeenCalled();
    expect(authIdentitySignUp.execute).not.toHaveBeenCalled();
  });
});
