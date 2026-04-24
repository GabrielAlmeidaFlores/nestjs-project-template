import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import type { BpcDisabilityDenialInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/value-object/bpc-disability-denial-inss-benefit-id/bpc-disability-denial-inss-benefit-id.value-object';

export abstract class BpcDisabilityDenialInssBenefitCommandRepositoryGateway {
  public abstract createBpcDisabilityDenialInssBenefit(
    props: BpcDisabilityDenialInssBenefitEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityDenialInssBenefit(
    id: BpcDisabilityDenialInssBenefitId,
  ): TransactionType;
}
