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
  SignUpCustomerDataRequestDto,
  SignUpCustomerDataAddressRequestDto,
  SignUpRequestDto,
} from '@module/customer/auth/dto/request/sign-up.request.dto';
import { SignUpResponseDto } from '@module/customer/auth/dto/response/sign-up.response.dto';
import { CustomerEmailAlreadyInUseError } from '@module/customer/auth/error/customer-email-already-in-use.error';
import { SignUpUseCase } from '@module/customer/auth/use-case/sign-up.use-case';

describe('SignUpUseCase', () => {
  let useCase: SignUpUseCase;
  let customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway>;
  let customerCommandRepositoryGateway: jest.Mocked<CustomerCommandRepositoryGateway>;
  let customerAddressCommandRepositoryGateway: jest.Mocked<CustomerAddressCommandRepositoryGateway>;
  let organizationCommandRepositoryGateway: jest.Mocked<OrganizationCommandRepositoryGateway>;
  let organizationMemberCommandRepositoryGateway: jest.Mocked<OrganizationMemberCommandRepositoryGateway>;
  let baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway>;
  let bankGateway: {
    createCustomer: jest.MockedFunction<BankGateway['createCustomer']>;
  };

  const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn(),
  };

  const makeDto = (): SignUpRequestDto => {
    const customer = SignUpCustomerDataRequestDto.build({
      name: 'John Doe',
      email: new Email('john@example.com'),
      phoneNumber: new PhoneNumber('5511999999999'),
      federalDocument: new FederalDocument('12345678900'),
      password: 'strongPassword123',
    });

    const customerAddress = SignUpCustomerDataAddressRequestDto.build({
      city: 'São Paulo',
      neighborhood: 'Centro',
      stateCode: StateCodeEnum.SP,
      postalCode: new PostalCode('18195000'),
      addressNumber: 123,
    });

    return SignUpRequestDto.build({ customer, customerAddress });
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
        SignUpUseCase,
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

    useCase = module.get(SignUpUseCase);
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

    expect(response).toBeInstanceOf(SignUpResponseDto);
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
