import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';

import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-reason.enum';
import type { PermanentIncapacityBenefitTerminatedEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';

export class PermanentIncapacityBenefitTerminatedEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedId> {
  public readonly analysisName: string | null;
  public readonly benefitTerminationDate: Date | null;
  public readonly category: PermanentIncapacityBenefitTerminatedCategoryEnum | null;
  public readonly terminationReason: PermanentIncapacityBenefitTerminatedReasonEnum | null;
  public readonly terminationReasonDescription: string | null;
  public readonly permanentIncapacityBenefitTerminatedResultId: PermanentIncapacityBenefitTerminatedResultId | null;

  protected readonly _type = PermanentIncapacityBenefitTerminatedEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedId, props);
    this.analysisName = props.analysisName ?? null;
    this.benefitTerminationDate = props.benefitTerminationDate ?? null;
    this.category = props.category ?? null;
    this.terminationReason = props.terminationReason ?? null;
    this.terminationReasonDescription =
      props.terminationReasonDescription ?? null;
    this.permanentIncapacityBenefitTerminatedResultId =
      props.permanentIncapacityBenefitTerminatedResultId ?? null;
  }
}
