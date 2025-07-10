import { Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/repository/base.transaction.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.command.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@core/domain/repository/organization/organization/organization.command.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@core/domain/repository/organization/organization-member/organization-member.command.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { CustomerAddressEntity } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { OrganizationMemberEntity } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
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
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    private readonly customerAddressCommandRepositoryGateway: CustomerAddressCommandRepositoryGateway,
    private readonly organizationCommandRepositoryGateway: OrganizationCommandRepositoryGateway,
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
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

    const customerAddress = new CustomerAddressEntity({
      ...dto.customerAddress,
      customer,
    });

    const organization = new OrganizationEntity({
      name: dto.customer.name,
    });

    const organizationMember = new OrganizationMemberEntity({
      customer: new RelationModel(customer),
      organization,
      owner: true,
    });

    await this.createCustomerOnDatabase(
      customer,
      customerAddress,
      organization,
      organizationMember,
    );

    return SignUpResponseDto.build({
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

    await this.baseTransactionRepositoryGateway.commit([
      createCustomer,
      createCustomerAddress,
      createOrganization,
      createOrganizationMember,
    ]);
  }

  private async createCustomerOnBank(
    customerData: SignUpCustomerDataRequestDto,
  ): Promise<CreateBankCustomerOutputModel> {
    const createCustomerInputModel = CreateBankCustomerInputModel.build({
      name: customerData.name,
      email: customerData.email,
      phoneNumber: customerData.phoneNumber,
      federalDocument: customerData.federalDocument,
    });

    return await this.bankGateway.createCustomer(createCustomerInputModel);
  }
}
