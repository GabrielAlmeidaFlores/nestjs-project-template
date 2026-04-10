import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';

export abstract class DeathBenefitGrantDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitGrantDocument(
    props: DeathBenefitGrantDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitGrantId(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): TransactionType;
}
