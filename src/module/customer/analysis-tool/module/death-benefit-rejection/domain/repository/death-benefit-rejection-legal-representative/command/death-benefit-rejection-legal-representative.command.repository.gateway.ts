import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity';
import type { DeathBenefitRejectionLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/value-object/death-benefit-rejection-legal-representative-id.value-object';

export abstract class DeathBenefitRejectionLegalRepresentativeCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionLegalRepresentative(
    props: DeathBenefitRejectionLegalRepresentativeEntity,
  ): TransactionType;

  public abstract updateDeathBenefitRejectionLegalRepresentative(
    id: DeathBenefitRejectionLegalRepresentativeId,
    props: DeathBenefitRejectionLegalRepresentativeEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitRejectionLegalRepresentative(
    id: DeathBenefitRejectionLegalRepresentativeId,
  ): TransactionType;
}
