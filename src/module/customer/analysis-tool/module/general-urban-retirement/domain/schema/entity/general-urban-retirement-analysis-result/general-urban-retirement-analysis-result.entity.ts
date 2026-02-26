import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';

import type { GeneralUrbanRetirementAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity.props.interface';

export class GeneralUrbanRetirementAnalysisResultEntity extends BaseEntity<GeneralUrbanRetirementAnalysisResultId> {
  public readonly generalUrbanRetirementCompleteAnalysis: string | null;
  public readonly generalUrbanRetirementCompleteAnalysisDownload: string | null;
  public readonly generalUrbanRetirementSimplifiedAnalysis: string | null;

  protected readonly _type = GeneralUrbanRetirementAnalysisResultEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisResultEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisResultId, props);
    this.generalUrbanRetirementCompleteAnalysis =
      props.generalUrbanRetirementCompleteAnalysis ?? null;
    this.generalUrbanRetirementCompleteAnalysisDownload =
      props.generalUrbanRetirementCompleteAnalysisDownload ?? null;
    this.generalUrbanRetirementSimplifiedAnalysis =
      props.generalUrbanRetirementSimplifiedAnalysis ?? null;
  }
}
