import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

import type { GeneralUrbanRetirementDenialResultEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity.props.interface';

export class GeneralUrbanRetirementDenialResultEntity extends BaseEntity<GeneralUrbanRetirementDenialResultId> {
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type = GeneralUrbanRetirementDenialResultEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialResultEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialResultId, props);
    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
