import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { SpecialRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/command/special-retirement-rejection.command.repository.gateway';
import { SpecialRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-result/command/special-retirement-rejection-result.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/enum/special-retirement-rejection-document-type.enum';
import { SpecialRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity';
import { CreateSpecialRetirementRejectionResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/create-special-retirement-rejection-result.response.dto';
import { InvalidSpecialRetirementRejectionCompleteAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/invalid-special-retirement-rejection-complete-analysis-json.error';
import { SpecialRetirementRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-cnis-document-not-found.error';
import { SpecialRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-not-found.error';
import {
  SpecialRetirementRejectionCompleteAnalysisModel,
  SpecialRetirementRejectionRetirementRuleModel,
} from '@module/customer/analysis-tool/module/special-retirement-rejection/model/special-retirement-rejection-complete-analysis.model';
import { AnalysisToolRecordNotFoundError } from '@module/customer/documents-sent-by-email/error/analysis-tool-record-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import type { GetSpecialRetirementRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/query/result/get-special-retirement-rejection-with-relations.query.result';
import type { SpecialRetirementRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/interface/special-retirement-rejection-complete-analysis.interface';

@Injectable()
export class CreateSpecialRetirementRejectionResultUseCase {
  protected readonly _type = CreateSpecialRetirementRejectionResultUseCase.name;

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
    @Inject(SpecialRetirementRejectionCommandRepositoryGateway)
    private readonly specialRetirementRejectionCommandRepositoryGateway: SpecialRetirementRejectionCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionResultCommandRepositoryGateway)
    private readonly specialRetirementRejectionResultCommandRepositoryGateway: SpecialRetirementRejectionResultCommandRepositoryGateway,
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
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): Promise<CreateSpecialRetirementRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementRejectionNotFoundError,
      );

    const specialRetirementRejection =
      analysisToolRecordQueryResult.specialRetirementRejection;

    if (specialRetirementRejection === null) {
      throw new SpecialRetirementRejectionNotFoundError();
    }

    const cnisDocument = (
      specialRetirementRejection.specialRetirementRejectionDocument ?? []
    ).find(
      (document) =>
        document.type === SpecialRetirementRejectionDocumentTypeEnum.CNIS,
    );

    if (cnisDocument?.fileName === null || cnisDocument === undefined) {
      throw new SpecialRetirementRejectionCnisDocumentNotFoundError();
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
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    const analysisToolClient = this.buildAnalysisToolClientEntity(
      analysisToolRecordQueryResult,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.getAllDocumentBuffers(
      specialRetirementRejection,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_REJECTION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisJson =
      await this.analysisProcessorGateway.getSpecialRetirementRejectionCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildCompleteAnalysisDataBuffer(specialRetirementRejection),
          ...documentBuffers,
        ],
      );

    if (completeAnalysisJson === null) {
      throw new InvalidSpecialRetirementRejectionCompleteAnalysisJsonError();
    }

    const parsedCompleteAnalysis =
      this.parseCompleteAnalysisOrThrow(completeAnalysisJson);

    const currentResult =
      specialRetirementRejection.specialRetirementRejectionResult;

    const resultEntity = new SpecialRetirementRejectionResultEntity({
      ...(currentResult !== null && { id: currentResult.id }),
      firstAnalysis: currentResult?.firstAnalysis ?? null,
      completeAnalysis: parsedCompleteAnalysis.cleanedJson,
      simplifiedAnalysis: null,
    });

    const resultTransaction =
      currentResult !== null
        ? this.specialRetirementRejectionResultCommandRepositoryGateway.updateSpecialRetirementRejectionResult(
            resultEntity,
          )
        : this.specialRetirementRejectionResultCommandRepositoryGateway.createSpecialRetirementRejectionResult(
            resultEntity,
          );

    const updateAnalysisToolRecordStatusTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordStatus(
        analysisRecord.id,
        AnalysisStatusEnum.COMPLETED,
        organizationMember.id,
      );

    const transactionOperations = [
      consumeCreditTransaction,
      resultTransaction,
      updateAnalysisToolRecordStatusTransaction,
    ];

    if (currentResult === null) {
      transactionOperations.push(
        this.specialRetirementRejectionCommandRepositoryGateway.updateSpecialRetirementRejectionResultId(
          specialRetirementRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateSpecialRetirementRejectionResultResponseDto.build({
      specialRetirementRejectionCompleteAnalysis: parsedCompleteAnalysis.model,
    });
  }

  private buildAnalysisToolClientEntity(
    analysisToolRecordQueryResult: GetAnalysisToolRecordWithRelationsQueryResult,
  ): AnalysisToolClientEntity {
    return new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });
  }

  private parseCompleteAnalysisOrThrow(completeAnalysisJson: string): {
    cleanedJson: string;
    model: SpecialRetirementRejectionCompleteAnalysisModel;
  } {
    try {
      let cleanedJson = completeAnalysisJson;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(
        cleanedJson,
      ) as SpecialRetirementRejectionCompleteAnalysisInterface;

      cleanedJson = JSON.stringify(parsed);

      return {
        cleanedJson,
        model: SpecialRetirementRejectionCompleteAnalysisModel.build({
          retirementRules: parsed.retirementRules.map((rule) =>
            SpecialRetirementRejectionRetirementRuleModel.build({
              ruleName: rule.ruleName,
              fulfilled: rule.fulfilled,
              grantDate: rule.grantDate,
              expectedRmi: rule.expectedRmi,
              causeValue: rule.causeValue,
              bestRmi: rule.bestRmi,
              biggestCauseValue: rule.biggestCauseValue,
              detaildAnalysis: rule.detaildAnalysis,
            }),
          ),
          analysisResult: parsed.analysisResult,
        }),
      };
    } catch {
      throw new InvalidSpecialRetirementRejectionCompleteAnalysisJsonError();
    }
  }

  private buildCompleteAnalysisDataBuffer(
    specialRetirementRejection: GetSpecialRetirementRejectionWithRelationsQueryResult,
  ): Buffer {
    const workPeriods =
      specialRetirementRejection.specialRetirementRejectionWorkPeriod ?? [];
    const workPeriodDocuments =
      specialRetirementRejection.specialRetirementRejectionWorkPeriodDocument ??
      [];
    const workPeriodEarningsHistory =
      specialRetirementRejection.specialRetirementRejectionWorkPeriodEarningsHistory ??
      [];
    const workSpecialPeriods =
      specialRetirementRejection.specialRetirementRejectionWorkSpecialPeriod ??
      [];
    const workSpecialPeriodLegalFrameworks =
      specialRetirementRejection.specialRetirementRejectionWorkSpecialPeriodLegalFramework ??
      [];

    const rejectionData = {
      analysisName: specialRetirementRejection.analysisName,
      category: specialRetirementRejection.category,
      requirementStartDate: specialRetirementRejection.requirementStartDate,
      rejectionDate: specialRetirementRejection.rejectionDate,
      harmfulAgents: specialRetirementRejection.harmfulAgents,
      otherAgents: specialRetirementRejection.otherAgents,
      rejectionReason: specialRetirementRejection.rejectionReason,
      otherRejectionReason: specialRetirementRejection.otherRejectionReason,
      documents: (
        specialRetirementRejection.specialRetirementRejectionDocument ?? []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      inssBenefits: (
        specialRetirementRejection.specialRetirementRejectionInssBenefit ?? []
      ).map((benefit) => benefit.benefitNumber),
      legalProceedings: (
        specialRetirementRejection.specialRetirementRejectionLegalProceeding ??
        []
      ).map((legalProceeding) => legalProceeding.number),
      workPeriods: workPeriods.map((workPeriod) => ({
        id: workPeriod.id.toString(),
        bondOrigin: workPeriod.bondOrigin,
        startDate: workPeriod.startDate,
        endDate: workPeriod.endDate,
        category: workPeriod.category,
        pendencyReason: workPeriod.pendencyReason,
        periodConsideration: workPeriod.periodConsideration,
        contributionAverage: workPeriod.contributionAverage,
        status: workPeriod.status,
        gracePeriod: workPeriod.gracePeriod,
        activityType: workPeriod.activityType,
        documents: workPeriodDocuments
          .filter(
            (document) =>
              document.specialRetirementRejectionWorkPeriodId?.toString() ===
              workPeriod.id.toString(),
          )
          .map((document) => ({
            id: document.id.toString(),
            type: document.type,
          })),
        earningsHistory: workPeriodEarningsHistory
          .filter(
            (earningsHistory) =>
              earningsHistory.specialRetirementRejectionWorkPeriodId?.toString() ===
              workPeriod.id.toString(),
          )
          .map((earningsHistory) => ({
            id: earningsHistory.id.toString(),
            competence: earningsHistory.competence,
            remuneration: earningsHistory.remuneration?.toString() ?? null,
            indicators: earningsHistory.indicators,
            paymentDate: earningsHistory.paymentDate,
            contribution: earningsHistory.contribution?.toString() ?? null,
            contributionSalary:
              earningsHistory.contributionSalary?.toString() ?? null,
            competenceBelowTheMinimum:
              earningsHistory.competenceBelowTheMinimum,
          })),
        specialPeriods: workSpecialPeriods
          .filter(
            (specialPeriod) =>
              specialPeriod.specialRetirementRejectionWorkPeriodId?.toString() ===
              workPeriod.id.toString(),
          )
          .map((specialPeriod) => ({
            id: specialPeriod.id.toString(),
            recognizedSpecialTime: specialPeriod.recognizedSpecialTime,
            companyName: specialPeriod.companyName,
            cnpj: specialPeriod.cnpj,
            position: specialPeriod.position,
            comprobatoryDocument: specialPeriod.comprobatoryDocument,
            linkedToCnis: specialPeriod.linkedToCnis,
            containsCnisRemunerationInPeriod:
              specialPeriod.containsCnisRemunerationInPeriod,
            technicalJustification: specialPeriod.technicalJustification,
            additionalObservation: specialPeriod.additionalObservation,
            lawyerObservation: specialPeriod.lawyerObservation,
            exposureFrequency: specialPeriod.exposureFrequency,
            informationSource: specialPeriod.informationSource,
            identifiedAgents: specialPeriod.identifiedAgents,
            efficientEpi: specialPeriod.efficientEpi,
            legalFrameworks: workSpecialPeriodLegalFrameworks
              .filter(
                (legalFramework) =>
                  legalFramework.specialRetirementRejectionWorkSpecialPeriodId?.toString() ===
                  specialPeriod.id.toString(),
              )
              .map((legalFramework) => ({
                id: legalFramework.id.toString(),
                code: legalFramework.code,
                description: legalFramework.description,
              })),
          })),
      })),
      firstAnalysis:
        specialRetirementRejection.specialRetirementRejectionResult
          ?.firstAnalysis ?? null,
      technicalDiagnosis: (
        specialRetirementRejection.specialRetirementRejectionTechnicalDiagnosis ??
        []
      ).map((td) => ({
        periodStartDate: td.periodStartDate,
        periodEndDate: td.periodEndDate,
        recognized: td.recognized,
        justification: td.justification,
        company: td.company,
        cnpj: td.cnpj,
        role: td.role,
        supportingDocument: td.supportingDocument,
        recordedInCnis: td.recordedInCnis,
        remunerationRecordedInCnis: td.remunerationRecordedInCnis,
        hazardousAgents: td.hazardousAgents,
        informationSource: td.informationSource,
        legalFramework: td.legalFramework,
        epiEficaz: td.epiEficaz,
        observations: td.observations,
      })),
    };

    return Buffer.from(JSON.stringify(rejectionData, null, 2), 'utf-8');
  }

  private async getAllDocumentBuffers(
    specialRetirementRejection: GetSpecialRetirementRejectionWithRelationsQueryResult,
    cnisDocumentFileName: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const topLevelDocumentPaths = (
      specialRetirementRejection.specialRetirementRejectionDocument ?? []
    ).flatMap((document) =>
      document.fileName !== null && document.fileName !== cnisDocumentFileName
        ? [document.fileName]
        : [],
    );

    const additionalWorkPeriodDocumentPaths = (
      specialRetirementRejection.specialRetirementRejectionWorkPeriodDocument ??
      []
    ).flatMap((document) =>
      document.fileName !== null ? [document.fileName] : [],
    );

    const allPaths = [
      ...topLevelDocumentPaths,
      ...additionalWorkPeriodDocumentPaths,
    ];

    const otherBuffers = await Promise.all(
      allPaths.map((fileName) =>
        this.fileProcessorGateway.getFileBuffer(fileName),
      ),
    );

    return [cnisBuffer, ...otherBuffers];
  }
}
