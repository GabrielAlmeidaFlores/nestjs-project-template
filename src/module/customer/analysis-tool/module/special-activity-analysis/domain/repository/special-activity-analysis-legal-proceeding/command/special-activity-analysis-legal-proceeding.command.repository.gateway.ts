import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import type { SpecialActivityLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/value-object/special-activity-legal-proceeding-id.value-object';

export abstract class SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createSpecialActivityLegalProceeding(
    props: SpecialActivityLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteSpecialActivityLegalProceeding(
    id: SpecialActivityLegalProceedingId,
  ): TransactionType;
}
