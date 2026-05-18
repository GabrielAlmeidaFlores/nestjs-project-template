import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { InterviewFormBenefitTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-benefit-type.enum';
import { InterviewFormMedicalServiceTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-medical-service-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpsertInterviewFormRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  // Dados do Cliente
  @RequestDtoStringProperty({ required: false })
  public clientName?: string;

  @RequestDtoStringProperty({ required: false })
  public clientCpf?: string;

  @RequestDtoStringProperty({ required: false })
  public clientRg?: string;

  @RequestDtoStringProperty({ required: false })
  public clientInssPassword?: string;

  @RequestDtoStringProperty({ required: false })
  public clientAddress?: string;

  @RequestDtoStringProperty({ required: false })
  public clientProfession?: string;

  @RequestDtoStringProperty({ required: false })
  public clientNit?: string;

  @RequestDtoStringProperty({ required: false })
  public clientCtpsNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public clientBirthDate?: string;

  @RequestDtoStringProperty({ required: false })
  public clientMaritalStatus?: string;

  @RequestDtoStringProperty({ required: false })
  public clientRace?: string;

  @RequestDtoStringProperty({ required: false })
  public clientPhoneNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public clientMotherName?: string;

  @RequestDtoStringProperty({ required: false })
  public clientFatherName?: string;

  @RequestDtoStringProperty({ required: false })
  public clientSpouseName?: string;

  @RequestDtoStringProperty({ required: false })
  public clientEmail?: string;

  @RequestDtoStringProperty({ required: false })
  public clientCtps?: string;

  @RequestDtoBooleanProperty({ required: false })
  public clientHasDisclosure?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public clientHasRpc?: boolean;

  @RequestDtoStringProperty({ required: false })
  public clientRegistrationDate?: string;

  @RequestDtoStringProperty({ required: false })
  public clientAge?: string;

  @RequestDtoStringProperty({ required: false })
  public clientNeighborhood?: string;

  @RequestDtoStringProperty({ required: false })
  public clientStreet?: string;

  @RequestDtoStringProperty({ required: false })
  public clientStreetNumber?: string;

  @RequestDtoBooleanProperty({ required: false })
  public clientIsMarriedOrInUnion?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public clientHasChildren?: boolean;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public childrenNames?: string[];

  // Dados Laborativos e Previdenciários
  @RequestDtoBooleanProperty({ required: false })
  public isRetired?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasReceivedOrReceivesSocialSecurityBenefit?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasReceivedOrReceivesWelfareBenefit?: boolean;

  @RequestDtoStringProperty({ required: false })
  public socialSecurityBenefitType?: string;

  @RequestDtoStringProperty({ required: false })
  public socialSecurityBenefitNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public welfareBenefitNumber?: string;

  @RequestDtoEnumProperty(InterviewFormBenefitTypeEnum, { required: false })
  public desiredBenefitType?: InterviewFormBenefitTypeEnum;

  @RequestDtoBooleanProperty({ required: false })
  public hasSocialSecurityDebt?: boolean;

  @RequestDtoStringProperty({ required: false })
  public socialSecurityDebtDate?: string;

  @RequestDtoStringProperty({ required: false })
  public socialSecurityDebtAmount?: string;

  @RequestDtoBooleanProperty({ required: false })
  public receivesBolsaFamilia?: boolean;

  // Atividades Especiais
  @RequestDtoBooleanProperty({ required: false })
  public hasWorkedInSpecialActivities?: boolean;

  @RequestDtoStringProperty({ required: false })
  public specialActivityType?: string;

  @RequestDtoStringProperty({ required: false })
  public specialActivityAgent?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasPppOrLtcat?: boolean;

  @RequestDtoStringProperty({ required: false })
  public pppOrLtcatDetails?: string;

  @RequestDtoStringProperty({ required: false })
  public isCompanyOpenOrClosed?: string;

  @RequestDtoStringProperty({ required: false })
  public companyName?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasWorkedWithElectricity?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasWorkedAsVigilante?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasWorkedExposedToExcessiveNoise?: boolean;

  // Trabalho Rural
  @RequestDtoBooleanProperty({ required: false })
  public hasWorkedInRuralArea?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public familyLivedInRuralAreaDuringChildhood?: boolean;

  // Serviço Público
  @RequestDtoBooleanProperty({ required: false })
  public hasWorkedInPublicService?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasHeldPublicOffice?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasBeenCommissionedByPublicAdministration?: boolean;

  // Dados de Saúde Ocupacional
  @RequestDtoStringProperty({ required: false })
  public hasBeenHospitalized?: string;

  @RequestDtoStringProperty({ required: false })
  public hasHealthProblems?: string;

  @RequestDtoStringProperty({ required: false })
  public hasHadAccident?: string;

  @RequestDtoStringProperty({ required: false })
  public hasHadWorkAccident?: string;

  @RequestDtoStringProperty({ required: false })
  public hasMedicalTreatment?: string;

  @RequestDtoStringProperty({ required: false })
  public takesContinuousMedication?: string;

  @RequestDtoBooleanProperty({ required: false })
  public buysMedicationFromPopularPharmacy?: boolean;

  @RequestDtoEnumProperty(InterviewFormMedicalServiceTypeEnum, {
    required: false,
  })
  public medicalServiceType?: InterviewFormMedicalServiceTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public attendingDoctorName?: string;

  @RequestDtoStringProperty({ required: false })
  public treatmentLocation?: string;

  @RequestDtoBooleanProperty({ required: false })
  public hasLabReports?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasMedicalRecords?: boolean;

  @RequestDtoStringProperty({ required: false })
  public hasAccidentReport?: string;

  // Histórico Processual
  @RequestDtoStringProperty({ required: false })
  public hasAdministrativeClaimWithInss?: string;

  @RequestDtoStringProperty({ required: false })
  public hasOngoingLawsuit?: string;

  @RequestDtoStringProperty({ required: false })
  public hasPreviousLawsuit?: string;

  @RequestDtoStringProperty({ required: false })
  public hasRequestedAdministrativeOrJudicialReview?: string;

  // Documentos Entregues
  @RequestDtoBooleanProperty({ required: false })
  public hasRgCpfProofOfResidence?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasPapAndJudicialProcessCopy?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasCnisExtract?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasPppAndLtcat?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasReservistCertificate?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasRuralDocuments?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasCompleteCtpsCopy?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasPublicAdministrationWorkContract?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public hasOtherDocuments?: boolean;

  @RequestDtoStringProperty({ required: false })
  public otherDocumentsDescription?: string;

  protected override readonly _type = UpsertInterviewFormRequestDto.name;
}
