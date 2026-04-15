import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { RuralOrHybridRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/value-object/rural-or-hybrid-retirement-rejection-legal-proceeding-id.value-object';

import type { RuralOrHybridRetirementRejectionLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/rural-or-hybrid-retirement-rejection-legal-proceeding.entity.props.interface';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

export class RuralOrHybridRetirementRejectionLegalProceedingEntity extends BaseEntity<RuralOrHybridRetirementRejectionLegalProceedingId> {
  public readonly legalProceedingNumber: string | null;
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionLegalProceedingEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionLegalProceedingEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber ?? null;
    this.ruralOrHybridRetirementRejectionId =
      props.ruralOrHybridRetirementRejectionId;
  }
}
