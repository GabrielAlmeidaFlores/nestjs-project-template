import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { TemporaryIncapacityBenefitTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/command/temporary-incapacity-benefit-termination.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-result/command/temporary-incapacity-benefit-termination-result.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import { TemporaryIncapacityBenefitTerminationResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result.entity';
import { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import { CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-first-analysis.response.dto';
import { InvalidTemporaryIncapacityBenefitTerminationFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/invalid-temporary-incapacity-benefit-termination-first-analysis-json.error';
import { TemporaryIncapacityBenefitTerminationCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-cnis-document-not-found.error';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import {
  TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/generic/temporary-incapacity-benefit-termination-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TemporaryIncapacityBenefitTerminationFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/interface/temporary-incapacity-benefit-termination-first-analysis.interface';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: TemporaryIncapacityBenefitTerminationFirstAnalysisModel;
}

@Injectable()
export class CreateTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase.name;

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
    @Inject(TemporaryIncapacityBenefitTerminationCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationCommandRepositoryGateway,
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
  ): Promise<CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getTemporaryIncapacityBenefitTerminationFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildTerminationDataBuffer(
            temporaryIncapacityBenefitTermination,
          ),
          ...documentBuffers,
        ],
        true,
      );

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysisRaw ?? '',
      {
        gender: analysisToolClient.gender ?? null,
        email: analysisToolClient.email?.toString() ?? null,
        phone: analysisToolClient.phoneNumber?.toString() ?? null,
      },
    );

    const resultEntity = new TemporaryIncapacityBenefitTerminationResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      id:
        existingResult !== null
          ? new TemporaryIncapacityBenefitTerminationResultId(existingResult.id)
          : new TemporaryIncapacityBenefitTerminationResultId(),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.temporaryIncapacityBenefitTerminationResultCommandRepositoryGateway.updateTemporaryIncapacityBenefitTerminationResult(
            resultEntity,
          )
        : this.temporaryIncapacityBenefitTerminationResultCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.temporaryIncapacityBenefitTerminationCommandRepositoryGateway.updateTemporaryIncapacityBenefitTerminationResultId(
          temporaryIncapacityBenefitTerminationId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto.build(
      {
        temporaryIncapacityBenefitTerminationId,
        firstAnalysis: parsedFirstAnalysis.model,
      },
    );
  }

  private parseFirstAnalysisOrThrow(
    rawJson: string,
    entityClientData: {
      gender: string | null;
      email: string | null;
      phone: string | null;
    },
  ): ParsedFirstAnalysisInterface {
    try {
      let cleanedJson = rawJson;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as TemporaryIncapacityBenefitTerminationFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      const clientData =
        TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel.build(
          {
            name: raw.clientData.name,
            ...(this.hasValue(raw.clientData.cpf) && {
              cpf: raw.clientData.cpf,
            }),
            ...(this.hasValue(raw.clientData.birthDate) && {
              birthDate: raw.clientData.birthDate,
            }),
            ...(this.hasValue(raw.clientData.category) && {
              category: raw.clientData.category,
            }),
            ...(this.hasValue(raw.clientData.nb) && {
              nb: raw.clientData.nb,
            }),
            ...(this.hasValue(raw.clientData.judicialProcessNumber) && {
              judicialProcessNumber: raw.clientData.judicialProcessNumber,
            }),
            ...(this.hasValue(raw.clientData.incapacityStartDate) && {
              incapacityStartDate: raw.clientData.incapacityStartDate,
            }),
            ...(this.hasValue(entityClientData.gender) && {
              gender: entityClientData.gender,
            }),
            ...(this.hasValue(entityClientData.email) && {
              email: entityClientData.email,
            }),
            ...(this.hasValue(entityClientData.phone) && {
              phone: entityClientData.phone,
            }),
          },
        );

      const periods = (this.hasValue(raw.periods) ? raw.periods : []).map(
        (period) =>
          TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel.build({
            startDate: period.startDate,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            status: period.status,
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            ...(this.isValidEnum(
              period.category,
              TemporaryIncapacityBenefitTerminationCategoryEnum,
            ) && {
              category: period.category,
            }),
            ...(this.hasValue(period.activityDescription) && {
              activityDescription: period.activityDescription,
            }),
            ...(this.hasValue(period.endDate) && {
              endDate: period.endDate,
            }),
            ...(this.hasValue(period.impactMonths) && {
              impactMonths: period.impactMonths,
            }),
            ...(this.hasValue(period.graceMonths) && {
              graceMonths: period.graceMonths,
            }),
            ...(this.hasValue(period.contributionAverage) && {
              contributionAverage: new DecimalValue(
                period.contributionAverage.toString(),
              ),
            }),
            ...(this.isValidEnum(
              period.pendencyReason,
              TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum,
            ) && {
              pendencyReason: period.pendencyReason,
            }),
            ...(this.hasValue(period.periodConsideration) && {
              periodConsideration: period.periodConsideration,
            }),
            ...(this.hasValue(period.wantsToComplementViaMeuINSS) && {
              wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
            }),
            earningsHistory: (this.hasValue(period.earningsHistory)
              ? period.earningsHistory
              : []
            ).map((eh) =>
              TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel.build(
                {
                  ...(this.hasValue(eh.competence) && {
                    competence: eh.competence,
                  }),
                  ...(this.hasValue(eh.value) && {
                    value: eh.value,
                  }),
                  ...(this.hasValue(eh.pendencyType) && {
                    pendencyType: eh.pendencyType,
                  }),
                  ...(this.hasValue(eh.collectedAt) && {
                    collectedAt: eh.collectedAt,
                  }),
                },
              ),
            ),
          }),
      );

      return {
        cleanedJson,
        model: TemporaryIncapacityBenefitTerminationFirstAnalysisModel.build({
          clientData,
          insuredStatus: raw.insuredStatus,
          gracePeriodStatus: raw.gracePeriodStatus,
          gracePeriods: raw.gracePeriods.map((item) =>
            TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel.build(
              {
                event: item.event,
                date: item.date,
                observation: item.observation,
              },
            ),
          ),
          analysisConclusion: raw.analysisConclusion,
          graceExtensionDueToInvoluntaryUnemployment:
            raw.graceExtensionDueToInvoluntaryUnemployment,
          requestToExtendGracePeriod: raw.requestToExtendGracePeriod,
          graceExempt: raw.graceExempt,
          graceValidation: raw.graceValidation,
          contributionTimeWithoutResolvingPendencies:
            raw.contributionTimeWithoutResolvingPendencies,
          contributionTimeResolvingPendencies:
            raw.contributionTimeResolvingPendencies,
          contributionTimeWithAccelerators:
            raw.contributionTimeWithAccelerators,
          periods,
        }),
      };
    } catch (error) {
      console.error('Failed to parse first analysis JSON. Raw input:', rawJson);
      console.error('Parse error:', error);
      throw new InvalidTemporaryIncapacityBenefitTerminationFirstAnalysisJsonError();
    }
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private isValidEnum<T extends Record<string, string>>(
    value: string | null | undefined,
    enumType: T,
  ): value is T[keyof T] {
    if (!this.hasValue(value) || value === '') {
      return false;
    }

    return Object.values(enumType).includes(value);
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
