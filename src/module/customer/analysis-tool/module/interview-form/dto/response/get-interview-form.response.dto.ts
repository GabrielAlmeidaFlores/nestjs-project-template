import { InterviewFormBenefitTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-benefit-type.enum';
import { InterviewFormMedicalServiceTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-medical-service-type.enum';
import { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetInterviewFormResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(InterviewFormId, { required: false })
  public interviewFormId?: InterviewFormId;

  @ResponseDtoStringProperty({ required: false })
  public analysisToolClientId?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientCpf?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientRg?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientInssPassword?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientAddress?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientProfession?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientNit?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientCtpsNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientBirthDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientMaritalStatus?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientRace?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientPhoneNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientMotherName?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientFatherName?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientSpouseName?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientEmail?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientCtps?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public clientHasDisclosure?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public clientHasRpc?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public clientRegistrationDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientAge?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientNeighborhood?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientStreet?: string;

  @ResponseDtoStringProperty({ required: false })
  public clientStreetNumber?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public clientIsMarriedOrInUnion?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public clientHasChildren?: boolean;

  @ResponseDtoStringProperty({ isArray: true, required: false })
  public childrenNames?: string[];

  @ResponseDtoBooleanProperty({ required: false })
  public isRetired?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReceivedOrReceivesSocialSecurityBenefit?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReceivedOrReceivesWelfareBenefit?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityBenefitType?: string;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityBenefitNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public welfareBenefitNumber?: string;

  @ResponseDtoEnumProperty(InterviewFormBenefitTypeEnum, { required: false })
  public desiredBenefitType?: InterviewFormBenefitTypeEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasSocialSecurityDebt?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityDebtDate?: string;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityDebtAmount?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public receivesBolsaFamilia?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedInSpecialActivities?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public specialActivityType?: string;

  @ResponseDtoStringProperty({ required: false })
  public specialActivityAgent?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPppOrLtcat?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public pppOrLtcatDetails?: string;

  @ResponseDtoStringProperty({ required: false })
  public isCompanyOpenOrClosed?: string;

  @ResponseDtoStringProperty({ required: false })
  public companyName?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedWithElectricity?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedAsVigilante?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedExposedToExcessiveNoise?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedInRuralArea?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public familyLivedInRuralAreaDuringChildhood?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedInPublicService?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasHeldPublicOffice?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasBeenCommissionedByPublicAdministration?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public hasBeenHospitalized?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasHealthProblems?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasHadAccident?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasHadWorkAccident?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasMedicalTreatment?: string;

  @ResponseDtoStringProperty({ required: false })
  public takesContinuousMedication?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public buysMedicationFromPopularPharmacy?: boolean;

  @ResponseDtoEnumProperty(InterviewFormMedicalServiceTypeEnum, { required: false })
  public medicalServiceType?: InterviewFormMedicalServiceTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public attendingDoctorName?: string;

  @ResponseDtoStringProperty({ required: false })
  public treatmentLocation?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public hasLabReports?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasMedicalRecords?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public hasAccidentReport?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasAdministrativeClaimWithInss?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasOngoingLawsuit?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasPreviousLawsuit?: string;

  @ResponseDtoStringProperty({ required: false })
  public hasRequestedAdministrativeOrJudicialReview?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public hasRgCpfProofOfResidence?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPapAndJudicialProcessCopy?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasCnisExtract?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPppAndLtcat?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReservistCertificate?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasRuralDocuments?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasCompleteCtpsCopy?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPublicAdministrationWorkContract?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasOtherDocuments?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public otherDocumentsDescription?: string;

  @ResponseDtoDateProperty({ required: false })
  public createdAt?: Date;

  @ResponseDtoDateProperty({ required: false })
  public updatedAt?: Date;

  protected override readonly _type = GetInterviewFormResponseDto.name;
}
