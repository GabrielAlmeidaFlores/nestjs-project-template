import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { UpdateCustomerRequestDto } from '@module/customer/account/dto/request/update-customer.request.dto';
import { UpdateCustomerResponseDto } from '@module/customer/account/dto/response/update-customer-response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class UpdateCustomerUseCase {
  protected readonly _type = UpdateCustomerUseCase.name;

  public constructor(
    @Inject(CustomerAddressCommandRepositoryGateway)
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerCommandRepositoryGateway)
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: UpdateCustomerRequestDto,
  ): Promise<UpdateCustomerResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations(
        customer.id,
        organizationSessionData.organizationId,
      );

    const customerAddress = new CustomerAddressEntity({
      id: customer.customerAddress.id,
      addressNumber:
        dto.customerAddress?.addressNumber ??
        customer.customerAddress.addressNumber,
      city: dto.customerAddress?.city ?? customer.customerAddress.city,
      neighborhood:
        dto.customerAddress?.neighborhood ??
        customer.customerAddress.neighborhood,
      postalCode:
        dto.customerAddress?.postalCode ?? customer.customerAddress.postalCode,
      stateCode:
        dto.customerAddress?.stateCode ?? customer.customerAddress.stateCode,
      street: dto.customerAddress?.street ?? customer.customerAddress.street,
    });

    const transactions: TransactionType[] = [];

    const currentAuthIdentity = organizationMember?.customer.authIdentity;

    if (organizationMember && currentAuthIdentity) {
      const authIdentityUpdated = new AuthIdentityEntity({
        id: organizationMember.customer.authIdentity.id,
        email: organizationMember.customer.authIdentity.email,
        federalDocument:
          organizationMember.customer.authIdentity.federalDocument,
        password: currentAuthIdentity.password,
        authenticatorAppSecret:
          organizationMember.customer.authIdentity.authenticatorAppSecret,
        createdAt: organizationMember.customer.authIdentity.createdAt,
        customer: organizationMember.customer.id,
        updatedAt: new Date(),
      });
      const updateAuthIdentity =
        this.authIdentityCommandRepositoryGateway.updateAuthIdentity(
          organizationMember.customer.authIdentity.id,
          authIdentityUpdated,
        );
      transactions.push(updateAuthIdentity);
    }

    const customerUpdated = new CustomerEntity({
      id: customer.id,
      name: dto.name ?? customer.name,
      profilePicture: customer.profilePicture,
      createdAt: customer.createdAt,
      updatedAt: new Date(),
      customerAddress,
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
