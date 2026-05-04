import { Inject, Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GetGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-period.response.dto';
import {
  GetGeneralUrbanRetirementReviewLegalProceedingResponseDto,
  GetGeneralUrbanRetirementReviewResponse,
  GetGeneralUrbanRetirementReviewInssBenefitResponseDto,
  GetGeneralUrbanRetirementReviewResultResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';

@Injectable()
export class GetGeneralUrbanRetirementReviewUseCase {
  protected readonly _type = GetGeneralUrbanRetirementReviewUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): Promise<GetGeneralUrbanRetirementReviewResponse> {
    const result =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    return {
      id: result.id.toString(),
      cnisDocument: result.cnisDocument ?? undefined,
      benefitAwardLetterDocument:
        result.benefitAwardLetterDocument ?? undefined,
      analysisName: result.analysisName ?? undefined,
      category: result.category ?? undefined,
      myInssPassword: result.myInssPassword ?? undefined,
      generalUrbanRetirementReviewBenefit:
        result.generalUrbanRetirementReviewBenefit?.map((b) =>
          GetGeneralUrbanRetirementReviewInssBenefitResponseDto.build({
            id: b.id,
            inssBenefitNumber: b.inssBenefitNumber,
            createdAt: b.createdAt,
            updatedAt: b.updatedAt,
          }),
        ) ?? undefined,
      generalUrbanRetirementReviewResult:
        result.generalUrbanRetirementReviewResult !== null
          ? GetGeneralUrbanRetirementReviewResultResponseDto.build({
              ...(result.generalUrbanRetirementReviewResult.clientName !==
                null && {
                clientName:
                  result.generalUrbanRetirementReviewResult.clientName,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .clientFederalDocument !== null && {
                clientFederalDocument:
                  result.generalUrbanRetirementReviewResult
                    .clientFederalDocument,
              }),
              ...(result.generalUrbanRetirementReviewResult.clientBirthDate !==
                null && {
                clientBirthDate:
                  result.generalUrbanRetirementReviewResult.clientBirthDate,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .clientLastAffiliationDate !== null && {
                clientLastAffiliationDate:
                  result.generalUrbanRetirementReviewResult
                    .clientLastAffiliationDate,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .benefitAwardLetterAnalysis !== null && {
                benefitAwardLetterAnalysis:
                  result.generalUrbanRetirementReviewResult
                    .benefitAwardLetterAnalysis,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .benefitAwardLetterAnalysisRaw !== null && {
                benefitAwardLetterAnalysisRaw:
                  result.generalUrbanRetirementReviewResult
                    .benefitAwardLetterAnalysisRaw,
              }),
              ...(result.generalUrbanRetirementReviewResult.firstAnalysis !==
                null && {
                firstAnalysis:
                  result.generalUrbanRetirementReviewResult.firstAnalysis,
              }),
              ...(result.generalUrbanRetirementReviewResult.compareCnisCtps !==
                null && {
                compareCnisCtps:
                  result.generalUrbanRetirementReviewResult.compareCnisCtps,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .compareCnisCtpsRaw !== null && {
                compareCnisCtpsRaw:
                  result.generalUrbanRetirementReviewResult.compareCnisCtpsRaw,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .generalUrbanRetirementReviewCompleteAnalysis !== null && {
                generalUrbanRetirementReviewCompleteAnalysis:
                  result.generalUrbanRetirementReviewResult
                    .generalUrbanRetirementReviewCompleteAnalysis,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .generalUrbanRetirementReviewSimplifiedAnalysis !== null && {
                generalUrbanRetirementReviewSimplifiedAnalysis:
                  result.generalUrbanRetirementReviewResult
                    .generalUrbanRetirementReviewSimplifiedAnalysis,
              }),
              ...(result.generalUrbanRetirementReviewResult
                .generalUrbanRetirementReviewCompleteAnalysisDownload !==
                null && {
                generalUrbanRetirementReviewCompleteAnalysisDownload:
                  result.generalUrbanRetirementReviewResult
                    .generalUrbanRetirementReviewCompleteAnalysisDownload,
              }),
            })
          : undefined,
      generalUrbanRetirementReviewLegalProceeding:
        result.generalUrbanRetirementReviewLegalProceeding?.map((p) =>
          GetGeneralUrbanRetirementReviewLegalProceedingResponseDto.build({
            id: p.id,
            legalProceedingNumber: p.legalProceedingNumber,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          }),
        ) ?? undefined,
      generalUrbanRetirementReviewPeriod:
        result.generalUrbanRetirementReviewPeriod?.map((p) =>
          GetGeneralUrbanRetirementReviewPeriodResponseDto.build({
            id: p.id,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            ...(p.periodName !== null && { periodName: p.periodName }),
            ...(p.periodStart !== null && { periodStart: p.periodStart }),
            ...(p.periodEnd !== null && { periodEnd: p.periodEnd }),
            ...(p.category !== null && { category: p.category }),
            ...(p.isPendency !== null && { isPendency: p.isPendency }),
            ...(p.competenceBelowTheMinimum !== null && {
              competenceBelowTheMinimum: p.competenceBelowTheMinimum,
            }),
            ...(p.contributionAverage !== null && {
              contributionAverage: p.contributionAverage,
            }),
            ...(p.typeOfContribution !== null && {
              typeOfContribution: p.typeOfContribution,
            }),
            ...(p.reasonPendency !== null && {
              reasonPendency: p.reasonPendency.toString(),
            }),
          }),
        ) ?? undefined,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt ?? undefined,
    } as unknown as GetGeneralUrbanRetirementReviewResponse;
  }
}
