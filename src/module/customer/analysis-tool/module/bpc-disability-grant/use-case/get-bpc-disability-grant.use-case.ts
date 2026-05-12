import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/bpc-disability-grant.query.repository.gateway';
import { GetBpcDisabilityGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-document.query.result';
import { GetBpcDisabilityGrantFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-family-member-document.query.result';
import { GetBpcDisabilityGrantFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-family-member.query.result';
import { GetBpcDisabilityGrantResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-result/query/result/get-bpc-disability-grant-result.query.result';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant-result.response.dto';
import {
  GetBpcDisabilityGrantClientResponseDto,
  GetBpcDisabilityGrantDocumentResponseDto,
  GetBpcDisabilityGrantFamilyMemberDocumentResponseDto,
  GetBpcDisabilityGrantFamilyMemberResponseDto,
  GetBpcDisabilityGrantResponseDto,
  GetBpcDisabilityGrantResponsibleResponseDto,
  GetBpcDisabilityGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/get-bpc-disability-grant.response.dto';
import { BpcDisabilityGrantNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-not-found.error';
import {
  BpcDisabilityGrantResultInterface,
  BpcDisabilityGrantRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/bpc-disability-grant/model/interface/bpc-disability-grant-result.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetBpcDisabilityGrantUseCase {
  protected readonly _type = GetBpcDisabilityGrantUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantQueryRepositoryGateway)
    private readonly bpcDisabilityGrantQueryRepositoryGateway: BpcDisabilityGrantQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): Promise<GetBpcDisabilityGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityGrantNotFoundError,
      );

    const BpcDisabilityGrantQueryResult =
      await this.bpcDisabilityGrantQueryRepositoryGateway.findOneByBpcDisabilityGrantIdAndOrganizationIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        BpcDisabilityGrantNotFoundError,
      );

    const familyMembers = await Promise.all(
      BpcDisabilityGrantQueryResult.BpcDisabilityGrantFamilyMember.map(
        async (familyMember: GetBpcDisabilityGrantFamilyMemberQueryResult) =>
          this.buildFamilyMemberResponseDto(familyMember),
      ),
    );

    const response = GetBpcDisabilityGrantResponseDto.build({
      id: BpcDisabilityGrantQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetBpcDisabilityGrantClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      ...(BpcDisabilityGrantQueryResult.analysisName !== null && {
        analysisName: BpcDisabilityGrantQueryResult.analysisName,
      }),
      ...(BpcDisabilityGrantQueryResult.requestEntryDate !== null && {
        requestEntryDate: BpcDisabilityGrantQueryResult.requestEntryDate,
      }),
      ...(BpcDisabilityGrantQueryResult.denialDate !== null && {
        denialDate: BpcDisabilityGrantQueryResult.denialDate,
      }),
      ...(BpcDisabilityGrantQueryResult.requestedBenefitType !== null && {
        requestedBenefitType:
          BpcDisabilityGrantQueryResult.requestedBenefitType,
      }),
      ...(BpcDisabilityGrantQueryResult.category !== null && {
        category: BpcDisabilityGrantQueryResult.category,
      }),
      ...(BpcDisabilityGrantQueryResult.denialReason !== null && {
        denialReason: BpcDisabilityGrantQueryResult.denialReason,
      }),
      ...(BpcDisabilityGrantQueryResult.denialReasonDescription !== null && {
        denialReasonDescription:
          BpcDisabilityGrantQueryResult.denialReasonDescription,
      }),
      ...(BpcDisabilityGrantQueryResult.disabilityType !== null && {
        disabilityType: BpcDisabilityGrantQueryResult.disabilityType,
      }),
      ...(BpcDisabilityGrantQueryResult.disabilityDegree !== null && {
        disabilityDegree: BpcDisabilityGrantQueryResult.disabilityDegree,
      }),
      ...(BpcDisabilityGrantQueryResult.estimatedDisabilityStartDate !==
        null && {
        estimatedDisabilityStartDate:
          BpcDisabilityGrantQueryResult.estimatedDisabilityStartDate,
      }),
      ...(BpcDisabilityGrantQueryResult.attendsSchoolOrTechnicalCourse !==
        null && {
        attendsSchoolOrTechnicalCourse:
          BpcDisabilityGrantQueryResult.attendsSchoolOrTechnicalCourse,
      }),
      ...(BpcDisabilityGrantQueryResult.performsLaborActivity !== null && {
        performsLaborActivity:
          BpcDisabilityGrantQueryResult.performsLaborActivity,
      }),
      ...(BpcDisabilityGrantQueryResult.needsThirdPartyHelp !== null && {
        needsThirdPartyHelp: BpcDisabilityGrantQueryResult.needsThirdPartyHelp,
      }),
      ...(BpcDisabilityGrantQueryResult.hasAccessToBasicServices !== null && {
        hasAccessToBasicServices:
          BpcDisabilityGrantQueryResult.hasAccessToBasicServices,
      }),
      ...(BpcDisabilityGrantQueryResult.otherBarriersDescription !== null && {
        otherBarriersDescription:
          BpcDisabilityGrantQueryResult.otherBarriersDescription,
      }),
      ...(BpcDisabilityGrantQueryResult.livesAlone !== null && {
        livesAlone: BpcDisabilityGrantQueryResult.livesAlone,
      }),
      ...(BpcDisabilityGrantQueryResult.BpcDisabilityGrantResult !== null && {
        BpcDisabilityGrantResult: this.buildResultResponseDto(
          BpcDisabilityGrantQueryResult.BpcDisabilityGrantResult,
        ),
      }),
      ...(familyMembers.length > 0 && { familyMembers }),
      ...(BpcDisabilityGrantQueryResult.BpcDisabilityGrantInssBenefit.length >
        0 && {
        inssBenefitNumbers:
          BpcDisabilityGrantQueryResult.BpcDisabilityGrantInssBenefit.map(
            (benefit) => benefit.inssBenefitNumber,
          ),
      }),
      ...(BpcDisabilityGrantQueryResult.BpcDisabilityGrantLegalProceeding
        .length > 0 && {
        legalProceedingNumbers:
          BpcDisabilityGrantQueryResult.BpcDisabilityGrantLegalProceeding.map(
            (proceeding) => proceeding.legalProceedingNumber,
          ),
      }),
      createdBy: GetBpcDisabilityGrantResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetBpcDisabilityGrantResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });

    if (BpcDisabilityGrantQueryResult.BpcDisabilityGrantDocument.length > 0) {
      response.documents = await Promise.all(
        BpcDisabilityGrantQueryResult.BpcDisabilityGrantDocument.map(
          async (document: GetBpcDisabilityGrantDocumentQueryResult) => {
            const file = await this.fileProcessorGateway.getFileBuffer(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return GetBpcDisabilityGrantDocumentResponseDto.build({
              document: Base64.encodeBuffer(file).toString(),
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
    familyMember: GetBpcDisabilityGrantFamilyMemberQueryResult,
  ): Promise<GetBpcDisabilityGrantFamilyMemberResponseDto> {
    const documents = await Promise.all(
      familyMember.BpcDisabilityGrantFamilyMemberDocument.map(
        async (doc: GetBpcDisabilityGrantFamilyMemberDocumentQueryResult) => {
          const document = await this.fileProcessorGateway.getFileBuffer(
            doc.document,
          );

          const originalFileName =
            await this.fileProcessorGateway.getOriginalFileName(doc.document);

          return GetBpcDisabilityGrantFamilyMemberDocumentResponseDto.build({
            document: Base64.encodeBuffer(document).toString(),
            originalFileName: originalFileName.toString(),
            type: doc.type,
          });
        },
      ),
    );

    return GetBpcDisabilityGrantFamilyMemberResponseDto.build({
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
    result: GetBpcDisabilityGrantResultQueryResult,
  ): GetBpcDisabilityGrantResultResponseDto {
    const parsedResult = this.parseResultAnalysis(result.completeAnalysis);

    if (parsedResult === null) {
      return GetBpcDisabilityGrantResultResponseDto.build({
        isElligibleForDisabilityBpc: false,
        totalFamiliarIncome: '',
        perCapitaIncome: '',
        lessThanOneQuarter: false,
        lessThanHalfAndAboveOneQuarter: false,
        disabilityProven: false,
        retirementRules: [],
        analysisResult: '',
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });
    }

    return GetBpcDisabilityGrantResultResponseDto.build({
      isElligibleForDisabilityBpc: parsedResult.isElligibleForDisabilityBpc,
      totalFamiliarIncome: parsedResult.totalFamiliarIncome,
      perCapitaIncome: parsedResult.perCapitaIncome,
      lessThanOneQuarter: parsedResult.lessThanOneQuarter,
      lessThanHalfAndAboveOneQuarter:
        parsedResult.lessThanHalfAndAboveOneQuarter,
      disabilityProven: parsedResult.disabilityProven,
      retirementRules: parsedResult.retirementRules.map((item) =>
        this.buildRetirementRuleResponseDto(item),
      ),
      analysisResult: parsedResult.analysisResult,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private buildRetirementRuleResponseDto(
    item: BpcDisabilityGrantRetirementRuleInterface,
  ): BpcDisabilityGrantRetirementRuleResponseDto {
    return BpcDisabilityGrantRetirementRuleResponseDto.build({
      benefitType: item.benefitType,
      result: item.result,
      benefitStartDate: new Date(item.benefitStartDate),
      RMIprevista: item.RMIprevista,
      detaildAnalysis: item.detaildAnalysis,
    });
  }

  private parseResultAnalysis(
    raw: string | null,
  ): BpcDisabilityGrantResultInterface | null {
    if (raw === null) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(raw);

      if (!this.isResultAnalysis(parsed)) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  private isResultAnalysis(
    value: unknown,
  ): value is BpcDisabilityGrantResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['isElligibleForDisabilityBpc'] === 'boolean' &&
      typeof value['totalFamiliarIncome'] === 'string' &&
      typeof value['perCapitaIncome'] === 'string' &&
      typeof value['lessThanOneQuarter'] === 'boolean' &&
      typeof value['lessThanHalfAndAboveOneQuarter'] === 'boolean' &&
      typeof value['disabilityProven'] === 'boolean' &&
      Array.isArray(value['retirementRules']) &&
      typeof value['analysisResult'] === 'string' &&
      this.hasValidRetirementRules(value['retirementRules'])
    );
  }

  private hasValidRetirementRules(value: unknown): boolean {
    if (!Array.isArray(value)) {
      return false;
    }

    return value.every((item) => {
      if (!this.isRecord(item)) {
        return false;
      }

      return (
        typeof item['benefitType'] === 'string' &&
        typeof item['result'] === 'boolean' &&
        typeof item['benefitStartDate'] === 'string' &&
        typeof item['RMIprevista'] === 'string' &&
        typeof item['detaildAnalysis'] === 'string'
      );
    });
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private async attachResponsibleProfilePictures(
    analysisToolRecordQueryResult: Awaited<
      ReturnType<
        typeof this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityGrantIdAndOrganizationIdAndAuthIdentityIdOrFail
      >
    >,
    response: GetBpcDisabilityGrantResponseDto,
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
