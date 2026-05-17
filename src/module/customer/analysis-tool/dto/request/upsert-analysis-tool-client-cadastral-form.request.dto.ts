import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpsertAnalysisToolClientCadastralFormRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public rg?: string;

  @RequestDtoStringProperty({ required: false })
  public nit?: string;

  @RequestDtoStringProperty({ required: false })
  public occupation?: string;

  @RequestDtoStringProperty({ required: false })
  public maritalStatus?: string;

  @RequestDtoStringProperty({ required: false })
  public neighborhood?: string;

  @RequestDtoStringProperty({ required: false })
  public street?: string;

  @RequestDtoStringProperty({ required: false })
  public addressNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public motherName?: string;

  @RequestDtoStringProperty({ required: false })
  public fatherName?: string;

  @RequestDtoStringProperty({ required: false })
  public spouseName?: string;

  @RequestDtoStringProperty({ required: false })
  public ctpsNumber?: string;

  @RequestDtoBooleanProperty({ required: false })
  public ownHouse?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasChildren?: boolean;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public childrenNames?: string[];

  @RequestDtoBooleanProperty({ required: false })
  public isRetired?: boolean;

  @RequestDtoStringProperty({ required: false })
  public retirementType?: string;

  @RequestDtoStringProperty({ required: false })
  public retirementBenefitNumber?: string;

  @RequestDtoBooleanProperty({ required: false })
  public receivesSocialSecurityBenefit?: boolean;

  @RequestDtoStringProperty({ required: false })
  public socialSecurityBenefitType?: string;

  @RequestDtoStringProperty({ required: false })
  public socialSecurityBenefitNumber?: string;

  @RequestDtoBooleanProperty({ required: false })
  public receivesWelfareBenefit?: boolean;

  @RequestDtoStringProperty({ required: false })
  public welfareBenefitType?: string;

  @RequestDtoStringProperty({ required: false })
  public welfareBenefitNumber?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasInssDebt?: boolean;

  @RequestDtoStringProperty({ required: false })
  public inssDebtAmount?: string;

  @RequestDtoBooleanProperty({ required: false })
  public receivesBolsaFamilia?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public workedInSpecialActivity?: boolean;

  @RequestDtoStringProperty({ required: false })
  public specialActivityAgent?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasPppOrLtcat?: boolean;

  @RequestDtoStringProperty({ required: false })
  public pppLtcatCompany?: string;

  @RequestDtoBooleanProperty({ required: false })
  public companyIsOpen?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public workedWithElectricity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public workedAsSecurity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public exposedToExcessiveNoise?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public workedInRuralArea?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public familyLivedInRuralArea?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public workedInPublicService?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public heldPublicJob?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hiredByMunicipality?: boolean;

  @RequestDtoStringProperty({ required: false })
  public hospitalizationDetails?: string;

  @RequestDtoStringProperty({ required: false })
  public healthProblems?: string;

  @RequestDtoStringProperty({ required: false })
  public accidentDetails?: string;

  @RequestDtoStringProperty({ required: false })
  public workAccidentDetails?: string;

  @RequestDtoStringProperty({ required: false })
  public medicalTreatment?: string;

  @RequestDtoStringProperty({ required: false })
  public continuousMedication?: string;

  @RequestDtoBooleanProperty({ required: false })
  public usesFarmaciaPopular?: boolean;

  @RequestDtoStringProperty({ required: false })
  public medicalAttendanceType?: string;

  @RequestDtoStringProperty({ required: false })
  public doctorName?: string;

  @RequestDtoStringProperty({ required: false })
  public medicalLocation?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasLaboratoryTests?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasMedicalCertificates?: boolean;

  @RequestDtoStringProperty({ required: false })
  public accidentSequelae?: string;

  @RequestDtoStringProperty({ required: false })
  public pendingAdministrativeRequest?: string;

  @RequestDtoStringProperty({ required: false })
  public ongoingJudicialProcess?: string;

  @RequestDtoStringProperty({ required: false })
  public closedJudicialProcess?: string;

  @RequestDtoStringProperty({ required: false })
  public previousBenefitRevision?: string;

  @RequestDtoBooleanProperty({ required: false })
  public docIdAndResidence?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public docPapAndJudicial?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public docCnisExtract?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public docPppLtcat?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public docReservistCertificate?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public docRuralDocuments?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public docAllCtps?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public docPublicAdminContracts?: boolean;

  @RequestDtoStringProperty({ required: false })
  public docOthers?: string;
}
