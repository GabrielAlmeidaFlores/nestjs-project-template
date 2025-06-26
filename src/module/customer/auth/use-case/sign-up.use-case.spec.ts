import { Test } from '@nestjs/testing';

import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.command.repository.gateway';
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
  let customerQueryRepository: jest.Mocked<CustomerQueryRepositoryGateway>;
  let customerCommandRepository: jest.Mocked<CustomerCommandRepositoryGateway>;
  let addressCommandRepository: jest.Mocked<CustomerAddressCommandRepositoryGateway>;
  let bankGateway: {
    createCustomer: jest.MockedFunction<BankGateway['createCustomer']>;
    createBankPaymentPlan: jest.MockedFunction<
      BankGateway['createBankPaymentPlan']
    >;
    createCharge: jest.MockedFunction<BankGateway['createCharge']>;
    payCharge: jest.MockedFunction<BankGateway['payCharge']>;
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
    customerQueryRepository = {
      findCustomerByEmail: jest.fn(),
    };

    customerCommandRepository = {
      createCustomer: jest.fn(),
    };

    addressCommandRepository = {
      createCustomerAddress: jest.fn(),
    };

    bankGateway = {
      createCustomer: jest.fn(),
      createBankPaymentPlan: jest.fn(),
      createCharge: jest.fn(),
      payCharge: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepository,
        },
        {
          provide: CustomerCommandRepositoryGateway,
          useValue: customerCommandRepository,
        },
        {
          provide: CustomerAddressCommandRepositoryGateway,
          useValue: addressCommandRepository,
        },
        { provide: BankGateway, useValue: bankGateway },
      ],
    }).compile();

    useCase = module.get(SignUpUseCase);
  });

  it('should create a new customer and return response DTO', async () => {
    const dto = makeDto();

    customerQueryRepository.findCustomerByEmail.mockResolvedValue(null);

    const bankCustomer = new CreateBankCustomerOutputModel({
      id: 'bank-id-001',
      name: dto.customer.name,
      email: dto.customer.email,
      phoneNumber: dto.customer.phoneNumber,
      federalDocument: dto.customer.federalDocument,
    });

    bankGateway.createCustomer.mockResolvedValue(bankCustomer);
    customerCommandRepository.createCustomer.mockResolvedValue(undefined);
    addressCommandRepository.createCustomerAddress.mockResolvedValue(undefined);

    const response = await useCase.execute(dto);

    expect(response).toBeInstanceOf(SignUpResponseDto);
    expect(response.id).toBeInstanceOf(Guid);

    expect(customerQueryRepository.findCustomerByEmail).toHaveBeenCalledWith(
      dto.customer.email,
    );
    expect(bankGateway.createCustomer).toHaveBeenCalled();
    expect(customerCommandRepository.createCustomer).toHaveBeenCalled();
    expect(addressCommandRepository.createCustomerAddress).toHaveBeenCalled();
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

    customerQueryRepository.findCustomerByEmail.mockResolvedValue(
      existingCustomer,
    );

    await expect(useCase.execute(dto)).rejects.toThrow(
      CustomerEmailAlreadyInUseError,
    );

    expect(bankGateway.createCustomer).not.toHaveBeenCalled();
    expect(customerCommandRepository.createCustomer).not.toHaveBeenCalled();
    expect(
      addressCommandRepository.createCustomerAddress,
    ).not.toHaveBeenCalled();
  });

  it('should call BankGateway with correct input values', async () => {
    const dto = makeDto();
    customerQueryRepository.findCustomerByEmail.mockResolvedValue(null);

    const bankCustomer = new CreateBankCustomerOutputModel({
      id: 'bank-id-002',
      name: dto.customer.name,
      email: dto.customer.email,
      phoneNumber: dto.customer.phoneNumber,
      federalDocument: dto.customer.federalDocument,
    });

    bankGateway.createCustomer.mockResolvedValue(bankCustomer);
    customerCommandRepository.createCustomer.mockResolvedValue(undefined);
    addressCommandRepository.createCustomerAddress.mockResolvedValue(undefined);

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
