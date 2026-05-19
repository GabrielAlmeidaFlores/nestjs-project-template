import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/bpc-disability-denial.query.repository.gateway';
import { GetBpcDisabilityDenialDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-document.query.result';
import { GetBpcDisabilityDenialFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member-document.query.result';
import { GetBpcDisabilityDenialFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member.query.result';
import { GetBpcDisabilityDenialResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/query/result/get-bpc-disability-denial-result.query.result';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import {
  BpcDisabilityDenialApplicableRuleResponseDto,
  BpcDisabilityDenialBenefitSummaryResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-result.response.dto';
import {
  GetBpcDisabilityDenialClientResponseDto,
  GetBpcDisabilityDenialDocumentResponseDto,
  GetBpcDisabilityDenialFamilyMemberDocumentResponseDto,
  GetBpcDisabilityDenialFamilyMemberResponseDto,
  GetBpcDisabilityDenialResponseDto,
  GetBpcDisabilityDenialResponsibleResponseDto,
  GetBpcDisabilityDenialResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/get-bpc-disability-denial.response.dto';
import { BpcDisabilityDenialNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-not-found.error';
import {
  BpcDisabilityDenialApplicableRuleInterface,
  BpcDisabilityDenialBenefitSummaryInterface,
} from '@module/customer/analysis-tool/module/bpc-disability-denial/model/interface/bpc-disability-denial-result.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetBpcDisabilityDenialUseCase {
  protected readonly _type = GetBpcDisabilityDenialUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialQueryRepositoryGateway)
    private readonly bpcDisabilityDenialQueryRepositoryGateway: BpcDisabilityDenialQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): Promise<GetBpcDisabilityDenialResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityDenialNotFoundError,
      );

    const bpcDisabilityDenialQueryResult =
      await this.bpcDisabilityDenialQueryRepositoryGateway.findOneByBpcDisabilityDenialIdAndOrganizationIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        BpcDisabilityDenialNotFoundError,
      );

    const familyMembers = await Promise.all(
      bpcDisabilityDenialQueryResult.bpcDisabilityDenialFamilyMember.map(
        async (familyMember: GetBpcDisabilityDenialFamilyMemberQueryResult) =>
          this.buildFamilyMemberResponseDto(familyMember),
      ),
    );

    const response = GetBpcDisabilityDenialResponseDto.build({
      id: bpcDisabilityDenialQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetBpcDisabilityDenialClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      ...(bpcDisabilityDenialQueryResult.analysisName !== null && {
        analysisName: bpcDisabilityDenialQueryResult.analysisName,
      }),
      ...(bpcDisabilityDenialQueryResult.requestEntryDate !== null && {
        requestEntryDate: bpcDisabilityDenialQueryResult.requestEntryDate,
      }),
      ...(bpcDisabilityDenialQueryResult.denialDate !== null && {
        denialDate: bpcDisabilityDenialQueryResult.denialDate,
      }),
      ...(bpcDisabilityDenialQueryResult.requestedBenefitType !== null && {
        requestedBenefitType:
          bpcDisabilityDenialQueryResult.requestedBenefitType,
      }),
      ...(bpcDisabilityDenialQueryResult.category !== null && {
        category: bpcDisabilityDenialQueryResult.category,
      }),
      ...(bpcDisabilityDenialQueryResult.denialReason !== null && {
        denialReason: bpcDisabilityDenialQueryResult.denialReason,
      }),
      ...(bpcDisabilityDenialQueryResult.denialReasonDescription !== null && {
        denialReasonDescription:
          bpcDisabilityDenialQueryResult.denialReasonDescription,
      }),
      ...(bpcDisabilityDenialQueryResult.disabilityType !== null && {
        disabilityType: bpcDisabilityDenialQueryResult.disabilityType,
      }),
      ...(bpcDisabilityDenialQueryResult.disabilityDegree !== null && {
        disabilityDegree: bpcDisabilityDenialQueryResult.disabilityDegree,
      }),
      ...(bpcDisabilityDenialQueryResult.estimatedDisabilityStartDate !==
        null && {
        estimatedDisabilityStartDate:
          bpcDisabilityDenialQueryResult.estimatedDisabilityStartDate,
      }),
      ...(bpcDisabilityDenialQueryResult.attendsSchoolOrTechnicalCourse !==
        null && {
        attendsSchoolOrTechnicalCourse:
          bpcDisabilityDenialQueryResult.attendsSchoolOrTechnicalCourse,
      }),
      ...(bpcDisabilityDenialQueryResult.performsLaborActivity !== null && {
        performsLaborActivity:
          bpcDisabilityDenialQueryResult.performsLaborActivity,
      }),
      ...(bpcDisabilityDenialQueryResult.needsThirdPartyHelp !== null && {
        needsThirdPartyHelp: bpcDisabilityDenialQueryResult.needsThirdPartyHelp,
      }),
      ...(bpcDisabilityDenialQueryResult.hasAccessToBasicServices !== null && {
        hasAccessToBasicServices:
          bpcDisabilityDenialQueryResult.hasAccessToBasicServices,
      }),
      ...(bpcDisabilityDenialQueryResult.otherBarriersDescription !== null && {
        otherBarriersDescription:
          bpcDisabilityDenialQueryResult.otherBarriersDescription,
      }),
      ...(bpcDisabilityDenialQueryResult.livesAlone !== null && {
        livesAlone: bpcDisabilityDenialQueryResult.livesAlone,
      }),
      ...(bpcDisabilityDenialQueryResult.bpcDisabilityDenialResult !== null && {
        bpcDisabilityDenialResult: await this.buildResultResponseDto(
          bpcDisabilityDenialQueryResult.bpcDisabilityDenialResult,
        ),
      }),
      ...(familyMembers.length > 0 && { familyMembers }),
      ...(bpcDisabilityDenialQueryResult.bpcDisabilityDenialInssBenefit.length >
        0 && {
        inssBenefitNumbers:
          bpcDisabilityDenialQueryResult.bpcDisabilityDenialInssBenefit.map(
            (benefit) => benefit.inssBenefitNumber,
          ),
      }),
      ...(bpcDisabilityDenialQueryResult.bpcDisabilityDenialLegalProceeding
        .length > 0 && {
        legalProceedingNumbers:
          bpcDisabilityDenialQueryResult.bpcDisabilityDenialLegalProceeding.map(
            (proceeding) => proceeding.legalProceedingNumber,
          ),
      }),
      createdBy: GetBpcDisabilityDenialResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetBpcDisabilityDenialResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });

    if (bpcDisabilityDenialQueryResult.bpcDisabilityDenialDocument.length > 0) {
      response.documents = await Promise.all(
        bpcDisabilityDenialQueryResult.bpcDisabilityDenialDocument.map(
          async (document: GetBpcDisabilityDenialDocumentQueryResult) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return GetBpcDisabilityDenialDocumentResponseDto.build({
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
    familyMember: GetBpcDisabilityDenialFamilyMemberQueryResult,
  ): Promise<GetBpcDisabilityDenialFamilyMemberResponseDto> {
    const documents = await Promise.all(
      familyMember.bpcDisabilityDenialFamilyMemberDocument.map(
        async (doc: GetBpcDisabilityDenialFamilyMemberDocumentQueryResult) => {
          const document = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );

          const originalFileName =
            await this.fileProcessorGateway.getOriginalFileName(doc.document);

          return GetBpcDisabilityDenialFamilyMemberDocumentResponseDto.build({
            document: Base64.encodeBuffer(document).toString(),
            originalFileName: originalFileName.toString(),
            type: doc.type,
          });
        },
      ),
    );

    return GetBpcDisabilityDenialFamilyMemberResponseDto.build({
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

  private async buildResultResponseDto(
    result: GetBpcDisabilityDenialResultQueryResult,
  ): Promise<GetBpcDisabilityDenialResultResponseDto> {
    const applicableRules =
      this.parseJsonArray<BpcDisabilityDenialApplicableRuleInterface>(
        result.applicableRules,
      ).map((item) =>
        BpcDisabilityDenialApplicableRuleResponseDto.build({
          title: item.title,
          ...(item.description && { description: item.description }),
          status: item.status,
        }),
      );

    const benefitSummaries =
      this.parseJsonArray<BpcDisabilityDenialBenefitSummaryInterface>(
        result.benefitSummaries,
      ).map((item) =>
        BpcDisabilityDenialBenefitSummaryResponseDto.build({
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

    const analysisDetailedTextHtml =
      result.analysisDetailedText !== null
        ? await this.exportDocumentGateway.convertMarkdownToHtml(
            result.analysisDetailedText,
          )
        : null;

    return GetBpcDisabilityDenialResultResponseDto.build({
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
      ...(analysisDetailedTextHtml !== null && {
        analysisDetailedText: analysisDetailedTextHtml,
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
        typeof this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail
      >
    >,
    response: GetBpcDisabilityDenialResponseDto,
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
