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
import { MaternityPayGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/command/maternity-pay-grant.command.repository.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-result/command/maternity-pay-grant-result.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';
import { CreateMaternityPayGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/create-maternity-pay-grant-first-analysis.response.dto';
import { InvalidMaternityPayGrantFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/invalid-maternity-pay-grant-first-analysis-json.error';
import { MaternityPayGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-cnis-document-not-found.error';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import {
  MaternityPayGrantFirstAnalysisAnalysisSectionModel,
  MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel,
  MaternityPayGrantFirstAnalysisModel,
  MaternityPayGrantFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/model/generic/maternity-pay-grant-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { MaternityPayGrantFirstAnalysisSourcePeriodInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/interface/maternity-pay-grant-first-analysis-source-period.interface';
import type { MaternityPayGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/interface/maternity-pay-grant-first-analysis.interface';
import type { ParsedMaternityPayGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/interface/parsed-maternity-pay-grant-first-analysis.interface';

@Injectable()
export class CreateMaternityPayGrantFirstAnalysisUseCase {
  protected readonly _type = CreateMaternityPayGrantFirstAnalysisUseCase.name;

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
    @Inject(MaternityPayGrantCommandRepositoryGateway)
    private readonly maternityPayGrantCommandRepositoryGateway: MaternityPayGrantCommandRepositoryGateway,
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(MaternityPayGrantResultCommandRepositoryGateway)
    private readonly maternityPayGrantResultCommandRepositoryGateway: MaternityPayGrantResultCommandRepositoryGateway,
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
    maternityPayGrantId: MaternityPayGrantId,
  ): Promise<CreateMaternityPayGrantFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const maternityPayGrant =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const cnisDocumentPath = maternityPayGrant.cnisDocument;

    if (cnisDocumentPath === null) {
      throw new MaternityPayGrantCnisDocumentNotFoundError();
    }

    const maternityPayGrantResult = maternityPayGrant.maternityPayGrantResult;

    const cnisBuffer =
      await this.fileProcessorGateway.getFileBuffer(cnisDocumentPath);

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        maternityPayGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysis =
      await this.analysisProcessorGateway.getMaternityPayGrantFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildGrantDataBuffer(maternityPayGrant), cnisBuffer],
        true,
      );

    if (firstAnalysis === null) {
      throw new MaternityPayGrantNotFoundError();
    }

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysis,
      maternityPayGrant.maternityPayGrantPeriod ?? [],
    );

    const resultEntity = new MaternityPayGrantResultEntity({
      ...(maternityPayGrantResult !== null && {
        id: maternityPayGrantResult.id,
      }),
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      completeAnalysis: maternityPayGrantResult?.completeAnalysis ?? null,
      simplifiedAnalysis: maternityPayGrantResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload:
        maternityPayGrantResult?.completeAnalysisDownload ?? null,
    });

    const resultTransaction =
      maternityPayGrantResult !== null
        ? this.maternityPayGrantResultCommandRepositoryGateway.updateMaternityPayGrantResult(
            resultEntity,
          )
        : this.maternityPayGrantResultCommandRepositoryGateway.createMaternityPayGrantResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (maternityPayGrantResult === null) {
      transactionOperations.push(
        this.maternityPayGrantCommandRepositoryGateway.updateMaternityPayGrantResultId(
          maternityPayGrantId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateMaternityPayGrantFirstAnalysisResponseDto.build({
      maternityPayGrantFirstAnalysis: parsedFirstAnalysis.model,
    });
  }

  private parseFirstAnalysisOrThrow(
    firstAnalysis: string,
    sourcePeriods: MaternityPayGrantFirstAnalysisSourcePeriodInterface[],
  ): ParsedMaternityPayGrantFirstAnalysisInterface {
    try {
      let cleanedJson = firstAnalysis;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as MaternityPayGrantFirstAnalysisInterface;

      const normalizedRaw: MaternityPayGrantFirstAnalysisInterface = {
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
        model: MaternityPayGrantFirstAnalysisModel.build({
          insuredQualityAnalysis:
            MaternityPayGrantFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.insuredQualityAnalysis,
            ),
          carenciaAnalysis:
            MaternityPayGrantFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.carenciaAnalysis,
            ),
          benefitEligibilityAnalysis:
            MaternityPayGrantFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.benefitEligibilityAnalysis,
            ),
          periods: normalizedRaw.periods.map((period) =>
            MaternityPayGrantFirstAnalysisPeriodModel.build({
              name: period.name,
              startDate: new Date(period.startDate),
              endDate: new Date(period.endDate),
              category: period.category,
              gracePeriod: period.gracePeriod,
              status: period.status,
              isPendency: period.isPendency,
              competenceBelowTheMinimum: period.competenceBelowTheMinimum,
              ...(period.contributionAverage !== undefined && {
                contributionAverage: new DecimalValue(
                  period.contributionAverage.toString(),
                ),
              }),
              belowMinimumContributions: period.belowMinimumContributions.map(
                (item) =>
                  MaternityPayGrantFirstAnalysisBelowMinimumContributionItemModel.build(
                    {
                      contributionDate: new Date(item.contributionDate),
                      contributionValue: new DecimalValue(
                        item.contributionValue.toString(),
                      ),
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
              ...(period.impact !== undefined &&
                period.impact !== null && {
                  impact: period.impact,
                }),
              ...(period.complementViaMyInss !== undefined &&
                period.complementViaMyInss !== null && {
                  complementViaMyInss: period.complementViaMyInss,
                }),
            }),
          ),
        }),
      };
    } catch {
      throw new InvalidMaternityPayGrantFirstAnalysisJsonError();
    }
  }

  private findContributionAverageByPeriod(
    period: MaternityPayGrantFirstAnalysisInterface['periods'][number],
    sourcePeriods: MaternityPayGrantFirstAnalysisSourcePeriodInterface[],
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
    period: MaternityPayGrantFirstAnalysisInterface['periods'][number],
    sourcePeriods: MaternityPayGrantFirstAnalysisSourcePeriodInterface[],
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

  private buildGrantDataBuffer(
    maternityPayGrant: Awaited<
      ReturnType<
        typeof this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: maternityPayGrant.analysisName,
      category: maternityPayGrant.category,
      triggeringEvent: maternityPayGrant.triggeringEvent,
      triggeringEventDate: maternityPayGrant.triggeringEventDate,
      isCurrentlyUnemployed: maternityPayGrant.isCurrentlyUnemployed,
      isUnemployedAtTriggeringEventDate:
        maternityPayGrant.isUnemployedAtTriggeringEventDate,
      isRuralInsured: maternityPayGrant.isRuralInsured,
      ruralPeriodStartDate: maternityPayGrant.ruralPeriodStartDate,
      ruralPeriodEndDate: maternityPayGrant.ruralPeriodEndDate,
      inssBenefits: (maternityPayGrant.maternityPayGrantInssBenefit ?? []).map(
        (item) => item.inssBenefitNumber,
      ),
      legalProceedings: (
        maternityPayGrant.maternityPayGrantLegalProceeding ?? []
      ).map((item) => item.legalProceedingNumber),
      periods: (maternityPayGrant.maternityPayGrantPeriod ?? []).map((p) => ({
        id: p.id.toString(),
        startDate: p.startDate,
        endDate: p.endDate,
        category: p.category,
        isPendency: p.isPendency,
        competenceBelowTheMinimum: p.competenceBelowTheMinimum,
      })),
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    maternityPayGrantId: MaternityPayGrantId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        maternityPayGrantId,
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
