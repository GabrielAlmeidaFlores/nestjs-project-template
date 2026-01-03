import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { UpdateCustomerRequestDto } from '@module/customer/account/dto/request/update-customer.request.dto';
import { UpdateCustomerResponseDto } from '@module/customer/account/dto/response/update-customer-response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';

import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class UpdateCustomerUseCase {
  protected readonly _type = UpdateCustomerUseCase.name;

  public constructor(
    @Inject(CustomerAddressCommandRepositoryGateway)
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerCommandRepositoryGateway)
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateCustomerRequestDto,
  ): Promise<UpdateCustomerResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const customerAddress = new CustomerAddressEntity({
      ...customer.customerAddress,
      ...dto.customerAddress,
      id: customer.customerAddress.id,
    });

    const transactions: TransactionType[] = [];

    const customerUpdated = new CustomerEntity({
      id: customer.id,
      name: dto.name ?? customer.name,
      profilePicture: customer.profilePicture,
      createdAt: customer.createdAt,
      updatedAt: new Date(),
      customerAddress,
      bankExternalId: customer.bankExternalId,
    });

    const updateCustomer = this.customerCommandRepositoryGateway.updateCustomer(
      customer.id,
      customerUpdated,
    );

    const customerAddressUpdated =
      this.customerAddressCommandRepositoryGateway.updateCustomerAddress(
        customer.customerAddress.id,
        customerAddress,
      );

    transactions.push(customerAddressUpdated);
    transactions.push(updateCustomer);

    const execute =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await execute.commit();

    return UpdateCustomerResponseDto.build({
      customerId: customer.id,
    });
  }
}
