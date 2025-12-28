import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';
import {
  UpdateCustomerAddressRequestDto,
  UpdateCustomerRequestDto,
} from '@module/customer/account/dto/request/update-customer.request.dto';
import { UpdateCustomerResponseDto } from '@module/customer/account/dto/response/update-customer-response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { UpdateCustomerUseCase } from '@module/customer/account/use-case/update-customer.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

describe(UpdateCustomerUseCase.name, () => {
  let useCase: UpdateCustomerUseCase;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const customerCommandRepositoryGateway: jest.Mocked<CustomerCommandRepositoryGateway> =
    {
      updateCustomer: jest.fn(),
    } as unknown as jest.Mocked<CustomerCommandRepositoryGateway>;

  const customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway> =
    {
      findOneByAuthIdentityIdWithCustomerAddressRelationOrFail: jest.fn(),
    } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const customerAddressCommandRepositoryGateway: jest.Mocked<CustomerAddressCommandRepositoryGateway> =
    {
      updateCustomerAddress: jest.fn(),
    } as unknown as jest.Mocked<CustomerAddressCommandRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildDto = (): UpdateCustomerRequestDto =>
    UpdateCustomerRequestDto.build({
      name: 'João Silva Updated',
      customerAddress: UpdateCustomerAddressRequestDto.build({
        postalCode: new PostalCode('20040020'),
        stateCode: StateCodeEnum.RJ,
        city: 'Rio de Janeiro',
        neighborhood: 'Centro',
        street: 'Avenida Rio Branco',
        addressNumber: 456,
      }),
    });

  const now = new Date();

  const buildCustomerQueryResult =
    (): GetCustomerWithCustomerAddressRelationQueryResult => {
      const addressQueryResult = GetCustomerAddressQueryResult.build({
        id: new CustomerAddressId(),
        postalCode: new PostalCode('01001000'),
        stateCode: StateCodeEnum.SP,
        city: 'São Paulo',
        neighborhood: 'Sé',
        street: 'Praça da Sé',
        addressNumber: 1,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });

      return GetCustomerWithCustomerAddressRelationQueryResult.build({
        id: new CustomerId(),
        name: 'João Silva',
        profilePicture: null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        customerAddress: addressQueryResult,
      });
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateCustomerUseCase,
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: CustomerCommandRepositoryGateway,
          useValue: customerCommandRepositoryGateway,
        },
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        {
          provide: CustomerAddressCommandRepositoryGateway,
          useValue: customerAddressCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(UpdateCustomerUseCase);
    jest.clearAllMocks();
  });

  it('should successfully update customer and customer address', async () => {
    const sessionData = buildSessionData();
    const dto = buildDto();
    const customer = buildCustomerQueryResult();
    const transaction = buildTransaction();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      customer,
    );

    const updateCustomerWork: TransactionType = async () => Promise.resolve();
    customerCommandRepositoryGateway.updateCustomer.mockReturnValueOnce(
      updateCustomerWork,
    );

    const updateAddressWork: TransactionType = async () => Promise.resolve();
    customerAddressCommandRepositoryGateway.updateCustomerAddress.mockReturnValueOnce(
      updateAddressWork,
    );

    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(sessionData, dto);

    expect(result).toBeInstanceOf(UpdateCustomerResponseDto);
    expect(result.customerId).toEqual(customer.id);

    expect(
      customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail,
    ).toHaveBeenCalledWith(sessionData.authIdentityId, CustomerNotFoundError);

    expect(
      customerAddressCommandRepositoryGateway.updateCustomerAddress,
    ).toHaveBeenCalledTimes(1);
    const [addressId, addressEntity] = customerAddressCommandRepositoryGateway
      .updateCustomerAddress.mock.calls[0] as [
      CustomerAddressId,
      CustomerAddressEntity,
    ];
    expect(addressId).toBeInstanceOf(CustomerAddressId);
    expect(addressEntity).toBeInstanceOf(CustomerAddressEntity);
    expect(addressEntity.postalCode.toString()).toBe('20040020');
    expect(addressEntity.city).toBe('Rio de Janeiro');

    expect(
      customerCommandRepositoryGateway.updateCustomer,
    ).toHaveBeenCalledTimes(1);
    const [customerId, customerEntity] = customerCommandRepositoryGateway
      .updateCustomer.mock.calls[0] as [CustomerId, CustomerEntity];
    expect(customerId).toBeInstanceOf(CustomerId);
    expect(customerEntity).toBeInstanceOf(CustomerEntity);
    expect(customerEntity.name).toBe('João Silva Updated');
    expect(customerEntity.customerAddress).toBeInstanceOf(
      CustomerAddressEntity,
    );

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledWith([
      updateAddressWork,
      updateCustomerWork,
    ]);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should update customer with partial data (name and address)', async () => {
    const sessionData = buildSessionData();
    const customer = buildCustomerQueryResult();
    const transaction = buildTransaction();

    const partialDto = UpdateCustomerRequestDto.build({
      name: 'New Name Only',
      customerAddress: UpdateCustomerAddressRequestDto.build({
        city: 'São Paulo Updated',
        neighborhood: 'Centro Updated',
      }),
    });

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      customer,
    );

    const updateCustomerWork: TransactionType = async () => Promise.resolve();
    customerCommandRepositoryGateway.updateCustomer.mockReturnValueOnce(
      updateCustomerWork,
    );

    const updateAddressWork: TransactionType = async () => Promise.resolve();
    customerAddressCommandRepositoryGateway.updateCustomerAddress.mockReturnValueOnce(
      updateAddressWork,
    );

    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(sessionData, partialDto);

    expect(result).toBeInstanceOf(UpdateCustomerResponseDto);

    const [, customerEntity] = customerCommandRepositoryGateway.updateCustomer
      .mock.calls[0] as [CustomerId, CustomerEntity];
    expect(customerEntity.name).toBe('New Name Only');

    expect(customerEntity.customerAddress.city).toBe('São Paulo Updated');
    expect(customerEntity.customerAddress.neighborhood).toBe('Centro Updated');
  });

  it('should throw CustomerNotFoundError when customer is not found', async () => {
    const sessionData = buildSessionData();
    const dto = buildDto();

    const error = new CustomerNotFoundError();
    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockRejectedValueOnce(
      error,
    );

    await expect(useCase.execute(sessionData, dto)).rejects.toBe(error);

    expect(
      customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail,
    ).toHaveBeenCalledWith(sessionData.authIdentityId, CustomerNotFoundError);
    expect(
      customerAddressCommandRepositoryGateway.updateCustomerAddress,
    ).not.toHaveBeenCalled();
    expect(
      customerCommandRepositoryGateway.updateCustomer,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });
});
