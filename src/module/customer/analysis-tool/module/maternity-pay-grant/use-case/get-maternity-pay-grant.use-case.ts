import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import {
  GetMaternityPayGrantCnisDocumentResponseDto,
  GetMaternityPayGrantInssBenefitResponseDto,
  GetMaternityPayGrantLegalProceedingResponseDto,
  GetMaternityPayGrantPeriodEarningsHistoryResponseDto,
  GetMaternityPayGrantPeriodResponseDto,
  GetMaternityPayGrantResponseDto,
  GetMaternityPayGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/get-maternity-pay-grant.response.dto';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import {
  MaternityPayGrantCompleteAnalysisApplicableRuleModel,
  MaternityPayGrantCompleteAnalysisModel,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/model/generic/maternity-pay-grant-complete-analysis.model';
import {
  MaternityPayGrantFirstAnalysisAnalysisSectionModel,
  MaternityPayGrantFirstAnalysisApplicationDeadlineModel,
  MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel,
  MaternityPayGrantFirstAnalysisModel,
  MaternityPayGrantFirstAnalysisPeriodModel,
  MaternityPayGrantFirstAnalysisRequirementAnalysisModel,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/model/generic/maternity-pay-grant-first-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { MaternityPayGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/interface/maternity-pay-grant-first-analysis.interface';
import type { MaternityPayGrantResultInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/interface/maternity-pay-grant-result.interface';

@Injectable()
export class GetMaternityPayGrantUseCase {
  protected readonly _type = GetMaternityPayGrantUseCase.name;

  public constructor(
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayGrantId: MaternityPayGrantId,
  ): Promise<GetMaternityPayGrantResponseDto> {
    const [result, analysisToolRecord] = await Promise.all([
      this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      ),
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        maternityPayGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      ),
    ]);

    const client = analysisToolRecord.analysisToolClient;

    const cnisDocument =
      result.cnisDocument !== null
        ? await this.buildCnisDocumentResponse(result.cnisDocument)
        : null;

    const firstAnalysisModel =
      result.maternityPayGrantResult?.firstAnalysis !== null &&
      result.maternityPayGrantResult?.firstAnalysis !== undefined
        ? this.parseFirstAnalysis(result.maternityPayGrantResult.firstAnalysis)
        : null;

    const completeAnalysisModel =
      result.maternityPayGrantResult?.completeAnalysis !== null &&
      result.maternityPayGrantResult?.completeAnalysis !== undefined
        ? this.parseCompleteAnalysis(
            result.maternityPayGrantResult.completeAnalysis,
          )
        : null;

    return GetMaternityPayGrantResponseDto.build({
      id: result.id,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.category !== null && { category: result.category }),
      ...(result.triggeringEvent !== null && {
        triggeringEvent: result.triggeringEvent,
      }),
      ...(result.triggeringEventDate !== null && {
        triggeringEventDate: result.triggeringEventDate,
      }),
      ...(result.isCurrentlyUnemployed !== null && {
        isCurrentlyUnemployed: result.isCurrentlyUnemployed,
      }),
      ...(result.isUnemployedAtTriggeringEventDate !== null && {
        isUnemployedAtTriggeringEventDate:
          result.isUnemployedAtTriggeringEventDate,
      }),
      ...(result.isRuralInsured !== null && {
        isRuralInsured: result.isRuralInsured,
      }),
      ...(result.ruralPeriodStartDate !== null && {
        ruralPeriodStartDate: result.ruralPeriodStartDate,
      }),
      ...(result.ruralPeriodEndDate !== null && {
        ruralPeriodEndDate: result.ruralPeriodEndDate,
      }),
      ...(result.ruralPeriodDocumentDescription !== null && {
        ruralPeriodDocumentDescription: result.ruralPeriodDocumentDescription,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      ...(result.maternityPayGrantResult !== null && {
        maternityPayGrantResult: GetMaternityPayGrantResultResponseDto.build({
          ...(firstAnalysisModel !== null && {
            firstAnalysis: firstAnalysisModel,
          }),
          ...(completeAnalysisModel !== null && {
            completeAnalysis: completeAnalysisModel,
          }),
          ...(result.maternityPayGrantResult.simplifiedAnalysis !== null && {
            simplifiedAnalysis:
              result.maternityPayGrantResult.simplifiedAnalysis,
          }),
          ...(result.maternityPayGrantResult.completeAnalysisDownload !==
            null && {
            completeAnalysisDownload:
              result.maternityPayGrantResult.completeAnalysisDownload,
          }),
        }),
      }),
      ...(result.maternityPayGrantInssBenefit !== null && {
        maternityPayGrantInssBenefit: result.maternityPayGrantInssBenefit.map(
          (b) =>
            GetMaternityPayGrantInssBenefitResponseDto.build({
              inssBenefitNumber: b.inssBenefitNumber,
            }),
        ),
      }),
      ...(result.maternityPayGrantLegalProceeding !== null && {
        maternityPayGrantLegalProceeding:
          result.maternityPayGrantLegalProceeding.map((p) =>
            GetMaternityPayGrantLegalProceedingResponseDto.build({
              legalProceedingNumber: p.legalProceedingNumber,
            }),
          ),
      }),
      ...(result.maternityPayGrantPeriod !== null && {
        maternityPayGrantPeriod: result.maternityPayGrantPeriod.map((p) => {
          const periodEarningsHistory = (
            result.maternityPayGrantEarningsHistory ?? []
          ).filter(
            (eh) =>
              eh.maternityPayGrantPeriodId?.toString() === p.id.toString(),
          );

          return GetMaternityPayGrantPeriodResponseDto.build({
            maternityPayGrantPeriodId: p.id,
            startDate: p.startDate,
            ...(p.endDate !== null && { endDate: p.endDate }),
            category: p.category,
            isPendency: p.isPendency,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum,
            ...(p.pendencyReason !== null && {
              pendencyReason: p.pendencyReason,
            }),
            ...(p.typeOfContribution !== null && {
              typeOfContribution: p.typeOfContribution,
            }),
            status: p.status,
            ...(p.periodConsideration !== null && {
              periodConsideration: p.periodConsideration,
            }),
            ...(p.contributionAverage !== null && {
              contributionAverage: p.contributionAverage,
            }),
            ...(p.bondOrigin !== null && { bondOrigin: p.bondOrigin }),
            ...(p.complementViaMyInss !== null && {
              complementViaMyInss: p.complementViaMyInss,
            }),
            ...(periodEarningsHistory.length > 0 && {
              earningsHistory: periodEarningsHistory.map((eh) =>
                GetMaternityPayGrantPeriodEarningsHistoryResponseDto.build({
                  ...(eh.competence !== null && { competence: eh.competence }),
                  ...(eh.remuneration !== null && {
                    remuneration: eh.remuneration,
                  }),
                  ...(eh.indicators !== null && { indicators: eh.indicators }),
                  ...(eh.paymentDate !== null && {
                    paymentDate: eh.paymentDate,
                  }),
                  ...(eh.contribution !== null && {
                    contribution: eh.contribution,
                  }),
                  ...(eh.contributionSalary !== null && {
                    contributionSalary: eh.contributionSalary,
                  }),
                  ...(eh.analysis !== null && { analysis: eh.analysis }),
                  ...(eh.competenceBelowTheMinimum !== null && {
                    competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                  }),
                }),
              ),
            }),
          });
        }),
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(client.name !== null && { clientName: client.name }),
      ...(client.federalDocument !== null && {
        clientFederalDocument: client.federalDocument,
      }),
      ...(client.email !== null && { clientEmail: client.email }),
      ...(client.corporateEmail !== null && {
        clientCorporateEmail: client.corporateEmail,
      }),
      ...(client.phoneNumber !== null && {
        clientPhoneNumber: client.phoneNumber,
      }),
      ...(client.birthDate !== null && { clientBirthDate: client.birthDate }),
      ...(client.gender !== null && { clientGender: client.gender }),
      ...(client.clientType !== null && { clientType: client.clientType }),
    });
  }

  private parseFirstAnalysis(
    firstAnalysisJson: string,
  ): MaternityPayGrantFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(
        firstAnalysisJson,
      ) as MaternityPayGrantFirstAnalysisInterface;

      const deadline = raw.applicationDeadlineAnalysis;

      return MaternityPayGrantFirstAnalysisModel.build({
        insuredQualityAnalysis:
          MaternityPayGrantFirstAnalysisAnalysisSectionModel.build(
            raw.insuredQualityAnalysis,
          ),
        carenciaAnalysis:
          MaternityPayGrantFirstAnalysisAnalysisSectionModel.build(
            raw.carenciaAnalysis,
          ),
        requirementAnalysis:
          MaternityPayGrantFirstAnalysisRequirementAnalysisModel.build(
            raw.requirementAnalysis,
          ),
        applicationDeadlineAnalysis:
          MaternityPayGrantFirstAnalysisApplicationDeadlineModel.build({
            status: deadline.status,
            ...(deadline.duration !== null &&
              deadline.duration !== undefined && {
                duration: deadline.duration,
              }),
            ...(deadline.startDate !== null &&
              deadline.startDate !== undefined && {
                startDate: new Date(deadline.startDate),
              }),
            ...(deadline.terminationDate !== null &&
              deadline.terminationDate !== undefined && {
                terminationDate: new Date(deadline.terminationDate),
              }),
            ...(deadline.startLeaveDate !== null &&
              deadline.startLeaveDate !== undefined && {
                startLeaveDate: new Date(deadline.startLeaveDate),
              }),
            ...(deadline.endLeaveDate !== null &&
              deadline.endLeaveDate !== undefined && {
                endLeaveDate: new Date(deadline.endLeaveDate),
              }),
            ...(deadline.total !== null &&
              deadline.total !== undefined && { total: deadline.total }),
            ...(deadline.amountBenefit !== null &&
              deadline.amountBenefit !== undefined && {
                amountBenefit: deadline.amountBenefit,
              }),
            ...(deadline.calculationBasis !== null &&
              deadline.calculationBasis !== undefined && {
                calculationBasis: deadline.calculationBasis,
              }),
          }),
        benefitEligibilityAnalysis:
          MaternityPayGrantFirstAnalysisAnalysisSectionModel.build(
            raw.benefitEligibilityAnalysis,
          ),
        periods: raw.periods.map((period) =>
          MaternityPayGrantFirstAnalysisPeriodModel.build({
            name: period.name,
            startDate: new Date(period.startDate),
            endDate: new Date(period.endDate),
            category: period.category,
            status: period.status,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            belowMinimumContributions: period.belowMinimumContributions.map(
              (item) =>
                MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel.build(
                  {
                    contributionDate: new Date(item.contributionDate),
                    contributionValue: new DecimalValue(
                      String(item.contributionValue),
                    ),
                  },
                ),
            ),
            ...(period.gracePeriod !== undefined && {
              gracePeriod: period.gracePeriod,
            }),
            ...(period.contributionAverage !== undefined && {
              contributionAverage: String(period.contributionAverage),
            }),
            ...(period.reasonPendency !== undefined && {
              reasonPendency: period.reasonPendency,
            }),
            ...(period.bondOrigin !== null &&
              period.bondOrigin !== undefined && {
                bondOrigin: period.bondOrigin,
              }),
            ...(period.complementViaMyInss !== null &&
              period.complementViaMyInss !== undefined && {
                complementViaMyInss: period.complementViaMyInss,
              }),
            ...(period.impact !== null &&
              period.impact !== undefined && { impact: period.impact }),
            ...(period.typeOfContribution !== null &&
              period.typeOfContribution !== undefined && {
                typeOfContribution: period.typeOfContribution,
              }),
            ...(period.periodConsideration !== null &&
              period.periodConsideration !== undefined && {
                periodConsideration: period.periodConsideration,
              }),
          }),
        ),
        ...(raw.lastContribution !== null &&
          raw.lastContribution !== undefined && {
            lastContribution: new Date(raw.lastContribution),
          }),
        ...(raw.categoryAtDfg !== null &&
          raw.categoryAtDfg !== undefined && {
            categoryAtDfg: raw.categoryAtDfg,
          }),
        ...(raw.employmentBondStatus !== null &&
          raw.employmentBondStatus !== undefined && {
            employmentBondStatus: raw.employmentBondStatus,
          }),
      });
    } catch {
      return null;
    }
  }

  private parseCompleteAnalysis(
    completeAnalysisJson: string,
  ): MaternityPayGrantCompleteAnalysisModel | null {
    try {
      const raw = JSON.parse(
        completeAnalysisJson,
      ) as MaternityPayGrantResultInterface;

      return MaternityPayGrantCompleteAnalysisModel.build({
        eligibilityStatus: raw.eligibilityStatus,
        insuredQualityStatus: raw.insuredQualityStatus,
        applicableRules: raw.applicableRules.map((rule) =>
          MaternityPayGrantCompleteAnalysisApplicableRuleModel.build({
            ruleName: rule.ruleName,
            result: rule.result,
            detailedAnalysis: rule.detailedAnalysis,
            ...(rule.estimatedBenefit !== null && {
              estimatedBenefit: rule.estimatedBenefit,
            }),
          }),
        ),
        analysisDescription: raw.analysisDescription,
      });
    } catch {
      return null;
    }
  }

  private async buildCnisDocumentResponse(
    document: string,
  ): Promise<GetMaternityPayGrantCnisDocumentResponseDto> {
    const [documentUrl, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileSignedUrl(document),
      this.fileProcessorGateway.getOriginalFileName(document),
    ]);

    return GetMaternityPayGrantCnisDocumentResponseDto.build({
      document: documentUrl.toString(),
      originalFileName,
    });
  }
}
