import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';

import type { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import type { TemporaryIncapacityBenefitTerminationReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-reason.enum';
import type { TemporaryIncapacityBenefitTerminationEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

export class TemporaryIncapacityBenefitTerminationEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationId> {
  public readonly analysisName: string | null;
  public readonly benefitTerminationDate: Date | null;
  public readonly category: TemporaryIncapacityBenefitTerminationCategoryEnum | null;
  public readonly terminationReason: TemporaryIncapacityBenefitTerminationReasonEnum | null;
  public readonly terminationReasonDescription: string | null;
  public readonly temporaryIncapacityBenefitTerminationResultId: TemporaryIncapacityBenefitTerminationResultId | null;

  protected readonly _type = TemporaryIncapacityBenefitTerminationEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationId, props);
    this.analysisName = props.analysisName ?? null;
    this.benefitTerminationDate = props.benefitTerminationDate ?? null;
    this.category = props.category ?? null;
    this.terminationReason = props.terminationReason ?? null;
    this.terminationReasonDescription =
      props.terminationReasonDescription ?? null;
    this.temporaryIncapacityBenefitTerminationResultId =
      props.temporaryIncapacityBenefitTerminationResultId ?? null;
  }
}
