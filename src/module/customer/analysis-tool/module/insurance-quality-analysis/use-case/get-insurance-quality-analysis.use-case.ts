import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { InsuranceQualityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/insurance-quality-analysis.query.repository.gateway';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import {
  GetInsuranceQualityAnalysisDocumentResponseDto,
  GetInsuranceQualityAnalysisResponseDto,
  GetInsuranceQualityAnalysisResultResponseDto,
} from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/response/get-insurance-quality-analysis.response.dto';
import { InsuranceQualityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/insurance-quality-analysis/error/insurance-quality-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetInsuranceQualityAnalysisUseCase {
  protected readonly _type = GetInsuranceQualityAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(InsuranceQualityAnalysisQueryRepositoryGateway)
    private readonly insuranceQualityAnalysisQueryRepositoryGateway: InsuranceQualityAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
  ): Promise<GetInsuranceQualityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByInsuranceQualityAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        insuranceQualityAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        InsuranceQualityAnalysisNotFoundError,
      );

    const insuranceQualityAnalysisQueryResult =
      await this.insuranceQualityAnalysisQueryRepositoryGateway.findOneByIdOrFail(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        insuranceQualityAnalysisId,
        InsuranceQualityAnalysisNotFoundError,
      );

    const analysisResult =
      insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisResult;

    const insuranceQualityAnalysisResult = analysisResult
      ? GetInsuranceQualityAnalysisResultResponseDto.build({
          clientName: analysisResult.clientName ?? null,
          clientFederalDocument: analysisResult.clientFederalDocument ?? null,
          clientBirthDate: analysisResult.clientBirthDate ?? null,
          insuranceQualityConclusion:
            analysisResult.insuranceQualityConclusion ?? null,
          gracePeriodConclusion: analysisResult.gracePeriodConclusion ?? null,
          finalRecommendation: analysisResult.finalRecommendation ?? null,
          analysisSummary: analysisResult.analysisSummary ?? null,
        })
      : null;

    const response = GetInsuranceQualityAnalysisResponseDto.build({
      insuranceQualityAnalysisId,
      analysisToolClientId: analysisToolRecordQueryResult.analysisToolClient.id,
      analysisBenefitNumber:
        insuranceQualityAnalysisQueryResult.analysisBenefitNumber ?? null,
      analysisBenefitType:
        insuranceQualityAnalysisQueryResult.analysisBenefitType ?? null,
      analysisBenefitConcessionDate:
        insuranceQualityAnalysisQueryResult.analysisBenefitConcessionDate ??
        null,
      analysisBenefitCessationDate:
        insuranceQualityAnalysisQueryResult.analysisBenefitCessationDate ??
        null,
      analysisHasPreviousBenefit:
        insuranceQualityAnalysisQueryResult.analysisHasPreviousBenefit ?? null,
      analysisPreviousBenefitDetails:
        insuranceQualityAnalysisQueryResult.analysisPreviousBenefitDetails ??
        null,
      analysisContributionSituation:
        insuranceQualityAnalysisQueryResult.analysisContributionSituation ??
        null,
      analysisHasRuralActivity:
        insuranceQualityAnalysisQueryResult.analysisHasRuralActivity ?? null,
      analysisRuralActivityDetails:
        insuranceQualityAnalysisQueryResult.analysisRuralActivityDetails ??
        null,
      insuranceQualityAnalysisResult,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });

    if (
      insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisDocument
        .length > 0
    ) {
      const documentUrls = await Promise.all(
        insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisDocument.map(
          async (document) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return {
              type: document.type,
              url,
              originalFileName,
            };
          },
        ),
      );

      response.documents = documentUrls.map((document) =>
        GetInsuranceQualityAnalysisDocumentResponseDto.build({
          type: document.type,
          url: document.url.toString(),
          originalFileName: document.originalFileName.toString(),
        }),
      );
    }

    return response;
  }
}
