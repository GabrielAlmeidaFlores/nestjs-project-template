import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import type { BpcElderlyCessationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/value-object/bpc-elderly-cessation-inss-benefit-id/bpc-elderly-cessation-inss-benefit-id.value-object';

export abstract class BpcElderlyCessationInssBenefitCommandRepositoryGateway {
  public abstract createBpcElderlyCessationInssBenefit(
    props: BpcElderlyCessationInssBenefitEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyCessationInssBenefit(
    id: BpcElderlyCessationInssBenefitId,
  ): TransactionType;
}
