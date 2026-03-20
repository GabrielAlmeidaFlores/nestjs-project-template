import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { GeneralUrbanRetirementGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity.props.interface';
import { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementGrantResultEntity extends BaseEntity<GeneralUrbanRetirementGrantResultId> {
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

  @Description('Análise completa em JSON (retornada ao frontend).')
  public readonly generalUrbanRetirementGrantCompleteAnalysis: string | null;

  @Description('Análise simplificada.')
  public readonly generalUrbanRetirementGrantSimplifiedAnalysis: string | null;

  @Description(
    'Análise completa em markdown para download (não exposta ao frontend).',
  )
  public readonly generalUrbanRetirementGrantCompleteAnalysisDownload:
    | string
    | null;

  protected readonly _type = GeneralUrbanRetirementGrantResultEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantResultEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.compareCnisCtps = props.compareCnisCtps ?? null;
    this.compareCnisCtpsRaw = props.compareCnisCtpsRaw ?? null;
    this.generalUrbanRetirementGrantCompleteAnalysis =
      props.generalUrbanRetirementGrantCompleteAnalysis ?? null;
    this.generalUrbanRetirementGrantSimplifiedAnalysis =
      props.generalUrbanRetirementGrantSimplifiedAnalysis ?? null;
    this.generalUrbanRetirementGrantCompleteAnalysisDownload =
      props.generalUrbanRetirementGrantCompleteAnalysisDownload ?? null;
  }
}
