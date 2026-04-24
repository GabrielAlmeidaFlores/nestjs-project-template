import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityDenialResultEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity.props.interface';
import { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class BpcDisabilityDenialResultEntity extends BaseEntity<BpcDisabilityDenialResultId> {
  @Description('Análise da decisão do INSS no indeferimento de BPC PcD.')
  public readonly inssDecisionAnalysis: string | null;

  @Description('Primeira análise estruturada do indeferimento de BPC PcD.')
  public readonly firstAnalysis: string | null;

  @Description('Análise completa do indeferimento de BPC PcD em formato JSON.')
  public readonly completeAnalysis: string | null;

  @Description(
    'Texto da análise completa do indeferimento de BPC PcD para download.',
  )
  public readonly completeAnalysisDownload: string | null;

  @Description('Análise simplificada do indeferimento de BPC PcD.')
  public readonly simplifiedAnalysis: string | null;

  @Description('Regras aplicáveis estruturadas para a tela final.')
  public readonly applicableRules: string | null;

  @Description('Resumo estruturado dos benefícios e cenários analisados.')
  public readonly benefitSummaries: string | null;

  @Description('Texto detalhado principal da análise.')
  public readonly analysisDetailedText: string | null;

  protected readonly _type = BpcDisabilityDenialResultEntity.name;

  public constructor(props: BpcDisabilityDenialResultEntityPropsInterface) {
    super(BpcDisabilityDenialResultId, props);

    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.applicableRules = props.applicableRules ?? null;
    this.benefitSummaries = props.benefitSummaries ?? null;
    this.analysisDetailedText = props.analysisDetailedText ?? null;
  }
}
