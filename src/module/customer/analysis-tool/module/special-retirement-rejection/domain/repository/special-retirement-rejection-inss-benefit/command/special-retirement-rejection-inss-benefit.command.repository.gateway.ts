import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.entity';

export abstract class SpecialRetirementRejectionInssBenefitCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionInssBenefit(
    props: SpecialRetirementRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionInssBenefitBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
