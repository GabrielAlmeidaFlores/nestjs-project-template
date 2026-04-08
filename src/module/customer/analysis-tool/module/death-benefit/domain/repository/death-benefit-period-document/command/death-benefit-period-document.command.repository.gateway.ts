import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import type { DeathBenefitPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/death-benefit-period-document.entity';

export abstract class DeathBenefitPeriodDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitPeriodDocument(
    props: DeathBenefitPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitPeriodId(
    deathBenefitPeriodId: DeathBenefitPeriodId,
  ): TransactionType;
}
