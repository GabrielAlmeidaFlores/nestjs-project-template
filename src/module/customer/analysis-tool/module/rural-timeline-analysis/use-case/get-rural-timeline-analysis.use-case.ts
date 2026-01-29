import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import {
  GetRuralTimelineAnalysisResponseDto,
  GetRuralTimelineAnalysisClientResponseDto,
  GetRuralTimelineAnalysisResponsibleResponseDto,
  GetRuralTimelineAnalysisPeriodResponseDto,
  GetRuralTimelineAnalysisPeriodDocumentResponseDto,
  GetRuralTimelineAnalysisPeriodResidenceResponseDto,
  GetRuralTimelineAnalysisPeriodPropertyResponseDto,
  GetRuralTimelineAnalysisPeriodEconomicAspectsResponseDto,
  GetRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto,
  GetRuralTimelineAnalysisDocumentResponseDto,
  GetRuralTimelineAnalysisCnisContributionPeriodResponseDto,
  GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-analysis.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRuralTimelineAnalysisUseCase {
  protected readonly _type = GetRuralTimelineAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisQueryRepositoryGateway: RuralTimelineAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<GetRuralTimelineAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralTimelineAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RuralTimelineAnalysisNotFoundError,
      );

    const ruralTimelineAnalysisQueryResult =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findOneByIdWithRelations(
        ruralTimelineAnalysisId,
      );

    if (ruralTimelineAnalysisQueryResult === null) {
      throw new RuralTimelineAnalysisNotFoundError();
    }

    const periods: GetRuralTimelineAnalysisPeriodResponseDto[] = [];

    for (const period of ruralTimelineAnalysisQueryResult.ruralTimelineAnalysisPeriod) {
      const documents: GetRuralTimelineAnalysisPeriodDocumentResponseDto[] = [];

      for (const document of period.ruralTimelineAnalysisPeriodDocument) {
        const url = await this.fileProcessorGateway.getFileSignedUrl(
          document.document,
        );
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(
            document.document,
          );

        documents.push(
          GetRuralTimelineAnalysisPeriodDocumentResponseDto.build({
            ...(document.documentYear !== null && {
              documentYear: document.documentYear,
            }),
            ...(document.documentHolderType !== null && {
              documentHolderType: document.documentHolderType,
            }),
            ...(document.probatoryPurpose !== null && {
              probatoryPurpose: document.probatoryPurpose,
            }),
            ...(document.selfOwned !== null && {
              selfOwned: document.selfOwned,
            }),
            url: url.toString(),
            originalFileName,
            type: document.type,
          }),
        );
      }

      const economicAspects: GetRuralTimelineAnalysisPeriodEconomicAspectsResponseDto[] =
        period.ruralTimelineAnalysisPeriodEconomicAspects.map((aspect) =>
          GetRuralTimelineAnalysisPeriodEconomicAspectsResponseDto.build({
            type: aspect.type,
            ...(aspect.content !== null && { content: aspect.content }),
          }),
        );

      const familyGroupMembers: GetRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto[] =
        [];

      for (const member of period.ruralTimelineAnalysisPeriodFamilyGroupMember) {
        let cnisDocumentUrl: string | null = null;
        let cnisDocumentOriginalFileName: string | null = null;

        if (member.cnisDocument !== null) {
          const url = await this.fileProcessorGateway.getFileSignedUrl(
            member.cnisDocument,
          );
          cnisDocumentUrl = url.toString();
          cnisDocumentOriginalFileName =
            await this.fileProcessorGateway.getOriginalFileName(
              member.cnisDocument,
            );
        }

        familyGroupMembers.push(
          GetRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto.build({
            name: member.name,
            federalDocument: member.federalDocument.toString(),
            kinship: member.kinship,
            receivesRuralBenefit: member.receivesRuralBenefit,
            ...(member.benefitNumber !== null && {
              benefitNumber: member.benefitNumber,
            }),
            ...(cnisDocumentUrl !== null && { cnisDocumentUrl }),
            ...(cnisDocumentOriginalFileName !== null && {
              cnisDocumentOriginalFileName,
            }),
          }),
        );
      }

      periods.push(
        GetRuralTimelineAnalysisPeriodResponseDto.build({
          startDate: period.startDate,
          endDate: period.endDate,
          workerType: period.workerType,
          workRegimeType: period.workRegimeType,
          ...(period.productionDestination !== null && {
            productionDestination: period.productionDestination,
          }),
          ...(period.documentAnalysis !== null && {
            documentAnalysis: period.documentAnalysis,
          }),
          residence:
            period.ruralTimelineAnalysisPeriodResidence !== null
              ? GetRuralTimelineAnalysisPeriodResidenceResponseDto.build({
                  city: period.ruralTimelineAnalysisPeriodResidence.city,
                  stateCode:
                    period.ruralTimelineAnalysisPeriodResidence.stateCode,
                  distanceToPropertyKm:
                    period.ruralTimelineAnalysisPeriodResidence
                      .distanceToPropertyKm,
                })
              : null,
          property:
            period.ruralTimelineAnalysisPeriodProperty !== null
              ? GetRuralTimelineAnalysisPeriodPropertyResponseDto.build({
                  propertyName:
                    period.ruralTimelineAnalysisPeriodProperty.propertyName,
                  ownerName:
                    period.ruralTimelineAnalysisPeriodProperty.ownerName,
                  postalCode:
                    period.ruralTimelineAnalysisPeriodProperty.postalCode,
                  stateCode:
                    period.ruralTimelineAnalysisPeriodProperty.stateCode,
                  city: period.ruralTimelineAnalysisPeriodProperty.city,
                  ...(period.ruralTimelineAnalysisPeriodProperty
                    .neighborhood !== null && {
                    neighborhood:
                      period.ruralTimelineAnalysisPeriodProperty.neighborhood,
                  }),
                  street: period.ruralTimelineAnalysisPeriodProperty.street,
                  ...(period.ruralTimelineAnalysisPeriodProperty
                    .streetNumber !== null && {
                    streetNumber:
                      period.ruralTimelineAnalysisPeriodProperty.streetNumber,
                  }),
                  landOwnershipType:
                    period.ruralTimelineAnalysisPeriodProperty
                      .landOwnershipType,
                })
              : null,
          ...(documents.length > 0 && { documents }),
          ...(economicAspects.length > 0 && { economicAspects }),
          ...(familyGroupMembers.length > 0 && { familyGroupMembers }),
        }),
      );
    }

    const cnisDocuments: GetRuralTimelineAnalysisDocumentResponseDto[] = [];

    for (const doc of ruralTimelineAnalysisQueryResult.ruralTimelineDocument) {
      const url = await this.fileProcessorGateway.getFileSignedUrl(
        doc.document,
      );
      const originalFileName =
        await this.fileProcessorGateway.getOriginalFileName(doc.document);

      cnisDocuments.push(
        GetRuralTimelineAnalysisDocumentResponseDto.build({
          type: doc.type as RuralTimelineAnalysisDocumentTypeEnum,
          url: url.toString(),
          originalFileName,
        }),
      );
    }

    const cnisContributionPeriods: GetRuralTimelineAnalysisCnisContributionPeriodResponseDto[] =
      [];

    for (const period of ruralTimelineAnalysisQueryResult.ruralTimelineCnisContributionPeriod) {
      const underMinimumPeriods: GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto[] =
        period.ruralTimelineCnisContributionPeriodUnderMinimum.map((underMin) =>
          GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto.build(
            {
              contributionDate: underMin.contributionDate,
              contributionAmount: underMin.contributionAmount,
            },
          ),
        );

      cnisContributionPeriods.push(
        GetRuralTimelineAnalysisCnisContributionPeriodResponseDto.build({
          ...(period.employmentRelationshipSource !== null && {
            employmentRelationshipSource: period.employmentRelationshipSource,
          }),
          ...(period.startDate !== null && { startDate: period.startDate }),
          ...(period.endDate !== null && { endDate: period.endDate }),
          ...(period.category !== null && { category: period.category }),
          ...(period.qualifyingPeriod !== null && {
            qualifyingPeriod: period.qualifyingPeriod,
          }),
          ...(period.status !== null && {
            status: period.status,
          }),
          ...(period.averageContributionAmount !== null && {
            averageContributionAmount: period.averageContributionAmount,
          }),
          contributionAdjustmentIntent: period.contributionAdjustmentIntent,
          externalSupplementationIntent: period.externalSupplementationIntent,
          ...(underMinimumPeriods.length > 0 && { underMinimumPeriods }),
        }),
      );
    }

    return GetRuralTimelineAnalysisResponseDto.build({
      id: ruralTimelineAnalysisQueryResult.id,
      workRegime: ruralTimelineAnalysisQueryResult.workRegime,
      ...(ruralTimelineAnalysisQueryResult.ruralTimelineAnalysis !== null && {
        ruralTimelineAnalysis:
          ruralTimelineAnalysisQueryResult.ruralTimelineAnalysis,
      }),
      ...(ruralTimelineAnalysisQueryResult.ruralTimelinePeriodDocumentAnalysis !==
        null && {
        ruralTimelinePeriodDocumentAnalysis:
          ruralTimelineAnalysisQueryResult.ruralTimelinePeriodDocumentAnalysis,
      }),
      status: analysisToolRecordQueryResult.status,
      analysisToolClient: GetRuralTimelineAnalysisClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      ...(periods.length > 0 && { periods }),
      ...(cnisDocuments.length > 0 && { cnisDocuments }),
      ...(cnisContributionPeriods.length > 0 && { cnisContributionPeriods }),
      createdBy: GetRuralTimelineAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetRuralTimelineAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });
  }
}
