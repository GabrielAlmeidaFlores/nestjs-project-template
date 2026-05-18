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
  @ResponseDtoValueObjectProperty(InterviewFormId)
  public interviewFormId: InterviewFormId;

  @ResponseDtoStringProperty()
  public analysisToolClientId: string;

  // Dados do Cliente
  @ResponseDtoStringProperty({ required: false })
  public clientName: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientCpf: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientRg: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientInssPassword: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientAddress: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientProfession: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientNit: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientCtpsNumber: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientBirthDate: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientMaritalStatus: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientRace: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientPhoneNumber: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientMotherName: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientFatherName: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientSpouseName: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientEmail: string | null;

  @ResponseDtoStringProperty({ required: false })
  public clientCtps: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public clientHasDisclosure: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public clientHasRpc: boolean | null;

  @ResponseDtoStringProperty({ isArray: true })
  public childrenNames: string[];

  // Dados Laborativos e Previdenciários
  @ResponseDtoBooleanProperty({ required: false })
  public isRetired: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReceivedOrReceivesSocialSecurityBenefit: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReceivedOrReceivesWelfareBenefit: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityBenefitType: string | null;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityBenefitNumber: string | null;

  @ResponseDtoStringProperty({ required: false })
  public welfareBenefitNumber: string | null;

  @ResponseDtoEnumProperty(InterviewFormBenefitTypeEnum, { required: false })
  public desiredBenefitType: InterviewFormBenefitTypeEnum | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasSocialSecurityDebt: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityDebtDate: string | null;

  @ResponseDtoStringProperty({ required: false })
  public socialSecurityDebtAmount: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public receivesBolsaFamilia: boolean | null;

  // Atividades Especiais
  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedInSpecialActivities: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public specialActivityType: string | null;

  @ResponseDtoStringProperty({ required: false })
  public specialActivityAgent: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPppOrLtcat: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public pppOrLtcatDetails: string | null;

  @ResponseDtoStringProperty({ required: false })
  public isCompanyOpenOrClosed: string | null;

  @ResponseDtoStringProperty({ required: false })
  public companyName: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedWithElectricity: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedAsVigilante: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedExposedToExcessiveNoise: boolean | null;

  // Trabalho Rural
  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedInRuralArea: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public familyLivedInRuralAreaDuringChildhood: boolean | null;

  // Serviço Público
  @ResponseDtoBooleanProperty({ required: false })
  public hasWorkedInPublicService: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasHeldPublicOffice: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasBeenCommissionedByPublicAdministration: boolean | null;

  // Dados de Saúde Ocupacional
  @ResponseDtoStringProperty({ required: false })
  public hasBeenHospitalized: string | null;

  @ResponseDtoStringProperty({ required: false })
  public hasHealthProblems: string | null;

  @ResponseDtoStringProperty({ required: false })
  public hasHadAccident: string | null;

  @ResponseDtoStringProperty({ required: false })
  public hasHadWorkAccident: string | null;

  @ResponseDtoStringProperty({ required: false })
  public hasMedicalTreatment: string | null;

  @ResponseDtoStringProperty({ required: false })
  public takesContinuousMedication: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public buysMedicationFromPopularPharmacy: boolean | null;

  @ResponseDtoEnumProperty(InterviewFormMedicalServiceTypeEnum, { required: false })
  public medicalServiceType: InterviewFormMedicalServiceTypeEnum | null;

  @ResponseDtoStringProperty({ required: false })
  public attendingDoctorName: string | null;

  @ResponseDtoStringProperty({ required: false })
  public treatmentLocation: string | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasLabReports: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasMedicalRecords: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public hasAccidentReport: string | null;

  // Histórico Processual
  @ResponseDtoStringProperty({ required: false })
  public hasAdministrativeClaimWithInss: string | null;

  @ResponseDtoStringProperty({ required: false })
  public hasOngoingLawsuit: string | null;

  @ResponseDtoStringProperty({ required: false })
  public hasPreviousLawsuit: string | null;

  @ResponseDtoStringProperty({ required: false })
  public hasRequestedAdministrativeOrJudicialReview: string | null;

  // Documentos Entregues
  @ResponseDtoBooleanProperty({ required: false })
  public hasRgCpfProofOfResidence: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPapAndJudicialProcessCopy: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasCnisExtract: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPppAndLtcat: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReservistCertificate: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasRuralDocuments: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasCompleteCtpsCopy: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPublicAdministrationWorkContract: boolean | null;

  @ResponseDtoBooleanProperty({ required: false })
  public hasOtherDocuments: boolean | null;

  @ResponseDtoStringProperty({ required: false })
  public otherDocumentsDescription: string | null;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetInterviewFormResponseDto.name;
}
