import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityPropsInterface } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.entity.props.interface';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity extends BaseEntity<SurvivorPensionAnalysisBenefitOriginatorIdentificationId> {
  @Description('ID da análise de pensão por morte.')
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @Description('Nome do cliente instituidor do benefício.')
  public readonly clientName: string | null;

  @Description('CPF do cliente instituidor do benefício.')
  public readonly clientFederalDocument: FederalDocument | null;

  @Description('Data de nascimento do cliente instituidor do benefício.')
  public readonly clientBirthDate: Date | null;

  @Description('Gênero do cliente instituidor do benefício.')
  public readonly clientGender: GenderEnum | null;

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
    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientGender = props.clientGender ?? null;
    this.deathDate = props.deathDate ?? null;
    this.federativeEntity = props.federativeEntity ?? null;
    this.stateCode = props.stateCode ?? null;
    this.beneficiaryWasRetired = props.beneficiaryWasRetired ?? null;
  }
}
