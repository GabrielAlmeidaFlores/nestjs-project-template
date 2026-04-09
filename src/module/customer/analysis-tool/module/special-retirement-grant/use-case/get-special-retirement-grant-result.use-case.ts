import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { GetSpecialRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/get-special-retirement-grant-result.response.dto';
import { InvalidSpecialRetirementGrantCompleteAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/invalid-special-retirement-grant-complete-analysis-json.error';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import {
  SpecialRetirementGrantFirstAnalysisAgentModel,
  SpecialRetirementGrantFirstAnalysisIntegratedTimelineItemModel,
  SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel,
  SpecialRetirementGrantFirstAnalysisModel,
  SpecialRetirementGrantFirstAnalysisObservationModel,
  SpecialRetirementGrantFirstAnalysisOverdueContributionModel,
  SpecialRetirementGrantFirstAnalysisPendingExitDateModel,
  SpecialRetirementGrantFirstAnalysisPeriodModel,
  SpecialRetirementGrantFirstAnalysisSummaryModel,
  SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemModel,
  SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel,
  SpecialRetirementGrantFirstAnalysisUnderMinimumModel,
} from '@module/customer/analysis-tool/module/special-retirement-grant/model/generic/special-retirement-grant-first-analysis.model';
import { SpecialRetirementGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/model/interface/special-retirement-grant-first-analysis.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSpecialRetirementGrantResultUseCase {
  protected readonly _type = GetSpecialRetirementGrantResultUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(SpecialRetirementGrantPeriodQueryRepositoryGateway)
    private readonly specialRetirementGrantPeriodQueryRepositoryGateway: SpecialRetirementGrantPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantResultResponseDto> {
    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    const specialRetirementGrant =
      analysisToolRecordQueryResult.specialRetirementGrant;

    if (specialRetirementGrant === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    if (specialRetirementGrant.specialRetirementGrantResult === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const result = specialRetirementGrant.specialRetirementGrantResult;

    const completeRaw = result.specialRetirementGrantCompleteAnalysis ?? null;
    const simplifiedRaw =
      result.specialRetirementGrantSimplifiedAnalysis ?? null;
    const firstRaw = result.specialRetirementGrantFirstAnalysis ?? null;
    const downloadRaw =
      result.specialRetirementGrantCompleteAnalysisDownload ?? null;

    const parsedComplete: Record<string, unknown> | null =
      completeRaw !== null
        ? (this.safeJsonParseOrThrow(completeRaw) as Record<string, unknown>)
        : null;

    if (
      parsedComplete !== null &&
      typeof parsedComplete['analysisResult'] === 'string'
    ) {
      parsedComplete['analysisResult'] =
        await this.exportDocumentGateway.convertMarkdownToHtml(
          parsedComplete['analysisResult'],
        );
    }

    const parsedSimplified: object | null =
      simplifiedRaw !== null
        ? (this.safeJsonParseOrThrow(simplifiedRaw) as object)
        : null;

    const parsedFirst: SpecialRetirementGrantFirstAnalysisModel | null =
      firstRaw !== null
        ? await this.safeParseFirstAnalysis(firstRaw, specialRetirementGrantId)
        : null;

    return GetSpecialRetirementGrantResultResponseDto.build({
      ...(parsedComplete !== null && {
        specialRetirementGrantCompleteAnalysis: parsedComplete,
      }),
      ...(downloadRaw !== null && {
        specialRetirementGrantCompleteAnalysisDownload: downloadRaw,
      }),
      ...(parsedSimplified !== null && {
        specialRetirementGrantSimplifiedAnalysis: parsedSimplified,
      }),
      ...(parsedFirst !== null && {
        specialRetirementGrantFirstAnalysis: parsedFirst,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private safeJsonParseOrThrow(value: string): unknown {
    try {
      return JSON.parse(value) as unknown;
    } catch {
      throw new InvalidSpecialRetirementGrantCompleteAnalysisJsonError();
    }
  }

  private async safeParseFirstAnalysis(
    value: string,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<SpecialRetirementGrantFirstAnalysisModel> {
    try {
      const raw = JSON.parse(
        value,
      ) as SpecialRetirementGrantFirstAnalysisInterface;

      const periodsWithChildren =
        await this.specialRetirementGrantPeriodQueryRepositoryGateway.listPeriodsWithChildrenBySpecialRetirementGrantId(
          specialRetirementGrantId,
        );

      const periods = periodsWithChildren.map((period) =>
        SpecialRetirementGrantFirstAnalysisPeriodModel.build({
          id: period.id.toString(),
          ...(period.sequencial !== null && { sequencial: period.sequencial }),
          ...(period.employmentRelationshipSource !== null && {
            employmentRelationshipSource: period.employmentRelationshipSource,
          }),
          ...(period.startDate !== null && { startDate: period.startDate }),
          ...(period.endDate !== null && { endDate: period.endDate }),
          ...(period.category !== null && { category: period.category }),
          ...(period.status !== null && { status: period.status }),
          ...(period.averageContributionAmount !== null && {
            averageContributionAmount: period.averageContributionAmount,
          }),
          shouldConsiderPeriod: period.shouldConsiderPeriod,
          overdueContributions: period.overdueContributions.map((oc) =>
            SpecialRetirementGrantFirstAnalysisOverdueContributionModel.build({
              id: oc.id.toString(),
              overdueDate: oc.overdueDate,
              ...(oc.paymentDate !== null && { paymentDate: oc.paymentDate }),
              createdAt: oc.createdAt,
              updatedAt: oc.updatedAt,
            }),
          ),
          underMinimums: period.underMinimums.map((um) =>
            SpecialRetirementGrantFirstAnalysisUnderMinimumModel.build({
              id: um.id.toString(),
              contributionDate: um.contributionDate,
              contributionAmount: um.contributionAmount,
              createdAt: um.createdAt,
              updatedAt: um.updatedAt,
            }),
          ),
          pendingExitDates: period.pendingExitDates.map((ped) =>
            SpecialRetirementGrantFirstAnalysisPendingExitDateModel.build({
              id: ped.id.toString(),
              pendingDate: ped.pendingDate,
              pendingAmount: ped.pendingAmount,
              createdAt: ped.createdAt,
              updatedAt: ped.updatedAt,
            }),
          ),
          observations: period.observations.map((obs) =>
            SpecialRetirementGrantFirstAnalysisObservationModel.build({
              id: obs.id.toString(),
              observation: obs.observation,
              createdAt: obs.createdAt,
              updatedAt: obs.updatedAt,
            }),
          ),
          createdAt: period.createdAt,
          updatedAt: period.updatedAt,
        }),
      );

      return SpecialRetirementGrantFirstAnalysisModel.build({
        summary: SpecialRetirementGrantFirstAnalysisSummaryModel.build({
          ...(raw.summary.specialTime !== null && {
            specialTime: raw.summary.specialTime,
          }),
          ...(raw.summary.commonTime !== null && {
            commonTime: raw.summary.commonTime,
          }),
          ...(raw.summary.specialGracePeriod !== null && {
            specialGracePeriod: raw.summary.specialGracePeriod,
          }),
          ...(raw.summary.commonGracePeriod !== null && {
            commonGracePeriod: raw.summary.commonGracePeriod,
          }),
          ...(raw.summary.totalTime !== null && {
            totalTime: raw.summary.totalTime,
          }),
          ...(raw.summary.totalGracePeriod !== null && {
            totalGracePeriod: raw.summary.totalGracePeriod,
          }),
        }),
        periods,
        technicalDiagnosis:
          SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel.build({
            items: raw.technicalDiagnosis.items.map((item) =>
              SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemModel.build(
                {
                  periodStartDate: new Date(item.periodStartDate),
                  ...(item.periodEndDate !== null && {
                    periodEndDate: new Date(item.periodEndDate),
                  }),
                  recognized: item.recognized,
                  ...(item.justification !== null && {
                    justification: item.justification,
                  }),
                  ...(item.legalFramework !== null && {
                    legalFramework: item.legalFramework,
                  }),
                  agents: item.agents.map((a) =>
                    SpecialRetirementGrantFirstAnalysisAgentModel.build({
                      type: a.type,
                      ...(a.intensity !== undefined &&
                        a.intensity !== null && { intensity: a.intensity }),
                      ...(a.unit !== undefined &&
                        a.unit !== null && { unit: a.unit }),
                      ...(a.habitual !== undefined &&
                        a.habitual !== null && { habitual: a.habitual }),
                      ...(a.permanence !== undefined &&
                        a.permanence !== null && { permanence: a.permanence }),
                      ...(a.source !== undefined &&
                        a.source !== null && { source: a.source }),
                      ...(a.epiEficaz !== undefined &&
                        a.epiEficaz !== null && { epiEficaz: a.epiEficaz }),
                    }),
                  ),
                  ...(item.epiEficaz !== undefined &&
                    item.epiEficaz !== null && { epiEficaz: item.epiEficaz }),
                  ...(item.observations !== undefined &&
                    item.observations !== null && {
                      observations: item.observations,
                    }),
                },
              ),
            ),
          }),
        integratedTimeline:
          SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel.build({
            items: raw.integratedTimeline.items.map((t) =>
              SpecialRetirementGrantFirstAnalysisIntegratedTimelineItemModel.build(
                {
                  startDate: new Date(t.startDate),
                  ...(t.endDate !== null && { endDate: new Date(t.endDate) }),
                  kind: t.kind,
                  ...(t.label !== null && { label: t.label }),
                },
              ),
            ),
          }),
      });
    } catch {
      return SpecialRetirementGrantFirstAnalysisModel.build({
        summary: SpecialRetirementGrantFirstAnalysisSummaryModel.build({}),
        periods: [],
        technicalDiagnosis:
          SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel.build({
            items: [],
          }),
        integratedTimeline:
          SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel.build({
            items: [],
          }),
      });
    }
  }
}
