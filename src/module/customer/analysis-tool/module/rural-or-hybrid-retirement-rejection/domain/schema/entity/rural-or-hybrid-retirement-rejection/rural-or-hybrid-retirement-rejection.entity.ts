import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

import type { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import type { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import type { RuralOrHybridRetirementRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity.props.interface';
import type { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';

export class RuralOrHybridRetirementRejectionEntity extends BaseEntity<RuralOrHybridRetirementRejectionId> {
  public readonly analysisName: string | null;
  public readonly activityType: RuralOrHybridRetirementRejectionActivityTypeEnum | null;
  public readonly applicationSubmissionDate: Date | null;
  public readonly requestedBenefit: RuralOrHybridRetirementRejectionRequestedBenefitEnum | null;
  public readonly dateOfRejection: Date | null;
  public readonly ruralOrHybridRetirementRejectionResultId: RuralOrHybridRetirementRejectionResultId | null;

  protected readonly _type = RuralOrHybridRetirementRejectionEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.activityType = props.activityType ?? null;
    this.applicationSubmissionDate = props.applicationSubmissionDate ?? null;
    this.requestedBenefit = props.requestedBenefit ?? null;
    this.dateOfRejection = props.dateOfRejection ?? null;
    this.ruralOrHybridRetirementRejectionResultId =
      props.ruralOrHybridRetirementRejectionResultId ?? null;
  }
}
