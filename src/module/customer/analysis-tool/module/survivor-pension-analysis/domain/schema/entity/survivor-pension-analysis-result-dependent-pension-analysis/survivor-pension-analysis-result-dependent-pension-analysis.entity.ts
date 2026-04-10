import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.entity.props.interface';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisResultDependentPensionAnalysisEntity extends BaseEntity<SurvivorPensionAnalysisResultDependentPensionAnalysisId> {
  @Description('ID do resultado da análise de pensão por morte.')
  public readonly survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;

  @Description('Nome do dependente.')
  public readonly dependentName: string | null;

  @Description('Grau de dependência.')
  public readonly dependencyDegree: string | null;

  @Description('Indicador de verificação de dependência.')
  public readonly isDependencyVerified: boolean | null;

  @Description('Data de início da pensão.')
  public readonly pensionStartDate: Date | null;

  @Description('Duração estimada da pensão.')
  public readonly estimatedPensionDuration: string | null;

  protected readonly _type =
    SurvivorPensionAnalysisResultDependentPensionAnalysisEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisResultDependentPensionAnalysisEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisResultDependentPensionAnalysisId, props);
    this.survivorPensionAnalysisResultId =
      props.survivorPensionAnalysisResultId;
    this.dependentName = props.dependentName ?? null;
    this.dependencyDegree = props.dependencyDegree ?? null;
    this.isDependencyVerified = props.isDependencyVerified ?? null;
    this.pensionStartDate = props.pensionStartDate ?? null;
    this.estimatedPensionDuration = props.estimatedPensionDuration ?? null;
  }
}
