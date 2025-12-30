import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';

export abstract class LegalProceedingDetailCommandRepositoryGateway {
  public abstract createLegalProceedingDetail(
    prop: LegalProceedingDetailEntity,
  ): TransactionType;
}
