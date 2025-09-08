import { Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { CustomerEmailAlreadyInUseError } from '@module/customer/account/error/customer-email-already-in-use.error';

@Injectable()
export class CustomerSignUpUseCase {
  protected readonly _type = CustomerSignUpUseCase.name;

  public constructor(
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    private readonly organizationCommandRepositoryGateway: OrganizationCommandRepositoryGateway,
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
  ) {}

  public async execute(
    dto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
    const findCustomerByEmail =
      await this.customerQueryRepositoryGateway.findCustomerByEmail(dto.email);

    const emailAlreadyInUse = findCustomerByEmail !== null;

    if (emailAlreadyInUse) {
      throw new CustomerEmailAlreadyInUseError();
    }

    const customerAddress = new CustomerAddressEntity({
      ...dto.customerAddress,
    });

    const customer = new CustomerEntity({
      ...dto,
      customerAddress,
    });

    const organization = new OrganizationEntity({
      name: dto.name,
    });

    const organizationMember = new OrganizationMemberEntity({
      customer,
      organization,
      owner: true,
    });

    await this.createCustomerOnDatabase(
      customer,
      customerAddress,
      organization,
      organizationMember,
    );

    return CustomerSignUpResponseDto.build({
      id: customer.id,
    });
  }

  private async createCustomerOnDatabase(
    customer: CustomerEntity,
    customerAddress: CustomerAddressEntity,
    organization: OrganizationEntity,
    organizationMember: OrganizationMemberEntity,
  ): Promise<void> {
    const createCustomer =
      this.customerCommandRepositoryGateway.createCustomer(customer);

    const createCustomerAddress =
      this.customerAddressCommandRepositoryGateway.createCustomerAddress(
        customerAddress,
      );
    const createOrganization =
      this.organizationCommandRepositoryGateway.createOrganization(
        organization,
      );
    const createOrganizationMember =
      this.organizationMemberCommandRepositoryGateway.createOrganizationMember(
        organizationMember,
      );

    const transaction = await this.baseTransactionRepositoryGateway.save([
      createCustomerAddress,
      createCustomer,
      createOrganization,
      createOrganizationMember,
    ]);

    await transaction.commit();
  }
}
