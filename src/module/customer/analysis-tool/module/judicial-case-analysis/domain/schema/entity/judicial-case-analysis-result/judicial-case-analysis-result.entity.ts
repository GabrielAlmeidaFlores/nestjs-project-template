import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { JudicialCaseAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity.props.interface';
import { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class JudicialCaseAnalysisResultEntity extends BaseEntity<JudicialCaseAnalysisResultId> {
  @Description('Análise completa do caso judicial.')
  public readonly judicialCaseCompleteAnalysis: string | null;

  @Description('Análise simplificada do caso judicial.')
  public readonly judicialCaseSimplifiedAnalysis: string | null;

  protected readonly _type = JudicialCaseAnalysisResultEntity.name;

  public constructor(props: JudicialCaseAnalysisResultEntityPropsInterface) {
    super(JudicialCaseAnalysisResultId, props);

    this.judicialCaseCompleteAnalysis =
      props.judicialCaseCompleteAnalysis ?? null;
    this.judicialCaseSimplifiedAnalysis =
      props.judicialCaseSimplifiedAnalysis ?? null;
  }
}
