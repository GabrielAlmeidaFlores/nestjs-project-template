import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/value-object/temporary-incapacity-benefit-rejection-disability-analysis-cid-id.value-object';

import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/temporary-incapacity-benefit-rejection-disability-analysis-cid.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId> {
  public readonly cidTenId: string;
  public readonly temporaryIncapacityBenefitRejectionDisabilityAnalysisId: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId, props);
    this.cidTenId = props.cidTenId;
    this.temporaryIncapacityBenefitRejectionDisabilityAnalysisId =
      props.temporaryIncapacityBenefitRejectionDisabilityAnalysisId;
  }
}
