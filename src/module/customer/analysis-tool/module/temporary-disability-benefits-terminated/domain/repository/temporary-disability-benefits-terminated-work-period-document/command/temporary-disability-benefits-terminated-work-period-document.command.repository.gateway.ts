import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/temporary-disability-benefits-terminated-work-period-document.entity';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

export abstract class TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedWorkPeriodDocument(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentByTemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
  ): TransactionType;
}
