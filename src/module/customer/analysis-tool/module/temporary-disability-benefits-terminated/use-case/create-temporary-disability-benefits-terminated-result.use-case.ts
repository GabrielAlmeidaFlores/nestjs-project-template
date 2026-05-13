import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-result/command/temporary-disability-benefits-terminated-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/enum/temporary-disability-benefits-terminated-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.entity';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';
import {
  CreateTemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisResponseDto,
  CreateTemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisResponseDto,
  CreateTemporaryDisabilityBenefitsTerminatedResultInsuredStatusResponseDto,
  CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto,
  CreateTemporaryDisabilityBenefitsTerminatedResultRetirementRuleResponseDto,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-result.response.dto';
import { InvalidTemporaryDisabilityBenefitsTerminatedResultJsonError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/invalid-temporary-disability-benefits-terminated-result-json.error';
import { TemporaryDisabilityBenefitsTerminatedCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-cnis-document-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedResultNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type {
  TemporaryDisabilityBenefitsTerminatedResultInterface,
  TemporaryDisabilityBenefitsTerminatedResultRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/interface/temporary-disability-benefits-terminated-result.interface';

@Injectable()
export class CreateTemporaryDisabilityBenefitsTerminatedResultUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedResultUseCase.name;

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
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway,
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
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const temporaryDisabilityBenefitsTerminated =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    const cnisDocument = temporaryDisabilityBenefitsTerminated.documents.find(
      (doc) =>
        doc.type === TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new TemporaryDisabilityBenefitsTerminatedCnisDocumentNotFoundError();
    }

    const existingResult = temporaryDisabilityBenefitsTerminated.result;

    if (existingResult === null) {
      throw new TemporaryDisabilityBenefitsTerminatedResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.fileName,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryDisabilityBenefitsTerminatedId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.buildAllDocumentBuffers(
      temporaryDisabilityBenefitsTerminated,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getTemporaryDisabilityBenefitsTerminatedCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildRejectionDataBuffer(temporaryDisabilityBenefitsTerminated),
          ...documentBuffers,
        ],
      );

    if (completeAnalysisRaw === null) {
      throw new TemporaryDisabilityBenefitsTerminatedResultNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const resultEntity = new TemporaryDisabilityBenefitsTerminatedResultEntity({
      id: new TemporaryDisabilityBenefitsTerminatedResultId(existingResult.id),
      inssDecisionAnalysis: existingResult.inssDecisionAnalysis,
      firstAnalysis: existingResult.firstAnalysis,
      completeAnalysis: completeAnalysisRaw,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
      simplifiedAnalysis: existingResult.simplifiedAnalysis,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      temporaryDisabilityBenefitsTerminated:
        new TemporaryDisabilityBenefitsTerminatedEntity({
          id: temporaryDisabilityBenefitsTerminatedId,
          analysisName: temporaryDisabilityBenefitsTerminated.analysisName,
          requestEntryDate:
            temporaryDisabilityBenefitsTerminated.requestEntryDate,
          benefitCessationDate:
            temporaryDisabilityBenefitsTerminated.benefitCessationDate,
          category: temporaryDisabilityBenefitsTerminated.category,
          myInssPassword: temporaryDisabilityBenefitsTerminated.myInssPassword,
          benefitCessationReason:
            temporaryDisabilityBenefitsTerminated.benefitCessationReason,
          temporaryDisabilityBenefitsTerminatedResultId:
            new TemporaryDisabilityBenefitsTerminatedResultId(
              existingResult.id,
            ),
        }),
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.temporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway.updateTemporaryDisabilityBenefitsTerminatedResult(
        resultEntity,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    ]);

    await transaction.commit();

    return CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto.build({
      temporaryDisabilityBenefitsTerminatedId,
      isEligibleForTemporaryIncapacityBenefit:
        parsedResult.isEligibleForTemporaryIncapacityBenefit,
      gracePeriodAnalysis:
        CreateTemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisResponseDto.build(
          {
            totalContribution:
              parsedResult.gracePeriodAnalysis.totalContribution,
            minimumGracePeriodRequired:
              parsedResult.gracePeriodAnalysis.minimumGracePeriodRequired,
            status: parsedResult.gracePeriodAnalysis.status,
          },
        ),
      insuredStatus:
        CreateTemporaryDisabilityBenefitsTerminatedResultInsuredStatusResponseDto.build(
          {
            lastContributionDate:
              parsedResult.insuredStatus.lastContributionDate,
            disabilityStartDate: parsedResult.insuredStatus.disabilityStartDate,
            gracePeriod: parsedResult.insuredStatus.gracePeriod,
            status: parsedResult.insuredStatus.status,
          },
        ),
      disabilityAnalysis:
        CreateTemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisResponseDto.build(
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
          rule: TemporaryDisabilityBenefitsTerminatedResultRetirementRuleInterface,
        ) =>
          CreateTemporaryDisabilityBenefitsTerminatedResultRetirementRuleResponseDto.build(
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
  ): TemporaryDisabilityBenefitsTerminatedResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidTemporaryDisabilityBenefitsTerminatedResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is TemporaryDisabilityBenefitsTerminatedResultInterface {
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
        typeof this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const rejectionData = {
      analysisName: rejection.analysisName,
      requestEntryDate: rejection.requestEntryDate,
      benefitCessationDate: rejection.benefitCessationDate,
      category: rejection.category,
      myInssPassword: rejection.myInssPassword,
      benefitCessationReason: rejection.benefitCessationReason,
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
        diseaseCustomName: analysis.diseaseCustomName,
        diseaseStartDate: analysis.diseaseStartDate,
        needsConstantAssistanceFromAnotherPerson:
          analysis.needsConstantAssistanceFromAnotherPerson,
        previousDisabilityBenefit: analysis.previousDisabilityBenefit,
        previousBenefits: analysis.previousBenefits.map((previousBenefit) => ({
          id: previousBenefit.id,
          benefitNumber: previousBenefit.benefitNumber,
          documents: previousBenefit.documents.map((document) => ({
            id: document.id,
            type: document.type,
          })),
        })),
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
        activityDescription: wp.activityDescription,
        competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
        pendencyReason: wp.pendencyReason,
        periodConsideration: wp.periodConsideration,
        ...(wp.contributionAverage !== null && {
          contributionAverage: wp.contributionAverage.toString(),
        }),
        impactMonths: wp.impactMonths,
        isPendency: wp.isPendency,
        wantsToComplementViaMeuINSS: wp.wantsToComplementViaMeuINSS,
        status: wp.status,
        gracePeriod: wp.gracePeriod,
        isManualPeriod: wp.isManualPeriod,
        documents: wp.documents.map((document) => ({
          id: document.id,
          type: document.type,
        })),
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
        typeof this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations
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

    const previousBenefitDocumentBuffers = await Promise.all(
      rejection.disabilityAnalysis.flatMap((analysis) =>
        analysis.previousBenefits.flatMap((previousBenefit) =>
          previousBenefit.documents.map((document) =>
            this.fileProcessorGateway.getFileBuffer(document.fileName),
          ),
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

    const workPeriodDocumentBuffers = await Promise.all(
      rejection.workPeriods.flatMap((workPeriod) =>
        workPeriod.documents
          .filter((document) => document.fileName !== null)
          .map((document) =>
            this.fileProcessorGateway.getFileBuffer(
              document.fileName as string,
            ),
          ),
      ),
    );

    return [
      cnisBuffer,
      ...otherDocumentBuffers,
      ...disabilityAnalysisDocumentBuffers,
      ...previousBenefitDocumentBuffers,
      ...insuredStatusDocumentBuffers,
      ...workPeriodDocumentBuffers,
    ];
  }

}
