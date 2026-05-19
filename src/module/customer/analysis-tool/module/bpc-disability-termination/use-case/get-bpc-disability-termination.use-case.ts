import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/bpc-disability-termination.query.repository.gateway';
import { GetBpcDisabilityTerminationDisabilityAssessmentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment.query.result';
import { GetBpcDisabilityTerminationDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-document.query.result';
import { GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member-document.query.result';
import { GetBpcDisabilityTerminationFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member.query.result';
import { GetBpcDisabilityTerminationResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/query/result/get-bpc-disability-termination-result.query.result';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import {
  BpcDisabilityTerminationApplicableRuleResponseDto,
  BpcDisabilityTerminationBenefitSummaryResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-result.response.dto';
import {
  GetBpcDisabilityTerminationClientResponseDto,
  GetBpcDisabilityTerminationDisabilityAssessmentDocumentResponseDto,
  GetBpcDisabilityTerminationDisabilityAssessmentResponseDto,
  GetBpcDisabilityTerminationDocumentResponseDto,
  GetBpcDisabilityTerminationFamilyMemberDocumentResponseDto,
  GetBpcDisabilityTerminationFamilyMemberResponseDto,
  GetBpcDisabilityTerminationResponseDto,
  GetBpcDisabilityTerminationResponsibleResponseDto,
  GetBpcDisabilityTerminationResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/get-bpc-disability-termination.response.dto';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import {
  BpcDisabilityTerminationApplicableRuleInterface,
  BpcDisabilityTerminationBenefitSummaryInterface,
} from '@module/customer/analysis-tool/module/bpc-disability-termination/interface/bpc-disability-termination-result.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetBpcDisabilityTerminationUseCase {
  protected readonly _type = GetBpcDisabilityTerminationUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationQueryRepositoryGateway)
    private readonly bpcDisabilityTerminationQueryRepositoryGateway: BpcDisabilityTerminationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): Promise<GetBpcDisabilityTerminationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityTerminationNotFoundError,
      );

    const bpcDisabilityTerminationQueryResult =
      await this.bpcDisabilityTerminationQueryRepositoryGateway.findOneByBpcDisabilityTerminationIdAndOrganizationIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        BpcDisabilityTerminationNotFoundError,
      );

    const familyMembers = await Promise.all(
      bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationFamilyMember.map(
        async (
          familyMember: GetBpcDisabilityTerminationFamilyMemberQueryResult,
        ) => this.buildFamilyMemberResponseDto(familyMember),
      ),
    );

    const response = GetBpcDisabilityTerminationResponseDto.build({
      id: bpcDisabilityTerminationQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetBpcDisabilityTerminationClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      ...(bpcDisabilityTerminationQueryResult.analysisName !== null && {
        analysisName: bpcDisabilityTerminationQueryResult.analysisName,
      }),
      ...(bpcDisabilityTerminationQueryResult.category !== null && {
        category: bpcDisabilityTerminationQueryResult.category,
      }),
      ...(bpcDisabilityTerminationQueryResult.disabilityType !== null && {
        disabilityType: bpcDisabilityTerminationQueryResult.disabilityType,
      }),
      ...(bpcDisabilityTerminationQueryResult.disabilityDegree !== null && {
        disabilityDegree: bpcDisabilityTerminationQueryResult.disabilityDegree,
      }),
      ...(bpcDisabilityTerminationQueryResult.benefitCessationReason !==
        null && {
        benefitCessationReason:
          bpcDisabilityTerminationQueryResult.benefitCessationReason,
      }),
      ...(bpcDisabilityTerminationQueryResult.livesAlone !== null && {
        livesAlone: bpcDisabilityTerminationQueryResult.livesAlone,
      }),
      ...(bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationResult !==
        null && {
        bpcDisabilityTerminationResult: this.buildResultResponseDto(
          bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationResult,
        ),
      }),
      ...(bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationDisabilityAssessment !==
        null && {
        disabilityAssessment: await this.buildDisabilityAssessmentResponseDto(
          bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationDisabilityAssessment,
        ),
      }),
      ...(familyMembers.length > 0 && { familyMembers }),
      ...(bpcDisabilityTerminationQueryResult
        .bpcDisabilityTerminationInssBenefit.length > 0 && {
        inssBenefitNumbers:
          bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationInssBenefit.map(
            (benefit) => benefit.inssBenefitNumber,
          ),
      }),
      ...(bpcDisabilityTerminationQueryResult
        .bpcDisabilityTerminationLegalProceeding.length > 0 && {
        legalProceedingNumbers:
          bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationLegalProceeding.map(
            (proceeding) => proceeding.legalProceedingNumber,
          ),
      }),
      createdBy: GetBpcDisabilityTerminationResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetBpcDisabilityTerminationResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });

    if (
      bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationDocument
        .length > 0
    ) {
      response.documents = await Promise.all(
        bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationDocument.map(
          async (document: GetBpcDisabilityTerminationDocumentQueryResult) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return GetBpcDisabilityTerminationDocumentResponseDto.build({
              url: url.toString(),
              originalFileName: originalFileName.toString(),
              type: document.type,
            });
          },
        ),
      );
    }

    await this.attachResponsibleProfilePictures(
      analysisToolRecordQueryResult,
      response,
    );

    return response;
  }

  private async buildFamilyMemberResponseDto(
    familyMember: GetBpcDisabilityTerminationFamilyMemberQueryResult,
  ): Promise<GetBpcDisabilityTerminationFamilyMemberResponseDto> {
    const documents = await Promise.all(
      familyMember.bpcDisabilityTerminationFamilyMemberDocument.map(
        async (
          doc: GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult,
        ) => {
          const document = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );

          const originalFileName =
            await this.fileProcessorGateway.getOriginalFileName(doc.document);

          return GetBpcDisabilityTerminationFamilyMemberDocumentResponseDto.build(
            {
              document: Base64.encodeBuffer(document).toString(),
              originalFileName: originalFileName.toString(),
              type: doc.type,
            },
          );
        },
      ),
    );

    return GetBpcDisabilityTerminationFamilyMemberResponseDto.build({
      fullName: familyMember.fullName,
      birthDate: familyMember.birthDate,
      kinship: familyMember.kinship,
      livesInSameResidence: familyMember.livesInSameResidence,
      hasIncome: familyMember.hasIncome,
      ...(familyMember.monthlyIncomeAmount !== null && {
        monthlyIncomeAmount: familyMember.monthlyIncomeAmount,
      }),
      ...(familyMember.incomeType !== null && {
        incomeType: familyMember.incomeType,
      }),
      ...(familyMember.hasExpenseProofs !== null && {
        hasExpenseProofs: familyMember.hasExpenseProofs,
      }),
      ...(documents.length > 0 && { documents }),
    });
  }

  private async buildDisabilityAssessmentResponseDto(
    assessment: GetBpcDisabilityTerminationDisabilityAssessmentQueryResult,
  ): Promise<GetBpcDisabilityTerminationDisabilityAssessmentResponseDto> {
    const documents = await Promise.all(
      assessment.bpcDisabilityTerminationDisabilityAssessmentDocument.map(
        async (doc) => {
          const document = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );

          const originalFileName =
            await this.fileProcessorGateway.getOriginalFileName(doc.document);

          return GetBpcDisabilityTerminationDisabilityAssessmentDocumentResponseDto.build(
            {
              document: Base64.encodeBuffer(document).toString(),
              originalFileName: originalFileName.toString(),
            },
          );
        },
      ),
    );

    return GetBpcDisabilityTerminationDisabilityAssessmentResponseDto.build({
      ...(assessment.estimatedDisabilityStartDate !== null && {
        estimatedDisabilityStartDate: assessment.estimatedDisabilityStartDate,
      }),
      ...(assessment.attendsSchoolOrTechnicalCourse !== null && {
        attendsSchoolOrTechnicalCourse:
          assessment.attendsSchoolOrTechnicalCourse,
      }),
      ...(assessment.performsLaborActivity !== null && {
        performsLaborActivity: assessment.performsLaborActivity,
      }),
      ...(assessment.needsThirdPartyHelp !== null && {
        needsThirdPartyHelp: assessment.needsThirdPartyHelp,
      }),
      ...(assessment.hasAccessToBasicServices !== null && {
        hasAccessToBasicServices: assessment.hasAccessToBasicServices,
      }),
      ...(assessment.otherBarriersDescription !== null && {
        otherBarriersDescription: assessment.otherBarriersDescription,
      }),
      ...(documents.length > 0 && { documents }),
    });
  }

  private buildResultResponseDto(
    result: GetBpcDisabilityTerminationResultQueryResult,
  ): GetBpcDisabilityTerminationResultResponseDto {
    const applicableRules =
      this.parseJsonArray<BpcDisabilityTerminationApplicableRuleInterface>(
        result.completeAnalysis,
        'applicableRules',
      ).map((item) =>
        BpcDisabilityTerminationApplicableRuleResponseDto.build({
          title: item.title,
          ...(item.description && { description: item.description }),
          status: item.status,
        }),
      );

    const benefitSummaries =
      this.parseJsonArray<BpcDisabilityTerminationBenefitSummaryInterface>(
        result.completeAnalysis,
        'benefitSummaries',
      ).map((item) =>
        BpcDisabilityTerminationBenefitSummaryResponseDto.build({
          benefitType: item.benefitType,
          result: item.result,
          ...(item.dib !== null && item.dib !== undefined && { dib: item.dib }),
          ...(item.expectedMonthlyBenefit !== null &&
            item.expectedMonthlyBenefit !== undefined && {
              expectedMonthlyBenefit: item.expectedMonthlyBenefit,
            }),
          ...(item.detailedAnalysis !== null &&
            item.detailedAnalysis !== undefined && {
              detailedAnalysis: item.detailedAnalysis,
            }),
        }),
      );

    const analysisDetailedText = this.extractStringField(
      result.completeAnalysis,
      'analysisDetailedText',
    );

    return GetBpcDisabilityTerminationResultResponseDto.build({
      ...(result.inssDecisionAnalysis !== null && {
        inssDecisionAnalysis: result.inssDecisionAnalysis,
      }),
      ...(result.completeAnalysis !== null && {
        completeAnalysis: result.completeAnalysis,
      }),
      ...(result.completeAnalysisDownload !== null && {
        completeAnalysisDownload: result.completeAnalysisDownload,
      }),
      ...(result.simplifiedAnalysis !== null && {
        simplifiedAnalysis: result.simplifiedAnalysis,
      }),
      ...(analysisDetailedText !== null && { analysisDetailedText }),
      ...(applicableRules.length > 0 && { applicableRules }),
      ...(benefitSummaries.length > 0 && { benefitSummaries }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private parseJsonArray<T>(raw: string | null, field: string): T[] {
    if (raw === null) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        Array.isArray((parsed as Record<string, unknown>)[field])
      ) {
        return (parsed as Record<string, unknown>)[field] as T[];
      }
      return [];
    } catch {
      return [];
    }
  }

  private extractStringField(raw: string | null, field: string): string | null {
    if (raw === null) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        typeof (parsed as Record<string, unknown>)[field] === 'string'
      ) {
        return (parsed as Record<string, unknown>)[field] as string;
      }
      return null;
    } catch {
      return null;
    }
  }

  private async attachResponsibleProfilePictures(
    analysisToolRecordQueryResult: Awaited<
      ReturnType<
        typeof this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail
      >
    >,
    response: GetBpcDisabilityTerminationResponseDto,
  ): Promise<void> {
    if (
      analysisToolRecordQueryResult.createdBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.createdBy.customer.profilePicture,
      );

      response.createdBy.profilePicture = profilePicture.toString();
    }

    if (
      analysisToolRecordQueryResult.updatedBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.updatedBy.customer.profilePicture,
      );

      response.updatedBy.profilePicture = profilePicture.toString();
    }
  }
}
