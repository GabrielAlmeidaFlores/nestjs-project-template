import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { RuralOrHybridRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/value-object/rural-or-hybrid-retirement-rejection-inss-benefit-id.value-object';

import type { RuralOrHybridRetirementRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/rural-or-hybrid-retirement-rejection-inss-benefit.entity.props.interface';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

export class RuralOrHybridRetirementRejectionInssBenefitEntity extends BaseEntity<RuralOrHybridRetirementRejectionInssBenefitId> {
  public readonly inssBenefit: string | null;
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionInssBenefitEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionInssBenefitEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit ?? null;
    this.ruralOrHybridRetirementRejectionId =
      props.ruralOrHybridRetirementRejectionId;
  }
}
