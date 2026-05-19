import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity';
import type { BpcDisabilityGrantInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/value-object/bpc-disability-grant-inss-benefit-id/bpc-disability-grant-inss-benefit-id.value-object';

export abstract class BpcDisabilityGrantInssBenefitCommandRepositoryGateway {
  public abstract createBpcDisabilityGrantInssBenefit(
    props: BpcDisabilityGrantInssBenefitEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityGrantInssBenefit(
    id: BpcDisabilityGrantInssBenefitId,
  ): TransactionType;
}
