import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity.props.interface';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisResultEntity extends BaseEntity<SurvivorPensionAnalysisResultId> {
  @Description('ID da análise de pensão por morte.')
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @Description('Indicador de confirmação do status de segurado.')
  public readonly isInsuredStatusConfirmed: boolean | null;

  @Description('Resumo do status de segurado.')
  public readonly insuredStatusSummary: string | null;

  @Description('Indicador de confirmação do direito à aposentadoria.')
  public readonly isRetirementRightConfirmed: boolean | null;

  @Description('Resumo do direito à aposentadoria.')
  public readonly retirementRightSummary: string | null;

  @Description('Análise completa.')
  public readonly completeAnalysis: string | null;

  @Description('Análise simplificada.')
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type = SurvivorPensionAnalysisResultEntity.name;

  public constructor(props: SurvivorPensionAnalysisResultEntityPropsInterface) {
    super(SurvivorPensionAnalysisResultId, props);
    this.survivorPensionAnalysisId = props.survivorPensionAnalysisId;
    this.isInsuredStatusConfirmed = props.isInsuredStatusConfirmed ?? null;
    this.insuredStatusSummary = props.insuredStatusSummary ?? null;
    this.isRetirementRightConfirmed = props.isRetirementRightConfirmed ?? null;
    this.retirementRightSummary = props.retirementRightSummary ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
