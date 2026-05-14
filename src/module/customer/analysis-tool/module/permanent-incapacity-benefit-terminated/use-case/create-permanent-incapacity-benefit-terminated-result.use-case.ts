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
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-result/command/permanent-incapacity-benefit-terminated-result.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import { PermanentIncapacityBenefitTerminatedResultEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/permanent-incapacity-benefit-terminated-result.entity';
import { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';
import {
  CreatePermanentIncapacityBenefitTerminatedResultDisabilityAnalysisResponseDto,
  CreatePermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisResponseDto,
  CreatePermanentIncapacityBenefitTerminatedResultInsuredStatusResponseDto,
  CreatePermanentIncapacityBenefitTerminatedResultResponseDto,
  CreatePermanentIncapacityBenefitTerminatedResultRetirementRuleResponseDto,
} from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-result.response.dto';
import { InvalidPermanentIncapacityBenefitTerminatedResultJsonError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/invalid-permanent-incapacity-benefit-terminated-result-json.error';
import { PermanentIncapacityBenefitTerminatedCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-cnis-document-not-found.error';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { PermanentIncapacityBenefitTerminatedResultNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { PermanentIncapacityBenefitTerminatedResultInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/interface/permanent-incapacity-benefit-terminated-result.interface';

interface PermanentIncapacityBenefitTerminatedResultRetirementRuleInterface {
  modality: string;
  isFulfilled: boolean;
  retirementDate: string | null;
  estimatedRmi: string | null;
  estimatedCauseValue: string | null;
  detailedAnalysis: string;
}

@Injectable()
export class CreatePermanentIncapacityBenefitTerminatedResultUseCase {
  protected readonly _type =
    CreatePermanentIncapacityBenefitTerminatedResultUseCase.name;

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
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway,
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
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const permanentIncapacityBenefitTerminated =
      await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
        permanentIncapacityBenefitTerminatedId,
        PermanentIncapacityBenefitTerminatedNotFoundError,
      );

    const cnisDocument = permanentIncapacityBenefitTerminated.documents.find(
      (doc) =>
        doc.type === PermanentIncapacityBenefitTerminatedDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new PermanentIncapacityBenefitTerminatedCnisDocumentNotFoundError();
    }

    const existingResult = permanentIncapacityBenefitTerminated.result;

    if (existingResult === null) {
      throw new PermanentIncapacityBenefitTerminatedResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.fileName,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPermanentIncapacityBenefitTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        permanentIncapacityBenefitTerminatedId,
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

    const documentBuffers = await this.buildAllDocumentBuffers(
      permanentIncapacityBenefitTerminated,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getPermanentIncapacityBenefitTerminatedCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildTerminationDataBuffer(
            permanentIncapacityBenefitTerminated,
          ),
          ...documentBuffers,
        ],
      );

    if (completeAnalysisRaw === null) {
      throw new PermanentIncapacityBenefitTerminatedResultNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const resultEntity = new PermanentIncapacityBenefitTerminatedResultEntity({
      id: new PermanentIncapacityBenefitTerminatedResultId(existingResult.id),
      inssDecisionAnalysis: existingResult.inssDecisionAnalysis,
      firstAnalysis: existingResult.firstAnalysis,
      completeAnalysis: completeAnalysisRaw,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
      simplifiedAnalysis: existingResult.simplifiedAnalysis,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway.updatePermanentIncapacityBenefitTerminatedResult(
        resultEntity,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordStatus(
        analysisRecord.id,
        AnalysisStatusEnum.COMPLETED,
        organizationMember.id,
      ),
    ]);

    await transaction.commit();

    return CreatePermanentIncapacityBenefitTerminatedResultResponseDto.build({
      permanentIncapacityBenefitTerminatedId,
      isEligibleForPermanentIncapacityBenefit:
        parsedResult.isEligibleForPermanentIncapacityBenefit,
      gracePeriodAnalysis:
        CreatePermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisResponseDto.build(
          {
            totalContribution:
              parsedResult.gracePeriodAnalysis.totalContribution,
            minimumGracePeriodRequired:
              parsedResult.gracePeriodAnalysis.minimumGracePeriodRequired,
            status: parsedResult.gracePeriodAnalysis.status,
          },
        ),
      insuredStatus:
        CreatePermanentIncapacityBenefitTerminatedResultInsuredStatusResponseDto.build(
          {
            lastContributionDate:
              parsedResult.insuredStatus.lastContributionDate,
            disabilityStartDate: parsedResult.insuredStatus.disabilityStartDate,
            gracePeriod: parsedResult.insuredStatus.gracePeriod,
            status: parsedResult.insuredStatus.status,
          },
        ),
      disabilityAnalysis:
        CreatePermanentIncapacityBenefitTerminatedResultDisabilityAnalysisResponseDto.build(
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
          rule: PermanentIncapacityBenefitTerminatedResultRetirementRuleInterface,
        ) =>
          CreatePermanentIncapacityBenefitTerminatedResultRetirementRuleResponseDto.build(
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
  ): PermanentIncapacityBenefitTerminatedResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidPermanentIncapacityBenefitTerminatedResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is PermanentIncapacityBenefitTerminatedResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['isEligibleForPermanentIncapacityBenefit'] === 'boolean' &&
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
        typeof this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations
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
        typeof this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations
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
}
