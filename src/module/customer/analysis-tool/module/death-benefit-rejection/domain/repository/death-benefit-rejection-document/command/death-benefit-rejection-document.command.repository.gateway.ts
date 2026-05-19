import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/death-benefit-rejection-document.entity';
import type { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

export abstract class DeathBenefitRejectionDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionDocument(
    props: DeathBenefitRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitRejectionInstitorId(
    deathBenefitRejectionInstitorId: DeathBenefitRejectionInstitorId,
  ): TransactionType;
}
