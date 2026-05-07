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
import { ElderlyBpcRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/command/elderly-bpc-rejection.command.repository.gateway';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-result/command/elderly-bpc-rejection-result.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/enum/elderly-bpc-rejection-document-type.enum';
import { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';
import { CreateElderlyBpcRejectionResultResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/create-elderly-bpc-rejection-result.response.dto';
import { ElderlyBpcRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-cnis-document-not-found.error';
import { ElderlyBpcRejectionNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-not-found.error';
import { InvalidElderlyBpcRejectionResultJsonError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/invalid-elderly-bpc-rejection-result-json.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { ElderlyBpcRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/interface/elderly-bpc-rejection-complete-analysis.interface';

@Injectable()
export class CreateElderlyBpcRejectionResultUseCase {
  protected readonly _type = CreateElderlyBpcRejectionResultUseCase.name;

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
    @Inject(ElderlyBpcRejectionCommandRepositoryGateway)
    private readonly elderlyBpcRejectionCommandRepositoryGateway: ElderlyBpcRejectionCommandRepositoryGateway,
    @Inject(ElderlyBpcRejectionQueryRepositoryGateway)
    private readonly elderlyBpcRejectionQueryRepositoryGateway: ElderlyBpcRejectionQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionResultCommandRepositoryGateway)
    private readonly elderlyBpcRejectionResultCommandRepositoryGateway: ElderlyBpcRejectionResultCommandRepositoryGateway,
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
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): Promise<CreateElderlyBpcRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejection =
      await this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations(
        elderlyBpcRejectionId,
        ElderlyBpcRejectionNotFoundError,
      );

    const cnisDocument = (rejection.elderlyBpcRejectionDocument ?? []).find(
      (document) => document.type === ElderlyBpcRejectionDocumentTypeEnum.CNIS,
    );

    if (cnisDocument?.document === null || cnisDocument === undefined) {
      throw new ElderlyBpcRejectionCnisDocumentNotFoundError();
    }

    const rejectionResult = rejection.elderlyBpcRejectionResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        elderlyBpcRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.getAllDocumentBuffers(
      rejection,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getElderlyBpcRejectionCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildCompleteAnalysisDataBuffer(rejection), ...documentBuffers],
      );

    if (completeAnalysis === null) {
      throw new InvalidElderlyBpcRejectionResultJsonError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysis);

    const resultEntity = new ElderlyBpcRejectionResultEntity({
      ...(rejectionResult !== null && { id: rejectionResult.id }),
      completeAnalysis,
      simplifiedAnalysis: rejectionResult?.simplifiedAnalysis ?? null,
      elderlyBpcRejectionId,
    });

    const resultTransaction =
      rejectionResult !== null
        ? this.elderlyBpcRejectionResultCommandRepositoryGateway.updateElderlyBpcRejectionResult(
            resultEntity,
          )
        : this.elderlyBpcRejectionResultCommandRepositoryGateway.createElderlyBpcRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (rejectionResult === null) {
      transactionOperations.push(
        this.elderlyBpcRejectionCommandRepositoryGateway.updateElderlyBpcRejectionResultId(
          elderlyBpcRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateElderlyBpcRejectionResultResponseDto.build({
      elderlyBpcRejectionCompleteAnalysis: parsedResult,
    });
  }

  private parseResultAnalysis(
    raw: string,
  ): ElderlyBpcRejectionCompleteAnalysisInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidElderlyBpcRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is ElderlyBpcRejectionCompleteAnalysisInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['isElligibleForElderlyBpc'] === 'boolean' &&
      typeof value['totalFamiliarIncome'] === 'string' &&
      typeof value['perCapitaIncome'] === 'string' &&
      typeof value['lessThanOneQuarter'] === 'boolean' &&
      typeof value['ageGreaterThanOrEqualToSixtyFiveYears'] === 'boolean' &&
      Array.isArray(value['retirementRules']) &&
      (value['retirementRules'] as unknown[]).every((item) =>
        this.isRetirementRule(item),
      ) &&
      typeof value['analysisResult'] === 'string'
    );
  }

  private isRetirementRule(value: unknown): boolean {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['ruleName'] === 'string' &&
      typeof value['fulfilled'] === 'boolean' &&
      typeof value['benefitStartDate'] === 'string' &&
      typeof value['bestRmi'] === 'boolean' &&
      typeof value['biggestCauseValue'] === 'boolean' &&
      typeof value['detaildAnalysis'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildCompleteAnalysisDataBuffer(
    rejection: Awaited<
      ReturnType<
        typeof this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const rejectionData = {
      analysisName: rejection.analysisName,
      category: rejection.category,
      maritalStatus: rejection.maritalStatus,
      applicantLivesAlone: rejection.applicantLivesAlone,
      documents: (rejection.elderlyBpcRejectionDocument ?? []).map((doc) => ({
        id: doc.id.toString(),
        type: doc.type,
      })),
      inssBenefits: (rejection.elderlyBpcRejectionInssBenefit ?? []).map(
        (item) => item.inssBenefit,
      ),
      legalProceedings: (
        rejection.elderlyBpcRejectionLegalProceeding ?? []
      ).map((item) => item.legalProceedingNumber),
      familiarGroups: (rejection.elderlyBpcRejectionFamiliarGroup ?? []).map(
        (group) => ({
          id: group.id.toString(),
          fullName: group.fullName,
          birthDate: group.birthDate,
          kinship: group.kinship,
          livesInSameResidence: group.livesInSameResidence,
          hasIncome: group.hasIncome,
          monthlyIncome: group.monthlyIncome,
          incomeType: group.incomeType,
          hasSupportingDocuments: group.hasSupportingDocuments,
        }),
      ),
      currentResult: {
        id: rejection.elderlyBpcRejectionResult?.id.toString(),
        completeAnalysis:
          rejection.elderlyBpcRejectionResult?.completeAnalysis ?? null,
        simplifiedAnalysis:
          rejection.elderlyBpcRejectionResult?.simplifiedAnalysis ?? null,
      },
    };

    return Buffer.from(JSON.stringify(rejectionData, null, 2), 'utf-8');
  }

  private async getAllDocumentBuffers(
    rejection: Awaited<
      ReturnType<
        typeof this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const buffers = await Promise.all(
      [
        ...(rejection.elderlyBpcRejectionDocument ?? [])
          .filter(
            (document) =>
              document.document !== null &&
              document.document !== cnisDocumentPath,
          )
          .map((document) => document.document),
        ...(rejection.elderlyBpcRejectionFamiliarGroupDocument ?? [])
          .filter((document) => document.document !== null)
          .map((document) => document.document),
      ]
        .filter((documentPath): documentPath is string => documentPath !== null)
        .map((documentPath) =>
          this.fileProcessorGateway.getFileBuffer(documentPath),
        ),
    );

    return [cnisBuffer, ...buffers];
  }

  private async findAnalysisToolClientByAnalysisToolRecordOrFail(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByElderlyBpcRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        elderlyBpcRejectionId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    return new AnalysisToolClientEntity({
      ...analysisToolRecord.analysisToolClient,
      createdBy: analysisToolRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecord.analysisToolClient.updatedBy.id,
    });
  }
}
