import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SurvivorPensionAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/survivor-pension-analysis.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { GetSurvivorPensionAnalysisCompleteBoiResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-boi.response.dto';
import { GetSurvivorPensionAnalysisCompleteCpiResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-cpi.response.dto';
import { GetSurvivorPensionAnalysisCompleteDbdResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-dbd.response.dto';
import { GetSurvivorPensionAnalysisCompleteDwhPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-dwh-period.response.dto';
import { GetSurvivorPensionAnalysisCompleteDwhResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-dwh.response.dto';
import { GetSurvivorPensionAnalysisCompleteResultResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-complete-result.response.dto';
import { GetSurvivorPensionAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-document.response.dto';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { GetSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-retirement-rule.response.dto';
import { GetSurvivorPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis.response.dto';
import { SurvivorPensionAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/survivor-pension-analysis-remuneration.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSurvivorPensionAnalysisUseCase {
  protected readonly _type = GetSurvivorPensionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisQueryRepositoryGateway)
    private readonly survivorPensionAnalysisQueryRepositoryGateway: SurvivorPensionAnalysisQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const spaData =
      await this.survivorPensionAnalysisQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisId,
        SurvivorPensionAnalysisNotFoundError,
      );

    const cpiDocFileNames =
      spaData.customerProfileIdentification?.documents.map(
        (d) => d.documentName,
      ) ?? [];
    const boiDocFileNames =
      spaData.benefitOriginatorIdentification?.documents.map(
        (d) => d.documentName,
      ) ?? [];
    const dwhPeriodDocFileNames =
      spaData.deceasedWorkHistory?.periods.flatMap((p) =>
        p.documents.map((d) => d.documentName),
      ) ?? [];
    const dbdDocFileNames = spaData.deceasedBenefitDependents.flatMap((dbd) =>
      dbd.documents.map((d) => d.documentName),
    );
    const allFileNames = [
      ...cpiDocFileNames,
      ...boiDocFileNames,
      ...dwhPeriodDocFileNames,
      ...dbdDocFileNames,
    ];

    const [signedUrls, originalFileNames] = await Promise.all([
      Promise.all(
        allFileNames.map((fileName) =>
          this.fileProcessorGateway
            .getFileSignedUrl(fileName)
            .then((url) => url.toString()),
        ),
      ),
      Promise.all(
        allFileNames.map((fileName) =>
          this.fileProcessorGateway.getOriginalFileName(fileName),
        ),
      ),
    ]);

    let fileIndex = 0;

    const cpiDocs = (
      spaData.customerProfileIdentification?.documents ?? []
    ).map((doc, i) => {
      const idx = fileIndex + i;
      return GetSurvivorPensionAnalysisDocumentResponseDto.build({
        documentType: doc.documentType,
        documentName: doc.documentName,
        originalFileName: originalFileNames[idx] as string,
        signedUrl: signedUrls[idx] as string,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      });
    });
    fileIndex += cpiDocFileNames.length;

    const boiDocs = (
      spaData.benefitOriginatorIdentification?.documents ?? []
    ).map((doc, i) => {
      const idx = fileIndex + i;
      return GetSurvivorPensionAnalysisDocumentResponseDto.build({
        documentType: doc.documentType,
        documentName: doc.documentName,
        originalFileName: originalFileNames[idx] as string,
        signedUrl: signedUrls[idx] as string,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      });
    });
    fileIndex += boiDocFileNames.length;

    const dwhPeriodDtoList = (spaData.deceasedWorkHistory?.periods ?? []).map(
      (period) => {
        const periodDocs = period.documents.map((doc, i) => {
          const idx = fileIndex + i;
          return GetSurvivorPensionAnalysisDocumentResponseDto.build({
            documentType: doc.documentType,
            documentName: doc.documentName,
            originalFileName: originalFileNames[idx] as string,
            signedUrl: signedUrls[idx] as string,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
          });
        });
        fileIndex += period.documents.length;
        return GetSurvivorPensionAnalysisCompleteDwhPeriodResponseDto.build({
          survivorPensionAnalysisDeceasedWorkHistoryPeriodId: period.id,
          survivorPensionAnalysisDeceasedWorkHistoryId:
            period.survivorPensionAnalysisDeceasedWorkHistoryId,
          ...(period.startDate !== null && { startDate: period.startDate }),
          ...(period.endDate !== null && { endDate: period.endDate }),
          ...(period.specialPeriodStartDate !== null && {
            specialPeriodStartDate: period.specialPeriodStartDate,
          }),
          ...(period.specialPeriodEndDate !== null && {
            specialPeriodEndDate: period.specialPeriodEndDate,
          }),
          ...(period.specialTimeType !== null && {
            specialTimeType: period.specialTimeType,
          }),
          ...(period.jobTitle !== null && { jobTitle: period.jobTitle }),
          ...(period.careerName !== null && { careerName: period.careerName }),
          ...(period.serviceType !== null && {
            serviceType: period.serviceType,
          }),
          ...(period.department !== null && { department: period.department }),
          documents: periodDocs,
          createdAt: period.createdAt,
          updatedAt: period.updatedAt,
        });
      },
    );

    const dbdDtoList = spaData.deceasedBenefitDependents.map((dbd) => {
      const dbdDocs = dbd.documents.map((doc, i) => {
        const idx = fileIndex + i;
        return GetSurvivorPensionAnalysisDocumentResponseDto.build({
          documentType: doc.documentType,
          documentName: doc.documentName,
          originalFileName: originalFileNames[idx] as string,
          signedUrl: signedUrls[idx] as string,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        });
      });
      fileIndex += dbd.documents.length;
      return GetSurvivorPensionAnalysisCompleteDbdResponseDto.build({
        survivorPensionAnalysisDeceasedBenefitDependentsId: dbd.id,
        survivorPensionAnalysisId: dbd.survivorPensionAnalysisId,
        ...(dbd.dependentFullName !== null && {
          dependentFullName: dbd.dependentFullName,
        }),
        ...(dbd.dependencyClassificationLevel !== null && {
          dependencyClassificationLevel: dbd.dependencyClassificationLevel,
        }),
        ...(dbd.type !== null && { type: dbd.type }),
        ...(dbd.gender !== null && { gender: dbd.gender }),
        ...(dbd.dateOfBirth !== null && { dateOfBirth: dbd.dateOfBirth }),
        ...(dbd.hasDisabilityOrInvalidity !== null && {
          hasDisabilityOrInvalidity: dbd.hasDisabilityOrInvalidity,
        }),
        ...(dbd.unionCommencementDate !== null && {
          unionCommencementDate: dbd.unionCommencementDate,
        }),
        documents: dbdDocs,
        createdAt: dbd.createdAt,
        updatedAt: dbd.updatedAt,
      });
    });

    const cpiDto =
      spaData.customerProfileIdentification !== null
        ? GetSurvivorPensionAnalysisCompleteCpiResponseDto.build({
            survivorPensionAnalysisCustomerProfileIdentificationId:
              spaData.customerProfileIdentification.id,
            survivorPensionAnalysisId:
              spaData.customerProfileIdentification.survivorPensionAnalysisId,
            ...(spaData.customerProfileIdentification.analysisToolClientId !==
              null && {
              analysisToolClientId:
                spaData.customerProfileIdentification.analysisToolClientId,
            }),
            ...(spaData.customerProfileIdentification.clientJobTitle !==
              null && {
              clientJobTitle:
                spaData.customerProfileIdentification.clientJobTitle,
            }),
            ...(spaData.customerProfileIdentification.legalProceedingNumber !==
              null && {
              legalProceedingNumber:
                spaData.customerProfileIdentification.legalProceedingNumber,
            }),
            ...(spaData.customerProfileIdentification.inssBenefitNumber !==
              null && {
              inssBenefitNumber:
                spaData.customerProfileIdentification.inssBenefitNumber,
            }),
            ...(spaData.customerProfileIdentification.analysisName !== null && {
              analysisName: spaData.customerProfileIdentification.analysisName,
            }),
            ...(spaData.customerProfileIdentification.analysisPurpose !==
              null && {
              analysisPurpose:
                spaData.customerProfileIdentification.analysisPurpose,
            }),
            documents: cpiDocs,
            createdAt: spaData.customerProfileIdentification.createdAt,
            updatedAt: spaData.customerProfileIdentification.updatedAt,
          })
        : undefined;

    const boiDto =
      spaData.benefitOriginatorIdentification !== null
        ? GetSurvivorPensionAnalysisCompleteBoiResponseDto.build({
            survivorPensionAnalysisBenefitOriginatorIdentificationId:
              spaData.benefitOriginatorIdentification.id,
            survivorPensionAnalysisId:
              spaData.benefitOriginatorIdentification.survivorPensionAnalysisId,
            ...(spaData.benefitOriginatorIdentification.clientName !== null && {
              clientName: spaData.benefitOriginatorIdentification.clientName,
            }),
            ...(spaData.benefitOriginatorIdentification
              .clientFederalDocument !== null && {
              clientFederalDocument:
                spaData.benefitOriginatorIdentification.clientFederalDocument,
            }),
            ...(spaData.benefitOriginatorIdentification.clientBirthDate !==
              null && {
              clientBirthDate:
                spaData.benefitOriginatorIdentification.clientBirthDate,
            }),
            ...(spaData.benefitOriginatorIdentification.clientGender !==
              null && {
              clientGender:
                spaData.benefitOriginatorIdentification.clientGender,
            }),
            ...(spaData.benefitOriginatorIdentification.deathDate !== null && {
              deathDate: spaData.benefitOriginatorIdentification.deathDate,
            }),
            ...(spaData.benefitOriginatorIdentification.federativeEntity !==
              null && {
              federativeEntity:
                spaData.benefitOriginatorIdentification.federativeEntity,
            }),
            ...(spaData.benefitOriginatorIdentification.stateCode !== null && {
              stateCode: spaData.benefitOriginatorIdentification.stateCode,
            }),
            ...(spaData.benefitOriginatorIdentification
              .beneficiaryWasRetired !== null && {
              beneficiaryWasRetired:
                spaData.benefitOriginatorIdentification.beneficiaryWasRetired,
            }),
            documents: boiDocs,
            createdAt: spaData.benefitOriginatorIdentification.createdAt,
            updatedAt: spaData.benefitOriginatorIdentification.updatedAt,
          })
        : undefined;

    const dwhDto =
      spaData.deceasedWorkHistory !== null
        ? GetSurvivorPensionAnalysisCompleteDwhResponseDto.build({
            survivorPensionAnalysisDeceasedWorkHistoryId:
              spaData.deceasedWorkHistory.id,
            survivorPensionAnalysisId:
              spaData.deceasedWorkHistory.survivorPensionAnalysisId,
            ...(spaData.deceasedWorkHistory.startDate !== null && {
              startDate: spaData.deceasedWorkHistory.startDate,
            }),
            ...(spaData.deceasedWorkHistory.endDate !== null && {
              endDate: spaData.deceasedWorkHistory.endDate,
            }),
            remunerations: spaData.deceasedWorkHistory.remunerations.map(
              (remuneration) =>
                SurvivorPensionAnalysisRemunerationResponseDto.build({
                  remunerationDate: remuneration.remunerationDate,
                  remunerationAmount: remuneration.remunerationAmount,
                }),
            ),
            periods: dwhPeriodDtoList,
            createdAt: spaData.deceasedWorkHistory.createdAt,
            updatedAt: spaData.deceasedWorkHistory.updatedAt,
          })
        : undefined;

    const resultDto =
      spaData.result !== null
        ? GetSurvivorPensionAnalysisCompleteResultResponseDto.build({
            survivorPensionAnalysisResultId: spaData.result.id,
            survivorPensionAnalysisId: spaData.result.survivorPensionAnalysisId,
            ...(spaData.result.isInsuredStatusConfirmed !== null && {
              isInsuredStatusConfirmed: spaData.result.isInsuredStatusConfirmed,
            }),
            ...(spaData.result.insuredStatusSummary !== null && {
              insuredStatusSummary: spaData.result.insuredStatusSummary,
            }),
            ...(spaData.result.isRetirementRightConfirmed !== null && {
              isRetirementRightConfirmed:
                spaData.result.isRetirementRightConfirmed,
            }),
            ...(spaData.result.retirementRightSummary !== null && {
              retirementRightSummary: spaData.result.retirementRightSummary,
            }),
            ...(spaData.result.completeAnalysis !== null && {
              completeAnalysis: spaData.result.completeAnalysis,
            }),
            ...(spaData.result.simplifiedAnalysis !== null && {
              simplifiedAnalysis: spaData.result.simplifiedAnalysis,
            }),
            retirementRules: spaData.result.retirementRules.map((rr) =>
              GetSurvivorPensionAnalysisResultRetirementRuleResponseDto.build({
                survivorPensionAnalysisResultRetirementRuleId: rr.id,
                survivorPensionAnalysisResultId:
                  rr.survivorPensionAnalysisResultId,
                ...(rr.ruleName !== null && { ruleName: rr.ruleName }),
                ...(rr.isRequirementMet !== null && {
                  isRequirementMet: rr.isRequirementMet,
                }),
                ...(rr.entitlementDate !== null && {
                  entitlementDate: rr.entitlementDate,
                }),
                ...(rr.estimatedRmi !== null && {
                  estimatedRmi: rr.estimatedRmi,
                }),
                ...(rr.isBestRmi !== null && { isBestRmi: rr.isBestRmi }),
                ...(rr.isHighestClaimValue !== null && {
                  isHighestClaimValue: rr.isHighestClaimValue,
                }),
                ...(rr.detailedAnalysis !== null && {
                  detailedAnalysis: rr.detailedAnalysis,
                }),
                createdAt: rr.createdAt,
                updatedAt: rr.updatedAt,
              }),
            ),
            dependentPensionAnalyses:
              spaData.result.dependentPensionAnalyses.map((dpa) =>
                GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto.build(
                  {
                    survivorPensionAnalysisResultDependentPensionAnalysisId:
                      dpa.id,
                    survivorPensionAnalysisResultId:
                      dpa.survivorPensionAnalysisResultId,
                    ...(dpa.dependentName !== null && {
                      dependentName: dpa.dependentName,
                    }),
                    ...(dpa.dependencyDegree !== null && {
                      dependencyDegree: dpa.dependencyDegree,
                    }),
                    ...(dpa.isDependencyVerified !== null && {
                      isDependencyVerified: dpa.isDependencyVerified,
                    }),
                    ...(dpa.pensionStartDate !== null && {
                      pensionStartDate: dpa.pensionStartDate,
                    }),
                    ...(dpa.estimatedPensionDuration !== null && {
                      estimatedPensionDuration: dpa.estimatedPensionDuration,
                    }),
                    createdAt: dpa.createdAt,
                    updatedAt: dpa.updatedAt,
                  },
                ),
              ),
            createdAt: spaData.result.createdAt,
            updatedAt: spaData.result.updatedAt,
          })
        : undefined;

    return GetSurvivorPensionAnalysisResponseDto.build({
      survivorPensionAnalysisId: spaData.id,
      ...(cpiDto !== undefined && { customerProfileIdentification: cpiDto }),
      ...(boiDto !== undefined && {
        benefitOriginatorIdentification: boiDto,
      }),
      ...(dwhDto !== undefined && { deceasedWorkHistory: dwhDto }),
      deceasedBenefitDependents: dbdDtoList,
      ...(resultDto !== undefined && { result: resultDto }),
      createdAt: spaData.createdAt,
      updatedAt: spaData.updatedAt,
    });
  }
}
