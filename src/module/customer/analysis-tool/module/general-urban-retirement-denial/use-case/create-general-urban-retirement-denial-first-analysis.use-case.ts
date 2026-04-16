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
import { GeneralUrbanRetirementDenialCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/command/general-urban-retirement-denial.command.repository.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-result/command/general-urban-retirement-denial-result.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import { CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-first-analysis.response.dto';
import { GeneralUrbanRetirementDenialCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-cnis-document-not-found.error';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { InvalidGeneralUrbanRetirementDenialFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/invalid-general-urban-retirement-denial-first-analysis-json.error';
import {
  GeneralUrbanRetirementDenialFirstAnalysisClientDataModel,
  GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel,
  GeneralUrbanRetirementDenialFirstAnalysisModel,
  GeneralUrbanRetirementDenialFirstAnalysisPeriodModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/generic/general-urban-retirement-denial-first-analysis.model';
import { GeneralUrbanRetirementDenialFirstAnalysisInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/interface/general-urban-retirement-denial-first-analysis.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase.name;

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
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialCommandRepositoryGateway: GeneralUrbanRetirementDenialCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialResultCommandRepositoryGateway: GeneralUrbanRetirementDenialResultCommandRepositoryGateway,
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
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementDenial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const cnisDocument = (
      generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? []
    ).find(
      (doc) => doc.type === GeneralUrbanRetirementDenialDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new GeneralUrbanRetirementDenialCnisDocumentNotFoundError();
    }

    const existingResult =
      generalUrbanRetirementDenial.generalUrbanRetirementDenialResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      generalUrbanRetirementDenialId,
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
      generalUrbanRetirementDenial,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getGeneralUrbanRetirementDenialFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildGrantDataBuffer(generalUrbanRetirementDenial),
          ...documentBuffers,
        ],
        true,
      );

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysisRaw ?? '',
    );

    const resultEntity = new GeneralUrbanRetirementDenialResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
    });

    const resultTransaction =
      existingResult !== null
        ? this.generalUrbanRetirementDenialResultCommandRepositoryGateway.updateGeneralUrbanRetirementDenialResult(
            existingResult.id,
            resultEntity,
          )
        : this.generalUrbanRetirementDenialResultCommandRepositoryGateway.createGeneralUrbanRetirementDenialResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.generalUrbanRetirementDenialCommandRepositoryGateway.updateGeneralUrbanRetirementDenialResultId(
          generalUrbanRetirementDenialId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto.build({
      generalUrbanRetirementDenialFirstAnalysis: parsedFirstAnalysis.model,
    });
  }

  private parseFirstAnalysisOrThrow(rawJson: string): {
    cleanedJson: string;
    model: GeneralUrbanRetirementDenialFirstAnalysisModel;
  } {
    try {
      let cleanedJson = rawJson;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as GeneralUrbanRetirementDenialFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      const model = GeneralUrbanRetirementDenialFirstAnalysisModel.build({
        clientData:
          GeneralUrbanRetirementDenialFirstAnalysisClientDataModel.build({
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
          }),
        timeSummary:
          GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel.build({
            contributionTime:
              GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel.build(
                {
                  withoutResolvingPendencies:
                    raw.timeSummary.contributionTime.withoutResolvingPendencies,
                  resolvingPendencies:
                    raw.timeSummary.contributionTime.resolvingPendencies,
                  withTimeAccelerators:
                    raw.timeSummary.contributionTime.withTimeAccelerators,
                },
              ),
            gracePeriod:
              GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel.build(
                {
                  withoutResolvingPendencies:
                    raw.timeSummary.gracePeriod.withoutResolvingPendencies,
                  resolvingPendencies:
                    raw.timeSummary.gracePeriod.resolvingPendencies,
                  withTimeAccelerators:
                    raw.timeSummary.gracePeriod.withTimeAccelerators,
                },
              ),
          }),
        periods: (this.hasValue(raw.periods) ? raw.periods : []).map((period) =>
          GeneralUrbanRetirementDenialFirstAnalysisPeriodModel.build({
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
              wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
            }),
            status: period.status,
            earningsHistory: (this.hasValue(period.earningsHistory)
              ? period.earningsHistory
              : []
            ).map((item) =>
              GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.build(
                {
                  ...(this.hasValue(item.competence) && {
                    competence: item.competence,
                  }),
                  ...(this.hasValue(item.value) && { value: item.value }),
                  ...(this.hasValue(item.pendencyType) && {
                    pendencyType: item.pendencyType,
                  }),
                  ...(this.hasValue(item.collectedAt) && {
                    collectedAt: item.collectedAt,
                  }),
                },
              ),
            ),
          }),
        ),
      });

      return { cleanedJson, model };
    } catch (err) {
      console.error(
        '[CreateGeneralUrbanRetirementDenialFirstAnalysis] parseFirstAnalysisOrThrow failed:',
        err,
      );
      const maxLogLength = 2000;
      console.error(
        '[CreateGeneralUrbanRetirementDenialFirstAnalysis] rawJson (first 2000 chars):',
        rawJson.slice(0, maxLogLength),
      );
      throw new InvalidGeneralUrbanRetirementDenialFirstAnalysisJsonError();
    }
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private buildGrantDataBuffer(
    generalUrbanRetirementDenial: Awaited<
      ReturnType<
        typeof this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: generalUrbanRetirementDenial.analysisName,
      requestEntryDate: generalUrbanRetirementDenial.requestEntryDate,
      denialDate: generalUrbanRetirementDenial.denialDate,
      documents: (
        generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      periods: (
        generalUrbanRetirementDenial.generalUrbanRetirementDenialPeriod ?? []
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
        status: period.status,
      })),
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async buildAllDocumentBuffers(
    generalUrbanRetirementDenial: Awaited<
      ReturnType<
        typeof this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? [])
        .filter((doc) => doc.document !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    const periodDocumentBuffers = await Promise.all(
      (
        generalUrbanRetirementDenial.generalUrbanRetirementDenialPeriodDocument ??
        []
      ).map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    return [cnisBuffer, ...otherDocumentBuffers, ...periodDocumentBuffers];
  }

  private findAnalysisToolClientOrFail(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const recordPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByGeneralUrbanRetirementDenialIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementDenialId,
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
