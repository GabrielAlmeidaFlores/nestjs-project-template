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
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-result/command/temporary-incapacity-benefit-rejection-result.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import { TemporaryIncapacityBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.entity';
import { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';
import {
  CreateTemporaryIncapacityBenefitRejectionResultDisabilityAnalysisResponseDto,
  CreateTemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisResponseDto,
  CreateTemporaryIncapacityBenefitRejectionResultInsuredStatusResponseDto,
  CreateTemporaryIncapacityBenefitRejectionResultResponseDto,
  CreateTemporaryIncapacityBenefitRejectionResultRetirementRuleResponseDto,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-result.response.dto';
import { InvalidTemporaryIncapacityBenefitRejectionResultJsonError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/invalid-temporary-incapacity-benefit-rejection-result-json.error';
import { TemporaryIncapacityBenefitRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-cnis-document-not-found.error';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { TemporaryIncapacityBenefitRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type {
  TemporaryIncapacityBenefitRejectionResultInterface,
  TemporaryIncapacityBenefitRejectionResultRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/interface/temporary-incapacity-benefit-rejection-result.interface';

@Injectable()
export class CreateTemporaryIncapacityBenefitRejectionResultUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitRejectionResultUseCase.name;

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
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionResultCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway,
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
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const temporaryIncapacityBenefitRejection =
      await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
        temporaryIncapacityBenefitRejectionId,
        TemporaryIncapacityBenefitRejectionNotFoundError,
      );

    const cnisDocument = temporaryIncapacityBenefitRejection.documents.find(
      (doc) =>
        doc.type === TemporaryIncapacityBenefitRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new TemporaryIncapacityBenefitRejectionCnisDocumentNotFoundError();
    }

    const existingResult = temporaryIncapacityBenefitRejection.result;

    if (existingResult === null) {
      throw new TemporaryIncapacityBenefitRejectionResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.fileName,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      temporaryIncapacityBenefitRejectionId,
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
      temporaryIncapacityBenefitRejection,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getTemporaryIncapacityBenefitRejectionCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildRejectionDataBuffer(temporaryIncapacityBenefitRejection),
          ...documentBuffers,
        ],
      );

    if (completeAnalysisRaw === null) {
      throw new TemporaryIncapacityBenefitRejectionResultNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const resultEntity = new TemporaryIncapacityBenefitRejectionResultEntity({
      id: new TemporaryIncapacityBenefitRejectionResultId(existingResult.id),
      inssDecisionAnalysis: existingResult.inssDecisionAnalysis,
      firstAnalysis: existingResult.firstAnalysis,
      completeAnalysis: completeAnalysisRaw,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
      simplifiedAnalysis: existingResult.simplifiedAnalysis,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.temporaryIncapacityBenefitRejectionResultCommandRepositoryGateway.updateTemporaryIncapacityBenefitRejectionResult(
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateTemporaryIncapacityBenefitRejectionResultResponseDto.build({
      temporaryIncapacityBenefitRejectionId,
      isEligibleForTemporaryIncapacityBenefit:
        parsedResult.isEligibleForTemporaryIncapacityBenefit,
      gracePeriodAnalysis:
        CreateTemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisResponseDto.build(
          {
            totalContribution:
              parsedResult.gracePeriodAnalysis.totalContribution,
            minimumGracePeriodRequired:
              parsedResult.gracePeriodAnalysis.minimumGracePeriodRequired,
            status: parsedResult.gracePeriodAnalysis.status,
          },
        ),
      insuredStatus:
        CreateTemporaryIncapacityBenefitRejectionResultInsuredStatusResponseDto.build(
          {
            lastContributionDate:
              parsedResult.insuredStatus.lastContributionDate,
            disabilityStartDate: parsedResult.insuredStatus.disabilityStartDate,
            gracePeriod: parsedResult.insuredStatus.gracePeriod,
            status: parsedResult.insuredStatus.status,
          },
        ),
      disabilityAnalysis:
        CreateTemporaryIncapacityBenefitRejectionResultDisabilityAnalysisResponseDto.build(
          {
            informedCids: parsedResult.disabilityAnalysis.informedCids,
            medicalDocumentsCount:
              parsedResult.disabilityAnalysis.medicalDocumentsCount,
            preliminaryAnalysis:
              parsedResult.disabilityAnalysis.preliminaryAnalysis,
          },
        ),
      retirementRules: parsedResult.retirementRules.map(
        (
          rule: TemporaryIncapacityBenefitRejectionResultRetirementRuleInterface,
        ) =>
          CreateTemporaryIncapacityBenefitRejectionResultRetirementRuleResponseDto.build(
            {
              modality: rule.modality,
              isFulfilled: rule.isFulfilled,
              ...(rule.retirementDate !== null && {
                retirementDate: rule.retirementDate,
              }),
              ...(rule.estimatedRmi !== null && {
                estimatedRmi: rule.estimatedRmi,
              }),
              ...(rule.estimatedCauseValue !== null && {
                estimatedCauseValue: rule.estimatedCauseValue,
              }),
              detailedAnalysis: rule.detailedAnalysis,
            },
          ),
      ),
      analysisResult: parsedResult.analysisResult,
    });
  }

  private parseResultAnalysis(
    raw: string,
  ): TemporaryIncapacityBenefitRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidTemporaryIncapacityBenefitRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is TemporaryIncapacityBenefitRejectionResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['isEligibleForTemporaryIncapacityBenefit'] === 'boolean' &&
      this.isRecord(value['gracePeriodAnalysis']) &&
      this.isRecord(value['insuredStatus']) &&
      this.isRecord(value['disabilityAnalysis']) &&
      Array.isArray(value['retirementRules']) &&
      typeof value['analysisResult'] === 'string' &&
      typeof value['completeAnalysisDownload'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildRejectionDataBuffer(
    rejection: Awaited<
      ReturnType<
        typeof this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const rejectionData = {
      analysisName: rejection.analysisName,
      requestEntryDate: rejection.requestEntryDate,
      denialDate: rejection.denialDate,
      requestedBenefitType: rejection.requestedBenefitType,
      category: rejection.category,
      denialReason: rejection.denialReason,
      denialReasonDescription: rejection.denialReasonDescription,
      condition: rejection.condition,
      conditionDescription: rejection.conditionDescription,
      documents: rejection.documents.map((document) => ({
        id: document.id,
        type: document.type,
      })),
      disabilityAnalysis: rejection.disabilityAnalysis.map((analysis) => ({
        id: analysis.id,
        estimatedDisabilityStartDate: analysis.estimatedDisabilityStartDate,
        shortDisabilityDescription: analysis.shortDisabilityDescription,
        disabilityFromAccident: analysis.disabilityFromAccident,
        disablingConditionDescription: analysis.disablingConditionDescription,
        disabilityFromSevereDisease: analysis.disabilityFromSevereDisease,
        severeDisease: analysis.severeDisease,
        diseaseStartDate: analysis.diseaseStartDate,
        needsConstantAssistanceFromAnotherPerson:
          analysis.needsConstantAssistanceFromAnotherPerson,
        previousDisabilityBenefit: analysis.previousDisabilityBenefit,
        previousBenefitNumber: analysis.previousBenefitNumber,
        cids: analysis.cids,
      })),
      insuredStatus: rejection.insuredStatus.map((item) => ({
        id: item.id,
        involuntaryUnemployment: item.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          item.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: item.ruralInsuredClient,
        ruralPeriodStartDate: item.ruralPeriodStartDate,
        ruralPeriodEndDate: item.ruralPeriodEndDate,
        documentsDescription: item.documentsDescription,
      })),
      workPeriods: rejection.workPeriods.map((wp) => ({
        id: wp.id,
        bondOrigin: wp.bondOrigin,
        startDate: wp.startDate,
        endDate: wp.endDate,
        category: wp.category,
        competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
        pendencyReason: wp.pendencyReason,
        periodConsideration: wp.periodConsideration,
        ...(wp.contributionAverage !== null && {
          contributionAverage: wp.contributionAverage.toString(),
        }),
        status: wp.status,
        gracePeriod: wp.gracePeriod,
      })),
      workPeriodsEarningsHistory: rejection.workPeriods.flatMap((wp) =>
        wp.earningsHistory.map((item) => ({
          id: item.id,
          competence: item.competence,
          remuneration: item.remuneration,
          indicators: item.indicators,
          paymentDate: item.paymentDate,
          contribution: item.contribution,
          contributionSalary: item.contributionSalary,
          competenceBelowTheMinimum: item.competenceBelowTheMinimum,
        })),
      ),
    };

    return Buffer.from(JSON.stringify(rejectionData, null, 2), 'utf-8');
  }

  private async buildAllDocumentBuffers(
    rejection: Awaited<
      ReturnType<
        typeof this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      rejection.documents
        .filter((doc) => doc.fileName !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.fileName)),
    );

    const disabilityAnalysisDocumentBuffers = await Promise.all(
      rejection.disabilityAnalysis.flatMap((analysis) =>
        analysis.documents.map((doc) =>
          this.fileProcessorGateway.getFileBuffer(doc.fileName),
        ),
      ),
    );

    const insuredStatusDocumentBuffers = await Promise.all(
      rejection.insuredStatus.flatMap((status) =>
        status.documents.map((doc) =>
          this.fileProcessorGateway.getFileBuffer(doc.fileName),
        ),
      ),
    );

    return [
      cnisBuffer,
      ...otherDocumentBuffers,
      ...disabilityAnalysisDocumentBuffers,
      ...insuredStatusDocumentBuffers,
    ];
  }

  private findAnalysisToolClientOrFail(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const recordPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByTemporaryIncapacityBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryIncapacityBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryIncapacityBenefitRejectionId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    return recordPromise.then((record) => {
      const analysisToolClient = record.analysisToolClient;

      return new AnalysisToolClientEntity({
        ...analysisToolClient,
        createdBy: analysisToolClient.createdBy.id,
        updatedBy: analysisToolClient.updatedBy.id,
      });
    });
  }
}
