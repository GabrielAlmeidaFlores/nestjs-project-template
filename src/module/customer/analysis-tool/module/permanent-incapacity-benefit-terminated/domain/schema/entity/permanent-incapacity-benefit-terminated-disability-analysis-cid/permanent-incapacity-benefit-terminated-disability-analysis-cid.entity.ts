import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/value-object/permanent-incapacity-benefit-terminated-disability-analysis-cid-id.value-object';

import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/permanent-incapacity-benefit-terminated-disability-analysis-cid.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId> {
  public readonly cidTenId: string;
  public readonly permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId, props);
    this.cidTenId = props.cidTenId;
    this.permanentIncapacityBenefitTerminatedDisabilityAnalysisId =
      props.permanentIncapacityBenefitTerminatedDisabilityAnalysisId;
  }
}
