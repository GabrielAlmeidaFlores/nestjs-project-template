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
import { PermanentIncapacityBenefitTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/command/permanent-incapacity-benefit-terminated.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-result/command/permanent-incapacity-benefit-terminated-result.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import { PermanentIncapacityBenefitTerminatedResultEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/permanent-incapacity-benefit-terminated-result.entity';
import { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import { CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-first-analysis.response.dto';
import { InvalidPermanentIncapacityBenefitTerminatedFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/invalid-permanent-incapacity-benefit-terminated-first-analysis-json.error';
import { PermanentIncapacityBenefitTerminatedCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-cnis-document-not-found.error';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import {
  PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/generic/permanent-incapacity-benefit-terminated-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { PermanentIncapacityBenefitTerminatedFirstAnalysisInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/interface/permanent-incapacity-benefit-terminated-first-analysis.interface';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: PermanentIncapacityBenefitTerminatedFirstAnalysisModel;
}

@Injectable()
export class CreatePermanentIncapacityBenefitTerminatedFirstAnalysisUseCase {
  protected readonly _type =
    CreatePermanentIncapacityBenefitTerminatedFirstAnalysisUseCase.name;

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
    @Inject(PermanentIncapacityBenefitTerminatedCommandRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedCommandRepositoryGateway,
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
  ): Promise<CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto> {
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

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.fileName,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      permanentIncapacityBenefitTerminatedId,
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
      permanentIncapacityBenefitTerminated,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getPermanentIncapacityBenefitTerminatedFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildTerminationDataBuffer(permanentIncapacityBenefitTerminated),
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

    const resultEntity = new PermanentIncapacityBenefitTerminatedResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      id:
        existingResult !== null
          ? new PermanentIncapacityBenefitTerminatedResultId(existingResult.id)
          : new PermanentIncapacityBenefitTerminatedResultId(),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway.updatePermanentIncapacityBenefitTerminatedResult(
            resultEntity,
          )
        : this.permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.permanentIncapacityBenefitTerminatedCommandRepositoryGateway.updatePermanentIncapacityBenefitTerminatedResultId(
          permanentIncapacityBenefitTerminatedId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto.build(
      {
        permanentIncapacityBenefitTerminatedId,
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
      ) as PermanentIncapacityBenefitTerminatedFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      const clientData =
        PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel.build({
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
          PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel.build({
            startDate: period.startDate,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            status: period.status,
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            ...(this.isValidEnum(
              period.category,
              PermanentIncapacityBenefitTerminatedCategoryEnum,
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
              PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum,
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
              PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel.build(
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
        model: PermanentIncapacityBenefitTerminatedFirstAnalysisModel.build({
          clientData,
          insuredStatus: raw.insuredStatus,
          gracePeriodStatus: raw.gracePeriodStatus,
          gracePeriods: raw.gracePeriods.map((item) =>
            PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel.build(
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
      throw new InvalidPermanentIncapacityBenefitTerminatedFirstAnalysisJsonError();
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

  private findAnalysisToolClientOrFail(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const recordPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByPermanentIncapacityBenefitTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPermanentIncapacityBenefitTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        permanentIncapacityBenefitTerminatedId,
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
