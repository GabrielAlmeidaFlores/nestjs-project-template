import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { InterviewFormCommandRepositoryGateway } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/command/interview-form.command.repository.gateway';
import { InterviewFormQueryRepositoryGateway } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/query/interview-form.query.repository.gateway';
import { InterviewFormEntity } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/interview-form.entity';
import { UpsertInterviewFormRequestDto } from '@module/customer/analysis-tool/module/interview-form/dto/request/upsert-interview-form.request.dto';
import { UpsertInterviewFormResponseDto } from '@module/customer/analysis-tool/module/interview-form/dto/response/upsert-interview-form.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpsertInterviewFormUseCase {
  protected readonly _type = UpsertInterviewFormUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(InterviewFormQueryRepositoryGateway)
    private readonly interviewFormQueryRepositoryGateway: InterviewFormQueryRepositoryGateway,
    @Inject(InterviewFormCommandRepositoryGateway)
    private readonly interviewFormCommandRepositoryGateway: InterviewFormCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: UpsertInterviewFormRequestDto,
  ): Promise<UpsertInterviewFormResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
      dto.analysisToolClientId,
      organizationSessionData.organizationId,
      AnalysisToolClientNotFoundError,
    );

    const existingForm =
      await this.interviewFormQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationId(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
      );

    const interviewForm = new InterviewFormEntity({
      id: existingForm?.interviewFormId ?? null,
      analysisToolClientId: dto.analysisToolClientId,
      clientName: dto.clientName ?? null,
      clientCpf: dto.clientCpf ?? null,
      clientRg: dto.clientRg ?? null,
      clientInssPassword: dto.clientInssPassword ?? null,
      clientAddress: dto.clientAddress ?? null,
      clientProfession: dto.clientProfession ?? null,
      clientNit: dto.clientNit ?? null,
      clientCtpsNumber: dto.clientCtpsNumber ?? null,
      clientBirthDate: dto.clientBirthDate ?? null,
      clientMaritalStatus: dto.clientMaritalStatus ?? null,
      clientRace: dto.clientRace ?? null,
      clientPhoneNumber: dto.clientPhoneNumber ?? null,
      clientMotherName: dto.clientMotherName ?? null,
      clientFatherName: dto.clientFatherName ?? null,
      clientSpouseName: dto.clientSpouseName ?? null,
      clientEmail: dto.clientEmail ?? null,
      clientCtps: dto.clientCtps ?? null,
      clientHasDisclosure: dto.clientHasDisclosure ?? null,
      clientHasRpc: dto.clientHasRpc ?? null,
      clientRegistrationDate: dto.clientRegistrationDate ?? null,
      clientAge: dto.clientAge ?? null,
      clientNeighborhood: dto.clientNeighborhood ?? null,
      clientStreet: dto.clientStreet ?? null,
      clientStreetNumber: dto.clientStreetNumber ?? null,
      clientIsMarriedOrInUnion: dto.clientIsMarriedOrInUnion ?? null,
      clientHasChildren: dto.clientHasChildren ?? null,
      childrenNames: dto.childrenNames ?? null,
      isRetired: dto.isRetired ?? null,
      hasReceivedOrReceivesSocialSecurityBenefit:
        dto.hasReceivedOrReceivesSocialSecurityBenefit ?? null,
      hasReceivedOrReceivesWelfareBenefit:
        dto.hasReceivedOrReceivesWelfareBenefit ?? null,
      socialSecurityBenefitType: dto.socialSecurityBenefitType ?? null,
      socialSecurityBenefitNumber: dto.socialSecurityBenefitNumber ?? null,
      welfareBenefitNumber: dto.welfareBenefitNumber ?? null,
      desiredBenefitType: dto.desiredBenefitType ?? null,
      hasSocialSecurityDebt: dto.hasSocialSecurityDebt ?? null,
      socialSecurityDebtDate: dto.socialSecurityDebtDate ?? null,
      socialSecurityDebtAmount: dto.socialSecurityDebtAmount ?? null,
      receivesBolsaFamilia: dto.receivesBolsaFamilia ?? null,
      hasWorkedInSpecialActivities: dto.hasWorkedInSpecialActivities ?? null,
      specialActivityType: dto.specialActivityType ?? null,
      specialActivityAgent: dto.specialActivityAgent ?? null,
      hasPppOrLtcat: dto.hasPppOrLtcat ?? null,
      pppOrLtcatDetails: dto.pppOrLtcatDetails ?? null,
      isCompanyOpenOrClosed: dto.isCompanyOpenOrClosed ?? null,
      companyName: dto.companyName ?? null,
      hasWorkedWithElectricity: dto.hasWorkedWithElectricity ?? null,
      hasWorkedAsVigilante: dto.hasWorkedAsVigilante ?? null,
      hasWorkedExposedToExcessiveNoise:
        dto.hasWorkedExposedToExcessiveNoise ?? null,
      hasWorkedInRuralArea: dto.hasWorkedInRuralArea ?? null,
      familyLivedInRuralAreaDuringChildhood:
        dto.familyLivedInRuralAreaDuringChildhood ?? null,
      hasWorkedInPublicService: dto.hasWorkedInPublicService ?? null,
      hasHeldPublicOffice: dto.hasHeldPublicOffice ?? null,
      hasBeenCommissionedByPublicAdministration:
        dto.hasBeenCommissionedByPublicAdministration ?? null,
      hasBeenHospitalized: dto.hasBeenHospitalized ?? null,
      hasHealthProblems: dto.hasHealthProblems ?? null,
      hasHadAccident: dto.hasHadAccident ?? null,
      hasHadWorkAccident: dto.hasHadWorkAccident ?? null,
      hasMedicalTreatment: dto.hasMedicalTreatment ?? null,
      takesContinuousMedication: dto.takesContinuousMedication ?? null,
      buysMedicationFromPopularPharmacy:
        dto.buysMedicationFromPopularPharmacy ?? null,
      medicalServiceType: dto.medicalServiceType ?? null,
      attendingDoctorName: dto.attendingDoctorName ?? null,
      treatmentLocation: dto.treatmentLocation ?? null,
      hasLabReports: dto.hasLabReports ?? null,
      hasMedicalRecords: dto.hasMedicalRecords ?? null,
      hasAccidentReport: dto.hasAccidentReport ?? null,
      hasAdministrativeClaimWithInss:
        dto.hasAdministrativeClaimWithInss ?? null,
      hasOngoingLawsuit: dto.hasOngoingLawsuit ?? null,
      hasPreviousLawsuit: dto.hasPreviousLawsuit ?? null,
      hasRequestedAdministrativeOrJudicialReview:
        dto.hasRequestedAdministrativeOrJudicialReview ?? null,
      hasRgCpfProofOfResidence: dto.hasRgCpfProofOfResidence ?? null,
      hasPapAndJudicialProcessCopy: dto.hasPapAndJudicialProcessCopy ?? null,
      hasCnisExtract: dto.hasCnisExtract ?? null,
      hasPppAndLtcat: dto.hasPppAndLtcat ?? null,
      hasReservistCertificate: dto.hasReservistCertificate ?? null,
      hasRuralDocuments: dto.hasRuralDocuments ?? null,
      hasCompleteCtpsCopy: dto.hasCompleteCtpsCopy ?? null,
      hasPublicAdministrationWorkContract:
        dto.hasPublicAdministrationWorkContract ?? null,
      hasOtherDocuments: dto.hasOtherDocuments ?? null,
      otherDocumentsDescription: dto.otherDocumentsDescription ?? null,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    if (existingForm !== null) {
      const updateTransaction =
        this.interviewFormCommandRepositoryGateway.updateInterviewForm(
          existingForm.interviewFormId,
          interviewForm,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);

      await transaction.commit();
    } else {
      const createTransaction =
        this.interviewFormCommandRepositoryGateway.createInterviewForm(
          interviewForm,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        createTransaction,
      ]);

      await transaction.commit();
    }

    return UpsertInterviewFormResponseDto.build({
      interviewFormId: interviewForm.id,
    });
  }
}
