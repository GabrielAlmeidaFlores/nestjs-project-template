import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.entity.props.interface';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity extends BaseEntity<SurvivorPensionAnalysisBenefitOriginatorIdentificationId> {
  @Description('ID da análise de pensão por morte.')
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @Description('ID do cliente da ferramenta de análise.')
  public readonly analysisToolClientId: AnalysisToolClientId | null;

  @Description('Data de falecimento do instituidor do benefício.')
  public readonly deathDate: Date | null;

  @Description('Entidade federativa.')
  public readonly federativeEntity: string | null;

  @Description('Código do estado.')
  public readonly stateCode: string | null;

  @Description('Indicador se o beneficiário era aposentado.')
  public readonly beneficiaryWasRetired: boolean | null;

  protected readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity.name;

  public constructor(
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityPropsInterface,
  ) {
    super(SurvivorPensionAnalysisBenefitOriginatorIdentificationId, props);
    this.survivorPensionAnalysisId = props.survivorPensionAnalysisId;
    this.analysisToolClientId = props.analysisToolClientId ?? null;
    this.deathDate = props.deathDate ?? null;
    this.federativeEntity = props.federativeEntity ?? null;
    this.stateCode = props.stateCode ?? null;
    this.beneficiaryWasRetired = props.beneficiaryWasRetired ?? null;
  }
}
