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
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-result/command/rural-or-hybrid-retirement-rejection-result.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/enum/rural-or-hybrid-retirement-rejection-document-type.enum';
import { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';
import { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';
import { CreateRuralOrHybridRetirementRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-first-analysis.response.dto';
import { InvalidRuralOrHybridRetirementRejectionFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/invalid-rural-or-hybrid-retirement-rejection-first-analysis-json.error';
import { RuralOrHybridRetirementRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-cnis-document-not-found.error';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { RuralOrHybridRetirementRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-first-analysis.interface';

@Injectable()
export class CreateRuralOrHybridRetirementRejectionFirstAnalysisUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementRejectionFirstAnalysisUseCase.name;

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
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionCommandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionResultCommandRepositoryGateway: RuralOrHybridRetirementRejectionResultCommandRepositoryGateway,
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
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<CreateRuralOrHybridRetirementRejectionFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const cnisDocument = (
      rejection.ruralOrHybridRetirementRejectionDocument ?? []
    ).find(
      (document) =>
        document.type === RuralOrHybridRetirementRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument || cnisDocument.document === null) {
      throw new RuralOrHybridRetirementRejectionCnisDocumentNotFoundError();
    }

    const existingResult = rejection.ruralOrHybridRetirementRejectionResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      ruralOrHybridRetirementRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const allDocumentBuffers = await this.getAllDocumentBuffers(
      rejection,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisJson =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementRejectionFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildRejectionDataBuffer(rejection), ...allDocumentBuffers],
        true,
      );

    if (firstAnalysisJson === null) {
      throw new InvalidRuralOrHybridRetirementRejectionFirstAnalysisJsonError();
    }

    const parsedFirstAnalysis =
      this.parseFirstAnalysisOrThrow(firstAnalysisJson);

    const resultEntity = new RuralOrHybridRetirementRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      secondAnalysis: existingResult?.secondAnalysis ?? null,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysisDownload:
        existingResult?.simplifiedAnalysisDownload ?? null,
      ruralOrHybridRetirementRejectionId,
    });

    const resultTransaction =
      existingResult !== null
        ? this.ruralOrHybridRetirementRejectionResultCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionResult(
            resultEntity,
          )
        : this.ruralOrHybridRetirementRejectionResultCommandRepositoryGateway.createRuralOrHybridRetirementRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.ruralOrHybridRetirementRejectionCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionResultId(
          ruralOrHybridRetirementRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateRuralOrHybridRetirementRejectionFirstAnalysisResponseDto.build(
      {
        ruralOrHybridRetirementRejectionFirstAnalysis:
          parsedFirstAnalysis.model,
      },
    );
  }

  private parseFirstAnalysisOrThrow(firstAnalysisJson: string): {
    cleanedJson: string;
    model: RuralOrHybridRetirementRejectionFirstAnalysisInterface;
  } {
    try {
      let cleanedJson = firstAnalysisJson;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const model = JSON.parse(
        cleanedJson,
      ) as RuralOrHybridRetirementRejectionFirstAnalysisInterface;

      cleanedJson = JSON.stringify(model);

      return { cleanedJson, model };
    } catch {
      throw new InvalidRuralOrHybridRetirementRejectionFirstAnalysisJsonError();
    }
  }

  private buildRejectionDataBuffer(
    rejection: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const rejectionData = {
      analysisName: rejection.analysisName,
      activityType: rejection.activityType,
      requestedBenefit: rejection.requestedBenefit,
      applicationSubmissionDate: rejection.applicationSubmissionDate,
      dateOfRejection: rejection.dateOfRejection,
      inssBenefits: (
        rejection.ruralOrHybridRetirementRejectionInssBenefit ?? []
      ).map((item) => item.inssBenefit),
      legalProceedings: (
        rejection.ruralOrHybridRetirementRejectionLegalProceeding ?? []
      ).map((item) => item.legalProceedingNumber),
      timeAccelerators: (
        rejection.ruralOrHybridRetirementRejectionTimeAccelerator ?? []
      ).map((item) => ({
        id: item.id.toString(),
        timeType: item.timeType,
        institution: item.institution,
        recognitionInss: item.recognitionInss,
        viability: item.viability,
        technicalNote: item.technicalNote,
        startDate: item.startDate,
        endDate: item.endDate,
        affectsQualifyingPeriod: item.affectsQualifyingPeriod,
      })),
      periods: (rejection.ruralOrHybridRetirementRejectionPeriod ?? []).map(
        (period) => ({
          id: period.id.toString(),
          startDate: period.startDate,
          endDate: period.endDate,
          workerType: period.workerType,
          workSchedule: period.workSchedule,
          propertyName: period.propertyName,
          productionDestination: period.productionDestination,
        }),
      ),
      workPeriods: (
        rejection.ruralOrHybridRetirementRejectionWorkPeriod ?? []
      ).map((workPeriod) => ({
        id: workPeriod.id.toString(),
        bondOrigin: workPeriod.bondOrigin,
        startDate: workPeriod.startDate,
        endDate: workPeriod.endDate,
        category: workPeriod.category,
        status: workPeriod.status,
        pendencyReason: workPeriod.pendencyReason,
        competenceBelowTheMinimum: workPeriod.competenceBelowTheMinimum,
        periodConsideration: workPeriod.periodConsideration,
        jobType: workPeriod.jobType,
        gracePeriod: workPeriod.gracePeriod,
        ...(workPeriod.contributionAverage !== null && {
          contributionAverage: workPeriod.contributionAverage.toString(),
        }),
      })),
    };

    return Buffer.from(JSON.stringify(rejectionData, null, 2), 'utf-8');
  }

  private async getAllDocumentBuffers(
    rejection: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (rejection.ruralOrHybridRetirementRejectionDocument ?? [])
        .filter(
          (document) =>
            document.document !== null &&
            document.document !== cnisDocumentPath,
        )
        .map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document!),
        ),
    );

    const periodDocumentBuffers = await Promise.all(
      (rejection.ruralOrHybridRetirementRejectionPeriodDocument ?? [])
        .filter((document) => document.document !== null)
        .map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document!),
        ),
    );

    const workPeriodDocumentBuffers = await Promise.all(
      (rejection.ruralOrHybridRetirementRejectionWorkPeriodDocument ?? [])
        .filter((document) => document.document !== null)
        .map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document!),
        ),
    );

    return [
      cnisBuffer,
      ...otherDocumentBuffers,
      ...periodDocumentBuffers,
      ...workPeriodDocumentBuffers,
    ];
  }

  private findAnalysisToolClientOrFail(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    return this.analysisToolRecordQueryRepositoryGateway
      .findWithRelationsByRuralOrHybridRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralOrHybridRetirementRejectionId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      )
      .then((analysisToolRecordQueryResult) => {
        const analysisToolClient =
          analysisToolRecordQueryResult.analysisToolClient;

        return new AnalysisToolClientEntity({
          ...analysisToolClient,
          createdBy: analysisToolClient.createdBy.id,
          updatedBy: analysisToolClient.updatedBy.id,
        });
      });
  }
}
