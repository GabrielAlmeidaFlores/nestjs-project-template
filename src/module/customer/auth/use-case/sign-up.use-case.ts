import { Injectable } from '@nestjs/common';

import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.command.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { CustomerAddressEntity } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity';
import { BankGateway } from '@infra/bank/bank.gateway';
import { CreateBankCustomerInputModel } from '@infra/bank/model/input/create-bank-customer.input.model';
import { CreateBankCustomerOutputModel } from '@infra/bank/model/output/create-bank-customer.output.model';
import {
  SignUpCustomerDataRequestDto,
  SignUpRequestDto,
} from '@module/customer/auth/dto/request/sign-up.request.dto';
import { SignUpResponseDto } from '@module/customer/auth/dto/response/sign-up.response.dto';
import { CustomerEmailAlreadyInUseError } from '@module/customer/auth/error/customer-email-already-in-use.error';

@Injectable()
export class SignUpUseCase {
  protected readonly _type = SignUpUseCase.name;

  public constructor(
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    private readonly bankGateway: BankGateway,
  ) {}

  public async execute(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const findCustomerByEmail =
      await this.customerQueryRepositoryGateway.findCustomerByEmail(
        dto.customer.email,
      );

    const emailAlreadyInUse = findCustomerByEmail !== null;

    if (emailAlreadyInUse) {
      throw new CustomerEmailAlreadyInUseError();
    }

    const bankCustomer = await this.createCustomerOnBank(dto.customer);

    const customer = new CustomerEntity({
      ...dto.customer,
      bankExternalId: bankCustomer.id,
    });

    await this.customerCommandRepositoryGateway.createCustomer(customer);

    const customerAddress = new CustomerAddressEntity({
      ...dto.customerAddress,
      customer,
    });

    await this.customerAddressCommandRepositoryGateway.createCustomerAddress(
      customerAddress,
    );

    return SignUpResponseDto.build({
      id: customer.id,
    });
  }

  private async createCustomerOnBank(
    customerData: SignUpCustomerDataRequestDto,
  ): Promise<CreateBankCustomerOutputModel> {
    const createCustomerInputModel = new CreateBankCustomerInputModel({
      name: customerData.name,
      email: customerData.email,
      phoneNumber: customerData.phoneNumber,
      federalDocument: customerData.federalDocument,
    });

    return await this.bankGateway.createCustomer(createCustomerInputModel);
  }
}
