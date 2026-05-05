import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import type { BpcDisabilityTerminationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/value-object/bpc-disability-termination-inss-benefit-id/bpc-disability-termination-inss-benefit-id.value-object';

export abstract class BpcDisabilityTerminationInssBenefitCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationInssBenefit(
    props: BpcDisabilityTerminationInssBenefitEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityTerminationInssBenefit(
    id: BpcDisabilityTerminationInssBenefitId,
  ): TransactionType;
}
