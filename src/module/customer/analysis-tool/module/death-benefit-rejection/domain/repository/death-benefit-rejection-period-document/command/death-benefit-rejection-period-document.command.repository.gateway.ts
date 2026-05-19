import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import type { DeathBenefitRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/death-benefit-rejection-period-document.entity';

export abstract class DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionPeriodDocument(
    props: DeathBenefitRejectionPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitRejectionPeriodId(
    DeathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId,
  ): TransactionType;
}
