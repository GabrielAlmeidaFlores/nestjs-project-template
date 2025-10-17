import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerTermsAcceptanceCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/command/customer-terms-acceptance.command.repository.gateway';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { TermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/terms/query/terms.query.repository.gateway';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { CustomerTermsAcceptanceEntity } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/customer-terms-acceptance.entity';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { TermsEntity } from '@module/customer/account/domain/schema/entity/terms/terms.entity';
import { CustomerTermsAcceptanceResponseDto } from '@module/customer/account/dto/response/customer-terms-acceptance.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { CustomerTermsAcceptanceError } from '@module/customer/account/error/customer-terms-acceptance.error';

export class ConfirmTermsAcceptanceUseCase {
  protected readonly _type = ConfirmTermsAcceptanceUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TermsQueryRepositoryGateway)
    private readonly termsQueryRepositoryGateway: TermsQueryRepositoryGateway,
    @Inject(CustomerTermsAcceptanceQueryRepositoryGateway)
    private readonly customerTermsAcceptanceQueryRepositoryGateway: CustomerTermsAcceptanceQueryRepositoryGateway,
    @Inject(CustomerTermsAcceptanceCommandRepositoryGateway)
    private readonly customerTermsAcceptanceCommandRepositoryGateway: CustomerTermsAcceptanceCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CustomerTermsAcceptanceResponseDto> {
    const customerResult =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations(
        customerResult.id,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new InvalidOrganizationSessionError();
    }

    const termResult =
      await this.termsQueryRepositoryGateway.findOneByStatus(true);

    const customerTermsAcceptance =
      await this.customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId(
        termResult.id,
        customerResult.id,
      );

    const accepted = customerTermsAcceptance !== null;

    if (accepted) {
      throw new CustomerTermsAcceptanceError();
    }

    const customer = new CustomerEntity({
      ...customerResult,
      customerAddress: new CustomerAddressEntity({
        ...customerResult.customerAddress,
      }),
    });

    const terms = new TermsEntity({ ...termResult });

    const data = new CustomerTermsAcceptanceEntity({
      customer,
      terms,
    });

    const createCustomerTermsAcceptance =
      this.customerTermsAcceptanceCommandRepositoryGateway.createCustomerTermsAcceptance(
        data,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createCustomerTermsAcceptance,
    ]);

    await transaction.commit();

    return CustomerTermsAcceptanceResponseDto.build({
      customerTermsAcceptance: data.id,
    });
  }
}
