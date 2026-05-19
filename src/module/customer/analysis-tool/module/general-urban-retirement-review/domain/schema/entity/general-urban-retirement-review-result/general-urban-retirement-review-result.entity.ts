import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { GeneralUrbanRetirementReviewResultEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity.props.interface';
import { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementReviewResultEntity extends BaseEntity<GeneralUrbanRetirementReviewResultId> {
  @Description('Nome do cliente associado ao resultado da análise.')
  public readonly clientName: string | null;

  @Description('Documento federal do cliente.')
  public readonly clientFederalDocument: FederalDocument | null;

  @Description('Data de nascimento do cliente.')
  public readonly clientBirthDate: Date | null;

  @Description('Data da última filiação do cliente.')
  public readonly clientLastAffiliationDate: Date | null;

  @Description('Texto comparativo CNIS x CTPS.')
  public readonly compareCnisCtps: string | null;

  @Description('Resultado bruto do método compare CNIS x CTPS (JSON).')
  public readonly compareCnisCtpsRaw: string | null;

  @Description('Análise estruturada da carta de concessão.')
  public readonly benefitAwardLetterAnalysis: string | null;

  @Description('Resultado bruto da análise da carta de concessão.')
  public readonly benefitAwardLetterAnalysisRaw: string | null;

  @Description('First analysis estruturada do fluxo revisional.')
  public readonly firstAnalysis: string | null;

  @Description('Análise completa em JSON (retornada ao frontend).')
  public readonly generalUrbanRetirementReviewCompleteAnalysis: string | null;

  @Description('Análise simplificada.')
  public readonly generalUrbanRetirementReviewSimplifiedAnalysis: string | null;

  @Description(
    'Análise completa em markdown para download (não exposta ao frontend).',
  )
  public readonly generalUrbanRetirementReviewCompleteAnalysisDownload:
    | string
    | null;

  protected readonly _type = GeneralUrbanRetirementReviewResultEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewResultEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.compareCnisCtps = props.compareCnisCtps ?? null;
    this.compareCnisCtpsRaw = props.compareCnisCtpsRaw ?? null;
    this.benefitAwardLetterAnalysis = props.benefitAwardLetterAnalysis ?? null;
    this.benefitAwardLetterAnalysisRaw =
      props.benefitAwardLetterAnalysisRaw ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.generalUrbanRetirementReviewCompleteAnalysis =
      props.generalUrbanRetirementReviewCompleteAnalysis ?? null;
    this.generalUrbanRetirementReviewSimplifiedAnalysis =
      props.generalUrbanRetirementReviewSimplifiedAnalysis ?? null;
    this.generalUrbanRetirementReviewCompleteAnalysisDownload =
      props.generalUrbanRetirementReviewCompleteAnalysisDownload ?? null;
  }
}
