import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import type { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

export abstract class DeathBenefitGrantDocumentCommandRepositoryGateway {
  public abstract createDeathBenefitGrantDocument(
    props: DeathBenefitGrantDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitGrantInstitorId(
    deathBenefitGrantInstitorId: DeathBenefitGrantInstitorId,
  ): TransactionType;
}
