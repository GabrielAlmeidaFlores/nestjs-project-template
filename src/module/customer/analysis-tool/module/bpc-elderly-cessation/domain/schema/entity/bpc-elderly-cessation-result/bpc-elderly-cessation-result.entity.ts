import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyCessationResultEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity.props.interface';
import { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class BpcElderlyCessationResultEntity extends BaseEntity<BpcElderlyCessationResultId> {
  @Description('Análise da decisão do INSS no cessação de BPC ao Idoso.')
  public readonly inssDecisionAnalysis: string | null;

  @Description('Primeira análise estruturada do cessação de BPC ao Idoso.')
  public readonly firstAnalysis: string | null;

  @Description('Análise completa do cessação de BPC ao Idoso em formato JSON.')
  public readonly completeAnalysis: string | null;

  @Description(
    'Texto da análise completa do cessação de BPC ao Idoso para download.',
  )
  public readonly completeAnalysisDownload: string | null;

  @Description('Análise simplificada do cessação de BPC ao Idoso.')
  public readonly simplifiedAnalysis: string | null;

  @Description('Regras aplicáveis estruturadas para a tela final.')
  public readonly applicableRules: string | null;

  @Description('Resumo estruturado dos benefícios e cenários analisados.')
  public readonly benefitSummaries: string | null;

  @Description('Texto detalhado principal da análise.')
  public readonly analysisDetailedText: string | null;

  @Description('Diagnóstico jurídico principal da análise.')
  public readonly diagnosis: string | null;

  @Description('Renda familiar total considerada na análise.')
  public readonly totalHouseholdIncome: number | null;

  @Description('Renda familiar per capita considerada na análise.')
  public readonly perCapitaIncome: number | null;

  @Description('Resumo do atendimento aos requisitos legais.')
  public readonly legalRequirementsMet: string | null;

  @Description('Resumo do critério de renda per capita.')
  public readonly perCapitaIncomeBelowQuarterMinimumWage: string | null;

  @Description('Resumo do critério etário do BPC ao Idoso.')
  public readonly ageEqualOrAbove65Years: string | null;

  protected readonly _type = BpcElderlyCessationResultEntity.name;

  public constructor(props: BpcElderlyCessationResultEntityPropsInterface) {
    super(BpcElderlyCessationResultId, props);

    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.applicableRules = props.applicableRules ?? null;
    this.benefitSummaries = props.benefitSummaries ?? null;
    this.analysisDetailedText = props.analysisDetailedText ?? null;
    this.diagnosis = props.diagnosis ?? null;
    this.totalHouseholdIncome = props.totalHouseholdIncome ?? null;
    this.perCapitaIncome = props.perCapitaIncome ?? null;
    this.legalRequirementsMet = props.legalRequirementsMet ?? null;
    this.perCapitaIncomeBelowQuarterMinimumWage =
      props.perCapitaIncomeBelowQuarterMinimumWage ?? null;
    this.ageEqualOrAbove65Years = props.ageEqualOrAbove65Years ?? null;
  }
}
