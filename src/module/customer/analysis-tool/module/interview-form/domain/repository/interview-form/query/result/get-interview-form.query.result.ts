import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { InterviewFormBenefitTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-benefit-type.enum';
import type { InterviewFormMedicalServiceTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-medical-service-type.enum';
import type { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';

export class GetInterviewFormQueryResult extends BaseBuildableObject {
  public readonly interviewFormId: InterviewFormId;
  public readonly analysisToolClientId: string;

  public readonly clientName: string | null;
  public readonly clientCpf: string | null;
  public readonly clientRg: string | null;
  public readonly clientInssPassword: string | null;
  public readonly clientAddress: string | null;
  public readonly clientProfession: string | null;
  public readonly clientNit: string | null;
  public readonly clientCtpsNumber: string | null;
  public readonly clientBirthDate: string | null;
  public readonly clientMaritalStatus: string | null;
  public readonly clientRace: string | null;
  public readonly clientPhoneNumber: string | null;
  public readonly clientMotherName: string | null;
  public readonly clientFatherName: string | null;
  public readonly clientSpouseName: string | null;
  public readonly clientEmail: string | null;
  public readonly clientCtps: string | null;
  public readonly clientHasDisclosure: boolean | null;
  public readonly clientHasRpc: boolean | null;
  public readonly clientRegistrationDate: string | null;
  public readonly clientAge: string | null;
  public readonly clientNeighborhood: string | null;
  public readonly clientStreet: string | null;
  public readonly clientStreetNumber: string | null;
  public readonly clientIsMarriedOrInUnion: boolean | null;
  public readonly clientHasChildren: boolean | null;
  public readonly childrenNames: string[];

  public readonly isRetired: boolean | null;
  public readonly hasReceivedOrReceivesSocialSecurityBenefit: boolean | null;
  public readonly hasReceivedOrReceivesWelfareBenefit: boolean | null;
  public readonly socialSecurityBenefitType: string | null;
  public readonly socialSecurityBenefitNumber: string | null;
  public readonly welfareBenefitNumber: string | null;
  public readonly desiredBenefitType: InterviewFormBenefitTypeEnum | null;
  public readonly hasSocialSecurityDebt: boolean | null;
  public readonly socialSecurityDebtDate: string | null;
  public readonly socialSecurityDebtAmount: string | null;
  public readonly receivesBolsaFamilia: boolean | null;

  public readonly hasWorkedInSpecialActivities: boolean | null;
  public readonly specialActivityType: string | null;
  public readonly specialActivityAgent: string | null;
  public readonly hasPppOrLtcat: boolean | null;
  public readonly pppOrLtcatDetails: string | null;
  public readonly isCompanyOpenOrClosed: string | null;
  public readonly companyName: string | null;
  public readonly hasWorkedWithElectricity: boolean | null;
  public readonly hasWorkedAsVigilante: boolean | null;
  public readonly hasWorkedExposedToExcessiveNoise: boolean | null;

  public readonly hasWorkedInRuralArea: boolean | null;
  public readonly familyLivedInRuralAreaDuringChildhood: boolean | null;

  public readonly hasWorkedInPublicService: boolean | null;
  public readonly hasHeldPublicOffice: boolean | null;
  public readonly hasBeenCommissionedByPublicAdministration: boolean | null;

  public readonly hasBeenHospitalized: string | null;
  public readonly hasHealthProblems: string | null;
  public readonly hasHadAccident: string | null;
  public readonly hasHadWorkAccident: string | null;
  public readonly hasMedicalTreatment: string | null;
  public readonly takesContinuousMedication: string | null;
  public readonly buysMedicationFromPopularPharmacy: boolean | null;
  public readonly medicalServiceType: InterviewFormMedicalServiceTypeEnum | null;
  public readonly attendingDoctorName: string | null;
  public readonly treatmentLocation: string | null;
  public readonly hasLabReports: boolean | null;
  public readonly hasMedicalRecords: boolean | null;
  public readonly hasAccidentReport: string | null;

  public readonly hasAdministrativeClaimWithInss: string | null;
  public readonly hasOngoingLawsuit: string | null;
  public readonly hasPreviousLawsuit: string | null;
  public readonly hasRequestedAdministrativeOrJudicialReview: string | null;

  public readonly hasRgCpfProofOfResidence: boolean | null;
  public readonly hasPapAndJudicialProcessCopy: boolean | null;
  public readonly hasCnisExtract: boolean | null;
  public readonly hasPppAndLtcat: boolean | null;
  public readonly hasReservistCertificate: boolean | null;
  public readonly hasRuralDocuments: boolean | null;
  public readonly hasCompleteCtpsCopy: boolean | null;
  public readonly hasPublicAdministrationWorkContract: boolean | null;
  public readonly hasOtherDocuments: boolean | null;
  public readonly otherDocumentsDescription: string | null;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetInterviewFormQueryResult.name;
}
