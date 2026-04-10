import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity';
import type { DeathBenefitGrantLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/value-object/death-benefit-grant-legal-representative-id.value-object';

export abstract class DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway {
  public abstract createDeathBenefitGrantLegalRepresentative(
    props: DeathBenefitGrantLegalRepresentativeEntity,
  ): TransactionType;

  public abstract updateDeathBenefitGrantLegalRepresentative(
    id: DeathBenefitGrantLegalRepresentativeId,
    props: DeathBenefitGrantLegalRepresentativeEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitGrantLegalRepresentative(
    id: DeathBenefitGrantLegalRepresentativeId,
  ): TransactionType;
}
