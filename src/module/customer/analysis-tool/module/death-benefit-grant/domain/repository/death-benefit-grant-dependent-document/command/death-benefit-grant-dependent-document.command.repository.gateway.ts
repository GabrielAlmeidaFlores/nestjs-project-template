import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import type { DeathBenefitGrantDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.entity';

export abstract class DeathBenefitGrantDependentDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitGrantDependentDocument(
    props: DeathBenefitGrantDependentDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitGrantDependentId(
    DeathBenefitGrantDependentId: DeathBenefitGrantDependentId,
  ): TransactionType;
}
