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
import { RuralOrHybridRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/command/rural-or-hybrid-retirement-analysis.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-result/command/rural-or-hybrid-retirement-analysis-result.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/enum/rural-or-hybrid-retirement-analysis-document-type.enum';
import { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';
import { CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-first-analysis.response.dto';
import { InvalidRuralOrHybridRetirementAnalysisFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/invalid-rural-or-hybrid-retirement-analysis-first-analysis-json.error';
import { RuralOrHybridRetirementAnalysisCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-cnis-document-not-found.error';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { RuralOrHybridRetirementAnalysisFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-first-analysis.interface';

@Injectable()
export class CreateRuralOrHybridRetirementAnalysisFirstAnalysisUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementAnalysisFirstAnalysisUseCase.name;

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
    @Inject(RuralOrHybridRetirementAnalysisCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisCommandRepositoryGateway: RuralOrHybridRetirementAnalysisCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway: RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway,
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
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysis =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const cnisDocument = (
      analysis.ruralOrHybridRetirementAnalysisDocument ?? []
    ).find(
      (document) =>
        document.type === RuralOrHybridRetirementAnalysisDocumentTypeEnum.CNIS,
    );

    if (cnisDocument?.document === null || cnisDocument === undefined) {
      throw new RuralOrHybridRetirementAnalysisCnisDocumentNotFoundError();
    }

    const existingResult = analysis.ruralOrHybridRetirementAnalysisResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      ruralOrHybridRetirementAnalysisId,
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
      analysis,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisJson =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementAnalysisFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildAnalysisDataBuffer(analysis), ...allDocumentBuffers],
        true,
      );

    if (firstAnalysisJson === null) {
      throw new InvalidRuralOrHybridRetirementAnalysisFirstAnalysisJsonError();
    }

    const parsedFirstAnalysis =
      this.parseFirstAnalysisOrThrow(firstAnalysisJson);

    const resultEntity = new RuralOrHybridRetirementAnalysisResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      secondAnalysis: existingResult?.secondAnalysis ?? null,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysisDownload:
        existingResult?.simplifiedAnalysisDownload ?? null,
      ruralOrHybridRetirementAnalysisId,
    });

    const resultTransaction =
      existingResult !== null
        ? this.ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisResult(
            resultEntity,
          )
        : this.ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.ruralOrHybridRetirementAnalysisCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisResultId(
          ruralOrHybridRetirementAnalysisId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto.build({
      ruralOrHybridRetirementAnalysisFirstAnalysis: parsedFirstAnalysis.model,
      cnisAnalysis,
    });
  }

  private parseFirstAnalysisOrThrow(firstAnalysisJson: string): {
    cleanedJson: string;
    model: RuralOrHybridRetirementAnalysisFirstAnalysisInterface;
  } {
    try {
      let cleanedJson = firstAnalysisJson;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const model = JSON.parse(
        cleanedJson,
      ) as RuralOrHybridRetirementAnalysisFirstAnalysisInterface;

      cleanedJson = JSON.stringify(model);

      return { cleanedJson, model };
    } catch {
      throw new InvalidRuralOrHybridRetirementAnalysisFirstAnalysisJsonError();
    }
  }

  private buildAnalysisDataBuffer(
    analysis: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const analysisData = {
      analysisName: analysis.analysisName,
      activityType: analysis.activityType,
      requestedBenefit: analysis.requestedBenefit,
      timeAccelerators: (
        analysis.ruralOrHybridRetirementAnalysisTimeAccelerator ?? []
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
      periods: (analysis.ruralOrHybridRetirementAnalysisPeriod ?? []).map(
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
        analysis.ruralOrHybridRetirementAnalysisWorkPeriod ?? []
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

    return Buffer.from(JSON.stringify(analysisData, null, 2), 'utf-8');
  }

  private async getAllDocumentBuffers(
    analysis: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentPaths = (
      analysis.ruralOrHybridRetirementAnalysisDocument ?? []
    ).flatMap((document) =>
      document.document !== null && document.document !== cnisDocumentPath
        ? [document.document]
        : [],
    );

    const otherDocumentBuffers = await Promise.all(
      otherDocumentPaths.map((documentPath) =>
        this.fileProcessorGateway.getFileBuffer(documentPath),
      ),
    );

    const periodDocumentPaths = (
      analysis.ruralOrHybridRetirementAnalysisPeriodDocument ?? []
    ).flatMap((document) =>
      document.document !== null ? [document.document] : [],
    );

    const periodDocumentBuffers = await Promise.all(
      periodDocumentPaths.map((documentPath) =>
        this.fileProcessorGateway.getFileBuffer(documentPath),
      ),
    );

    const workPeriodDocumentPaths = (
      analysis.ruralOrHybridRetirementAnalysisWorkPeriodDocument ?? []
    ).flatMap((document) =>
      document.document !== null ? [document.document] : [],
    );

    const workPeriodDocumentBuffers = await Promise.all(
      workPeriodDocumentPaths.map((documentPath) =>
        this.fileProcessorGateway.getFileBuffer(documentPath),
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
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    return this.analysisToolRecordQueryRepositoryGateway
      .findWithRelationsByRuralOrHybridRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralOrHybridRetirementAnalysisId,
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
