import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantTechnicalDiagnosisEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/special-retirement-grant-technical-diagnosis.entity.props.interface';
import { SpecialRetirementGrantTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/value-object/special-retirement-grant-technical-diagnosis-id/special-retirement-grant-technical-diagnosis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantTechnicalDiagnosisEntity extends BaseEntity<SpecialRetirementGrantTechnicalDiagnosisId> {
  @Description('Data inicial do periodo analisado.')
  public readonly periodStartDate: Date;

  @Description('Data final do periodo analisado.')
  public readonly periodEndDate: Date;

  @Description('Indica se o periodo foi reconhecido.')
  public readonly recognized: boolean;

  @Description('Justificativa tecnica para o reconhecimento do periodo.')
  public readonly justification: string;

  @Description('Empresa empregadora associada ao periodo.')
  public readonly company: string;

  @Description('CNPJ da empresa associada ao periodo.')
  public readonly cnpj: string;

  @Description('Funcao exercida no periodo.')
  public readonly role: string;

  @Description('Documento suporte informado no diagnostico.')
  public readonly supportingDocument: string;

  @Description('Indica se o vinculo consta no CNIS.')
  public readonly recordedInCnis: boolean;

  @Description('Indica se as remuneracoes constam no CNIS.')
  public readonly remunerationRecordedInCnis: boolean;

  @Description('Lista de agentes nocivos em formato CSV.')
  public readonly hazardousAgents: string;

  @Description('Fonte de informacao do diagnostico.')
  public readonly informationSource: string;

  @Description('Fundamentacao legal em formato CSV.')
  public readonly legalFramework: string;

  @Description('Indica se o EPI foi considerado eficaz.')
  public readonly epiEficaz: boolean | null;

  @Description('Observacoes adicionais em formato CSV.')
  public readonly observations: string | null;

  @Description('Concessao de aposentadoria especial associada ao diagnostico.')
  public readonly specialRetirementGrant: SpecialRetirementGrantEntity;

  protected readonly _type =
    SpecialRetirementGrantTechnicalDiagnosisEntity.name;

  public constructor(
    props: SpecialRetirementGrantTechnicalDiagnosisEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantTechnicalDiagnosisId, props);

    this.periodStartDate = props.periodStartDate;
    this.periodEndDate = props.periodEndDate;
    this.recognized = props.recognized;
    this.justification = props.justification;
    this.company = props.company;
    this.cnpj = props.cnpj;
    this.role = props.role;
    this.supportingDocument = props.supportingDocument;
    this.recordedInCnis = props.recordedInCnis;
    this.remunerationRecordedInCnis = props.remunerationRecordedInCnis;
    this.hazardousAgents = props.hazardousAgents;
    this.informationSource = props.informationSource;
    this.legalFramework = props.legalFramework;
    this.epiEficaz = props.epiEficaz ?? null;
    this.observations = props.observations ?? null;
    this.specialRetirementGrant = props.specialRetirementGrant;
  }
}
