import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';
import type { DeathBenefitDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/death-benefit-dependent-document.entity';

export abstract class DeathBenefitDependentDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitDependentDocument(
    props: DeathBenefitDependentDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitDependentId(
    deathBenefitDependentId: DeathBenefitDependentId,
  ): TransactionType;
}
