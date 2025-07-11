import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/repository/base.transaction.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.command.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@core/domain/repository/organization/organization/organization.command.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@core/domain/repository/organization/organization-member/organization-member.command.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { StateCodeEnum } from '@core/domain/schema/entity/customer/enum/state-code.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { BankGateway } from '@infra/bank/bank.gateway';
import { CreateBankCustomerOutputModel } from '@infra/bank/model/output/create-bank-customer.output.model';
import {
  CustomerSignUpDataRequestDto,
  CustomerSignUpDataAddressRequestDto,
  CustomerSignUpRequestDto,
} from '@module/general/auth/dto/request/customer-sign-up.request.dto';
import { CustomerSignUpResponseDto } from '@module/general/auth/dto/response/customer-sign-up.response.dto';
import { CustomerEmailAlreadyInUseError } from '@module/general/auth/error/customer-email-already-in-use.error';
import { CustomerSignUpUseCase } from '@module/general/auth/use-case/customer-sign-up.use-case';

describe('CustomerSignUpUseCase', () => {
  let useCase: CustomerSignUpUseCase;

  let customerQueryRepositoryGateway: {
    findCustomerByEmail: jest.MockedFunction<
      CustomerQueryRepositoryGateway['findCustomerByEmail']
    >;
    findCustomerByEmailOrFederalDocument: jest.MockedFunction<
      CustomerQueryRepositoryGateway['findCustomerByEmailOrFederalDocument']
    >;
  };

  let customerCommandRepositoryGateway: {
    createCustomer: jest.MockedFunction<
      CustomerCommandRepositoryGateway['createCustomer']
    >;
  };

  let customerAddressCommandRepositoryGateway: {
    createCustomerAddress: jest.MockedFunction<
      CustomerAddressCommandRepositoryGateway['createCustomerAddress']
    >;
  };

  let organizationCommandRepositoryGateway: {
    createOrganization: jest.MockedFunction<
      OrganizationCommandRepositoryGateway['createOrganization']
    >;
  };

  let organizationMemberCommandRepositoryGateway: {
    createOrganizationMember: jest.MockedFunction<
      OrganizationMemberCommandRepositoryGateway['createOrganizationMember']
    >;
  };

  let baseTransactionRepositoryGateway: {
    execute: jest.MockedFunction<BaseTransactionRepositoryGateway['execute']>;
  };

  let bankGateway: {
    createCustomer: jest.MockedFunction<BankGateway['createCustomer']>;
  };

  const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn(),
  };

  const makeDto = (): CustomerSignUpRequestDto => {
    const customer = CustomerSignUpDataRequestDto.build({
      name: 'John Doe',
      email: new Email('john@example.com'),
      phoneNumber: new PhoneNumber('5511999999999'),
      federalDocument: new FederalDocument('12345678900'),
      password: 'strongPassword123',
    });

    const customerAddress = CustomerSignUpDataAddressRequestDto.build({
      city: 'São Paulo',
      neighborhood: 'Centro',
      stateCode: StateCodeEnum.SP,
      postalCode: new PostalCode('18195000'),
      addressNumber: 123,
    });

    return CustomerSignUpRequestDto.build({ customer, customerAddress });
  };

  beforeEach(async () => {
    const dummyTransactionEvent = jest.fn().mockResolvedValue(undefined);

    customerQueryRepositoryGateway = {
      findCustomerByEmail: jest.fn(),
      findCustomerByEmailOrFederalDocument: jest.fn(),
    };

    customerCommandRepositoryGateway = {
      createCustomer: jest.fn().mockReturnValue(dummyTransactionEvent),
    };

    customerAddressCommandRepositoryGateway = {
      createCustomerAddress: jest.fn().mockReturnValue(dummyTransactionEvent),
    };

    organizationCommandRepositoryGateway = {
      createOrganization: jest.fn().mockReturnValue(dummyTransactionEvent),
    };

    organizationMemberCommandRepositoryGateway = {
      createOrganizationMember: jest
        .fn()
        .mockReturnValue(dummyTransactionEvent),
    };

    baseTransactionRepositoryGateway = {
      execute: jest.fn().mockResolvedValue(mockTransaction),
    };

    bankGateway = {
      createCustomer: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        CustomerSignUpUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        {
          provide: CustomerCommandRepositoryGateway,
          useValue: customerCommandRepositoryGateway,
        },
        {
          provide: CustomerAddressCommandRepositoryGateway,
          useValue: customerAddressCommandRepositoryGateway,
        },
        {
          provide: OrganizationCommandRepositoryGateway,
          useValue: organizationCommandRepositoryGateway,
        },
        {
          provide: OrganizationMemberCommandRepositoryGateway,
          useValue: organizationMemberCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: BankGateway,
          useValue: bankGateway,
        },
      ],
    }).compile();

    useCase = module.get(CustomerSignUpUseCase);
  });

  it('should create a new customer and return response DTO', async () => {
    const dto = makeDto();

    customerQueryRepositoryGateway.findCustomerByEmail.mockResolvedValue(null);

    const bankCustomer = CreateBankCustomerOutputModel.build({
      id: 'bank-id-001',
      name: dto.customer.name,
      email: dto.customer.email,
      phoneNumber: dto.customer.phoneNumber,
      federalDocument: dto.customer.federalDocument,
    });

    bankGateway.createCustomer.mockResolvedValue(bankCustomer);

    const response = await useCase.execute(dto);

    expect(response).toBeInstanceOf(CustomerSignUpResponseDto);
    expect(response.id).toBeInstanceOf(Guid);

    expect(
      customerQueryRepositoryGateway.findCustomerByEmail,
    ).toHaveBeenCalledWith(dto.customer.email);
    expect(bankGateway.createCustomer).toHaveBeenCalled();
    expect(customerCommandRepositoryGateway.createCustomer).toHaveBeenCalled();
    expect(
      customerAddressCommandRepositoryGateway.createCustomerAddress,
    ).toHaveBeenCalled();
    expect(
      organizationCommandRepositoryGateway.createOrganization,
    ).toHaveBeenCalled();
    expect(
      organizationMemberCommandRepositoryGateway.createOrganizationMember,
    ).toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
      ]),
    );
    expect(mockTransaction.commit).toHaveBeenCalled();
  });

  it('should throw CustomerEmailAlreadyInUseError if email is taken', async () => {
    const dto = makeDto();

    const existingCustomer = new CustomerEntity({
      id: Guid.generate(),
      name: dto.customer.name,
      email: dto.customer.email,
      phoneNumber: dto.customer.phoneNumber,
      federalDocument: dto.customer.federalDocument,
      bankExternalId: 'bank-id-any',
      password: dto.customer.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    customerQueryRepositoryGateway.findCustomerByEmail.mockResolvedValue(
      existingCustomer,
    );

    await expect(useCase.execute(dto)).rejects.toThrow(
      CustomerEmailAlreadyInUseError,
    );

    expect(bankGateway.createCustomer).not.toHaveBeenCalled();
    expect(
      customerCommandRepositoryGateway.createCustomer,
    ).not.toHaveBeenCalled();
    expect(
      customerAddressCommandRepositoryGateway.createCustomerAddress,
    ).not.toHaveBeenCalled();
    expect(
      organizationCommandRepositoryGateway.createOrganization,
    ).not.toHaveBeenCalled();
    expect(
      organizationMemberCommandRepositoryGateway.createOrganizationMember,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });

  it('should call BankGateway with correct input values', async () => {
    const dto = makeDto();

    customerQueryRepositoryGateway.findCustomerByEmail.mockResolvedValue(null);

    const bankCustomer = CreateBankCustomerOutputModel.build({
      id: 'bank-id-002',
      name: dto.customer.name,
      email: dto.customer.email,
      phoneNumber: dto.customer.phoneNumber,
      federalDocument: dto.customer.federalDocument,
    });

    bankGateway.createCustomer.mockResolvedValue(bankCustomer);

    await useCase.execute(dto);

    expect(bankGateway.createCustomer).toHaveBeenCalledWith(
      expect.objectContaining({
        name: dto.customer.name,
        email: dto.customer.email,
        phoneNumber: dto.customer.phoneNumber,
        federalDocument: dto.customer.federalDocument,
      }),
    );
  });
});
