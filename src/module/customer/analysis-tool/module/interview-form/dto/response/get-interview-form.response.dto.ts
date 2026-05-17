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
  @ResponseDtoStringProperty()
  public clientName: string | null;

  @ResponseDtoStringProperty()
  public clientCpf: string | null;

  @ResponseDtoStringProperty()
  public clientRg: string | null;

  @ResponseDtoStringProperty()
  public clientInssPassword: string | null;

  @ResponseDtoStringProperty()
  public clientAddress: string | null;

  @ResponseDtoStringProperty()
  public clientProfession: string | null;

  @ResponseDtoStringProperty()
  public clientNit: string | null;

  @ResponseDtoStringProperty()
  public clientCtpsNumber: string | null;

  @ResponseDtoStringProperty()
  public clientBirthDate: string | null;

  @ResponseDtoStringProperty()
  public clientMaritalStatus: string | null;

  @ResponseDtoStringProperty()
  public clientRace: string | null;

  @ResponseDtoStringProperty()
  public clientPhoneNumber: string | null;

  @ResponseDtoStringProperty()
  public clientMotherName: string | null;

  @ResponseDtoStringProperty()
  public clientFatherName: string | null;

  @ResponseDtoStringProperty()
  public clientSpouseName: string | null;

  @ResponseDtoStringProperty()
  public clientEmail: string | null;

  @ResponseDtoStringProperty()
  public clientCtps: string | null;

  @ResponseDtoBooleanProperty()
  public clientHasDisclosure: boolean | null;

  @ResponseDtoBooleanProperty()
  public clientHasRpc: boolean | null;

  @ResponseDtoStringProperty({ isArray: true })
  public childrenNames: string[];

  // Dados Laborativos e Previdenciários
  @ResponseDtoBooleanProperty()
  public isRetired: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasReceivedOrReceivesSocialSecurityBenefit: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasReceivedOrReceivesWelfareBenefit: boolean | null;

  @ResponseDtoStringProperty()
  public socialSecurityBenefitType: string | null;

  @ResponseDtoStringProperty()
  public socialSecurityBenefitNumber: string | null;

  @ResponseDtoStringProperty()
  public welfareBenefitNumber: string | null;

  @ResponseDtoEnumProperty(InterviewFormBenefitTypeEnum)
  public desiredBenefitType: InterviewFormBenefitTypeEnum | null;

  @ResponseDtoBooleanProperty()
  public hasSocialSecurityDebt: boolean | null;

  @ResponseDtoStringProperty()
  public socialSecurityDebtDate: string | null;

  @ResponseDtoStringProperty()
  public socialSecurityDebtAmount: string | null;

  @ResponseDtoBooleanProperty()
  public receivesBolsaFamilia: boolean | null;

  // Atividades Especiais
  @ResponseDtoBooleanProperty()
  public hasWorkedInSpecialActivities: boolean | null;

  @ResponseDtoStringProperty()
  public specialActivityType: string | null;

  @ResponseDtoStringProperty()
  public specialActivityAgent: string | null;

  @ResponseDtoBooleanProperty()
  public hasPppOrLtcat: boolean | null;

  @ResponseDtoStringProperty()
  public pppOrLtcatDetails: string | null;

  @ResponseDtoStringProperty()
  public isCompanyOpenOrClosed: string | null;

  @ResponseDtoStringProperty()
  public companyName: string | null;

  @ResponseDtoBooleanProperty()
  public hasWorkedWithElectricity: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasWorkedAsVigilante: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasWorkedExposedToExcessiveNoise: boolean | null;

  // Trabalho Rural
  @ResponseDtoBooleanProperty()
  public hasWorkedInRuralArea: boolean | null;

  @ResponseDtoBooleanProperty()
  public familyLivedInRuralAreaDuringChildhood: boolean | null;

  // Serviço Público
  @ResponseDtoBooleanProperty()
  public hasWorkedInPublicService: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasHeldPublicOffice: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasBeenCommissionedByPublicAdministration: boolean | null;

  // Dados de Saúde Ocupacional
  @ResponseDtoStringProperty()
  public hasBeenHospitalized: string | null;

  @ResponseDtoStringProperty()
  public hasHealthProblems: string | null;

  @ResponseDtoStringProperty()
  public hasHadAccident: string | null;

  @ResponseDtoStringProperty()
  public hasHadWorkAccident: string | null;

  @ResponseDtoStringProperty()
  public hasMedicalTreatment: string | null;

  @ResponseDtoStringProperty()
  public takesContinuousMedication: string | null;

  @ResponseDtoBooleanProperty()
  public buysMedicationFromPopularPharmacy: boolean | null;

  @ResponseDtoEnumProperty(InterviewFormMedicalServiceTypeEnum)
  public medicalServiceType: InterviewFormMedicalServiceTypeEnum | null;

  @ResponseDtoStringProperty()
  public attendingDoctorName: string | null;

  @ResponseDtoStringProperty()
  public treatmentLocation: string | null;

  @ResponseDtoBooleanProperty()
  public hasLabReports: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasMedicalRecords: boolean | null;

  @ResponseDtoStringProperty()
  public hasAccidentReport: string | null;

  // Histórico Processual
  @ResponseDtoStringProperty()
  public hasAdministrativeClaimWithInss: string | null;

  @ResponseDtoStringProperty()
  public hasOngoingLawsuit: string | null;

  @ResponseDtoStringProperty()
  public hasPreviousLawsuit: string | null;

  @ResponseDtoStringProperty()
  public hasRequestedAdministrativeOrJudicialReview: string | null;

  // Documentos Entregues
  @ResponseDtoBooleanProperty()
  public hasRgCpfProofOfResidence: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasPapAndJudicialProcessCopy: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasCnisExtract: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasPppAndLtcat: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasReservistCertificate: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasRuralDocuments: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasCompleteCtpsCopy: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasPublicAdministrationWorkContract: boolean | null;

  @ResponseDtoBooleanProperty()
  public hasOtherDocuments: boolean | null;

  @ResponseDtoStringProperty()
  public otherDocumentsDescription: string | null;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetInterviewFormResponseDto.name;
}
