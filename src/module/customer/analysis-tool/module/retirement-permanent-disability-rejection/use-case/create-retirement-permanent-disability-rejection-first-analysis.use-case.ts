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
import { RetirementPermanentDisabilityRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/command/retirement-permanent-disability-rejection.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-result/command/retirement-permanent-disability-rejection-result.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';
import { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';
import { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';
import { CreateRetirementPermanentDisabilityRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/create-retirement-permanent-disability-rejection-first-analysis.response.dto';
import { InvalidRetirementPermanentDisabilityRejectionResultJsonError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/invalid-retirement-permanent-disability-rejection-result-json.error';
import { RetirementPermanentDisabilityRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-cnis-document-not-found.error';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';
import {
  RetirementPermanentDisabilityRejectionFirstAnalysisClientDataModel,
  RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemModel,
  RetirementPermanentDisabilityRejectionFirstAnalysisGracePeriodItemModel,
  RetirementPermanentDisabilityRejectionFirstAnalysisModel,
  RetirementPermanentDisabilityRejectionFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/model/generic/retirement-permanent-disability-rejection-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { RetirementPermanentDisabilityRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/model/interface/retirement-permanent-disability-rejection-first-analysis.interface';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: RetirementPermanentDisabilityRejectionFirstAnalysisModel;
}

@Injectable()
export class CreateRetirementPermanentDisabilityRejectionFirstAnalysisUseCase {
  protected readonly _type =
    CreateRetirementPermanentDisabilityRejectionFirstAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionCommandRepositoryGateway: RetirementPermanentDisabilityRejectionCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionResultCommandRepositoryGateway: RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway,
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
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
  ): Promise<CreateRetirementPermanentDisabilityRejectionFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
        retirementPermanentDisabilityRejectionId,
        RetirementPermanentDisabilityRejectionNotFoundError,
      );

    const cnisDocument = (
      existing.retirementPermanentDisabilityRejectionDocument ?? []
    ).find(
      (doc) =>
        doc.type ===
        RetirementPermanentDisabilityRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new RetirementPermanentDisabilityRejectionCnisDocumentNotFoundError();
    }

    const existingResult =
      existing.retirementPermanentDisabilityRejectionResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      retirementPermanentDisabilityRejectionId,
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
      existing,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getRetirementPermanentDisabilityRejectionFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        documentBuffers,
        true,
      );

    const firstAnalysisText = firstAnalysisRaw ?? '';

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysisText,
      {
        gender: analysisToolClient.gender ?? null,
        email: analysisToolClient.email?.toString() ?? null,
        phone: analysisToolClient.phoneNumber?.toString() ?? null,
      },
    );

    const resultEntity = new RetirementPermanentDisabilityRejectionResultEntity(
      {
        ...(existingResult !== null && { id: existingResult.id }),
        inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
        firstAnalysis: parsedFirstAnalysis.cleanedJson,
      },
    );

    const resultTransaction =
      existingResult !== null
        ? this.retirementPermanentDisabilityRejectionResultCommandRepositoryGateway.updateRetirementPermanentDisabilityRejectionResult(
            existingResult.id,
            resultEntity,
          )
        : this.retirementPermanentDisabilityRejectionResultCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.retirementPermanentDisabilityRejectionCommandRepositoryGateway.updateRetirementPermanentDisabilityRejectionResultId(
          retirementPermanentDisabilityRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateRetirementPermanentDisabilityRejectionFirstAnalysisResponseDto.build(
      {
        retirementPermanentDisabilityRejectionId,
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
      ) as RetirementPermanentDisabilityRejectionFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      const clientData =
        RetirementPermanentDisabilityRejectionFirstAnalysisClientDataModel.build(
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
          RetirementPermanentDisabilityRejectionFirstAnalysisPeriodModel.build({
            startDate: period.startDate,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            status: period.status,
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            ...(this.isValidEnum(
              period.category,
              RetirementPermanentDisabilityRejectionPeriodCategoryEnum,
            ) && {
              category: period.category,
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
              RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum,
            ) && {
              pendencyReason: period.pendencyReason,
            }),
            ...(this.isValidEnum(
              period.periodConsideration,
              RetirementPermanentDisabilityRejectionPeriodConsiderationEnum,
            ) && {
              periodConsideration: period.periodConsideration,
            }),
            ...(this.hasValue(period.wantsToComplementViaMeuINSS) && {
              wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
            }),
            earningsHistory: (this.hasValue(period.earningsHistory)
              ? period.earningsHistory
              : []
            ).map((eh) =>
              RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemModel.build(
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
        model: RetirementPermanentDisabilityRejectionFirstAnalysisModel.build({
          clientData,
          insuredStatus: raw.insuredStatus,
          gracePeriodStatus: raw.gracePeriodStatus,
          gracePeriods: raw.gracePeriods.map((item) =>
            RetirementPermanentDisabilityRejectionFirstAnalysisGracePeriodItemModel.build(
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
      throw new InvalidRetirementPermanentDisabilityRejectionResultJsonError();
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

  private async buildAllDocumentBuffers(
    existing: Awaited<
      ReturnType<
        typeof this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (existing.retirementPermanentDisabilityRejectionDocument ?? [])
        .filter((doc) => doc.document !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    const periodDocumentBuffers = await Promise.all(
      (existing.retirementPermanentDisabilityRejectionPeriodDocument ?? []).map(
        (doc) => this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );

    return [cnisBuffer, ...otherDocumentBuffers, ...periodDocumentBuffers];
  }

  private findAnalysisToolClientOrFail(
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    return this.analysisToolRecordQueryRepositoryGateway
      .findWithRelationsByRetirementPermanentDisabilityRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPermanentDisabilityRejectionId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      )
      .then((record) => {
        const analysisToolClient = record.analysisToolClient;

        return new AnalysisToolClientEntity({
          ...analysisToolClient,
          createdBy: analysisToolClient.createdBy.id,
          updatedBy: analysisToolClient.updatedBy.id,
        });
      });
  }
}
