import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { ValidateAuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/validate-auth-identity-sign-up.request.dto';

import type { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import type { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import type { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import type { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import type { AuthIdentitySignUpUseCasePort } from '@module/generic/auth-identity/use-case-port/auth-identity-sign-up.use-case-port';
import type { ValidateAuthIdentitySignUpUseCasePort } from '@module/generic/auth-identity/use-case-port/validate-auth-identity-sign-up.use-case-port';

@Injectable()
export class CustomerSignUpUseCase {
  protected readonly _type = CustomerSignUpUseCase.name;

  public constructor(
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    private readonly validateAuthIdentitySignUpUseCasePort: ValidateAuthIdentitySignUpUseCasePort,
    private readonly authIdentitySignUpUseCasePort: AuthIdentitySignUpUseCasePort,
  ) {}

  public async execute(
    dto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
    const customerAddress = new CustomerAddressEntity({
      ...dto.customerAddress,
    });

    const customer = new CustomerEntity({
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      customerAddress,
    });

    await this.validateAuthIdentitySignUpUseCasePort.execute(
      ValidateAuthIdentitySignUpRequestDto.build({
        ...dto,
        customer: customer.id,
      }),
    );

    const customerTransaction =
      this.customerCommandRepositoryGateway.createCustomer(customer);

    const customerAddressTransaction =
      this.customerAddressCommandRepositoryGateway.createCustomerAddress(
        customerAddress,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      customerTransaction,
      customerAddressTransaction,
    ]);

    await transaction.commit();

    await this.authIdentitySignUpUseCasePort.execute(
      AuthIdentitySignUpRequestDto.build({
        ...dto,
        customer: customer.id,
      }),
    );

    return CustomerSignUpResponseDto.build({
      customer: customer.id,
    });
  }
}
