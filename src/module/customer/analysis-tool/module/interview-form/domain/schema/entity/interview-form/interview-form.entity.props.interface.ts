import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { InterviewFormBenefitTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-benefit-type.enum';
import type { InterviewFormMedicalServiceTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-medical-service-type.enum';
import type { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';

export interface InterviewFormEntityPropsInterface extends BaseEntityPropsInterface<InterviewFormId> {
  analysisToolClientId: AnalysisToolClientId;

  // Dados do Cliente
  clientName?: string | null;
  clientCpf?: string | null;
  clientRg?: string | null;
  clientInssPassword?: string | null;
  clientAddress?: string | null;
  clientProfession?: string | null;
  clientNit?: string | null;
  clientCtpsNumber?: string | null;
  clientBirthDate?: string | null;
  clientMaritalStatus?: string | null;
  clientRace?: string | null;
  clientPhoneNumber?: string | null;
  clientMotherName?: string | null;
  clientFatherName?: string | null;
  clientSpouseName?: string | null;
  clientEmail?: string | null;
  clientCtps?: string | null;
  clientHasDisclosure?: boolean | null;
  clientHasRpc?: boolean | null;
  childrenNames?: string[] | null;

  // Dados Laborativos e Previdenciários
  isRetired?: boolean | null;
  hasReceivedOrReceivesSocialSecurityBenefit?: boolean | null;
  hasReceivedOrReceivesWelfareBenefit?: boolean | null;
  socialSecurityBenefitType?: string | null;
  socialSecurityBenefitNumber?: string | null;
  welfareBenefitNumber?: string | null;
  desiredBenefitType?: InterviewFormBenefitTypeEnum | null;
  hasSocialSecurityDebt?: boolean | null;
  socialSecurityDebtDate?: string | null;
  socialSecurityDebtAmount?: string | null;
  receivesBolsaFamilia?: boolean | null;

  // Atividades Especiais
  hasWorkedInSpecialActivities?: boolean | null;
  specialActivityType?: string | null;
  specialActivityAgent?: string | null;
  hasPppOrLtcat?: boolean | null;
  pppOrLtcatDetails?: string | null;
  isCompanyOpenOrClosed?: string | null;
  companyName?: string | null;
  hasWorkedWithElectricity?: boolean | null;
  hasWorkedAsVigilante?: boolean | null;
  hasWorkedExposedToExcessiveNoise?: boolean | null;

  // Trabalho Rural
  hasWorkedInRuralArea?: boolean | null;
  familyLivedInRuralAreaDuringChildhood?: boolean | null;

  // Serviço Público
  hasWorkedInPublicService?: boolean | null;
  hasHeldPublicOffice?: boolean | null;
  hasBeenCommissionedByPublicAdministration?: boolean | null;

  // Dados de Saúde Ocupacional
  hasBeenHospitalized?: string | null;
  hasHealthProblems?: string | null;
  hasHadAccident?: string | null;
  hasHadWorkAccident?: string | null;
  hasMedicalTreatment?: string | null;
  takesContinuousMedication?: string | null;
  buysMedicationFromPopularPharmacy?: boolean | null;
  medicalServiceType?: InterviewFormMedicalServiceTypeEnum | null;
  attendingDoctorName?: string | null;
  treatmentLocation?: string | null;
  hasLabReports?: boolean | null;
  hasMedicalRecords?: boolean | null;
  hasAccidentReport?: string | null;

  // Histórico Processual
  hasAdministrativeClaimWithInss?: string | null;
  hasOngoingLawsuit?: string | null;
  hasPreviousLawsuit?: string | null;
  hasRequestedAdministrativeOrJudicialReview?: string | null;

  // Documentos Entregues
  hasRgCpfProofOfResidence?: boolean | null;
  hasPapAndJudicialProcessCopy?: boolean | null;
  hasCnisExtract?: boolean | null;
  hasPppAndLtcat?: boolean | null;
  hasReservistCertificate?: boolean | null;
  hasRuralDocuments?: boolean | null;
  hasCompleteCtpsCopy?: boolean | null;
  hasPublicAdministrationWorkContract?: boolean | null;
  hasOtherDocuments?: boolean | null;
  otherDocumentsDescription?: string | null;

  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
