import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/rural-or-hybrid-retirement-rejection-inss-benefit.entity';
import type { RuralOrHybridRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/value-object/rural-or-hybrid-retirement-rejection-inss-benefit-id.value-object';

export abstract class RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionInssBenefit(
    props: RuralOrHybridRetirementRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionInssBenefit(
    id: RuralOrHybridRetirementRejectionInssBenefitId,
  ): TransactionType;
}
