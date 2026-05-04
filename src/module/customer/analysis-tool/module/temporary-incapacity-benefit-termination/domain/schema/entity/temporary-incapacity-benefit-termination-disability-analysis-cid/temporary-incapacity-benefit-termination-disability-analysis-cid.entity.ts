import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/value-object/temporary-incapacity-benefit-termination-disability-analysis-cid-id.value-object';

import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/temporary-incapacity-benefit-termination-disability-analysis-cid.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId> {
  public readonly cidTenId: string;
  public readonly temporaryIncapacityBenefitTerminationDisabilityAnalysisId: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId, props);
    this.cidTenId = props.cidTenId;
    this.temporaryIncapacityBenefitTerminationDisabilityAnalysisId =
      props.temporaryIncapacityBenefitTerminationDisabilityAnalysisId;
  }
}
