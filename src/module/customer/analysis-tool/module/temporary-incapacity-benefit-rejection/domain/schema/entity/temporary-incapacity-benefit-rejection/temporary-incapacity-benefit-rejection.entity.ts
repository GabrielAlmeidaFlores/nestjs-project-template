import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';

import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionConditionEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-condition.enum';
import type { TemporaryIncapacityBenefitRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-denial-reason.enum';
import type { TemporaryIncapacityBenefitRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';

export class TemporaryIncapacityBenefitRejectionEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionId> {
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly requestedBenefitType: string | null;
  public readonly category: TemporaryIncapacityBenefitRejectionCategoryEnum | null;
  public readonly denialReason: TemporaryIncapacityBenefitRejectionDenialReasonEnum | null;
  public readonly denialReasonDescription: string | null;
  public readonly condition: TemporaryIncapacityBenefitRejectionConditionEnum | null;
  public readonly conditionDescription: string | null;
  public readonly temporaryIncapacityBenefitRejectionResultId: TemporaryIncapacityBenefitRejectionResultId | null;

  protected readonly _type = TemporaryIncapacityBenefitRejectionEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.denialDate = props.denialDate ?? null;
    this.requestedBenefitType = props.requestedBenefitType ?? null;
    this.category = props.category ?? null;
    this.denialReason = props.denialReason ?? null;
    this.denialReasonDescription = props.denialReasonDescription ?? null;
    this.condition = props.condition ?? null;
    this.conditionDescription = props.conditionDescription ?? null;
    this.temporaryIncapacityBenefitRejectionResultId =
      props.temporaryIncapacityBenefitRejectionResultId ?? null;
  }
}
