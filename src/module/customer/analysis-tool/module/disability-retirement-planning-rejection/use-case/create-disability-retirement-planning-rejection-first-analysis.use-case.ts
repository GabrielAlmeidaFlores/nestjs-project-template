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
import { DisabilityRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/command/disability-retirement-planning-rejection.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-result/command/disability-retirement-planning-rejection-result.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import { CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection-first-analysis.response.dto';
import { DisabilityRetirementPlanningRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-cnis-document-not-found.error';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { InvalidDisabilityRetirementPlanningRejectionFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/invalid-disability-retirement-planning-rejection-first-analysis-json.error';
import {
  DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/generic/disability-retirement-planning-rejection-first-analysis.model';
import { DisabilityRetirementPlanningRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/interface/disability-retirement-planning-rejection-first-analysis.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityRetirementPlanningRejectionFirstAnalysisUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningRejectionFirstAnalysisUseCase.name;

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
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionCommandRepositoryGateway: DisabilityRetirementPlanningRejectionCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionResultCommandRepositoryGateway: DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway,
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
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const disabilityRetirementPlanningRejection =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const cnisDocument = (
      disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionDocument ??
      []
    ).find(
      (doc) =>
        doc.type === DisabilityRetirementPlanningRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new DisabilityRetirementPlanningRejectionCnisDocumentNotFoundError();
    }

    const existingResult =
      disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      disabilityRetirementPlanningRejectionId,
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
      disabilityRetirementPlanningRejection,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningRejectionFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildGrantDataBuffer(disabilityRetirementPlanningRejection),
          ...documentBuffers,
        ],
        true,
      );

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysisRaw ?? '',
    );

    const resultEntity = new DisabilityRetirementPlanningRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
    });

    const resultTransaction =
      existingResult !== null
        ? this.disabilityRetirementPlanningRejectionResultCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionResult(
            existingResult.id,
            resultEntity,
          )
        : this.disabilityRetirementPlanningRejectionResultCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.disabilityRetirementPlanningRejectionCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionResultId(
          disabilityRetirementPlanningRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto.build(
      {
        disabilityRetirementPlanningRejectionFirstAnalysis:
          parsedFirstAnalysis.model,
      },
    );
  }

  private parseFirstAnalysisOrThrow(rawJson: string): {
    cleanedJson: string;
    model: DisabilityRetirementPlanningRejectionFirstAnalysisModel;
  } {
    try {
      let cleanedJson = rawJson;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as DisabilityRetirementPlanningRejectionFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      const model =
        DisabilityRetirementPlanningRejectionFirstAnalysisModel.build({
          clientData:
            DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel.build(
              {
                name: raw.clientData.name,
                ...(this.hasValue(raw.clientData.cpf) && {
                  cpf: raw.clientData.cpf,
                }),
                ...(this.hasValue(raw.clientData.nit) && {
                  nit: raw.clientData.nit,
                }),
                ...(this.hasValue(raw.clientData.birthDate) && {
                  birthDate: raw.clientData.birthDate,
                }),
              },
            ),
          timeSummary:
            DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel.build(
              {
                pcdTime: this.buildTimeSummaryScenario(raw.timeSummary.pcdTime),
                commonTime: this.buildTimeSummaryScenario(
                  raw.timeSummary.commonTime,
                ),
                totalTime: this.buildTimeSummaryScenario(
                  raw.timeSummary.totalTime,
                ),
                pcdGracePeriod: this.buildTimeSummaryScenario(
                  raw.timeSummary.pcdGracePeriod,
                ),
                commonGracePeriod: this.buildTimeSummaryScenario(
                  raw.timeSummary.commonGracePeriod,
                ),
                totalGracePeriod: this.buildTimeSummaryScenario(
                  raw.timeSummary.totalGracePeriod,
                ),
              },
            ),
          periods: (this.hasValue(raw.periods) ? raw.periods : []).map(
            (period) =>
              DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel.build(
                {
                  ...(this.hasValue(period.bondOrigin) && {
                    bondOrigin: period.bondOrigin,
                  }),
                  ...(this.hasValue(period.category) && {
                    category: period.category,
                  }),
                  ...(this.hasValue(period.activityDescription) && {
                    activityDescription: period.activityDescription,
                  }),
                  startDate: period.startDate,
                  ...(this.hasValue(period.endDate) && {
                    endDate: period.endDate,
                  }),
                  workType: period.workType,
                  ...(this.hasValue(period.impactMonths) && {
                    impactMonths: period.impactMonths,
                  }),
                  ...(this.hasValue(period.graceMonths) && {
                    graceMonths: period.graceMonths,
                  }),
                  isPendency: period.isPendency,
                  competenceBelowTheMinimum: period.competenceBelowTheMinimum,
                  ...(this.hasValue(period.contributionAverage) && {
                    contributionAverage: new DecimalValue(
                      period.contributionAverage.toString(),
                    ),
                  }),
                  ...(this.hasValue(period.pendencyReason) && {
                    pendencyReason: period.pendencyReason,
                  }),
                  ...(this.hasValue(period.periodConsideration) && {
                    periodConsideration: period.periodConsideration,
                  }),
                  ...(this.hasValue(period.wantsToComplementViaMeuINSS) && {
                    wantsToComplementViaMeuINSS:
                      period.wantsToComplementViaMeuINSS,
                  }),
                  status: period.status,
                  ...(this.hasValue(period.statusPCD) && {
                    statusPCD: period.statusPCD,
                  }),
                  ...(this.hasValue(period.local) && {
                    local: period.local,
                  }),
                  earningsHistory: (this.hasValue(period.earningsHistory)
                    ? period.earningsHistory
                    : []
                  ).map((item) =>
                    DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel.build(
                      {
                        ...(this.hasValue(item.competence) && {
                          competence: item.competence,
                        }),
                        ...(this.hasValue(item.value) && {
                          value: item.value,
                        }),
                        ...(this.hasValue(item.pendencyType) && {
                          pendencyType: item.pendencyType,
                        }),
                        ...(this.hasValue(item.collectedAt) && {
                          collectedAt: item.collectedAt,
                        }),
                      },
                    ),
                  ),
                },
              ),
          ),
          disabilityAnalysis:
            DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel.build(
              {
                predominantDisabilityDegree:
                  raw.disabilityAnalysis.predominantDisabilityDegree,
                lightDisabilityPercentage:
                  raw.disabilityAnalysis.lightDisabilityPercentage,
                moderateDisabilityPercentage:
                  raw.disabilityAnalysis.moderateDisabilityPercentage,
                severeDisabilityPercentage:
                  raw.disabilityAnalysis.severeDisabilityPercentage,
                documents: (raw.disabilityAnalysis.documents ?? []).map((doc) =>
                  DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel.build(
                    {
                      documentName: doc.documentName,
                      viability: doc.viability,
                      cid: doc.cid,
                      degree: doc.degree,
                      date: doc.date,
                      crm: doc.crm,
                      observations: doc.observations ?? [],
                    },
                  ),
                ),
              },
            ),
        });

      return { cleanedJson, model };
    } catch (err) {
      console.error(
        '[CreateDisabilityRetirementPlanningRejectionFirstAnalysis] parseFirstAnalysisOrThrow failed:',
        err,
      );
      const maxLogLength = 2000;
      console.error(
        '[CreateDisabilityRetirementPlanningRejectionFirstAnalysis] rawJson (first 2000 chars):',
        rawJson.slice(0, maxLogLength),
      );
      throw new InvalidDisabilityRetirementPlanningRejectionFirstAnalysisJsonError();
    }
  }

  private buildTimeSummaryScenario(
    scenario: DisabilityRetirementPlanningRejectionFirstAnalysisInterface['timeSummary']['pcdTime'],
  ): DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel {
    return DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel.build(
      {
        withoutResolvingPendencies: scenario.withoutResolvingPendencies,
        resolvingPendencies: scenario.resolvingPendencies,
        withTimeAccelerators: scenario.withTimeAccelerators,
      },
    );
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private buildGrantDataBuffer(
    disabilityRetirementPlanningRejection: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: disabilityRetirementPlanningRejection.analysisName,
      requestEntryDate: disabilityRetirementPlanningRejection.requestEntryDate,
      denialDate: disabilityRetirementPlanningRejection.denialDate,
      documents: (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionDocument ??
        []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      periods: (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionPeriod ??
        []
      ).map((period) => ({
        id: period.id.toString(),
        startDate: period.startDate,
        endDate: period.endDate,
        workType: period.workType,
        bondOrigin: period.bondOrigin,
        category: period.category,
        isPendency: period.isPendency,
        competenceBelowTheMinimum: period.competenceBelowTheMinimum,
        pendencyReason: period.pendencyReason,
        periodConsideration: period.periodConsideration,
        ...(period.contributionAverage !== null && {
          contributionAverage: period.contributionAverage.toString(),
        }),
        ...(period.pcdStatus !== null && {
          pcdStatus: period.pcdStatus,
        }),
        ...(period.local !== null && {
          local: period.local,
        }),
        status: period.status,
      })),
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async buildAllDocumentBuffers(
    disabilityRetirementPlanningRejection: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionDocument ??
        []
      )
        .filter((doc) => doc.document !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    const periodDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionPeriodDocument ??
        []
      ).map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    return [cnisBuffer, ...otherDocumentBuffers, ...periodDocumentBuffers];
  }

  private findAnalysisToolClientOrFail(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const recordPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityRetirementPlanningRejectionId,
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
