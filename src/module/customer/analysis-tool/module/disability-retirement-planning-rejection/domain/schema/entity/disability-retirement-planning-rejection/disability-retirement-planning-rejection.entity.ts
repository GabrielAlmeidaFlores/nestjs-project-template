import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';

import type { DisabilityRetirementPlanningRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-category.enum';
import type { DisabilityRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-denial-reason.enum';
import type { DisabilityRetirementPlanningRejectionRetirementTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-retirement-type.enum';
import type { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

export class DisabilityRetirementPlanningRejectionEntity extends BaseEntity<DisabilityRetirementPlanningRejectionId> {
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly disabilityRetirementPlanningRejectionResultId: DisabilityRetirementPlanningRejectionResultId | null;
  public readonly requestedBenefitType: string | null;
  public readonly category: DisabilityRetirementPlanningRejectionCategoryEnum | null;
  public readonly retirementType: DisabilityRetirementPlanningRejectionRetirementTypeEnum | null;
  public readonly denialReason: DisabilityRetirementPlanningRejectionDenialReasonEnum | null;
  public readonly denialReasonDescription: string | null;

  protected readonly _type = DisabilityRetirementPlanningRejectionEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningRejectionEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.denialDate = props.denialDate ?? null;
    this.disabilityRetirementPlanningRejectionResultId =
      props.disabilityRetirementPlanningRejectionResultId ?? null;
    this.requestedBenefitType = props.requestedBenefitType ?? null;
    this.category = props.category ?? null;
    this.retirementType = props.retirementType ?? null;
    this.denialReason = props.denialReason ?? null;
    this.denialReasonDescription = props.denialReasonDescription ?? null;
  }
}
