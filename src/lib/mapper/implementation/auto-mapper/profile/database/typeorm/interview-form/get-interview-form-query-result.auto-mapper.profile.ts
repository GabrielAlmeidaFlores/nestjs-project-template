import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InterviewFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/interview-form.typeorm.entity';
import { GetInterviewFormQueryResult } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/query/result/get-interview-form.query.result';
import { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';

import type { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

@Injectable()
export class GetInterviewFormQueryResultAutoMapperProfile {
  protected readonly _type = GetInterviewFormQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: InterviewFormTypeormEntity,
    ): GetInterviewFormQueryResult => {
      return GetInterviewFormQueryResult.build({
        interviewFormId: new InterviewFormId(source.id),
        analysisToolClientId: source.analysisToolClient?.id ?? '',
        clientName: source.clientName,
        clientCpf: source.clientCpf,
        clientRg: source.clientRg,
        clientInssPassword: source.clientInssPassword,
        clientAddress: source.clientAddress,
        clientProfession: source.clientProfession,
        clientNit: source.clientNit,
        clientCtpsNumber: source.clientCtpsNumber,
        clientBirthDate: source.clientBirthDate,
        clientMaritalStatus: source.clientMaritalStatus,
        clientRace: source.clientRace,
        clientPhoneNumber: source.clientPhoneNumber,
        clientMotherName: source.clientMotherName,
        clientFatherName: source.clientFatherName,
        clientSpouseName: source.clientSpouseName,
        clientEmail: source.clientEmail,
        clientCtps: source.clientCtps,
        clientHasDisclosure: source.clientHasDisclosure,
        clientHasRpc: source.clientHasRpc,
        childrenNames: source.childrenNames ?? [],
        isRetired: source.isRetired,
        hasReceivedOrReceivesSocialSecurityBenefit:
          source.hasReceivedOrReceivesSocialSecurityBenefit,
        hasReceivedOrReceivesWelfareBenefit:
          source.hasReceivedOrReceivesWelfareBenefit,
        socialSecurityBenefitType: source.socialSecurityBenefitType,
        socialSecurityBenefitNumber: source.socialSecurityBenefitNumber,
        welfareBenefitNumber: source.welfareBenefitNumber,
        desiredBenefitType: source.desiredBenefitType,
        hasSocialSecurityDebt: source.hasSocialSecurityDebt,
        socialSecurityDebtDate: source.socialSecurityDebtDate,
        socialSecurityDebtAmount: source.socialSecurityDebtAmount,
        receivesBolsaFamilia: source.receivesBolsaFamilia,
        hasWorkedInSpecialActivities: source.hasWorkedInSpecialActivities,
        specialActivityType: source.specialActivityType,
        specialActivityAgent: source.specialActivityAgent,
        hasPppOrLtcat: source.hasPppOrLtcat,
        pppOrLtcatDetails: source.pppOrLtcatDetails,
        isCompanyOpenOrClosed: source.isCompanyOpenOrClosed,
        companyName: source.companyName,
        hasWorkedWithElectricity: source.hasWorkedWithElectricity,
        hasWorkedAsVigilante: source.hasWorkedAsVigilante,
        hasWorkedExposedToExcessiveNoise:
          source.hasWorkedExposedToExcessiveNoise,
        hasWorkedInRuralArea: source.hasWorkedInRuralArea,
        familyLivedInRuralAreaDuringChildhood:
          source.familyLivedInRuralAreaDuringChildhood,
        hasWorkedInPublicService: source.hasWorkedInPublicService,
        hasHeldPublicOffice: source.hasHeldPublicOffice,
        hasBeenCommissionedByPublicAdministration:
          source.hasBeenCommissionedByPublicAdministration,
        hasBeenHospitalized: source.hasBeenHospitalized,
        hasHealthProblems: source.hasHealthProblems,
        hasHadAccident: source.hasHadAccident,
        hasHadWorkAccident: source.hasHadWorkAccident,
        hasMedicalTreatment: source.hasMedicalTreatment,
        takesContinuousMedication: source.takesContinuousMedication,
        buysMedicationFromPopularPharmacy:
          source.buysMedicationFromPopularPharmacy,
        medicalServiceType: source.medicalServiceType,
        attendingDoctorName: source.attendingDoctorName,
        treatmentLocation: source.treatmentLocation,
        hasLabReports: source.hasLabReports,
        hasMedicalRecords: source.hasMedicalRecords,
        hasAccidentReport: source.hasAccidentReport,
        hasAdministrativeClaimWithInss: source.hasAdministrativeClaimWithInss,
        hasOngoingLawsuit: source.hasOngoingLawsuit,
        hasPreviousLawsuit: source.hasPreviousLawsuit,
        hasRequestedAdministrativeOrJudicialReview:
          source.hasRequestedAdministrativeOrJudicialReview,
        hasRgCpfProofOfResidence: source.hasRgCpfProofOfResidence,
        hasPapAndJudicialProcessCopy: source.hasPapAndJudicialProcessCopy,
        hasCnisExtract: source.hasCnisExtract,
        hasPppAndLtcat: source.hasPppAndLtcat,
        hasReservistCertificate: source.hasReservistCertificate,
        hasRuralDocuments: source.hasRuralDocuments,
        hasCompleteCtpsCopy: source.hasCompleteCtpsCopy,
        hasPublicAdministrationWorkContract:
          source.hasPublicAdministrationWorkContract,
        hasOtherDocuments: source.hasOtherDocuments,
        otherDocumentsDescription: source.otherDocumentsDescription,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    createMap(
      this.mapper,
      InterviewFormTypeormEntity,
      GetInterviewFormQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetInterviewFormQueryResult,
    ): InterviewFormTypeormEntity => {
      const analysisToolClient = {
        id: source.analysisToolClientId,
      } as AnalysisToolClientTypeormEntity;

      const {
        interviewFormId,
        analysisToolClientId: _clientId,
        ...rest
      } = source;

      return InterviewFormTypeormEntity.build({
        ...rest,
        id: interviewFormId.toString(),
        analysisToolClient,
      } as PublicPropertyType<InterviewFormTypeormEntity>);
    };

    createMap(
      this.mapper,
      GetInterviewFormQueryResult,
      InterviewFormTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
