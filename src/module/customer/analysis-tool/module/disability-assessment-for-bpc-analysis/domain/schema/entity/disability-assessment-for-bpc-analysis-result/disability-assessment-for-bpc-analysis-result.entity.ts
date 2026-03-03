import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityAssessmentForBpcAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity.props.interface';
import { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class DisabilityAssessmentForBpcAnalysisResultEntity extends BaseEntity<DisabilityAssessmentForBpcAnalysisResultId> {
  @Description('Análise completa da avaliação de deficiência para BPC.')
  public readonly disabilityAssessmentForBpcCompleteAnalysis: string | null;

  @Description('Análise simplificada da avaliação de deficiência para BPC.')
  public readonly disabilityAssessmentForBpcSimplifiedAnalysis: string | null;

  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisResultEntity.name;

  public constructor(
    props: DisabilityAssessmentForBpcAnalysisResultEntityPropsInterface,
  ) {
    super(DisabilityAssessmentForBpcAnalysisResultId, props);

    this.disabilityAssessmentForBpcCompleteAnalysis =
      props.disabilityAssessmentForBpcCompleteAnalysis ?? null;
    this.disabilityAssessmentForBpcSimplifiedAnalysis =
      props.disabilityAssessmentForBpcSimplifiedAnalysis ?? null;
  }
}
