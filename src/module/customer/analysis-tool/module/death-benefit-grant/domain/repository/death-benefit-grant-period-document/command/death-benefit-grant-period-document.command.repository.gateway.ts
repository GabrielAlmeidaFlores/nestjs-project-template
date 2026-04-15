import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import type { DeathBenefitGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/death-benefit-grant-period-document.entity';

export abstract class DeathBenefitGrantPeriodDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitGrantPeriodDocument(
    props: DeathBenefitGrantPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitGrantPeriodId(
    DeathBenefitGrantPeriodId: DeathBenefitGrantPeriodId,
  ): TransactionType;
}
