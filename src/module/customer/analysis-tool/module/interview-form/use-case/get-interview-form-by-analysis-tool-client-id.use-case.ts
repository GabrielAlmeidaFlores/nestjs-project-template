import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { InterviewFormQueryRepositoryGateway } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/query/interview-form.query.repository.gateway';
import { GetInterviewFormResponseDto } from '@module/customer/analysis-tool/module/interview-form/dto/response/get-interview-form.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetInterviewFormByAnalysisToolClientIdUseCase {
  protected readonly _type = GetInterviewFormByAnalysisToolClientIdUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(InterviewFormQueryRepositoryGateway)
    private readonly interviewFormQueryRepositoryGateway: InterviewFormQueryRepositoryGateway,
  ) {}

  public async execute(
    _sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetInterviewFormResponseDto> {
    await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
      analysisToolClientId,
      organizationSessionData.organizationId,
      AnalysisToolClientNotFoundError,
    );

    const result =
      await this.interviewFormQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationId(
        analysisToolClientId,
        organizationSessionData.organizationId,
      );

    if (result === null) {
      return {} as GetInterviewFormResponseDto;
    }

    return GetInterviewFormResponseDto.build({
      interviewFormId: result.interviewFormId,
      analysisToolClientId: result.analysisToolClientId,
      clientName: result.clientName,
      clientCpf: result.clientCpf,
      clientRg: result.clientRg,
      clientInssPassword: result.clientInssPassword,
      clientAddress: result.clientAddress,
      clientProfession: result.clientProfession,
      clientNit: result.clientNit,
      clientCtpsNumber: result.clientCtpsNumber,
      clientBirthDate: result.clientBirthDate,
      clientMaritalStatus: result.clientMaritalStatus,
      clientRace: result.clientRace,
      clientPhoneNumber: result.clientPhoneNumber,
      clientMotherName: result.clientMotherName,
      clientFatherName: result.clientFatherName,
      clientSpouseName: result.clientSpouseName,
      clientEmail: result.clientEmail,
      clientCtps: result.clientCtps,
      clientHasDisclosure: result.clientHasDisclosure,
      clientHasRpc: result.clientHasRpc,
      clientRegistrationDate: result.clientRegistrationDate,
      clientAge: result.clientAge,
      clientNeighborhood: result.clientNeighborhood,
      clientStreet: result.clientStreet,
      clientStreetNumber: result.clientStreetNumber,
      clientIsMarriedOrInUnion: result.clientIsMarriedOrInUnion,
      clientHasChildren: result.clientHasChildren,
      childrenNames: result.childrenNames,
      isRetired: result.isRetired,
      hasReceivedOrReceivesSocialSecurityBenefit:
        result.hasReceivedOrReceivesSocialSecurityBenefit,
      hasReceivedOrReceivesWelfareBenefit:
        result.hasReceivedOrReceivesWelfareBenefit,
      socialSecurityBenefitType: result.socialSecurityBenefitType,
      socialSecurityBenefitNumber: result.socialSecurityBenefitNumber,
      welfareBenefitNumber: result.welfareBenefitNumber,
      desiredBenefitType: result.desiredBenefitType,
      hasSocialSecurityDebt: result.hasSocialSecurityDebt,
      socialSecurityDebtDate: result.socialSecurityDebtDate,
      socialSecurityDebtAmount: result.socialSecurityDebtAmount,
      receivesBolsaFamilia: result.receivesBolsaFamilia,
      hasWorkedInSpecialActivities: result.hasWorkedInSpecialActivities,
      specialActivityType: result.specialActivityType,
      specialActivityAgent: result.specialActivityAgent,
      hasPppOrLtcat: result.hasPppOrLtcat,
      pppOrLtcatDetails: result.pppOrLtcatDetails,
      isCompanyOpenOrClosed: result.isCompanyOpenOrClosed,
      companyName: result.companyName,
      hasWorkedWithElectricity: result.hasWorkedWithElectricity,
      hasWorkedAsVigilante: result.hasWorkedAsVigilante,
      hasWorkedExposedToExcessiveNoise: result.hasWorkedExposedToExcessiveNoise,
      hasWorkedInRuralArea: result.hasWorkedInRuralArea,
      familyLivedInRuralAreaDuringChildhood:
        result.familyLivedInRuralAreaDuringChildhood,
      hasWorkedInPublicService: result.hasWorkedInPublicService,
      hasHeldPublicOffice: result.hasHeldPublicOffice,
      hasBeenCommissionedByPublicAdministration:
        result.hasBeenCommissionedByPublicAdministration,
      hasBeenHospitalized: result.hasBeenHospitalized,
      hasHealthProblems: result.hasHealthProblems,
      hasHadAccident: result.hasHadAccident,
      hasHadWorkAccident: result.hasHadWorkAccident,
      hasMedicalTreatment: result.hasMedicalTreatment,
      takesContinuousMedication: result.takesContinuousMedication,
      buysMedicationFromPopularPharmacy:
        result.buysMedicationFromPopularPharmacy,
      medicalServiceType: result.medicalServiceType,
      attendingDoctorName: result.attendingDoctorName,
      treatmentLocation: result.treatmentLocation,
      hasLabReports: result.hasLabReports,
      hasMedicalRecords: result.hasMedicalRecords,
      hasAccidentReport: result.hasAccidentReport,
      hasAdministrativeClaimWithInss: result.hasAdministrativeClaimWithInss,
      hasOngoingLawsuit: result.hasOngoingLawsuit,
      hasPreviousLawsuit: result.hasPreviousLawsuit,
      hasRequestedAdministrativeOrJudicialReview:
        result.hasRequestedAdministrativeOrJudicialReview,
      hasRgCpfProofOfResidence: result.hasRgCpfProofOfResidence,
      hasPapAndJudicialProcessCopy: result.hasPapAndJudicialProcessCopy,
      hasCnisExtract: result.hasCnisExtract,
      hasPppAndLtcat: result.hasPppAndLtcat,
      hasReservistCertificate: result.hasReservistCertificate,
      hasRuralDocuments: result.hasRuralDocuments,
      hasCompleteCtpsCopy: result.hasCompleteCtpsCopy,
      hasPublicAdministrationWorkContract:
        result.hasPublicAdministrationWorkContract,
      hasOtherDocuments: result.hasOtherDocuments,
      otherDocumentsDescription: result.otherDocumentsDescription,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
