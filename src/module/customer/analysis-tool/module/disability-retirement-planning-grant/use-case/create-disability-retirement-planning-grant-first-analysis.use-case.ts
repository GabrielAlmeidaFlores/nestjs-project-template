import { Inject, Injectable, Logger } from '@nestjs/common';

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
import { DisabilityRetirementPlanningGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/command/disability-retirement-planning-grant.command.repository.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-result/command/disability-retirement-planning-grant-result.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import { CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant-first-analysis.response.dto';
import { DisabilityRetirementPlanningGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-cnis-document-not-found.error';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import { InvalidDisabilityRetirementPlanningGrantFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/invalid-disability-retirement-planning-grant-first-analysis-json.error';
import {
  DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel,
  DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel,
  DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel,
  DisabilityRetirementPlanningGrantFirstAnalysisModel,
  DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel,
  DisabilityRetirementPlanningGrantFirstAnalysisSummaryTableModel,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/generic/disability-retirement-planning-grant-first-analysis.model';
import { DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-first-analysis-source-period.interface';
import { DisabilityRetirementPlanningGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-first-analysis.interface';
import { ParsedDisabilityRetirementPlanningGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/parsed-disability-retirement-planning-grant-first-analysis.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityRetirementPlanningGrantFirstAnalysisUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningGrantFirstAnalysisUseCase.name;
  private readonly logger = new Logger(CreateDisabilityRetirementPlanningGrantFirstAnalysisUseCase.name);

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
    @Inject(DisabilityRetirementPlanningGrantCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantCommandRepositoryGateway: DisabilityRetirementPlanningGrantCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantResultCommandRepositoryGateway: DisabilityRetirementPlanningGrantResultCommandRepositoryGateway,
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
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): Promise<CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const disabilityRetirementPlanningGrant =
      await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
        disabilityRetirementPlanningGrantId,
        DisabilityRetirementPlanningGrantNotFoundError,
      );

    const disabilityRetirementPlanningGrantDocument =
      disabilityRetirementPlanningGrant
        .disabilityRetirementPlanningGrantDocument?.[0];

    if (!disabilityRetirementPlanningGrantDocument) {
      throw new DisabilityRetirementPlanningGrantCnisDocumentNotFoundError();
    }

    const disabilityRetirementPlanningGrantResult =
      disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      disabilityRetirementPlanningGrantDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        disabilityRetirementPlanningGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const grantDocumentBuffers = await this.getGrantDocumentBuffers(
      disabilityRetirementPlanningGrant,
      disabilityRetirementPlanningGrantDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysis =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningGrantFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildFirstAnalysisGrantDataBuffer(
            disabilityRetirementPlanningGrant,
          ),
          ...grantDocumentBuffers,
        ],
        true,
      );

    if (firstAnalysis === null) {
      throw new DisabilityRetirementPlanningGrantNotFoundError();
    }

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysis,
      disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantPeriod ??
        [],
    );

    const resultEntity = new DisabilityRetirementPlanningGrantResultEntity({
      ...(disabilityRetirementPlanningGrantResult !== null && {
        id: disabilityRetirementPlanningGrantResult.id,
      }),
      disabilityRetirementPlanningGrantFirstAnalysis:
        parsedFirstAnalysis.cleanedJson,
      disabilityRetirementPlanningGrantCompleteAnalysis:
        disabilityRetirementPlanningGrantResult?.disabilityRetirementPlanningGrantCompleteAnalysis ??
        null,
      disabilityRetirementPlanningGrantSimplifiedAnalysis:
        disabilityRetirementPlanningGrantResult?.disabilityRetirementPlanningGrantSimplifiedAnalysis ??
        null,
      disabilityRetirementPlanningGrantCompleteAnalysisDownload:
        disabilityRetirementPlanningGrantResult?.disabilityRetirementPlanningGrantCompleteAnalysisDownload ??
        null,
    });

    const resultTransaction =
      disabilityRetirementPlanningGrantResult !== null
        ? this.disabilityRetirementPlanningGrantResultCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantResult(
            disabilityRetirementPlanningGrantResult.id,
            resultEntity,
          )
        : this.disabilityRetirementPlanningGrantResultCommandRepositoryGateway.createDisabilityRetirementPlanningGrantResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (disabilityRetirementPlanningGrantResult === null) {
      transactionOperations.push(
        this.disabilityRetirementPlanningGrantCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantResultId(
          disabilityRetirementPlanningGrantId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto.build(
      {
        disabilityRetirementPlanningGrantFirstAnalysis:
          parsedFirstAnalysis.model,
      },
    );
  }

  private parseFirstAnalysisOrThrow(
    firstAnalysis: string,
    sourcePeriods: DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface[],
  ): ParsedDisabilityRetirementPlanningGrantFirstAnalysisInterface {
    try {
      let cleanedJson = firstAnalysis;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as DisabilityRetirementPlanningGrantFirstAnalysisInterface;

      const normalizedRaw: DisabilityRetirementPlanningGrantFirstAnalysisInterface =
        {
          ...raw,
          periods: raw.periods.map((period) => {
            const contributionAverage =
              period.contributionAverage ??
              this.findContributionAverageByPeriod(period, sourcePeriods);

            const bondOrigin =
              period.bondOrigin ??
              this.findBondOriginByPeriod(period, sourcePeriods);

            return {
              ...period,
              ...(contributionAverage !== undefined && { contributionAverage }),
              ...(bondOrigin !== undefined && { bondOrigin }),
            };
          }),
        };

      cleanedJson = JSON.stringify(normalizedRaw);

      return {
        cleanedJson,
        model: DisabilityRetirementPlanningGrantFirstAnalysisModel.build({
          periods: normalizedRaw.periods.map((period) =>
            DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel.build({
              name: period.name,
              startDate: new Date(period.startDate),
              endDate: new Date(period.endDate),
              category: period.category,
              gracePeriod: period.gracePeriod,
              ...(period.statusPCD !== undefined && {
                statusPCD: period.statusPCD,
              }),
              status: period.status,
              isPendency: period.isPendency,
              competenceBelowTheMinimum: period.competenceBelowTheMinimum,
              ...(period.contributionAverage !== undefined &&
                period.contributionAverage !== null && {
                  contributionAverage: new DecimalValue(
                    period.contributionAverage.toString(),
                  ),
                }),
              belowMinimumContributions: (
                period.belowMinimumContributions ?? []
              ).map((item) =>
                DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel.build(
                  {
                    contributionDate: new Date(item.contributionDate),
                    contributionValue: item.contributionValue,
                  },
                ),
              ),
              ...(period.reasonPendency !== undefined && {
                reasonPendency: period.reasonPendency,
              }),
              ...(period.bondOrigin !== undefined &&
                period.bondOrigin !== null && {
                  bondOrigin: period.bondOrigin,
                }),
            }),
          ),
          disabilityAnalysis:
            DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel.build(
              {
                predominantDisabilityDegree:
                  normalizedRaw.disabilityAnalysis.predominantDisabilityDegree,
                lightDisabilityPercentage:
                  normalizedRaw.disabilityAnalysis.lightDisabilityPercentage,
                moderateDisabilityPercentage:
                  normalizedRaw.disabilityAnalysis.moderateDisabilityPercentage,
                severeDisabilityPercentage:
                  normalizedRaw.disabilityAnalysis.severeDisabilityPercentage,
                summaryTable:
                  DisabilityRetirementPlanningGrantFirstAnalysisSummaryTableModel.build(
                    normalizedRaw.disabilityAnalysis.summaryTable ?? {
                      timeAsDisabledWithoutResolvingPendencies: '',
                      timeAsDisabledResolvingPendencies: '',
                      timeAsDisabledWithAccelerators: '',
                      commonTimeWithoutResolvingPendencies: '',
                      commonTimeResolvingPendencies: '',
                      commonTimeWithAccelerators: '',
                      totalTimeWithoutResolvingPendencies: '',
                      totalTimeResolvingPendencies: '',
                      totalTimeWithAccelerators: '',
                      gracePeriodAsDisabledWithoutResolvingPendencies: '',
                      gracePeriodAsDisabledResolvingPendencies: '',
                      gracePeriodAsDisabledWithAccelerators: '',
                      commonGracePeriodWithoutResolvingPendencies: '',
                      commonGracePeriodResolvingPendencies: '',
                      commonGracePeriodWithAccelerators: '',
                      totalGracePeriodWithoutResolvingPendencies: '',
                      totalGracePeriodResolvingPendencies: '',
                      totalGracePeriodWithAccelerators: '',
                    },
                  ),
                documents: (
                  normalizedRaw.disabilityAnalysis.documents ?? []
                ).map((document) =>
                  DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel.build(
                    document,
                  ),
                ),
              },
            ),
        }),
      };
    } catch (err) {
      this.logger.error('parseFirstAnalysisOrThrow failed', err instanceof Error ? err.stack : String(err));
      throw new InvalidDisabilityRetirementPlanningGrantFirstAnalysisJsonError();
    }
  }

  private findContributionAverageByPeriod(
    period: DisabilityRetirementPlanningGrantFirstAnalysisInterface['periods'][number],
    sourcePeriods: DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface[],
  ): string | undefined {
    const exactMatch = sourcePeriods.find(
      (sourcePeriod) =>
        this.normalizeDate(sourcePeriod.startDate) ===
          this.normalizeDate(period.startDate) &&
        this.normalizeDate(sourcePeriod.endDate) ===
          this.normalizeDate(period.endDate) &&
        sourcePeriod.category === period.category,
    );

    const sourcePeriod =
      exactMatch ??
      sourcePeriods.find(
        (currentSourcePeriod) =>
          this.normalizeDate(currentSourcePeriod.startDate) ===
            this.normalizeDate(period.startDate) &&
          currentSourcePeriod.category === period.category,
      );

    return sourcePeriod?.contributionAverage?.toString();
  }

  private findBondOriginByPeriod(
    period: DisabilityRetirementPlanningGrantFirstAnalysisInterface['periods'][number],
    sourcePeriods: DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface[],
  ): string | undefined {
    const exactMatch = sourcePeriods.find(
      (sourcePeriod) =>
        this.normalizeDate(sourcePeriod.startDate) ===
          this.normalizeDate(period.startDate) &&
        this.normalizeDate(sourcePeriod.endDate) ===
          this.normalizeDate(period.endDate) &&
        sourcePeriod.category === period.category,
    );

    const sourcePeriod =
      exactMatch ??
      sourcePeriods.find(
        (currentSourcePeriod) =>
          this.normalizeDate(currentSourcePeriod.startDate) ===
            this.normalizeDate(period.startDate) &&
          currentSourcePeriod.category === period.category,
      );

    return sourcePeriod?.bondOrigin ?? undefined;
  }

  private normalizeDate(date: Date | string | null): string | null {
    if (date === null) {
      return null;
    }

    if (date instanceof Date) {
      return date.toISOString().split('T')[0] ?? null;
    }

    return date.split('T')[0] ?? null;
  }

  private buildFirstAnalysisGrantDataBuffer(
    disabilityRetirementPlanningGrant: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      category: disabilityRetirementPlanningGrant.category,
      analysisName: disabilityRetirementPlanningGrant.analysisName,
      longPrizeDisability:
        disabilityRetirementPlanningGrant.longPrizeDisability,
      documents: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantDocument ??
        []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      inssBenefits: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantInssBenefit ??
        []
      ).map((item) => item.inssBenefit),
      legalProceedings: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantLegalProceeding ??
        []
      ).map((item) => item.legalProceedingNumber),
      timeAccelerators: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantTimeAccelerator ??
        []
      ).map((item) => ({
        id: item.id.toString(),
        type: item.type,
        recognitionInss: item.recognitionInss,
        recognitionJudicial: item.recognitionJudicial,
        viability: item.viability,
        technicalNote: item.technicalNote,
        startDate: item.startDate,
        endDate: item.endDate,
        institution: item.institution,
        affectsQualifyingPeriod: item.affectsQualifyingPeriod,
      })),
      periods: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantPeriod ??
        []
      ).map((period) => ({
        id: period.id.toString(),
        startDate: period.startDate,
        endDate: period.endDate,
        category: period.category,
        isPendency: period.isPendency,
        competenceBelowTheMinimum: period.competenceBelowTheMinimum,
        pendencyReason: period.pendencyReason,
        typeOfContribution: period.typeOfContribution,
        status: period.status,
        disabilityStatus: period.disabilityStatus,
        periodConsideration: period.periodConsideration,
        ...(period.contributionAverage !== null && {
          contributionAverage: period.contributionAverage.toString(),
        }),
        ...(period.bondOrigin !== null && { bondOrigin: period.bondOrigin }),
      })),
      disabilityPeriods: (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantDisabilityPeriod ??
        []
      ).map((disabilityPeriod) => ({
        id: disabilityPeriod.id.toString(),
        disabilityDegree: disabilityPeriod.disabilityDegree,
        disabilityCategory: disabilityPeriod.disabilityCategory,
        disabilityDescription: disabilityPeriod.disabilityDescription,
        dailyImpact: disabilityPeriod.dailyImpact,
        startDate: disabilityPeriod.startDate,
        endDate: disabilityPeriod.endDate,
        cidTenId: disabilityPeriod.cidTenId,
      })),
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async getGrantDocumentBuffers(
    disabilityRetirementPlanningGrant: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations
      >
    >,
    currentDocumentPath: string,
    currentDocumentBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantDocument ??
        []
      )
        .filter((document) => document.document !== currentDocumentPath)
        .map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
    );

    const periodDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantPeriodDocument ??
        []
      ).map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const disabilityPeriodDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningGrant.disabilityRetirementPlanningGrantDisabilityPeriodDocument ??
        []
      ).map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    return [
      currentDocumentBuffer,
      ...otherDocumentBuffers,
      ...periodDocumentBuffers,
      ...disabilityPeriodDocumentBuffers,
    ];
  }

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByDisabilityRetirementPlanningGrantIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityRetirementPlanningGrantId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    return analysisToolRecordQueryResultPromise.then(
      (analysisToolRecordQueryResult) => {
        const analysisToolClient =
          analysisToolRecordQueryResult.analysisToolClient;

        return new AnalysisToolClientEntity({
          ...analysisToolClient,
          createdBy: analysisToolClient.createdBy.id,
          updatedBy: analysisToolClient.updatedBy.id,
        });
      },
    );
  }
}
