import { Test, type TestingModule } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id.value-object';
import { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';
import {
  CustomerAddressSignUpRequestDto,
  CustomerSignUpRequestDto,
} from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { CustomerEmailAlreadyInUseError } from '@module/customer/account/error/customer-email-already-in-use.error';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';

const createMockRepository = () => ({
  findCustomerByEmail: jest.fn(),
  findCustomerByEmailOrFederalDocument: jest.fn(),

  createCustomer: jest.fn(),
  createCustomerAddress: jest.fn(),
  createOrganization: jest.fn(),
  createOrganizationMember: jest.fn(),

  execute: jest.fn(),
});

describe('CustomerSignUpUseCase', () => {
  let useCase: CustomerSignUpUseCase;

  let mockCustomerQueryRepository: jest.Mocked<CustomerQueryRepositoryGateway>;
  let mockCustomerCommandRepository: jest.Mocked<CustomerCommandRepositoryGateway>;
  let mockCustomerAddressCommandRepository: jest.Mocked<CustomerAddressCommandRepositoryGateway>;
  let mockOrganizationCommandRepository: jest.Mocked<OrganizationCommandRepositoryGateway>;
  let mockOrganizationMemberCommandRepository: jest.Mocked<OrganizationMemberCommandRepositoryGateway>;
  let mockBaseTransactionRepository: jest.Mocked<BaseTransactionRepositoryGateway>;

  const createSignUpDto = (): CustomerSignUpRequestDto =>
    CustomerSignUpRequestDto.build({
      name: 'John Doe',
      email: new Email('john.doe@example.com'),
      federalDocument: new FederalDocument('21702426090'),
      phoneNumber: new PhoneNumber('5511987654321'),
      password: 'strongPassword123',
      customerAddress: CustomerAddressSignUpRequestDto.build({
        postalCode: new PostalCode('12345678'),
        stateCode: StateCodeEnum.SP,
        city: 'Test City',
        neighborhood: 'Test Neighborhood',
        addressNumber: 123,
      }),
    });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerSignUpUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: createMockRepository(),
        },
        {
          provide: CustomerCommandRepositoryGateway,
          useValue: createMockRepository(),
        },
        {
          provide: CustomerAddressCommandRepositoryGateway,
          useValue: createMockRepository(),
        },
        {
          provide: OrganizationCommandRepositoryGateway,
          useValue: createMockRepository(),
        },
        {
          provide: OrganizationMemberCommandRepositoryGateway,
          useValue: createMockRepository(),
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    useCase = module.get(CustomerSignUpUseCase);

    mockCustomerQueryRepository = module.get(CustomerQueryRepositoryGateway);
    mockCustomerCommandRepository = module.get(
      CustomerCommandRepositoryGateway,
    );
    mockCustomerAddressCommandRepository = module.get(
      CustomerAddressCommandRepositoryGateway,
    );
    mockOrganizationCommandRepository = module.get(
      OrganizationCommandRepositoryGateway,
    );
    mockOrganizationMemberCommandRepository = module.get(
      OrganizationMemberCommandRepositoryGateway,
    );
    mockBaseTransactionRepository = module.get(
      BaseTransactionRepositoryGateway,
    );

    const dummyTransactionEvent = jest.fn().mockResolvedValue(undefined);
    mockCustomerCommandRepository.createCustomer.mockReturnValue(
      dummyTransactionEvent,
    );
    mockCustomerAddressCommandRepository.createCustomerAddress.mockReturnValue(
      dummyTransactionEvent,
    );
    mockOrganizationCommandRepository.createOrganization.mockReturnValue(
      dummyTransactionEvent,
    );
    mockOrganizationMemberCommandRepository.createOrganizationMember.mockReturnValue(
      dummyTransactionEvent,
    );

    jest.clearAllMocks();
  });

  it('should sign up a new customer successfully', async () => {
    const dto = createSignUpDto();
    mockCustomerQueryRepository.findCustomerByEmail.mockResolvedValue(null);

    const mockCommit = jest.fn().mockResolvedValue(undefined);
    const mockRollback = jest.fn().mockResolvedValue(undefined);
    const mockTransaction = new TransactionOutputModel(
      mockCommit,
      mockRollback,
    );

    mockBaseTransactionRepository.execute.mockResolvedValue(mockTransaction);

    const result = await useCase.execute(dto);

    expect(
      mockCustomerQueryRepository.findCustomerByEmail,
    ).toHaveBeenCalledWith(dto.email);
    expect(mockBaseTransactionRepository.execute).toHaveBeenCalledTimes(1);
    expect(mockCommit).toHaveBeenCalledTimes(1);
    expect(mockRollback).not.toHaveBeenCalled();
    expect(result).toBeInstanceOf(CustomerSignUpResponseDto);
    expect(result.id).toBeDefined();
  });

  it('should throw CustomerEmailAlreadyInUseError if the email already exists', async () => {
    const dto = createSignUpDto();

    const existingCustomer = GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Jane Doe',
      email: dto.email,
      federalDocument: new FederalDocument('97156839024'),
      phoneNumber: new PhoneNumber('5511912345678'),
      password: new Hash('hashedpassword'),
      profilePicture: null,
      mfaSecret: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    mockCustomerQueryRepository.findCustomerByEmail.mockResolvedValue(
      existingCustomer,
    );

    await expect(useCase.execute(dto)).rejects.toThrow(
      CustomerEmailAlreadyInUseError,
    );

    expect(mockBaseTransactionRepository.execute).not.toHaveBeenCalled();
  });
});
