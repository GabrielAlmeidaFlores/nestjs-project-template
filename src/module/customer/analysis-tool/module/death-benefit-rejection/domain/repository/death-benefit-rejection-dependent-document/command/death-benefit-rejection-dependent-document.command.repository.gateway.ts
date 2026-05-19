import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import type { DeathBenefitRejectionDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.entity';

export abstract class DeathBenefitRejectionDependentDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionDependentDocument(
    props: DeathBenefitRejectionDependentDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitRejectionDependentId(
    DeathBenefitRejectionDependentId: DeathBenefitRejectionDependentId,
  ): TransactionType;
}
