import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AffiliateCustomerNotFoundError } from '@module/admin/affiliate-customer/error/affiliate-customer-not-found.error';
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

@Injectable()
export class DeleteAffiliateCustomerUseCase {
  protected readonly _type = DeleteAffiliateCustomerUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerCommandRepositoryGateway)
    private readonly affiliateCustomerCommandRepository: AffiliateCustomerCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepository: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(id: AffiliateCustomerId): Promise<void> {
    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneById(id);

    if (!affiliate) {
      throw new AffiliateCustomerNotFoundError();
    }

    const deleteAffiliate =
      this.affiliateCustomerCommandRepository.deleteAffiliateCustomer(id);

    const transaction =
      await this.baseTransactionRepository.execute(deleteAffiliate);
    await transaction.commit();
  }
}
