import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { InsuranceQualityAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity.props.interface';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class InsuranceQualityAnalysisEntity extends BaseEntity<InsuranceQualityAnalysisId> {
  @Description('ID do cliente da ferramenta de análise.')
  public readonly analysisToolClientId: AnalysisToolClientId;

  @Description('Número do benefício analisado.')
  public readonly analysisBenefitNumber: string | null;

  @Description('Tipo do benefício analisado.')
  public readonly analysisBenefitType: string | null;

  @Description('Data de concessão do benefício analisado.')
  public readonly analysisBenefitConcessionDate: Date | null;

  @Description('Data de cessação do benefício analisado.')
  public readonly analysisBenefitCessationDate: Date | null;

  @Description('Indicador de benefício anterior.')
  public readonly analysisHasPreviousBenefit: boolean | null;

  @Description('Detalhes do benefício anterior.')
  public readonly analysisPreviousBenefitDetails: string | null;

  @Description('Situação das contribuições.')
  public readonly analysisContributionSituation: string | null;

  @Description('Indicador de atividade rural.')
  public readonly analysisHasRuralActivity: boolean | null;

  @Description('Detalhes da atividade rural.')
  public readonly analysisRuralActivityDetails: string | null;

  @Description(
    'Indicador de acidente de trabalho ou doença grave (art. 30, III, Decreto 3.048/99).',
  )
  public readonly analysisIsWorkAccidentOrSeriousIllness: boolean | null;

  @Description('Indicador de doença grave conforme Art. 151 da Lei 8.213/91.')
  public readonly analysisIsSeriousIllnessArt151: boolean | null;

  @Description('Doença grave identificada.')
  public readonly analysisSeriousIllnesses: string | null;

  @Description('Outra doença grave não listada.')
  public readonly analysisOtherSeriousIllness: string | null;

  @Description('Data de início da doença.')
  public readonly analysisDiseaseStartDate: Date | null;

  @Description('Data de início da atividade rural.')
  public readonly analysisRuralStartDate: Date | null;

  @Description('Data de fim da atividade rural.')
  public readonly analysisRuralEndDate: Date | null;

  @Description('Indicador de desemprego involuntário após última atividade.')
  public readonly analysisHadInvoluntaryUnemployment: boolean | null;

  @Description(
    'Indicador de intenção de comprovar desemprego involuntário por testemunhal.',
  )
  public readonly analysisIntendsToProveByTestimony: boolean | null;

  @Description('Resultado da análise de qualidade de segurado e carência.')
  public readonly insuranceQualityAnalysisResult: InsuranceQualityAnalysisResultEntity | null;

  protected readonly _type = InsuranceQualityAnalysisEntity.name;

  public constructor(props: InsuranceQualityAnalysisEntityPropsInterface) {
    super(InsuranceQualityAnalysisId, props);

    this.analysisToolClientId = props.analysisToolClientId;
    this.analysisBenefitNumber = props.analysisBenefitNumber ?? null;
    this.analysisBenefitType = props.analysisBenefitType ?? null;
    this.analysisBenefitConcessionDate =
      props.analysisBenefitConcessionDate ?? null;
    this.analysisBenefitCessationDate =
      props.analysisBenefitCessationDate ?? null;
    this.analysisHasPreviousBenefit = props.analysisHasPreviousBenefit ?? null;
    this.analysisPreviousBenefitDetails =
      props.analysisPreviousBenefitDetails ?? null;
    this.analysisContributionSituation =
      props.analysisContributionSituation ?? null;
    this.analysisHasRuralActivity = props.analysisHasRuralActivity ?? null;
    this.analysisRuralActivityDetails =
      props.analysisRuralActivityDetails ?? null;
    this.analysisIsWorkAccidentOrSeriousIllness =
      props.analysisIsWorkAccidentOrSeriousIllness ?? null;
    this.analysisIsSeriousIllnessArt151 =
      props.analysisIsSeriousIllnessArt151 ?? null;
    this.analysisSeriousIllnesses = props.analysisSeriousIllnesses ?? null;
    this.analysisOtherSeriousIllness =
      props.analysisOtherSeriousIllness ?? null;
    this.analysisDiseaseStartDate = props.analysisDiseaseStartDate ?? null;
    this.analysisRuralStartDate = props.analysisRuralStartDate ?? null;
    this.analysisRuralEndDate = props.analysisRuralEndDate ?? null;
    this.analysisHadInvoluntaryUnemployment =
      props.analysisHadInvoluntaryUnemployment ?? null;
    this.analysisIntendsToProveByTestimony =
      props.analysisIntendsToProveByTestimony ?? null;
    this.insuranceQualityAnalysisResult =
      props.insuranceQualityAnalysisResult ?? null;
  }
}
