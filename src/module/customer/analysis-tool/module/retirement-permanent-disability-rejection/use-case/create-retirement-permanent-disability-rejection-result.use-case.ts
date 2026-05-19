import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-result/command/retirement-permanent-disability-rejection-result.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';
import { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';
import {
  CreateRetirementPermanentDisabilityRejectionResultResponseDto,
  CreateRetirementPermanentDisabilityRejectionResultRetirementRuleResponseDto,
} from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/create-retirement-permanent-disability-rejection-result.response.dto';
import { InvalidRetirementPermanentDisabilityRejectionResultJsonError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/invalid-retirement-permanent-disability-rejection-result-json.error';
import { RetirementPermanentDisabilityRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-cnis-document-not-found.error';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';
import { RetirementPermanentDisabilityRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-result-not-found.error';
import {
  RetirementPermanentDisabilityRejectionResultInterface,
  RetirementPermanentDisabilityRejectionResultRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/interface/retirement-permanent-disability-rejection-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPermanentDisabilityRejectionResultUseCase {
  protected readonly _type =
    CreateRetirementPermanentDisabilityRejectionResultUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionResultCommandRepositoryGateway: RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway,
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
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
  ): Promise<CreateRetirementPermanentDisabilityRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
        retirementPermanentDisabilityRejectionId,
        RetirementPermanentDisabilityRejectionNotFoundError,
      );

    const cnisDocument = (
      existing.retirementPermanentDisabilityRejectionDocument ?? []
    ).find(
      (doc) =>
        doc.type ===
        RetirementPermanentDisabilityRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new RetirementPermanentDisabilityRejectionCnisDocumentNotFoundError();
    }

    const existingResult =
      existing.retirementPermanentDisabilityRejectionResult;

    if (existingResult === null) {
      throw new RetirementPermanentDisabilityRejectionResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      retirementPermanentDisabilityRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.buildAllDocumentBuffers(
      existing,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getRetirementPermanentDisabilityRejectionResultAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildGrantDataBuffer(existing), ...documentBuffers],
      );

    if (completeAnalysisRaw === null) {
      throw new RetirementPermanentDisabilityRejectionResultNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const resultEntity = new RetirementPermanentDisabilityRejectionResultEntity(
      {
        id: existingResult.id,
        inssDecisionAnalysis: existingResult.inssDecisionAnalysis,
        firstAnalysis: existingResult.firstAnalysis,
        completeAnalysis: completeAnalysisRaw,
        completeAnalysisDownload: parsedResult.completeAnalysisDownload,
        simplifiedAnalysis: parsedResult.simplifiedAnalysis,
      },
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.retirementPermanentDisabilityRejectionResultCommandRepositoryGateway.updateRetirementPermanentDisabilityRejectionResult(
        existingResult.id,
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateRetirementPermanentDisabilityRejectionResultResponseDto.build({
      retirementRules: parsedResult.retirementRules.map(
        (
          rule: RetirementPermanentDisabilityRejectionResultRetirementRuleInterface,
        ) =>
          CreateRetirementPermanentDisabilityRejectionResultRetirementRuleResponseDto.build(
            {
              retirementRuleName: rule.retirementRuleName,
              isEligible: rule.isEligible,
              ...(this.hasValue(rule.eligibilityAvailableAt) && {
                eligibilityAvailableAt: new Date(rule.eligibilityAvailableAt),
              }),
              expectedMonthlyBenefit: rule.expectedMonthlyBenefit,
              isBestRmi: rule.isBestRmi,
              isHighestCauseValue: rule.isHighestCauseValue,
              retirementAnalysis: rule.retirementAnalysis,
            },
          ),
      ),
      analysisResult: parsedResult.analysisResult,
    });
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private parseResultAnalysis(
    raw: string,
  ): RetirementPermanentDisabilityRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidRetirementPermanentDisabilityRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is RetirementPermanentDisabilityRejectionResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      Array.isArray(value['retirementRules']) &&
      typeof value['analysisResult'] === 'string' &&
      typeof value['completeAnalysisDownload'] === 'string' &&
      typeof value['simplifiedAnalysis'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildGrantDataBuffer(
    existing: Awaited<
      ReturnType<
        typeof this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: existing.analysisName,
      requestEntryDate: existing.requestEntryDate,
      denialDate: existing.denialDate,
      category: existing.category,
      documents: (
        existing.retirementPermanentDisabilityRejectionDocument ?? []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      periods: (
        existing.retirementPermanentDisabilityRejectionPeriod ?? []
      ).map((period) => ({
        id: period.id.toString(),
        startDate: period.startDate,
        endDate: period.endDate,
        workType: period.workType,
        bondOrigin: period.bondOrigin,
        category: period.category,
        isPendency: period.isPendency,
        competenceBelowTheMinimum: period.competenceBelowTheMinimum,
        pendencyReason: period.pendencyReason,
        periodConsideration: period.periodConsideration,
        ...(period.contributionAverage !== null && {
          contributionAverage: period.contributionAverage.toString(),
        }),
        status: period.status,
        ...(period.local !== null && { local: period.local }),
      })),
      currentResult:
        existing.retirementPermanentDisabilityRejectionResult !== null
          ? {
              id: existing.retirementPermanentDisabilityRejectionResult.id.toString(),
              inssDecisionAnalysis:
                existing.retirementPermanentDisabilityRejectionResult
                  .inssDecisionAnalysis,
              firstAnalysis:
                existing.retirementPermanentDisabilityRejectionResult
                  .firstAnalysis,
            }
          : null,
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async buildAllDocumentBuffers(
    existing: Awaited<
      ReturnType<
        typeof this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (existing.retirementPermanentDisabilityRejectionDocument ?? [])
        .filter((doc) => doc.document !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    const periodDocumentBuffers = await Promise.all(
      (existing.retirementPermanentDisabilityRejectionPeriodDocument ?? []).map(
        (doc) => this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );

    return [cnisBuffer, ...otherDocumentBuffers, ...periodDocumentBuffers];
  }

  private findAnalysisToolClientOrFail(
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    return this.analysisToolRecordQueryRepositoryGateway
      .findWithRelationsByRetirementPermanentDisabilityRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPermanentDisabilityRejectionId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      )
      .then((record) => {
        const analysisToolClient = record.analysisToolClient;

        return new AnalysisToolClientEntity({
          ...analysisToolClient,
          createdBy: analysisToolClient.createdBy.id,
          updatedBy: analysisToolClient.updatedBy.id,
        });
      });
  }
}
