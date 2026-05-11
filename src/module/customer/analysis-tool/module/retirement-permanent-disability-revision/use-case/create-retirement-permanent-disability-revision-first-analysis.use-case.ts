import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { CnisXRayAnalysisGateway } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.gateway';
import { CnisWorkPeriodModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-period.model';
import { CnisWorkPeriodsResponseModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-periods-response.model';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { RetirementPermanentDisabilityRevisionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/command/retirement-permanent-disability-revision.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/command/retirement-permanent-disability-revision-concession-letter-breakdown.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/command/retirement-permanent-disability-revision-result.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/command/retirement-permanent-disability-revision-work-periods.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods-earnings-history/command/retirement-permanent-disability-revision-work-periods-earnings-history.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/retirement-permanent-disability-revision-concession-letter-breakdown.entity';
import { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import { RetirementPermanentDisabilityRevisionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-pendency-reason.enum';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/retirement-permanent-disability-revision-work-periods.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/retirement-permanent-disability-revision-work-periods-earnings-history.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/value-object/retirement-permanent-disability-revision-work-periods-earnings-history-id.value-object';
import {
  CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto,
  RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisModel,
  RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemModel,
  RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeModel,
  RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredModel,
  RetirementPermanentDisabilityRevisionFirstAnalysisModel,
} from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision-first-analysis.response.dto';
import { InvalidRetirementPermanentDisabilityRevisionFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/invalid-retirement-permanent-disability-revision-first-analysis-json.error';
import { RetirementPermanentDisabilityRevisionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-cnis-document-not-found.error';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { RetirementPermanentDisabilityRevisionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/interface/retirement-permanent-disability-revision-first-analysis.interface';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: RetirementPermanentDisabilityRevisionFirstAnalysisModel;
}

@Injectable()
export class CreateRetirementPermanentDisabilityRevisionFirstAnalysisUseCase {
  protected readonly _type =
    CreateRetirementPermanentDisabilityRevisionFirstAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisXRayAnalysisGateway)
    private readonly cnisXRayAnalysisGateway: CnisXRayAnalysisGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionCommandRepositoryGateway: RetirementPermanentDisabilityRevisionCommandRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionResultCommandRepositoryGateway: RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway,
    )
    private readonly concessionLetterBreakdownCommandRepositoryGateway: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway,
    )
    private readonly workPeriodsCommandRepositoryGateway: RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly workPeriodsEarningsHistoryCommandRepositoryGateway: RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway,
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
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): Promise<CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPermanentDisabilityRevisionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const analysisQueryResult =
      await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const cnisDocument = analysisQueryResult.document.find(
      (doc) =>
        doc.type === RetirementPermanentDisabilityRevisionDocumentTypeEnum.CNIS,
    );

    if (cnisDocument === undefined) {
      throw new RetirementPermanentDisabilityRevisionCnisDocumentNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const cnisWorkPeriods = this.cnisXRayAnalysisGateway.analyze(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await Promise.all(
      analysisQueryResult.document.map(async (doc) => {
        return await this.fileProcessorGateway.getFileBuffer(doc.document);
      }),
    );

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisJson =
      await this.analysisProcessorGateway.getRetirementPermanentDisabilityRevisionFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisWorkPeriods),
        [...documentBuffers, clientDataBuffer],
        true,
      );

    const parsedFirstAnalysis = this.parseFirstAnalysis(firstAnalysisJson);

    const existingResult = analysisQueryResult.result;

    const resultId = existingResult
      ? existingResult.id
      : new RetirementPermanentDisabilityRevisionResultId();

    const revisionResult =
      new RetirementPermanentDisabilityRevisionResultEntity({
        id: resultId,
        retirementPermanentDisabilityRevisionFirstAnalysis:
          parsedFirstAnalysis.cleanedJson,
        retirementPermanentDisabilityRevisionCompleteAnalysis:
          existingResult?.retirementPermanentDisabilityRevisionCompleteAnalysis ??
          null,
        retirementPermanentDisabilityRevisionCompleteAnalysisDownload:
          existingResult?.retirementPermanentDisabilityRevisionCompleteAnalysisDownload ??
          null,
        retirementPermanentDisabilityRevisionSimplifiedAnalysis:
          existingResult?.retirementPermanentDisabilityRevisionSimplifiedAnalysis ??
          null,
      });

    const breakdownEntities = this.buildConcessionLetterBreakdownEntities(
      parsedFirstAnalysis.model.concessionLetterBreakdown,
      retirementPermanentDisabilityRevisionId,
    );

    const workPeriodTransactions = this.buildWorkPeriodTransactions(
      cnisWorkPeriods,
      retirementPermanentDisabilityRevisionId,
    );

    const deleteBreakdownTransaction =
      this.concessionLetterBreakdownCommandRepositoryGateway.deleteByRetirementPermanentDisabilityRevisionId(
        retirementPermanentDisabilityRevisionId,
      );

    const resultTransaction = existingResult
      ? this.retirementPermanentDisabilityRevisionResultCommandRepositoryGateway.updateRetirementPermanentDisabilityRevisionResult(
          revisionResult.id,
          revisionResult,
        )
      : this.retirementPermanentDisabilityRevisionResultCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionResult(
          revisionResult,
        );

    const createBreakdownTransactions = breakdownEntities.map((entity) =>
      this.concessionLetterBreakdownCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionConcessionLetterBreakdown(
        entity,
      ),
    );

    const updateRevisionTransaction =
      existingResult === null
        ? this.retirementPermanentDisabilityRevisionCommandRepositoryGateway.updateRetirementPermanentDisabilityRevision(
            retirementPermanentDisabilityRevisionId,
            new RetirementPermanentDisabilityRevisionEntity({
              id: retirementPermanentDisabilityRevisionId,
              analysisName: analysisQueryResult.analysisName,
              category: analysisQueryResult.category,
              myInssPassword: analysisQueryResult.myInssPassword,
              retirementPermanentDisabilityRevisionResultId: resultId,
            }),
          )
        : null;

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteBreakdownTransaction,
      consumeCreditTransaction,
      resultTransaction,
      ...createBreakdownTransactions,
      ...workPeriodTransactions,
      ...(updateRevisionTransaction !== null
        ? [updateRevisionTransaction]
        : []),
    ]);

    await transaction.commit();

    return CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto.build(
      {
        retirementPermanentDisabilityRevisionId,
        firstAnalysis: parsedFirstAnalysis.model,
        cnisWorkPeriods,
      },
    );
  }

  private parseFirstAnalysis(
    rawJson: string | null,
  ): ParsedFirstAnalysisInterface {
    if (rawJson === null) {
      throw new InvalidRetirementPermanentDisabilityRevisionFirstAnalysisJsonError();
    }

    let parsed: RetirementPermanentDisabilityRevisionFirstAnalysisInterface;

    try {
      parsed = JSON.parse(
        rawJson,
      ) as RetirementPermanentDisabilityRevisionFirstAnalysisInterface;
    } catch {
      throw new InvalidRetirementPermanentDisabilityRevisionFirstAnalysisJsonError();
    }

    if (
      !parsed.benefitAnalysis ||
      !parsed.contributionTime ||
      !Array.isArray(parsed.concessionLetterBreakdown)
    ) {
      throw new InvalidRetirementPermanentDisabilityRevisionFirstAnalysisJsonError();
    }

    const benefitAnalysis =
      RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisModel.build(
        {
          benefitType: parsed.benefitAnalysis.benefitType,
          dib: parsed.benefitAnalysis.dib,
          initialMonthlyIncome: parsed.benefitAnalysis.initialMonthlyIncome,
          updatedMonthlyIncome: parsed.benefitAnalysis.updatedMonthlyIncome,
          insuredName: parsed.benefitAnalysis.insuredName,
        },
      );

    const minimumRequired =
      RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredModel.build(
        {
          withoutPendingIssues:
            parsed.contributionTime.minimumRequired.withoutPendingIssues,
          afterResolvingPendingIssues:
            parsed.contributionTime.minimumRequired.afterResolvingPendingIssues,
          withCollaborators:
            parsed.contributionTime.minimumRequired.withCollaborators,
        },
      );

    const contributionTime =
      RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeModel.build(
        {
          minimumRequired,
          description: parsed.contributionTime.description,
        },
      );

    const concessionLetterBreakdown = parsed.concessionLetterBreakdown.map(
      (item) =>
        RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemModel.build(
          {
            competence: item.competence,
            amount: new DecimalValue(String(item.amount)),
            reasonNotConsidered: item.reasonNotConsidered,
            action: item.action,
          },
        ),
    );

    const model = RetirementPermanentDisabilityRevisionFirstAnalysisModel.build(
      {
        benefitAnalysis,
        contributionTime,
        concessionLetterBreakdown,
      },
    );

    return {
      cleanedJson: rawJson,
      model,
    };
  }

  private buildConcessionLetterBreakdownEntities(
    items: RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemModel[],
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity[] {
    return items.map(
      (item) =>
        new RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity(
          {
            competence: item.competence,
            amount: item.amount,
            reasonNotConsidered: item.reasonNotConsidered,
            action: item.action,
            retirementPermanentDisabilityRevisionId,
          },
        ),
    );
  }

  private buildWorkPeriodTransactions(
    cnisWorkPeriods: CnisWorkPeriodsResponseModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType[] {
    const transactions: TransactionType[] = [
      this.workPeriodsCommandRepositoryGateway.deleteAllByRetirementPermanentDisabilityRevisionId(
        retirementPermanentDisabilityRevisionId,
      ),
    ];

    for (const workPeriod of cnisWorkPeriods.workPeriods) {
      const workPeriodsId =
        new RetirementPermanentDisabilityRevisionWorkPeriodsId();

      transactions.push(
        this.workPeriodsCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionWorkPeriods(
          this.buildWorkPeriodEntity(
            workPeriod,
            workPeriodsId,
            retirementPermanentDisabilityRevisionId,
          ),
        ),
      );

      for (const earningsHistory of workPeriod.earningsHistory) {
        transactions.push(
          this.workPeriodsEarningsHistoryCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistory(
            new RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity(
              {
                id: new RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId(),
                competence: earningsHistory.competence ?? null,
                remuneration: earningsHistory.remuneration ?? null,
                indicators: earningsHistory.indicators ?? null,
                paymentDate: earningsHistory.paymentDate ?? null,
                contribution: earningsHistory.contribution ?? null,
                contributionSalary: earningsHistory.contributionSalary ?? null,
                competenceBelowTheMinimum:
                  earningsHistory.competenceBelowTheMinimum,
                retirementPermanentDisabilityRevisionWorkPeriodsId:
                  workPeriodsId,
              },
            ),
          ),
        );
      }
    }

    return transactions;
  }

  private buildWorkPeriodEntity(
    workPeriod: CnisWorkPeriodModel,
    workPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): RetirementPermanentDisabilityRevisionWorkPeriodsEntity {
    const gracePeriod = workPeriod.earningsHistory.filter(
      (e) => e.countsForCarencia,
    ).length;

    const pendencyReason =
      workPeriod.pendencyReason !== null &&
      workPeriod.pendencyReason !== undefined
        ? (workPeriod.pendencyReason as RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum)
        : null;

    const periodConsideration = workPeriod.isPendency
      ? null
      : RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum.SIM;

    return new RetirementPermanentDisabilityRevisionWorkPeriodsEntity({
      id: workPeriodsId,
      bondOrigin: workPeriod.bondOrigin ?? '',
      startDate: workPeriod.startDate,
      endDate: workPeriod.endDate ?? null,
      category: workPeriod.category,
      competenceBelowTheMinimum: workPeriod.competenceBelowTheMinimum,
      pendencyReason,
      periodConsideration,
      contributionAverage: new DecimalValue(
        String(workPeriod.contributionAverage),
      ),
      status: workPeriod.status,
      gracePeriod,
      retirementPermanentDisabilityRevisionId,
    });
  }
}
