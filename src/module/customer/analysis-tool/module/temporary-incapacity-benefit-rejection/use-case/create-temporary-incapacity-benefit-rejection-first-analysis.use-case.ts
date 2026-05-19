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
import { TemporaryIncapacityBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/command/temporary-incapacity-benefit-rejection.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-result/command/temporary-incapacity-benefit-rejection-result.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import { TemporaryIncapacityBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.entity';
import { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import { CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-first-analysis.response.dto';
import { InvalidTemporaryIncapacityBenefitRejectionFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/invalid-temporary-incapacity-benefit-rejection-first-analysis-json.error';
import { TemporaryIncapacityBenefitRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-cnis-document-not-found.error';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import {
  TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/generic/temporary-incapacity-benefit-rejection-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TemporaryIncapacityBenefitRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/interface/temporary-incapacity-benefit-rejection-first-analysis.interface';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: TemporaryIncapacityBenefitRejectionFirstAnalysisModel;
}

@Injectable()
export class CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase.name;

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
    @Inject(TemporaryIncapacityBenefitRejectionCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionCommandRepositoryGateway,
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
  ): Promise<CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getTemporaryIncapacityBenefitRejectionFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildRejectionDataBuffer(temporaryIncapacityBenefitRejection),
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

    const resultEntity = new TemporaryIncapacityBenefitRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      id:
        existingResult !== null
          ? new TemporaryIncapacityBenefitRejectionResultId(existingResult.id)
          : new TemporaryIncapacityBenefitRejectionResultId(),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.temporaryIncapacityBenefitRejectionResultCommandRepositoryGateway.updateTemporaryIncapacityBenefitRejectionResult(
            resultEntity,
          )
        : this.temporaryIncapacityBenefitRejectionResultCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.temporaryIncapacityBenefitRejectionCommandRepositoryGateway.updateTemporaryIncapacityBenefitRejectionResultId(
          temporaryIncapacityBenefitRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto.build(
      {
        temporaryIncapacityBenefitRejectionId,
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
      ) as TemporaryIncapacityBenefitRejectionFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      const clientData =
        TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel.build({
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
        });

      const periods = (this.hasValue(raw.periods) ? raw.periods : []).map(
        (period) =>
          TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel.build({
            startDate: period.startDate,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            status: period.status,
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            ...(this.isValidEnum(
              period.category,
              TemporaryIncapacityBenefitRejectionCategoryEnum,
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
              TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum,
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
              TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel.build(
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
        model: TemporaryIncapacityBenefitRejectionFirstAnalysisModel.build({
          clientData,
          insuredStatus: raw.insuredStatus,
          gracePeriodStatus: raw.gracePeriodStatus,
          gracePeriods: raw.gracePeriods.map((item) =>
            TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel.build(
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
      throw new InvalidTemporaryIncapacityBenefitRejectionFirstAnalysisJsonError();
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
