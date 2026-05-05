import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-earnings-history/command/disability-retirement-planning-grant-period-earnings-history.command.repository.gateway';
import { DisabilityRetirementPlanningGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-result/command/disability-retirement-planning-grant-result.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.entity';
import { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import {
  CreateDisabilityRetirementPlanningGrantResultResponseDto,
  CreateDisabilityRetirementPlanningGrantResultBenefitCompatibilityResponseDto,
  CreateDisabilityRetirementPlanningGrantResultPeriodEarningsHistoryResponseDto,
  CreateDisabilityRetirementPlanningGrantResultPeriodResponseDto,
  CreateDisabilityRetirementPlanningGrantResultProcessualStrategyResponseDto,
  CreateDisabilityRetirementPlanningGrantResultRetirementRuleResponseDto,
  CreateDisabilityRetirementPlanningGrantResultSystemRecommendationResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant-result.response.dto';
import { DisabilityRetirementPlanningGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-cnis-document-not-found.error';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import { DisabilityRetirementPlanningGrantResultNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-result-not-found.error';
import { InvalidDisabilityRetirementPlanningGrantResultJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/invalid-disability-retirement-planning-grant-result-json.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type {
  DisabilityRetirementPlanningGrantResultInterface,
  DisabilityRetirementPlanningGrantResultPeriodInterface,
  DisabilityRetirementPlanningGrantResultProcessualStrategyInterface,
  DisabilityRetirementPlanningGrantResultRetirementRuleInterface,
  DisabilityRetirementPlanningGrantResultSystemRecommendationInterface,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-result.interface';

@Injectable()
export class CreateDisabilityRetirementPlanningGrantResultUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningGrantResultUseCase.name;

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
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantResultCommandRepositoryGateway: DisabilityRetirementPlanningGrantResultCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway: DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): Promise<CreateDisabilityRetirementPlanningGrantResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const disabilityRetirementPlanningGrant =
      await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
        disabilityRetirementPlanningGrantId,
        DisabilityRetirementPlanningGrantNotFoundError,
      );

    const disabilityRetirementPlanningGrantDocument =
      disabilityRetirementPlanningGrant
        .disabilityRetirementPlanningGrantDocument?.[0];

    if (!disabilityRetirementPlanningGrantDocument) {
      throw new DisabilityRetirementPlanningGrantCnisDocumentNotFoundError();
    }

    const disabilityRetirementPlanningGrantResult =
      disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantResult;

    if (disabilityRetirementPlanningGrantResult === null) {
      throw new DisabilityRetirementPlanningGrantResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      disabilityRetirementPlanningGrantDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityRetirementPlanningGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisRecord.analysisToolClient,
      createdBy: analysisRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisRecord.analysisToolClient.updatedBy.id,
    });

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const grantDocumentBuffers = await this.getGrantDocumentBuffers(
      disabilityRetirementPlanningGrant,
      disabilityRetirementPlanningGrantDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningGrantResultAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildCompleteAnalysisGrantDataBuffer(
            disabilityRetirementPlanningGrant,
          ),
          ...grantDocumentBuffers,
        ],
      );

    if (completeAnalysis === null) {
      throw new DisabilityRetirementPlanningGrantNotFoundError();
    }

    const parsedResult: DisabilityRetirementPlanningGrantResultInterface =
      this.parseResultAnalysis(completeAnalysis);

    const resultEntity = new DisabilityRetirementPlanningGrantResultEntity({
      id: disabilityRetirementPlanningGrantResult.id,
      disabilityRetirementPlanningGrantFirstAnalysis:
        disabilityRetirementPlanningGrantResult.disabilityRetirementPlanningGrantFirstAnalysis,
      disabilityRetirementPlanningGrantCompleteAnalysis: completeAnalysis,
      disabilityRetirementPlanningGrantSimplifiedAnalysis:
        parsedResult.analysisResult,
      disabilityRetirementPlanningGrantCompleteAnalysisDownload:
        disabilityRetirementPlanningGrantResult.disabilityRetirementPlanningGrantCompleteAnalysisDownload,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.disabilityRetirementPlanningGrantResultCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantResult(
        disabilityRetirementPlanningGrantResult.id,
        resultEntity,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordStatus(
        analysisRecord.id,
        AnalysisStatusEnum.COMPLETED,
        organizationMember.id,
      ),
      ...this.buildEarningsHistoryTransactions(
        parsedResult,
        disabilityRetirementPlanningGrant,
      ),
    ]);

    await transaction.commit();

    return CreateDisabilityRetirementPlanningGrantResultResponseDto.build({
      retirementRules: parsedResult.retirementRules.map(
        (
          rule: DisabilityRetirementPlanningGrantResultRetirementRuleInterface,
        ) => {
          const eligibilityDate = ((): Date | undefined => {
            if (rule.eligibilityAvailableAt === null) {
              return undefined;
            }
            const d = new Date(rule.eligibilityAvailableAt);
            return isNaN(d.getTime()) ? undefined : d;
          })();
          return CreateDisabilityRetirementPlanningGrantResultRetirementRuleResponseDto.build(
            {
              retirementRuleName: rule.retirementRuleName,
              isEligible: rule.isEligible,
              ...(eligibilityDate !== undefined && {
                eligibilityAvailableAt: eligibilityDate,
              }),
              expectedMonthlyBenefit: rule.expectedMonthlyBenefit,
              estimatedProcessValue: rule.estimatedProcessValue,
              retirementAnalysis: rule.retirementAnalysis,
            },
          );
        },
      ),
      systemRecomendation: parsedResult.systemRecomendation.map(
        (
          rec: DisabilityRetirementPlanningGrantResultSystemRecommendationInterface,
        ) =>
          CreateDisabilityRetirementPlanningGrantResultSystemRecommendationResponseDto.build(
            {
              optionName: rec.optionName,
              retirementRuleName: rec.retirementRuleName,
              dib: rec.dib,
              rmi: rec.rmi,
              processValue: rec.processValue,
            },
          ),
      ),
      processualStrategy: parsedResult.processualStrategy.map(
        (
          strategy: DisabilityRetirementPlanningGrantResultProcessualStrategyInterface,
        ) =>
          CreateDisabilityRetirementPlanningGrantResultProcessualStrategyResponseDto.build(
            {
              suggestionTitle: strategy.suggestionTitle,
              suggestionDescription: strategy.suggestionDescription,
              ...(strategy.bulletPoints !== null && {
                bulletPoints: strategy.bulletPoints,
              }),
              ...(strategy.successRatePercentageInSimilarCases !== null && {
                successRatePercentageInSimilarCases:
                  strategy.successRatePercentageInSimilarCases,
              }),
            },
          ),
      ),
      benefitCompatibility:
        CreateDisabilityRetirementPlanningGrantResultBenefitCompatibilityResponseDto.build(
          {
            benefit: parsedResult.benefitCompatibility.benefit,
            compatibility: parsedResult.benefitCompatibility.compatibility,
            observations: parsedResult.benefitCompatibility.observations,
          },
        ),
      analysisResult: parsedResult.analysisResult,
      ...(parsedResult.periods !== undefined && {
        periods: parsedResult.periods.map(
          (period: DisabilityRetirementPlanningGrantResultPeriodInterface) =>
            CreateDisabilityRetirementPlanningGrantResultPeriodResponseDto.build(
              {
                periodId: period.periodId,
                earningsHistory: period.earningsHistory.map((item) =>
                  CreateDisabilityRetirementPlanningGrantResultPeriodEarningsHistoryResponseDto.build(
                    {
                      ...(item.competence !== null && {
                        competence: new Date(item.competence),
                      }),
                      ...(item.remuneration !== null && {
                        remuneration: item.remuneration,
                      }),
                      ...(item.indicators !== null && {
                        indicators: item.indicators,
                      }),
                      ...(item.paymentDate !== null && {
                        paymentDate: new Date(item.paymentDate),
                      }),
                      ...(item.contribution !== null && {
                        contribution: item.contribution,
                      }),
                      ...(item.contributionSalary !== null && {
                        contributionSalary: item.contributionSalary,
                      }),
                      ...(item.analysis !== null && {
                        analysis: item.analysis,
                      }),
                      ...(item.competenceBelowTheMinimum !== null && {
                        competenceBelowTheMinimum:
                          item.competenceBelowTheMinimum,
                      }),
                    },
                  ),
                ),
              },
            ),
        ),
      }),
    });
  }

  private buildEarningsHistoryTransactions(
    parsedResult: DisabilityRetirementPlanningGrantResultInterface,
    disabilityRetirementPlanningGrant: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations
      >
    >,
  ): ReturnType<
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway['createDisabilityRetirementPlanningGrantPeriodEarningsHistory']
  >[] {
    if (
      parsedResult.periods === undefined ||
      parsedResult.periods.length === 0
    ) {
      return [];
    }

    const periods =
      disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantPeriod ??
      [];

    return parsedResult.periods.flatMap((periodData) => {
      const matchingPeriod = periods.find(
        (p) => p.id.toString() === periodData.periodId,
      );

      if (!matchingPeriod) {
        return [];
      }

      const periodId = new DisabilityRetirementPlanningGrantPeriodId(
        matchingPeriod.id.toString(),
      );

      return periodData.earningsHistory.map((item) => {
        const entity =
          new DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity({
            competence:
              item.competence !== null ? new Date(item.competence) : null,
            remuneration: item.remuneration,
            indicators: item.indicators,
            paymentDate:
              item.paymentDate !== null ? new Date(item.paymentDate) : null,
            contribution: item.contribution,
            contributionSalary: item.contributionSalary,
            analysis: item.analysis,
            competenceBelowTheMinimum: item.competenceBelowTheMinimum,
            disabilityRetirementPlanningGrantPeriodId: periodId,
          });

        return this.disabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway.createDisabilityRetirementPlanningGrantPeriodEarningsHistory(
          entity,
        );
      });
    });
  }

  private parseResultAnalysis(
    raw: string,
  ): DisabilityRetirementPlanningGrantResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    cleanedJson = this.sanitizeJsonControlChars(cleanedJson);

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidDisabilityRetirementPlanningGrantResultJsonError();
    }

    const result = parsed;

    result.analysisResult = result.analysisResult.replace(/\\n/g, '\n');
    result.retirementRules = result.retirementRules.map((rule) => ({
      ...rule,
      retirementAnalysis: rule.retirementAnalysis.replace(/\\n/g, '\n'),
    }));

    return result;
  }

  private sanitizeJsonControlChars(json: string): string {
    const CONTROL_CHAR_MAX = 0x20;

    const CHAR_CODES = {
      NEWLINE: 0x0a,
      CARRIAGE_RETURN: 0x0d,
      TAB: 0x09,
    };

    const CODE_TO_STRING = 16;
    const CODE_PAD_START = 4;

    let result = '';
    let inString = false;
    let escaped = false;

    for (let i = 0; i < json.length; i++) {
      const char = json[i];
      const code = json.charCodeAt(i);

      if (escaped) {
        result += char;
        escaped = false;
        continue;
      }

      if (char === '\\' && inString) {
        result += char;
        escaped = true;
        continue;
      }

      if (char === '"') {
        inString = !inString;
        result += char;
        continue;
      }

      if (inString && code < CONTROL_CHAR_MAX) {
        if (code === CHAR_CODES.NEWLINE) {
          result += '\\n';
        } else if (code === CHAR_CODES.CARRIAGE_RETURN) {
          result += '\\r';
        } else if (code === CHAR_CODES.TAB) {
          result += '\\t';
        } else {
          result +=
            '\\u' + code.toString(CODE_TO_STRING).padStart(CODE_PAD_START, '0');
        }
        continue;
      }

      result += char;
    }

    return result;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is DisabilityRetirementPlanningGrantResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      Array.isArray(value['retirementRules']) &&
      Array.isArray(value['systemRecomendation']) &&
      Array.isArray(value['processualStrategy']) &&
      this.isRecord(value['benefitCompatibility']) &&
      typeof value['analysisResult'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildCompleteAnalysisGrantDataBuffer(
    disabilityRetirementPlanningGrant: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      id: disabilityRetirementPlanningGrant.id.toString(),
      category: disabilityRetirementPlanningGrant.category,
      analysisName: disabilityRetirementPlanningGrant.analysisName,
      longPrizeDisability:
        disabilityRetirementPlanningGrant.longPrizeDisability,
      documents: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantDocument ??
        []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      periods: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantPeriod ??
        []
      ).map((period) => {
        const earningsHistory = (
          disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantPeriodEarningsHistory ??
          []
        ).filter(
          (eh) =>
            eh.disabilityRetirementPlanningGrantPeriodId.toString() ===
            period.id.toString(),
        );

        return {
          id: period.id.toString(),
          startDate: period.startDate,
          endDate: period.endDate,
          category: period.category,
          isPendency: period.isPendency,
          competenceBelowTheMinimum: period.competenceBelowTheMinimum,
          pendencyReason: period.pendencyReason,
          typeOfContribution: period.typeOfContribution,
          status: period.status,
          disabilityStatus: period.disabilityStatus,
          periodConsideration: period.periodConsideration,
          ...(period.contributionAverage !== null && {
            contributionAverage: period.contributionAverage.toString(),
          }),
          ...(period.bondOrigin !== null && {
            bondOrigin: period.bondOrigin,
          }),
          ...(earningsHistory.length > 0 && { earningsHistory }),
        };
      }),
      disabilityPeriods:
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantDisabilityPeriod ??
        [],
      timeAccelerators:
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantTimeAccelerator ??
        [],
      inssBenefits:
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantInssBenefit ??
        [],
      legalProceedings:
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantLegalProceeding ??
        [],
      currentResult:
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantResult !==
        null
          ? {
              id: disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantResult.id.toString(),
              disabilityRetirementPlanningGrantFirstAnalysis:
                disabilityRetirementPlanningGrant
                  .disabilityRetirementPlanningGrantResult
                  .disabilityRetirementPlanningGrantFirstAnalysis,
              disabilityRetirementPlanningGrantCompleteAnalysis:
                disabilityRetirementPlanningGrant
                  .disabilityRetirementPlanningGrantResult
                  .disabilityRetirementPlanningGrantCompleteAnalysis,
              disabilityRetirementPlanningGrantSimplifiedAnalysis:
                disabilityRetirementPlanningGrant
                  .disabilityRetirementPlanningGrantResult
                  .disabilityRetirementPlanningGrantSimplifiedAnalysis,
              disabilityRetirementPlanningGrantCompleteAnalysisDownload:
                disabilityRetirementPlanningGrant
                  .disabilityRetirementPlanningGrantResult
                  .disabilityRetirementPlanningGrantCompleteAnalysisDownload,
            }
          : null,
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async getGrantDocumentBuffers(
    disabilityRetirementPlanningGrant: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations
      >
    >,
    currentDocumentPath: string,
    currentDocumentBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantDocument ??
        []
      )
        .filter((document) => document.document !== currentDocumentPath)
        .map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
    );

    return [currentDocumentBuffer, ...otherDocumentBuffers];
  }
}
