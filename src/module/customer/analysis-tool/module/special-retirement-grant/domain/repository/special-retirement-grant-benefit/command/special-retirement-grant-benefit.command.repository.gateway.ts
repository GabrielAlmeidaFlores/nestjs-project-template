import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity';
import type { SpecialRetirementGrantBenefitId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/value-object/special-retirement-grant-benefit-id/special-retirement-grant-benefit-id.value-object';

export abstract class SpecialRetirementGrantBenefitCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantBenefit(
    props: SpecialRetirementGrantBenefitEntity,
  ): TransactionType;

  public abstract deleteSpecialRetirementGrantBenefit(
    id: SpecialRetirementGrantBenefitId,
  ): TransactionType;
}
