import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/death-benefit-legal-representative.entity';
import type { DeathBenefitLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/value-object/death-benefit-legal-representative-id.value-object';

export abstract class DeathBenefitLegalRepresentativeCommandRepositoryGateway {
  public abstract createDeathBenefitLegalRepresentative(
    props: DeathBenefitLegalRepresentativeEntity,
  ): TransactionType;

  public abstract updateDeathBenefitLegalRepresentative(
    id: DeathBenefitLegalRepresentativeId,
    props: DeathBenefitLegalRepresentativeEntity,
  ): TransactionType;
}
