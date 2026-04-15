import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.entity.props.interface';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisDeceasedBenefitDependentsEntity extends BaseEntity<SurvivorPensionAnalysisDeceasedBenefitDependentsId> {
  @Description('ID da análise de pensão por morte.')
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @Description('Nome completo do dependente.')
  public readonly dependentFullName: string | null;

  @Description('Nível de classificação de dependência.')
  public readonly dependencyClassificationLevel: string | null;

  @Description('Tipo do dependente.')
  public readonly type: string | null;

  @Description('Gênero do dependente.')
  public readonly gender: string | null;

  @Description('Data de nascimento do dependente.')
  public readonly dateOfBirth: Date | null;

  @Description('Indicador de deficiência ou invalidez.')
  public readonly hasDisabilityOrInvalidity: boolean | null;

  @Description('Data de início da união.')
  public readonly unionCommencementDate: Date | null;

  protected readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisDeceasedBenefitDependentsId, props);
    this.survivorPensionAnalysisId = props.survivorPensionAnalysisId;
    this.dependentFullName = props.dependentFullName ?? null;
    this.dependencyClassificationLevel =
      props.dependencyClassificationLevel ?? null;
    this.type = props.type ?? null;
    this.gender = props.gender ?? null;
    this.dateOfBirth = props.dateOfBirth ?? null;
    this.hasDisabilityOrInvalidity = props.hasDisabilityOrInvalidity ?? null;
    this.unionCommencementDate = props.unionCommencementDate ?? null;
  }
}
