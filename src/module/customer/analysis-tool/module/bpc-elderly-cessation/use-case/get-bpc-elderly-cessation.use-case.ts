import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyCessationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/bpc-elderly-cessation.query.repository.gateway';
import { GetBpcElderlyCessationDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-document.query.result';
import { GetBpcElderlyCessationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-family-member-document.query.result';
import { GetBpcElderlyCessationFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-family-member.query.result';
import { GetBpcElderlyCessationResultQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/query/result/get-bpc-elderly-cessation-result.query.result';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import {
  BpcElderlyCessationApplicableRuleResponseDto,
  BpcElderlyCessationBenefitSummaryResponseDto,
} from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-result.response.dto';
import {
  GetBpcElderlyCessationClientResponseDto,
  GetBpcElderlyCessationDocumentResponseDto,
  GetBpcElderlyCessationFamilyMemberDocumentResponseDto,
  GetBpcElderlyCessationFamilyMemberResponseDto,
  GetBpcElderlyCessationResponseDto,
  GetBpcElderlyCessationResponsibleResponseDto,
  GetBpcElderlyCessationResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/get-bpc-elderly-cessation.response.dto';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import {
  BpcElderlyCessationApplicableRuleInterface,
  BpcElderlyCessationBenefitSummaryInterface,
} from '@module/customer/analysis-tool/module/bpc-elderly-cessation/model/interface/bpc-elderly-cessation-result.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetBpcElderlyCessationUseCase {
  protected readonly _type = GetBpcElderlyCessationUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyCessationQueryRepositoryGateway)
    private readonly bpcElderlyCessationQueryRepositoryGateway: BpcElderlyCessationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): Promise<GetBpcElderlyCessationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyCessationNotFoundError,
      );

    const bpcElderlyCessationQueryResult =
      await this.bpcElderlyCessationQueryRepositoryGateway.findOneByBpcElderlyCessationIdAndOrganizationIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        BpcElderlyCessationNotFoundError,
      );

    const familyMembers = await Promise.all(
      bpcElderlyCessationQueryResult.bpcElderlyCessationFamilyMember.map(
        async (familyMember: GetBpcElderlyCessationFamilyMemberQueryResult) =>
          this.buildFamilyMemberResponseDto(familyMember),
      ),
    );

    const response = GetBpcElderlyCessationResponseDto.build({
      id: bpcElderlyCessationQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetBpcElderlyCessationClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      ...(bpcElderlyCessationQueryResult.analysisName !== null && {
        analysisName: bpcElderlyCessationQueryResult.analysisName,
      }),
      ...(bpcElderlyCessationQueryResult.decisionDate !== null && {
        decisionDate: bpcElderlyCessationQueryResult.decisionDate,
      }),
      ...(bpcElderlyCessationQueryResult.previousInssBenefitNumber !== null && {
        previousInssBenefitNumber:
          bpcElderlyCessationQueryResult.previousInssBenefitNumber,
      }),
      ...(bpcElderlyCessationQueryResult.category !== null && {
        category: bpcElderlyCessationQueryResult.category,
      }),
      ...(bpcElderlyCessationQueryResult.cessationReason !== null && {
        cessationReason: bpcElderlyCessationQueryResult.cessationReason,
      }),
      ...(bpcElderlyCessationQueryResult.cessationReasonDescription !==
        null && {
        cessationReasonDescription:
          bpcElderlyCessationQueryResult.cessationReasonDescription,
      }),
      ...(bpcElderlyCessationQueryResult.isAppealDeadlineExpired !== null && {
        isAppealDeadlineExpired:
          bpcElderlyCessationQueryResult.isAppealDeadlineExpired,
      }),
      ...(bpcElderlyCessationQueryResult.civilStatus !== null && {
        civilStatus: bpcElderlyCessationQueryResult.civilStatus,
      }),
      ...(bpcElderlyCessationQueryResult.educationLevel !== null && {
        educationLevel: bpcElderlyCessationQueryResult.educationLevel,
      }),
      ...(bpcElderlyCessationQueryResult.currentAddress !== null && {
        currentAddress: bpcElderlyCessationQueryResult.currentAddress,
      }),
      ...(bpcElderlyCessationQueryResult.previousAddress !== null && {
        previousAddress: bpcElderlyCessationQueryResult.previousAddress,
      }),
      ...(bpcElderlyCessationQueryResult.hasAddressChangedSinceDecision !==
        null && {
        hasAddressChangedSinceDecision:
          bpcElderlyCessationQueryResult.hasAddressChangedSinceDecision,
      }),
      ...(bpcElderlyCessationQueryResult.livesAlone !== null && {
        livesAlone: bpcElderlyCessationQueryResult.livesAlone,
      }),
      ...(bpcElderlyCessationQueryResult.bpcElderlyCessationResult !== null && {
        bpcElderlyCessationResult: this.buildResultResponseDto(
          bpcElderlyCessationQueryResult.bpcElderlyCessationResult,
        ),
      }),
      ...(familyMembers.length > 0 && { familyMembers }),
      ...(bpcElderlyCessationQueryResult.bpcElderlyCessationInssBenefit.length >
        0 && {
        inssBenefitNumbers:
          bpcElderlyCessationQueryResult.bpcElderlyCessationInssBenefit.map(
            (benefit) => benefit.inssBenefitNumber,
          ),
      }),
      ...(bpcElderlyCessationQueryResult.bpcElderlyCessationLegalProceeding
        .length > 0 && {
        legalProceedingNumbers:
          bpcElderlyCessationQueryResult.bpcElderlyCessationLegalProceeding.map(
            (proceeding) => proceeding.legalProceedingNumber,
          ),
      }),
      createdBy: GetBpcElderlyCessationResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetBpcElderlyCessationResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });

    if (bpcElderlyCessationQueryResult.bpcElderlyCessationDocument.length > 0) {
      response.documents = await Promise.all(
        bpcElderlyCessationQueryResult.bpcElderlyCessationDocument.map(
          async (document: GetBpcElderlyCessationDocumentQueryResult) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return GetBpcElderlyCessationDocumentResponseDto.build({
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
    familyMember: GetBpcElderlyCessationFamilyMemberQueryResult,
  ): Promise<GetBpcElderlyCessationFamilyMemberResponseDto> {
    const documents = await Promise.all(
      familyMember.bpcElderlyCessationFamilyMemberDocument.map(
        async (doc: GetBpcElderlyCessationFamilyMemberDocumentQueryResult) => {
          const document = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );

          const originalFileName =
            await this.fileProcessorGateway.getOriginalFileName(doc.document);

          return GetBpcElderlyCessationFamilyMemberDocumentResponseDto.build({
            document: Base64.encodeBuffer(document).toString(),
            originalFileName: originalFileName.toString(),
            type: doc.type,
          });
        },
      ),
    );

    return GetBpcElderlyCessationFamilyMemberResponseDto.build({
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

  private buildResultResponseDto(
    result: GetBpcElderlyCessationResultQueryResult,
  ): GetBpcElderlyCessationResultResponseDto {
    const applicableRules =
      this.parseJsonArray<BpcElderlyCessationApplicableRuleInterface>(
        result.applicableRules,
      ).map((item) =>
        BpcElderlyCessationApplicableRuleResponseDto.build({
          title: item.title,
          ...(item.description && { description: item.description }),
          status: item.status,
        }),
      );

    const benefitSummaries =
      this.parseJsonArray<BpcElderlyCessationBenefitSummaryInterface>(
        result.benefitSummaries,
      ).map((item) =>
        BpcElderlyCessationBenefitSummaryResponseDto.build({
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

    return GetBpcElderlyCessationResultResponseDto.build({
      ...(result.inssDecisionAnalysis !== null && {
        inssDecisionAnalysis: result.inssDecisionAnalysis,
      }),
      ...(result.firstAnalysis !== null && {
        firstAnalysis: result.firstAnalysis,
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
      ...(result.analysisDetailedText !== null && {
        analysisDetailedText: result.analysisDetailedText,
      }),
      ...(result.diagnosis !== null && {
        diagnosis: result.diagnosis,
      }),
      ...(result.totalHouseholdIncome !== null && {
        totalHouseholdIncome: result.totalHouseholdIncome,
      }),
      ...(result.perCapitaIncome !== null && {
        perCapitaIncome: result.perCapitaIncome,
      }),
      ...(result.legalRequirementsMet !== null && {
        legalRequirementsMet: result.legalRequirementsMet,
      }),
      ...(result.perCapitaIncomeBelowQuarterMinimumWage !== null && {
        perCapitaIncomeBelowQuarterMinimumWage:
          result.perCapitaIncomeBelowQuarterMinimumWage,
      }),
      ...(result.ageEqualOrAbove65Years !== null && {
        ageEqualOrAbove65Years: result.ageEqualOrAbove65Years,
      }),
      ...(applicableRules.length > 0 && { applicableRules }),
      ...(benefitSummaries.length > 0 && { benefitSummaries }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private parseJsonArray<T>(raw: string | null): T[] {
    if (raw === null) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }

  private async attachResponsibleProfilePictures(
    analysisToolRecordQueryResult: Awaited<
      ReturnType<
        typeof this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail
      >
    >,
    response: GetBpcElderlyCessationResponseDto,
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
