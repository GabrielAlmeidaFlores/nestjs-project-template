import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/command/special-retirement-grant.command.repository.gateway';
import { SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/command/special-retirement-grant-earnings-history.command.repository.gateway';
import { SpecialRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/command/special-retirement-grant-period.command.repository.gateway';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-overdue-contribution/command/special-retirement-grant-period-overdue-contribution.command.repository.gateway';
import { SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-pending-exit-date/command/special-retirement-grant-period-pending-exit-date.command.repository.gateway';
import { SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-under-minimum/command/special-retirement-grant-period-under-minimum.command.repository.gateway';
import { SpecialRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/command/special-retirement-grant-result.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';
import { SpecialRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.entity';
import { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/special-retirement-grant-period-overdue-contribution.entity';
import { SpecialRetirementGrantPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/special-retirement-grant-period-pending-exit-date.entity';
import { SpecialRetirementGrantPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/special-retirement-grant-period-under-minimum.entity';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import { CreateSpecialRetirementGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-first-analysis.response.dto';
import { InvalidSpecialRetirementGrantFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/invalid-special-retirement-grant-first-analysis-json.error';
import { SpecialRetirementGrantAtLeastOnePppRequiredError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-at-least-one-ppp-required.error';
import { SpecialRetirementGrantCnisRequiredError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-cnis-required.error';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import {
  SpecialRetirementGrantFirstAnalysisAgentModel,
  SpecialRetirementGrantFirstAnalysisEarningsHistoryItemModel,
  SpecialRetirementGrantFirstAnalysisIntegratedTimelineItemModel,
  SpecialRetirementGrantFirstAnalysisIntegratedTimelineModel,
  SpecialRetirementGrantFirstAnalysisModel,
  SpecialRetirementGrantFirstAnalysisObservationModel,
  SpecialRetirementGrantFirstAnalysisPeriodModel,
  SpecialRetirementGrantFirstAnalysisSummaryModel,
  SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemModel,
  SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisModel,
} from '@module/customer/analysis-tool/module/special-retirement-grant/model/generic/special-retirement-grant-first-analysis.model';
import {
  SpecialRetirementGrantFirstAnalysisEarningsHistoryItemInterface,
  SpecialRetirementGrantFirstAnalysisInterface,
} from '@module/customer/analysis-tool/module/special-retirement-grant/model/interface/special-retirement-grant-first-analysis.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialRetirementGrantFirstAnalysisUseCase {
  protected readonly _type =
    CreateSpecialRetirementGrantFirstAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodQueryRepositoryGateway)
    private readonly specialRetirementGrantPeriodQueryRepositoryGateway: SpecialRetirementGrantPeriodQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodCommandRepositoryGateway: SpecialRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway)
    private readonly specialRetirementGrantEarningsHistoryCommandRepositoryGateway: SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway,
    @Inject(
      SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway,
    )
    private readonly specialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway: SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway: SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway)
    private readonly specialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway: SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantCommandRepositoryGateway)
    private readonly specialRetirementGrantCommandRepositoryGateway: SpecialRetirementGrantCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantResultCommandRepositoryGateway)
    private readonly specialRetirementGrantResultCommandRepositoryGateway: SpecialRetirementGrantResultCommandRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<CreateSpecialRetirementGrantFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    if (analysisToolRecord.specialRetirementGrant === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const grant = analysisToolRecord.specialRetirementGrant;

    if (grant.cnisDocument === null) {
      throw new SpecialRetirementGrantCnisRequiredError();
    }

    const hasPpp = grant.specialRetirementGrantDocument.some(
      (doc) => doc.type === SpecialRetirementGrantDocumentTypeEnum.PPP,
    );

    if (hasPpp === false) {
      throw new SpecialRetirementGrantAtLeastOnePppRequiredError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      grant.cnisDocument,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecord.analysisToolClient,
      createdBy: analysisToolRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecord.analysisToolClient.updatedBy.id,
    });
    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const docBuffers = await Promise.all(
      grant.specialRetirementGrantDocument.map((doc) =>
        this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const grantDataBuffer = this.buildFirstAnalysisGrantDataBuffer(grant);

    const firstAnalysisJson =
      await this.analysisProcessorGateway.getSpecialRetirementGrantFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [grantDataBuffer, cnisBuffer, ...docBuffers],
        true,
      );

    if (firstAnalysisJson === null) {
      throw new InvalidSpecialRetirementGrantFirstAnalysisJsonError();
    }

    const parsed = this.parseFirstAnalysisOrThrow(firstAnalysisJson);

    const existingResult = grant.specialRetirementGrantResult;

    const resultEntity = new SpecialRetirementGrantResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      specialRetirementGrantCompleteAnalysis:
        existingResult?.specialRetirementGrantCompleteAnalysis ?? null,
      specialRetirementGrantSimplifiedAnalysis:
        existingResult?.specialRetirementGrantSimplifiedAnalysis ?? null,
      specialRetirementGrantFirstAnalysis: parsed.cleanedJson,
    });

    const resultTransaction =
      existingResult !== null
        ? this.specialRetirementGrantResultCommandRepositoryGateway.updateSpecialRetirementGrantResult(
            existingResult.id,
            resultEntity,
          )
        : this.specialRetirementGrantResultCommandRepositoryGateway.createSpecialRetirementGrantResult(
            resultEntity,
          );

    const grantEntity = new SpecialRetirementGrantEntity({
      ...grant,
      specialRetirementGrantResult: resultEntity,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
      createdBy: analysisToolRecord.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const grantUpdateTransaction =
      this.specialRetirementGrantCommandRepositoryGateway.updateSpecialRetirementGrant(
        grantEntity.id,
        grantEntity,
      );

    const existingPeriodIds =
      await this.specialRetirementGrantPeriodQueryRepositoryGateway.listIdsBySpecialRetirementGrantId(
        specialRetirementGrantId,
      );

    const deletePeriodTransactions = existingPeriodIds.map((id) =>
      this.specialRetirementGrantPeriodCommandRepositoryGateway.deleteSpecialRetirementGrantPeriod(
        id,
      ),
    );

    const createPeriodAndEarningsTransactions = parsed.raw.periods.flatMap(
      (p) => {
        const status = this.mapStatusToEnum(p.status);

        const periodEndDate =
          p.endDate !== null && p.endDate !== '' ? new Date(p.endDate) : null;

        const periodEntity = new SpecialRetirementGrantPeriodEntity({
          sequencial: null,
          employmentRelationshipSource: p.employmentRelationshipSource ?? null,
          startDate: p.startDate !== '' ? new Date(p.startDate) : null,
          endDate: periodEndDate,
          category: p.category ?? null,
          status,
          averageContributionAmount: null,
          shouldConsiderPeriod: true,
          shouldConsiderLastRemunerationAsExitDate: false,
          cnisDocument: grantEntity.cnisDocument,
          specialRetirementGrant: grantEntity,
        });

        const periodTx =
          this.specialRetirementGrantPeriodCommandRepositoryGateway.createSpecialRetirementGrantPeriod(
            periodEntity,
          );

        const earningsHistory = p.earningsHistory;

        const earningsTx = earningsHistory.map((eh) =>
          this.specialRetirementGrantEarningsHistoryCommandRepositoryGateway.createSpecialRetirementGrantEarningsHistory(
            new SpecialRetirementGrantEarningsHistoryEntity({
              competence:
                eh.competence !== null && eh.competence !== ''
                  ? new Date(eh.competence)
                  : null,
              remuneration: eh.remuneration ?? null,
              indicators: eh.indicators ?? null,
              paymentDate:
                eh.paymentDate !== null && eh.paymentDate !== ''
                  ? new Date(eh.paymentDate)
                  : null,
              competenceBelowTheMinimum: eh.competenceBelowTheMinimum ?? null,
              specialRetirementGrant: grantEntity,
              specialRetirementGrantPeriod: periodEntity,
            }),
          ),
        );

        const underMinimumTx = this.buildUnderMinimumTransactions(
          earningsHistory,
          periodEntity,
        );

        const overdueContributionTx = this.buildOverdueContributionTransactions(
          earningsHistory,
          periodEntity,
        );

        const pendingExitDateTx = this.buildPendingExitDateTransactions(
          earningsHistory,
          periodEntity,
          periodEndDate,
          p.startDate !== '' ? new Date(p.startDate) : new Date(),
        );

        return [
          periodTx,
          ...earningsTx,
          ...underMinimumTx,
          ...overdueContributionTx,
          ...pendingExitDateTx,
        ];
      },
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      resultTransaction,
      grantUpdateTransaction,
      ...deletePeriodTransactions,
      ...createPeriodAndEarningsTransactions,
    ]);

    await transaction.commit();

    return CreateSpecialRetirementGrantFirstAnalysisResponseDto.build({
      specialRetirementGrantFirstAnalysis: parsed.model,
    });
  }

  private parseFirstAnalysisOrThrow(firstAnalysis: string): {
    cleanedJson: string;
    model: SpecialRetirementGrantFirstAnalysisModel;
    raw: SpecialRetirementGrantFirstAnalysisInterface;
  } {
    try {
      let cleanedJson = firstAnalysis;
      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as SpecialRetirementGrantFirstAnalysisInterface;

      return {
        cleanedJson: JSON.stringify(raw),
        raw,
        model: SpecialRetirementGrantFirstAnalysisModel.build({
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
          periods: raw.periods.map((p) =>
            SpecialRetirementGrantFirstAnalysisPeriodModel.build({
              ...(p.employmentRelationshipSource !== null && {
                employmentRelationshipSource: p.employmentRelationshipSource,
              }),
              startDate: new Date(p.startDate),
              ...(p.endDate !== null && { endDate: new Date(p.endDate) }),
              ...(p.category !== null && { category: p.category }),
              ...(p.impact !== null && { impact: p.impact }),
              ...(p.gracePeriod !== null && { gracePeriod: p.gracePeriod }),
              shouldConsiderPeriod: true,
              status: p.status,
              agents: p.agents.map((a) =>
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
              earningsHistory: p.earningsHistory.map((eh) =>
                SpecialRetirementGrantFirstAnalysisEarningsHistoryItemModel.build(
                  {
                    ...(eh.competence !== null && {
                      competence: new Date(eh.competence),
                    }),
                    ...(eh.remuneration !== null && {
                      remuneration: eh.remuneration,
                    }),
                    ...(eh.indicators !== null && {
                      indicators: eh.indicators,
                    }),
                    ...(eh.paymentDate !== null && {
                      paymentDate: new Date(eh.paymentDate),
                    }),
                    ...(eh.competenceBelowTheMinimum !== null && {
                      competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                    }),
                  },
                ),
              ),
              observations: (p.observations ?? []).map((obs) =>
                SpecialRetirementGrantFirstAnalysisObservationModel.build({
                  id: obs.id.toString(),
                  observation: obs.observation,
                  createdAt: obs.createdAt,
                  updatedAt: obs.updatedAt,
                }),
              ),
            }),
          ),
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
                          a.permanence !== null && {
                            permanence: a.permanence,
                          }),
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
        }),
      };
    } catch {
      throw new InvalidSpecialRetirementGrantFirstAnalysisJsonError();
    }
  }

  private mapStatusToEnum(
    status: string,
  ): SpecialRetirementGrantPeriodStatusEnum | null {
    const normalized = status.toLowerCase();
    if (
      normalized === 'valid' ||
      normalized === 'valido' ||
      normalized === 'válido'
    ) {
      return SpecialRetirementGrantPeriodStatusEnum.VALID;
    }
    if (
      normalized === 'pending' ||
      normalized === 'pendencia' ||
      normalized === 'pendência'
    ) {
      return SpecialRetirementGrantPeriodStatusEnum.PENDING;
    }
    return null;
  }

  private buildFirstAnalysisGrantDataBuffer(
    grant: NonNullable<
      Awaited<
        ReturnType<
          AnalysisToolRecordQueryRepositoryGateway['findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail']
        >
      >['specialRetirementGrant']
    >,
  ): Buffer {
    const grantData = {
      name: grant.name,
      specialActivity: grant.specialActivity,
      cnisDocument: grant.cnisDocument,
      documents: grant.specialRetirementGrantDocument.map((d) => ({
        id: d.id.toString(),
        type: d.type,
      })),
      inssBenefits: grant.specialRetirementGrantBenefit.map(
        (b) => b.inssBenefitNumber,
      ),
      legalProceedings: grant.specialRetirementGrantLegalProceeding.map(
        (p) => p.legalProceedingNumber,
      ),
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private buildUnderMinimumTransactions(
    earningsHistory: SpecialRetirementGrantFirstAnalysisEarningsHistoryItemInterface[],
    periodEntity: SpecialRetirementGrantPeriodEntity,
  ): TransactionType[] {
    return earningsHistory
      .filter(
        (eh) =>
          eh.competenceBelowTheMinimum === true &&
          eh.competence !== null &&
          eh.competence !== '' &&
          eh.remuneration !== null &&
          eh.remuneration !== '',
      )
      .map((eh) => {
        const remuneration = eh.remuneration as string;
        const competence = eh.competence as string;
        const amount = Number(
          remuneration.replace(/\./g, '').replace(',', '.'),
        );

        return this.specialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway.createSpecialRetirementGrantPeriodUnderMinimum(
          new SpecialRetirementGrantPeriodUnderMinimumEntity({
            contributionDate: new Date(competence),
            contributionAmount: new DecimalValue(amount),
            specialRetirementGrantPeriod: periodEntity,
          }),
        );
      });
  }

  private buildOverdueContributionTransactions(
    earningsHistory: SpecialRetirementGrantFirstAnalysisEarningsHistoryItemInterface[],
    periodEntity: SpecialRetirementGrantPeriodEntity,
  ): TransactionType[] {
    const indicadorPendencia = ['PEXT'];

    return earningsHistory
      .filter(
        (eh) =>
          eh.indicators !== null &&
          eh.indicators !== '' &&
          indicadorPendencia.includes(eh.indicators),
      )
      .map((eh) =>
        this.specialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway.createSpecialRetirementGrantPeriodOverdueContribution(
          new SpecialRetirementGrantPeriodOverdueContributionEntity({
            overdueDate:
              eh.competence !== null && eh.competence !== ''
                ? new Date(eh.competence)
                : new Date(),
            paymentDate:
              eh.paymentDate !== null && eh.paymentDate !== ''
                ? new Date(eh.paymentDate)
                : null,
            specialRetirementGrantPeriod: periodEntity,
          }),
        ),
      );
  }

  private buildPendingExitDateTransactions(
    earningsHistory: SpecialRetirementGrantFirstAnalysisEarningsHistoryItemInterface[],
    periodEntity: SpecialRetirementGrantPeriodEntity,
    periodEndDate: Date | null,
    periodStartDate: Date,
  ): TransactionType[] {
    if (periodEndDate !== null) {
      return [];
    }

    if (earningsHistory.length > 0) {
      return earningsHistory
        .filter((eh) => eh.competence !== null && eh.competence !== '')
        .map((eh) => {
          const competence = eh.competence as string;
          const amount =
            eh.remuneration !== null && eh.remuneration !== ''
              ? Number(eh.remuneration.replace(/\./g, '').replace(',', '.'))
              : 0;

          return this.specialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway.createSpecialRetirementGrantPeriodPendingExitDate(
            new SpecialRetirementGrantPeriodPendingExitDateEntity({
              pendingDate: new Date(competence),
              pendingAmount: new DecimalValue(amount),
              specialRetirementGrantPeriod: periodEntity,
            }),
          );
        });
    }

    return [
      this.specialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway.createSpecialRetirementGrantPeriodPendingExitDate(
        new SpecialRetirementGrantPeriodPendingExitDateEntity({
          pendingDate: periodStartDate,
          pendingAmount: new DecimalValue(0),
          specialRetirementGrantPeriod: periodEntity,
        }),
      ),
    ];
  }
}
