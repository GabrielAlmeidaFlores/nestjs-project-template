import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/command/rural-timeline-analysis-cnis-contribution-period.command.repository.gateway';
import { ListRuralTimelineAnalysisCnisContributionPeriodQueryParam } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/param/list-rural-timeline-analysis-cnis-contribution-period.query.param';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/command/rural-timeline-analysis-cnis-contribution-period-under-minimum.command.repository.gateway';
import { RuralTimelineAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/command/rural-timeline-analysis-document.command.repository.gateway';
import { RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/command/rural-timeline-analysis-period-pending-exit-date.command.repository.gateway';
import { RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/command/rural-timeline-cnis-contribution-period-overdue-contribution.command.repository.gateway';
import { RuralTimelineCnisContributionPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';
import { AddRuralTimelineAnalysisCnisDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/add-rural-timeline-analysis-cnis-document.request.dto';
import { AddRuralTimelineAnalysisCnisDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/add-rural-timeline-analysis-cnis-document.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class AddRuralTimelineAnalysisCnisDocumentUseCase {
  protected readonly _type = AddRuralTimelineAnalysisCnisDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisDocumentCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisDocumentCommandRepositoryGateway: RuralTimelineAnalysisDocumentCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway: RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway,
    @Inject(RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway)
    private readonly ruralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway: RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(CnisProcessorGateway)
    private readonly cnisProcessorGateway: CnisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCaseGateway: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCaseGateway: ConsumeOrganizationCreditUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: AddRuralTimelineAnalysisCnisDocumentRequestDto,
  ): Promise<AddRuralTimelineAnalysisCnisDocumentResponseDto> {
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

    const fileBuffer = dto.cnisDocument.base64.decodeToBuffer();
    const fileModel = FileModel.build({
      buffer: fileBuffer,
      originalName: dto.cnisDocument.originalFileName,
      size: fileBuffer.length,
      encoding: 'base64',
    });

    const bucketKey = await this.fileProcessorGateway.uploadFile(fileModel);

    const cnisDocumentEntity = new RuralTimelineAnalysisDocumentEntity({
      type: RuralTimelineAnalysisDocumentTypeEnum.CNIS,
      document: bucketKey,
      ruralTimelineId: ruralTimelineAnalysisId,
    });

    const cnisData =
      await this.cnisProcessorGateway.parseCnisDocument(fileBuffer);

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.updatedBy.id,
    });

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const existingPeriods =
      await this.ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway.listByRuralTimelineAnalysisId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        new ListRuralTimelineAnalysisCnisContributionPeriodQueryParam({
          ruralTimelineAnalysis: ruralTimelineAnalysisId,
        }),
      );

    if (existingPeriods.resource.length > 0) {
      const batchSize = 10;
      for (let i = 0; i < existingPeriods.resource.length; i += batchSize) {
        const batch = existingPeriods.resource.slice(i, i + batchSize);
        const deleteOperations = batch.map((period) =>
          this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.deleteRuralTimelineAnalysisCnisContributionPeriod(
            period.id,
          ),
        );
        const deleteTransaction =
          await this.baseTransactionRepositoryGateway.execute(deleteOperations);
        await deleteTransaction.commit();
      }
    }

    const documentTransaction =
      await this.baseTransactionRepositoryGateway.execute([
        this.ruralTimelineAnalysisDocumentCommandRepositoryGateway.createRuralTimelineAnalysisDocument(
          cnisDocumentEntity,
        ),
      ]);
    await documentTransaction.commit();

    const batchSize = 5;
    const contributionPeriods = cnisAnalysis.tempoDeContribuicao.filter(
      (period) => period.dados !== undefined && period.dados?.data?.dataInicio != null,
    );

    for (let i = 0; i < contributionPeriods.length; i += batchSize) {
      const batch = contributionPeriods.slice(i, i + batchSize);
      const batchOperations = [];

      for (const contributionPeriod of batch) {
        const matchingSocialSecurityRelation =
          cnisData.socialSecurityRelations?.find(
            (relation) =>
              relation.socialSecurityAffiliationInfo.origemDoVinculo ===
                contributionPeriod.origemDoVinculo &&
              contributionPeriod.dados !== undefined &&
              relation.socialSecurityAffiliationInfo.dataInicio ===
                contributionPeriod.dados.data?.dataInicio,
          );

        const willHavePendingExitDates =
          matchingSocialSecurityRelation?.socialSecurityAffiliationInfo !==
            undefined &&
          matchingSocialSecurityRelation.socialSecurityAffiliationInfo
            .dataFim === undefined;

        const earningsForAverage =
          matchingSocialSecurityRelation?.socialSecurityAffiliationEarningsHistory.filter(
            (e) => e.remuneracao !== undefined,
          ) ?? [];

        let averageContributionAmount: DecimalValue | null = null;
        if (earningsForAverage.length > 0) {
          const total = earningsForAverage.reduce(
            (sum, e) =>
              sum + Number(e.remuneracao?.replace(/\./g, '').replace(',', '.')),
            0,
          );
          averageContributionAmount = new DecimalValue(
            total / earningsForAverage.length,
          );
        }

        const indicadorPendencia = ['PEXT'];
        const delayPayment =
          matchingSocialSecurityRelation?.socialSecurityAffiliationEarningsHistory.some(
            (earning) => {
              if (earning.indicadores === undefined || earning.indicadores === '') return false;
              return indicadorPendencia.includes(earning.indicadores);
            },
          ) ?? false;

        const contributionPeriodEntity =
          new RuralTimelineAnalysisCnisContributionPeriodEntity({
            ruralTimelineId: ruralTimelineAnalysisId,
            sequencial: contributionPeriod.seq ?? null,
            employmentRelationshipSource:
              contributionPeriod.origemDoVinculo ?? null,
            startDate: contributionPeriod.dados?.data?.dataInicio ?? null,
            endDate: contributionPeriod.dados?.data?.dataFim ?? null,
            category: contributionPeriod.tipoDoVinculo ?? null,
            qualifyingPeriod: contributionPeriod.dados?.meses ?? 0,
            status: willHavePendingExitDates || delayPayment
              ? RuralTimelineAnalysisCnisContributionPeriodStatusEnum.PENDING
              : RuralTimelineAnalysisCnisContributionPeriodStatusEnum.VALID,
            averageContributionAmount,
            contributionAdjustmentIntent:
              ContributionAdjustmentIntentTypeEnum.PROVISIONAL,
            externalSupplementationIntent: false,
            shouldConsiderPeriod: true,
            shouldConsiderLastRemunerationAsExitDate: false,
          });

        batchOperations.push(
          this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriod(
            contributionPeriodEntity,
          ),
        );

        if (
          matchingSocialSecurityRelation?.socialSecurityAffiliationEarningsHistory
        ) {
          for (const earnings of matchingSocialSecurityRelation.socialSecurityAffiliationEarningsHistory) {
            if (
              earnings.competencia !== undefined &&
              earnings.remuneracao !== undefined
            ) {
              const year = earnings.competencia.getFullYear();
              const tetoData = TetoInssData.find((t) => t.ano === year);
              const salarioMinimo = tetoData?.salarioMinimo ?? 0;
              const amount = Number(
                earnings.remuneracao.replace(/\./g, '').replace(',', '.'),
              );

              if (salarioMinimo > 0 && amount < salarioMinimo) {
                batchOperations.push(
                  this.ruralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriodUnderMinimum(
                    new RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity(
                      {
                        contributionDate: earnings.competencia,
                        contributionAmount: new DecimalValue(amount),
                        ruralTimelineCnisContributionPeriodId:
                          contributionPeriodEntity.id,
                      },
                    ),
                  ),
                );
              }
            }
          }
        }

        if (
          matchingSocialSecurityRelation?.socialSecurityAffiliationInfo &&
          matchingSocialSecurityRelation.socialSecurityAffiliationInfo
            .dataFim === undefined
        ) {
          const earningsHistory =
            matchingSocialSecurityRelation.socialSecurityAffiliationEarningsHistory;

          if (earningsHistory.length) {
            for (const earnings of earningsHistory) {
              if (
                earnings.competencia !== undefined &&
                earnings.remuneracao !== undefined
              ) {
                const pendingExitDateEntity =
                  new RuralTimelineAnalysisPeriodPendingExitDateEntity({
                    id: new RuralTimelineAnalysisPeriodPendingExitDateId(),
                    pendingDate: earnings.competencia,
                    pendingAmount: new DecimalValue(
                      Number(
                        earnings.remuneracao
                          .replace(/\./g, '')
                          .replace(',', '.'),
                      ),
                    ),
                    ruralTimelineCnisContributionPeriodId:
                      contributionPeriodEntity.id,
                  });

                batchOperations.push(
                  this.ruralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway.createRuralTimelineAnalysisPeriodPendingExitDate(
                    pendingExitDateEntity,
                  ),
                );
              }
            }
          } else {
            const pendingExitDateEntity =
              new RuralTimelineAnalysisPeriodPendingExitDateEntity({
                id: new RuralTimelineAnalysisPeriodPendingExitDateId(),
                pendingDate:
                  matchingSocialSecurityRelation.socialSecurityAffiliationInfo
                    .dataInicio ?? new Date(),
                pendingAmount: new DecimalValue(0),
                ruralTimelineCnisContributionPeriodId:
                  contributionPeriodEntity.id,
              });

            batchOperations.push(
              this.ruralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway.createRuralTimelineAnalysisPeriodPendingExitDate(
                pendingExitDateEntity,
              ),
            );
          }
        }
        if (
          delayPayment &&
          matchingSocialSecurityRelation?.socialSecurityAffiliationEarningsHistory
        ) {
          for (const earnings of matchingSocialSecurityRelation.socialSecurityAffiliationEarningsHistory) {
            if (
              earnings.indicadores !== undefined &&
              indicadorPendencia.includes(earnings.indicadores) &&
              earnings.competencia !== undefined
            ) {
              batchOperations.push(
                this.ruralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway.createRuralTimelineCnisContributionPeriodOverdueContribution(
                  new RuralTimelineCnisContributionPeriodOverdueContributionEntity({
                    id: new RuralTimelineCnisContributionPeriodOverdueContributionId(),
                    overdueDate: earnings.competencia,
                    paymentDate: null,
                    ruralTimelineCnisContributionPeriodId: contributionPeriodEntity.id,
                  }),
                ),
              );
            }
          }
        }
      }

      const batchTransaction =
        await this.baseTransactionRepositoryGateway.execute(batchOperations);
      await batchTransaction.commit();
    }

    await this.generateImpactAnalysisForAllPeriods(
      organizationSessionData,
      sessionData,
      organizationMember.id,
      ruralTimelineAnalysisId,
    );

    return AddRuralTimelineAnalysisCnisDocumentResponseDto.build({
      ruralTimelineAnalysisDocumentId: cnisDocumentEntity.id,
    });
  }

  private async generateImpactAnalysisForAllPeriods(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    organizationMemberId: unknown,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<void> {
    const periodsResult =
      await this.ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway.listByRuralTimelineAnalysisId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        new ListRuralTimelineAnalysisCnisContributionPeriodQueryParam({
          ruralTimelineAnalysis: ruralTimelineAnalysisId,
        }),
      );

    for (const cnisContributionPeriod of periodsResult.resource) {
      const hasOverdueContributionWithBothDates =
        cnisContributionPeriod.ruralTimelineCnisContributionPeriodOverdueContribution.some(
          (overdue) => overdue.paymentDate !== null,
        );

      if (!hasOverdueContributionWithBothDates) {
        continue;
      }

      const promptResponse =
        await this.getPaymentPlanPaidResourcePromptUseCaseGateway.execute(
          PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS,
        );

      const creditTransaction =
        await this.consumeOrganizationCreditUseCaseGateway.execute(
          organizationSessionData.organizationId,
          PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS,
          organizationMemberId as never,
        );

      const periodContext = JSON.stringify(
        {
          periodInfo: {
            employmentRelationshipSource:
              cnisContributionPeriod.employmentRelationshipSource,
            startDate: cnisContributionPeriod.startDate,
            endDate: cnisContributionPeriod.endDate,
            category: cnisContributionPeriod.category,
            qualifyingPeriod: cnisContributionPeriod.qualifyingPeriod,
            status: cnisContributionPeriod.status,
            averageContributionAmount:
              cnisContributionPeriod.averageContributionAmount?.toString(),
            contributionAdjustmentIntent:
              cnisContributionPeriod.contributionAdjustmentIntent,
            externalSupplementationIntent:
              cnisContributionPeriod.externalSupplementationIntent,
            underMinimum:
              cnisContributionPeriod.ruralTimelineCnisContributionPeriodUnderMinimum.map(
                (underMin: {
                  contributionDate: Date;
                  contributionAmount: DecimalValue;
                }) => ({
                  contributionDate: underMin.contributionDate,
                  contributionAmount: underMin.contributionAmount.toString(),
                }),
              ),
            pendingExitDates:
              cnisContributionPeriod.ruralTimelineCnisContributionPeriodPendingExitDate.map(
                (pendingExit: {
                  pendingDate: Date;
                  pendingAmount: DecimalValue;
                }) => ({
                  pendingDate: pendingExit.pendingDate,
                  pendingAmount: pendingExit.pendingAmount.toString(),
                }),
              ),
            overdueContributions:
              cnisContributionPeriod.ruralTimelineCnisContributionPeriodOverdueContribution.map(
                (overdue: { overdueDate: Date; paymentDate: Date | null }) => ({
                  overdueDate: overdue.overdueDate,
                  paymentDate: overdue.paymentDate,
                }),
              ),
          },
        },
        null,
        2,
      );

      const systemInstruction = promptResponse.prompt;

      const analysisResult =
        await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
          GenerateResponseInputModel.build({
            systemInstruction,
            prompt: periodContext,
            promptFiles: [],
          }),
        );

      const updatedPeriod =
        new RuralTimelineAnalysisCnisContributionPeriodEntity({
          id: cnisContributionPeriod.id,
          employmentRelationshipSource:
            cnisContributionPeriod.employmentRelationshipSource,
          startDate: cnisContributionPeriod.startDate,
          endDate: cnisContributionPeriod.endDate,
          category: cnisContributionPeriod.category,
          qualifyingPeriod: cnisContributionPeriod.qualifyingPeriod,
          status: cnisContributionPeriod.status,
          averageContributionAmount:
            cnisContributionPeriod.averageContributionAmount,
          contributionAdjustmentIntent:
            cnisContributionPeriod.contributionAdjustmentIntent,
          externalSupplementationIntent:
            cnisContributionPeriod.externalSupplementationIntent,
          shouldConsiderPeriod: cnisContributionPeriod.shouldConsiderPeriod,
          shouldConsiderLastRemunerationAsExitDate:
            cnisContributionPeriod.shouldConsiderLastRemunerationAsExitDate,
          cnisDocument: cnisContributionPeriod.cnisDocument,
          impactAnalysis: analysisResult,
          ruralTimelineId: ruralTimelineAnalysisId,
          createdAt: cnisContributionPeriod.createdAt,
          updatedAt: cnisContributionPeriod.updatedAt,
          deletedAt: cnisContributionPeriod.deletedAt,
        });

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        creditTransaction,
        this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.updateRuralTimelineAnalysisCnisContributionPeriod(
          updatedPeriod,
        ),
      ]);

      await transaction.commit();
    }
  }
}
