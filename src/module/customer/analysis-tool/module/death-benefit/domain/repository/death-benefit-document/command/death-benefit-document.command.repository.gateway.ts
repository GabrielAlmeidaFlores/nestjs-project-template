import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity';

export abstract class DeathBenefitDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitDocument(
    props: DeathBenefitDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitId(
    deathBenefitId: DeathBenefitId,
  ): TransactionType;
}
