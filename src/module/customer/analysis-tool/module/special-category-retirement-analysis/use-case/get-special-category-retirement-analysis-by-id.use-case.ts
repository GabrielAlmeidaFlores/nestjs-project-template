import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import {
  GetSpecialCategoryRetirementAnalysisResponseDto,
  GetSpecialCategoryRetirementAnalysisWorkPeriodResponseDto,
  GetSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto,
  GetSpecialCategoryRetirementAnalysisResultResponseDto,
  GetSpecialCategoryRetirementAnalysisResultConversionItemResponseDto,
  GetSpecialCategoryRetirementAnalysisResultRuleItemResponseDto,
} from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/get-special-category-retirement-analysis.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetSpecialCategoryRetirementAnalysisByIdUseCase {
  protected readonly _type =
    GetSpecialCategoryRetirementAnalysisByIdUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisResponseDto> {
    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        specialCategoryRetirementAnalysisId,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    const periodDocumentsByWorkPeriod = new Map<
      string,
      GetSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto[]
    >();

    for (const doc of queryResult.periodDocuments) {
      const workPeriodKey =
        doc.specialCategoryRetirementAnalysisWorkPeriodId.toString();
      const existing = periodDocumentsByWorkPeriod.get(workPeriodKey) ?? [];
      const signedFileUrl = await this.bucketGateway.getSignedUrl(
        doc.storedFileExternalName,
      );
      existing.push(
        GetSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto.build({
          specialCategoryRetirementAnalysisPeriodDocumentId:
            doc.specialCategoryRetirementAnalysisPeriodDocumentId,
          retirementDocumentTypeCategory: doc.retirementDocumentTypeCategory,
          signedFileUrl: signedFileUrl.toString(),
          originalFileUploadName: doc.originalFileUploadName,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }),
      );
      periodDocumentsByWorkPeriod.set(workPeriodKey, existing);
    }

    const workPeriods = queryResult.workPeriods.map((wp) => {
      const docs =
        periodDocumentsByWorkPeriod.get(
          wp.specialCategoryRetirementAnalysisWorkPeriodId.toString(),
        ) ?? [];
      return GetSpecialCategoryRetirementAnalysisWorkPeriodResponseDto.build({
        specialCategoryRetirementAnalysisWorkPeriodId:
          wp.specialCategoryRetirementAnalysisWorkPeriodId,
        ...(wp.publicServiceAdmissionDate !== null && {
          publicServiceAdmissionDate: wp.publicServiceAdmissionDate,
        }),
        ...(wp.publicServiceCareerStartDate !== null && {
          publicServiceCareerStartDate: wp.publicServiceCareerStartDate,
        }),
        workPeriodStartDate: wp.workPeriodStartDate,
        workPeriodEndDate: wp.workPeriodEndDate,
        ...(wp.jobPositionTitle !== null && {
          jobPositionTitle: wp.jobPositionTitle,
        }),
        ...(wp.careerPathName !== null && {
          careerPathName: wp.careerPathName,
        }),
        ...(wp.publicServiceTypeCategory !== null && {
          publicServiceTypeCategory: wp.publicServiceTypeCategory,
        }),
        specialTimeRegistrationType: wp.specialTimeRegistrationType,
        ...(wp.effectiveSpecialWorkStartDate !== null && {
          effectiveSpecialWorkStartDate: wp.effectiveSpecialWorkStartDate,
        }),
        ...(wp.effectiveSpecialWorkEndDate !== null && {
          effectiveSpecialWorkEndDate: wp.effectiveSpecialWorkEndDate,
        }),
        periodDocuments: docs,
        createdAt: wp.createdAt,
        updatedAt: wp.updatedAt,
      });
    });

    let analysisResult:
      | GetSpecialCategoryRetirementAnalysisResultResponseDto
      | undefined;

    if (queryResult.analysisResult !== null) {
      const conversionItems = queryResult.conversionItems.map((item) =>
        GetSpecialCategoryRetirementAnalysisResultConversionItemResponseDto.build(
          {
            specialCategoryRetirementAnalysisResultConversionItemId:
              item.specialCategoryRetirementAnalysisResultConversionItemId,
            originJobTitleDescription: item.originJobTitleDescription,
            periodDateRangeText: item.periodDateRangeText,
            harmfulExposureAgentsText: item.harmfulExposureAgentsText,
            specialTimeDurationText: item.specialTimeDurationText,
            convertedTimeDurationText: item.convertedTimeDurationText,
            conversionFactorValue: item.conversionFactorValue,
            recognitionStatusEnum: item.recognitionStatusEnum,
          },
        ),
      );

      const ruleItems = queryResult.ruleItems.map((item) =>
        GetSpecialCategoryRetirementAnalysisResultRuleItemResponseDto.build({
          specialCategoryRetirementAnalysisResultRuleItemId:
            item.specialCategoryRetirementAnalysisResultRuleItemId,
          retirementModalityName: item.retirementModalityName,
          isRequirementMet: item.isRequirementMet,
          ...(item.projectedRetirementDate !== null && {
            projectedRetirementDate: item.projectedRetirementDate,
          }),
          ...(item.estimatedRmiAmount !== null && {
            estimatedRmiAmount: item.estimatedRmiAmount,
          }),
          isBestFinancialOption: item.isBestFinancialOption,
          ...(item.ruleDetailedExplanationText !== null && {
            ruleDetailedExplanationText: item.ruleDetailedExplanationText,
          }),
        }),
      );

      analysisResult =
        GetSpecialCategoryRetirementAnalysisResultResponseDto.build({
          specialCategoryRetirementAnalysisResultId:
            queryResult.analysisResult
              .specialCategoryRetirementAnalysisResultId,
          ...(queryResult.analysisResult.simplifiedAnalysisSummaryText !==
            null && {
            simplifiedAnalysisSummaryText:
              queryResult.analysisResult.simplifiedAnalysisSummaryText,
          }),
          ...(queryResult.analysisResult.fullAnalysisConclusionText !==
            null && {
            fullAnalysisConclusionText:
              queryResult.analysisResult.fullAnalysisConclusionText,
          }),
          conversionItems,
          ruleItems,
          createdAt: queryResult.analysisResult.createdAt,
          updatedAt: queryResult.analysisResult.updatedAt,
        });
    }

    return GetSpecialCategoryRetirementAnalysisResponseDto.build({
      specialCategoryRetirementAnalysisId:
        queryResult.specialCategoryRetirementAnalysisId,
      ...(queryResult.retirementAnalysisObjectiveType !== null && {
        retirementAnalysisObjectiveType:
          queryResult.retirementAnalysisObjectiveType,
      }),
      ...(queryResult.analysisCustomName !== null && {
        analysisCustomName: queryResult.analysisCustomName,
      }),
      ...(queryResult.publicServiceFederativeEntityName !== null && {
        publicServiceFederativeEntityName:
          queryResult.publicServiceFederativeEntityName,
      }),
      ...(queryResult.publicServiceStateAbbreviation !== null && {
        publicServiceStateAbbreviation:
          queryResult.publicServiceStateAbbreviation,
      }),
      hasConfirmedExposureToHarmfulAgents:
        queryResult.hasConfirmedExposureToHarmfulAgents,
      workPeriods,
      ...(analysisResult !== undefined && { analysisResult }),
      createdAt: queryResult.createdAt,
      updatedAt: queryResult.updatedAt,
    });
  }
}
