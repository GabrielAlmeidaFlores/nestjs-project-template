import { AnalysisToolClientCadastralFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/value-object/analysis-tool-client-cadastral-form-id/analysis-tool-client-cadastral-form-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAnalysisToolClientCadastralFormResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientCadastralFormId, { required: false })
  public id?: AnalysisToolClientCadastralFormId;

  @ResponseDtoStringProperty({ required: false })
  public rg?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public nit?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public occupation?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public maritalStatus?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public neighborhood?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public street?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public addressNumber?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public motherName?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public fatherName?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public spouseName?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public ctpsNumber?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public ownHouse?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasChildren?: boolean | null;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public childrenNames?: string[] | null;

  @ResponseDtoBooleanProperty({ required: false })
  public isRetired?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public retirementType?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public retirementBenefitNumber?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public receivesSocialSecurityBenefit?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityBenefitType?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityBenefitNumber?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public receivesWelfareBenefit?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public welfareBenefitType?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public welfareBenefitNumber?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasInssDebt?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public inssDebtAmount?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public receivesBolsaFamilia?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public workedInSpecialActivity?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public specialActivityAgent?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPppOrLtcat?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public pppLtcatCompany?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public companyIsOpen?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public workedWithElectricity?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public workedAsSecurity?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public exposedToExcessiveNoise?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public workedInRuralArea?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public familyLivedInRuralArea?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public workedInPublicService?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public heldPublicJob?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hiredByMunicipality?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public hospitalizationDetails?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public healthProblems?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public accidentDetails?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public workAccidentDetails?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public medicalTreatment?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public continuousMedication?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public usesFarmaciaPopular?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public medicalAttendanceType?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public doctorName?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public medicalLocation?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasLaboratoryTests?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasMedicalCertificates?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public accidentSequelae?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public pendingAdministrativeRequest?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public ongoingJudicialProcess?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public closedJudicialProcess?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public previousBenefitRevision?: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docIdAndResidence?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docPapAndJudicial?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docCnisExtract?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docPppLtcat?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docReservistCertificate?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docRuralDocuments?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docAllCtps?: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public docPublicAdminContracts?: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public docOthers?: string | null;

  @ResponseDtoDateProperty({ required: false })
  public createdAt?: Date;

  @ResponseDtoDateProperty({ required: false })
  public updatedAt?: Date;
}
