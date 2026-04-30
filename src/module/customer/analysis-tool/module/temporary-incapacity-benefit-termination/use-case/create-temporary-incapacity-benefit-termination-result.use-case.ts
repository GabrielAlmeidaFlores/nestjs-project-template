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
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-result/command/temporary-incapacity-benefit-termination-result.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import { TemporaryIncapacityBenefitTerminationResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result.entity';
import { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';
import {
  CreateTemporaryIncapacityBenefitTerminationResultDisabilityAnalysisResponseDto,
  CreateTemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisResponseDto,
  CreateTemporaryIncapacityBenefitTerminationResultInsuredStatusResponseDto,
  CreateTemporaryIncapacityBenefitTerminationResultResponseDto,
  CreateTemporaryIncapacityBenefitTerminationResultRetirementRuleResponseDto,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-result.response.dto';
import { InvalidTemporaryIncapacityBenefitTerminationResultJsonError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/invalid-temporary-incapacity-benefit-termination-result-json.error';
import { TemporaryIncapacityBenefitTerminationCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-cnis-document-not-found.error';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { TemporaryIncapacityBenefitTerminationResultNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TemporaryIncapacityBenefitTerminationResultInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/interface/temporary-incapacity-benefit-termination-result.interface';

interface TemporaryIncapacityBenefitTerminationResultRetirementRuleInterface {
  modality: string;
  isFulfilled: boolean;
  retirementDate: string | null;
  estimatedRmi: string | null;
  estimatedCauseValue: string | null;
  detailedAnalysis: string;
}

@Injectable()
export class CreateTemporaryIncapacityBenefitTerminationResultUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitTerminationResultUseCase.name;

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
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationResultCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway,
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
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const temporaryIncapacityBenefitTermination =
      await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
        temporaryIncapacityBenefitTerminationId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
      );

    const cnisDocument = temporaryIncapacityBenefitTermination.documents.find(
      (doc) =>
        doc.type === TemporaryIncapacityBenefitTerminationDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new TemporaryIncapacityBenefitTerminationCnisDocumentNotFoundError();
    }

    const existingResult = temporaryIncapacityBenefitTermination.result;

    if (existingResult === null) {
      throw new TemporaryIncapacityBenefitTerminationResultNotFoundError();
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
      temporaryIncapacityBenefitTerminationId,
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
      temporaryIncapacityBenefitTermination,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getTemporaryIncapacityBenefitTerminationCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildTerminationDataBuffer(
            temporaryIncapacityBenefitTermination,
          ),
          ...documentBuffers,
        ],
      );

    if (completeAnalysisRaw === null) {
      throw new TemporaryIncapacityBenefitTerminationResultNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const resultEntity = new TemporaryIncapacityBenefitTerminationResultEntity({
      id: new TemporaryIncapacityBenefitTerminationResultId(existingResult.id),
      inssDecisionAnalysis: existingResult.inssDecisionAnalysis,
      firstAnalysis: existingResult.firstAnalysis,
      completeAnalysis: completeAnalysisRaw,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
      simplifiedAnalysis: existingResult.simplifiedAnalysis,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.temporaryIncapacityBenefitTerminationResultCommandRepositoryGateway.updateTemporaryIncapacityBenefitTerminationResult(
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateTemporaryIncapacityBenefitTerminationResultResponseDto.build({
      temporaryIncapacityBenefitTerminationId,
      isEligibleForTemporaryIncapacityBenefit:
        parsedResult.isEligibleForTemporaryIncapacityBenefit,
      gracePeriodAnalysis:
        CreateTemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisResponseDto.build(
          {
            totalContribution:
              parsedResult.gracePeriodAnalysis.totalContribution,
            minimumGracePeriodRequired:
              parsedResult.gracePeriodAnalysis.minimumGracePeriodRequired,
            status: parsedResult.gracePeriodAnalysis.status,
          },
        ),
      insuredStatus:
        CreateTemporaryIncapacityBenefitTerminationResultInsuredStatusResponseDto.build(
          {
            lastContributionDate:
              parsedResult.insuredStatus.lastContributionDate,
            disabilityStartDate: parsedResult.insuredStatus.disabilityStartDate,
            gracePeriod: parsedResult.insuredStatus.gracePeriod,
            status: parsedResult.insuredStatus.status,
          },
        ),
      disabilityAnalysis:
        CreateTemporaryIncapacityBenefitTerminationResultDisabilityAnalysisResponseDto.build(
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
          rule: TemporaryIncapacityBenefitTerminationResultRetirementRuleInterface,
        ) =>
          CreateTemporaryIncapacityBenefitTerminationResultRetirementRuleResponseDto.build(
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
  ): TemporaryIncapacityBenefitTerminationResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidTemporaryIncapacityBenefitTerminationResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is TemporaryIncapacityBenefitTerminationResultInterface {
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

  private buildTerminationDataBuffer(
    termination: Awaited<
      ReturnType<
        typeof this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const terminationData = {
      analysisName: termination.analysisName,
      benefitTerminationDate: termination.benefitTerminationDate,
      category: termination.category,
      terminationReason: termination.terminationReason,
      terminationReasonDescription: termination.terminationReasonDescription,
      documents: termination.documents.map((document) => ({
        id: document.id,
        type: document.type,
      })),
      disabilityAnalysis: termination.disabilityAnalysis.map((analysis) => ({
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
      insuredStatus: termination.insuredStatus.map((item) => ({
        id: item.id,
        involuntaryUnemployment: item.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          item.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: item.ruralInsuredClient,
        ruralPeriodStartDate: item.ruralPeriodStartDate,
        ruralPeriodEndDate: item.ruralPeriodEndDate,
        documentsDescription: item.documentsDescription,
      })),
      workPeriods: termination.workPeriods.map((wp) => ({
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
      workPeriodsEarningsHistory: termination.workPeriods.flatMap((wp) =>
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

    return Buffer.from(JSON.stringify(terminationData, null, 2), 'utf-8');
  }

  private async buildAllDocumentBuffers(
    termination: Awaited<
      ReturnType<
        typeof this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      termination.documents
        .filter((doc) => doc.fileName !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.fileName)),
    );

    const disabilityAnalysisDocumentBuffers = await Promise.all(
      termination.disabilityAnalysis.flatMap((analysis) =>
        analysis.documents.map((doc) =>
          this.fileProcessorGateway.getFileBuffer(doc.fileName),
        ),
      ),
    );

    const insuredStatusDocumentBuffers = await Promise.all(
      termination.insuredStatus.flatMap((status) =>
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
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const recordPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByTemporaryIncapacityBenefitTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryIncapacityBenefitTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryIncapacityBenefitTerminationId,
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
