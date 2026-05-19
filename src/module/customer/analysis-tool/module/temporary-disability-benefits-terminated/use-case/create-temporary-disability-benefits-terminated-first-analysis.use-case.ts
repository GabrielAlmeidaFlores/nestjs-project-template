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
import { TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/command/temporary-disability-benefits-terminated.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-result/command/temporary-disability-benefits-terminated-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/enum/temporary-disability-benefits-terminated-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.entity';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import { CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-first-analysis.response.dto';
import { InvalidTemporaryDisabilityBenefitsTerminatedFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/invalid-temporary-disability-benefits-terminated-first-analysis-json.error';
import { TemporaryDisabilityBenefitsTerminatedCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-cnis-document-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import {
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/generic/temporary-disability-benefits-terminated-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/interface/temporary-disability-benefits-terminated-first-analysis.interface';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel;
}

@Injectable()
export class CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase.name;

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
    @Inject(TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway,
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
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto> {
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

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.fileName,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      temporaryDisabilityBenefitsTerminatedId,
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
      temporaryDisabilityBenefitsTerminated,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getTemporaryDisabilityBenefitsTerminatedFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildRejectionDataBuffer(temporaryDisabilityBenefitsTerminated),
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

    const resultEntity = new TemporaryDisabilityBenefitsTerminatedResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      id:
        existingResult !== null
          ? new TemporaryDisabilityBenefitsTerminatedResultId(existingResult.id)
          : new TemporaryDisabilityBenefitsTerminatedResultId(),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.temporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway.updateTemporaryDisabilityBenefitsTerminatedResult(
            resultEntity,
          )
        : this.temporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.temporaryDisabilityBenefitsTerminatedCommandRepositoryGateway.updateTemporaryDisabilityBenefitsTerminatedResultId(
          temporaryDisabilityBenefitsTerminatedId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto.build(
      {
        temporaryDisabilityBenefitsTerminatedId,
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
      ) as TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface;

      this.normalizeFirstAnalysisPendencies(raw);
      cleanedJson = JSON.stringify(raw);

      const clientData =
        TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel.build(
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
        (period) => {
          const pendencyReason = this.normalizePendencyReason(
            period.pendencyReason,
          );

          return TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel.build(
            {
              startDate: period.startDate,
              isPendency: period.isPendency,
              competenceBelowTheMinimum: period.competenceBelowTheMinimum,
              status: period.status,
              ...(this.hasValue(period.bondOrigin) && {
                bondOrigin: period.bondOrigin,
              }),
              ...(this.isValidEnum(
                period.category,
                TemporaryDisabilityBenefitsTerminatedCategoryEnum,
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
              ...(this.hasValue(pendencyReason) && {
                pendencyReason,
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
              ).map((eh) => {
                const pendencyType = this.normalizePendencyReason(
                  eh.pendencyType,
                );

                return TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel.build(
                  {
                    ...(this.hasValue(eh.competence) && {
                      competence: eh.competence,
                    }),
                    ...(this.hasValue(eh.value) && {
                      value: eh.value,
                    }),
                    ...(this.hasValue(pendencyType) && {
                      pendencyType,
                    }),
                    ...(this.hasValue(eh.collectedAt) && {
                      collectedAt: eh.collectedAt,
                    }),
                  },
                );
              }),
            },
          );
        },
      );

      return {
        cleanedJson,
        model: TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel.build({
          clientData,
          insuredStatus: raw.insuredStatus,
          gracePeriodStatus: raw.gracePeriodStatus,
          gracePeriods: raw.gracePeriods.map((item) =>
            TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel.build(
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
      throw new InvalidTemporaryDisabilityBenefitsTerminatedFirstAnalysisJsonError();
    }
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private normalizeFirstAnalysisPendencies(
    raw: TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface,
  ): void {
    (this.hasValue(raw.periods) ? raw.periods : []).forEach((period) => {
      period.pendencyReason = this.normalizePendencyReason(
        period.pendencyReason,
      );

      (this.hasValue(period.earningsHistory)
        ? period.earningsHistory
        : []
      ).forEach((earningHistory) => {
        earningHistory.pendencyType = this.normalizePendencyReason(
          earningHistory.pendencyType,
        );
      });
    });
  }

  private normalizePendencyReason(
    value: string | null | undefined,
  ):
    | TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum
    | undefined {
    if (!this.hasValue(value) || value === '') {
      return undefined;
    }

    const normalizedValue = value.trim().toUpperCase();
    const pendencyReasonMap: Record<
      string,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum
    > = {
      LEAVE_DATE:
        TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum.LEAVE_DATE,
      NO_EXIT_DATE:
        TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum.LEAVE_DATE,
      COMPETENCE_BELOW_MINIMUM:
        TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum.COMPETENCE_BELOW_MINIMUM,
      LATE_CONTRIBUTION:
        TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum.INCONSISTENT_COMPETENCE,
      INCONSISTENT_COMPETENCE:
        TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum.INCONSISTENT_COMPETENCE,
    };

    return pendencyReasonMap[normalizedValue];
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

  private findAnalysisToolClientOrFail(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const recordPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByTemporaryDisabilityBenefitsTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryDisabilityBenefitsTerminatedId,
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
