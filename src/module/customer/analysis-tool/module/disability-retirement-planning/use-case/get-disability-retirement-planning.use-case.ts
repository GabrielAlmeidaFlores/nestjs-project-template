import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { CidTenNotFoundError } from '@module/customer/analysis-tool/error/cid-ten-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningCompleteAnalysisModel, DisabilityRetirementPlanningRetirementOptionModel, DisabilityRetirementPlanningTimelinePeriodModel } from '@module/customer/analysis-tool/module/disability-retirement-planning/model/generic/disability-retirement-planning-complete-analysis.model';
import { DisabilityRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/disability-retirement-planning-activity-type.enum';
import {
  GetDisabilityRetirementPlanningCidResponseDto,
  GetDisabilityRetirementPlanningDocumentResponseDto,
  GetDisabilityRetirementPlanningPeriodDisabilityDocumentResponseDto,
  GetDisabilityRetirementPlanningPeriodDisabilityResponseDto,
  GetDisabilityRetirementPlanningPeriodResponseDto,
  GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentResponseDto,
  GetDisabilityRetirementPlanningPeriodSpecialTimeResponseDto,
  GetDisabilityRetirementPlanningResponseDto,
  GetDisabilityRetirementPlanningResultResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetDisabilityRetirementPlanningUseCase {
  protected readonly _type = GetDisabilityRetirementPlanningUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(CidTenQueryRepositoryGateway)
    private readonly cidTenQueryRepositoryGateway: CidTenQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (!queryResult) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const documents = await Promise.all(
      queryResult.documents.map(async (doc) => {
        const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(
            doc.document,
          );
        return GetDisabilityRetirementPlanningDocumentResponseDto.build({
          type: doc.type,
          document: Base64.encodeBuffer(fileBuffer),
          originalFileName,
        });
      }),
    );

    const periods = await Promise.all(
      queryResult.periods.map(async (period) => {
        const disabilities = await Promise.all(
          period.disabilities.map(async (disability) => {
            const disabilityDocuments = await Promise.all(
              disability.documents.map(async (doc) => {
                const fileBuffer =
                  await this.fileProcessorGateway.getFileBuffer(
                    doc.document,
                  );
                const originalFileName =
                  await this.fileProcessorGateway.getOriginalFileName(
                    doc.document,
                  );
                return GetDisabilityRetirementPlanningPeriodDisabilityDocumentResponseDto.build(
                  {
                    document: Base64.encodeBuffer(fileBuffer),
                    originalFileName,
                  },
                );
              }),
            );

            const cid =
              disability.cidTenId !== null
                ? await this.cidTenQueryRepositoryGateway.findOneByIdOrFail(
                    new CidTenId(disability.cidTenId),
                    CidTenNotFoundError,
                  )
                : null;

            return GetDisabilityRetirementPlanningPeriodDisabilityResponseDto.build(
              {
                disabilityType: disability.disabilityType,
                disabilityDegree: disability.disabilityDegree,
                disabilityCategory: disability.disabilityCategory,
                startDate: disability.startDate,
                ...(disability.endDate !== null && {
                  endDate: disability.endDate,
                }),
                disabilityDescription: disability.disabilityDescription,
                activityImpact: disability.activityImpact,
                ...(cid !== null && {
                  cid: GetDisabilityRetirementPlanningCidResponseDto.build({
                    id: cid.id,
                    code: cid.code,
                    description: cid.description,
                  }),
                }),
                documents: disabilityDocuments,
              },
            );
          }),
        );

        const specialTimes = await Promise.all(
          period.specialTimes.map(async (specialTime) => {
            const specialTimeDocuments = await Promise.all(
              specialTime.documents.map(async (doc) => {
                const fileBuffer =
                  await this.fileProcessorGateway.getFileBuffer(
                    doc.document,
                  );
                const originalFileName =
                  await this.fileProcessorGateway.getOriginalFileName(
                    doc.document,
                  );
                return GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentResponseDto.build(
                  {
                    document: Base64.encodeBuffer(fileBuffer),
                    originalFileName,
                  },
                );
              }),
            );

            return GetDisabilityRetirementPlanningPeriodSpecialTimeResponseDto.build(
              {
                startDate: specialTime.startDate,
                ...(specialTime.endDate !== null && {
                  endDate: specialTime.endDate,
                }),
                documents: specialTimeDocuments,
              },
            );
          }),
        );

        return GetDisabilityRetirementPlanningPeriodResponseDto.build({
          startDate: period.startDate,
          ...(period.endDate !== null && { endDate: period.endDate }),
          jobPosition: period.jobPosition,
          careerName: period.careerName,
          serviceType: period.serviceType,
          department: period.department,
          disabilities,
          specialTimes,
        });
      }),
    );

    const disabilityRetirementPlanningResult =
      queryResult.result !== null
        ? GetDisabilityRetirementPlanningResultResponseDto.build({
            ...(queryResult.result
              .disabilityRetirementPlanningCompleteAnalysis !== null && {
              disabilityRetirementPlanningCompleteAnalysis: (() => {
                const raw = JSON.parse(
                  queryResult.result.disabilityRetirementPlanningCompleteAnalysis,
                ) as {
                  timeline: Array<{ startDate: string; endDate: string; activityType: DisabilityRetirementPlanningActivityTypeEnum; location: string }>;
                  retirementOptionsSummary: Array<{
                    retirementRuleName: string;
                    isEligible: boolean;
                    eligibilityAvailableAt?: string;
                    expectedMonthlyBenefit: number;
                    isBestMonthlyBenefit: boolean;
                    hasHighestAdvantageValue: boolean;
                    retirementAnalysis: string;
                  }>;
                  analysisResult: string;
                  disabilityTime: string;
                  commonTime: string;
                  totalContributionTime: string;
                  positionTenureTime: string;
                  publicServiceTime: string;
                  totalCareerTime: string;
                  insuredAge: string;
                  publicServiceStartDate: string;
                };

                return DisabilityRetirementPlanningCompleteAnalysisModel.build({
                  timeline: raw.timeline.map((p) =>
                    DisabilityRetirementPlanningTimelinePeriodModel.build(p),
                  ),
                  retirementOptionsSummary: raw.retirementOptionsSummary.map(
                    (o) =>
                      DisabilityRetirementPlanningRetirementOptionModel.build(o),
                  ),
                  analysisResult: raw.analysisResult,
                  disabilityTime: raw.disabilityTime,
                  commonTime: raw.commonTime,
                  totalContributionTime: raw.totalContributionTime,
                  positionTenureTime: raw.positionTenureTime,
                  publicServiceTime: raw.publicServiceTime,
                  totalCareerTime: raw.totalCareerTime,
                  insuredAge: raw.insuredAge,
                  publicServiceStartDate: raw.publicServiceStartDate,
                });
              })(),
            }),
            ...(queryResult.result
              .disabilityRetirementPlanningSimplifiedAnalysis !== null && {
              disabilityRetirementPlanningSimplifiedAnalysis: JSON.parse(
                queryResult.result
                  .disabilityRetirementPlanningSimplifiedAnalysis,
              ) as object,
            }),
            ...(queryResult.result
              .disabilityRetirementPlanningCompleteAnalysisDownload !==
              null && {
              disabilityRetirementPlanningCompleteAnalysisDownload:
                queryResult.result
                  .disabilityRetirementPlanningCompleteAnalysisDownload,
            }),
            createdAt: queryResult.createdAt,
            updatedAt: queryResult.updatedAt,
          })
        : null;

    const legalProceedingNumber = queryResult.legalProceedings.map(
      (entity) => entity.legalProceedingNumber,
    );

    const inssBenefitNumber = queryResult.inssBenefits.map(
      (entity) => entity.benefitNumber,
    );

    return GetDisabilityRetirementPlanningResponseDto.build({
      id: queryResult.id,
      currentPosition: queryResult.currentPosition,
      federativeEntity: queryResult.federativeEntity,
      ...(queryResult.state !== null && { state: queryResult.state }),
      ...(queryResult.municipality !== null && {
        municipality: queryResult.municipality,
      }),
      longTimeDisability: queryResult.longTimeDisability,
      publicServiceStartDate: queryResult.publicServiceStartDate,
      careerStartDate: queryResult.careerStartDate,
      ...(queryResult.analysisName !== null && {
        analysisName: queryResult.analysisName,
      }),
      createdAt: queryResult.createdAt,
      updatedAt: queryResult.updatedAt,
      legalProceedingNumber,
      inssBenefitNumber,
      totalRemunerations: queryResult.remunerations.length,
      ...(disabilityRetirementPlanningResult !== null && {
        disabilityRetirementPlanningResult,
      }),
      documents,
      periods,
    });
  }
}
