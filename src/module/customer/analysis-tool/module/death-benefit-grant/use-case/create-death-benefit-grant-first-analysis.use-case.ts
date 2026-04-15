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
import { DeathBenefitGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/command/death-benefit-grant.command.repository.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-result/command/death-benefit-grant-result.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';
import { DeathBenefitGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-document-type.enum';
import { CreateDeathBenefitGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant-first-analysis.response.dto';
import { DeathBenefitGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-cnis-document-not-found.error';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { InvalidDeathBenefitGrantFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/invalid-death-benefit-grant-first-analysis-json.error';
import {
  DeathBenefitGrantFirstAnalysisAnalysisSectionModel,
  DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemModel,
  DeathBenefitGrantFirstAnalysisDependentQualityItemModel,
  DeathBenefitGrantFirstAnalysisModel,
  DeathBenefitGrantFirstAnalysisPeriodModel,
  DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemModel,
} from '@module/customer/analysis-tool/module/death-benefit-grant/model/generic/death-benefit-grant-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { DeathBenefitGrantFirstAnalysisSourcePeriodInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/model/interface/death-benefit-grant-first-analysis-source-period.interface';
import type { DeathBenefitGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/model/interface/death-benefit-grant-first-analysis.interface';
import type { ParsedDeathBenefitGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/model/interface/parsed-death-benefit-grant-first-analysis.interface';

@Injectable()
export class CreateDeathBenefitGrantFirstAnalysisUseCase {
  protected readonly _type = CreateDeathBenefitGrantFirstAnalysisUseCase.name;

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
    @Inject(DeathBenefitGrantCommandRepositoryGateway)
    private readonly deathBenefitGrantCommandRepositoryGateway: DeathBenefitGrantCommandRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantResultCommandRepositoryGateway)
    private readonly deathBenefitGrantResultCommandRepositoryGateway: DeathBenefitGrantResultCommandRepositoryGateway,
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
    deathBenefitGrantId: DeathBenefitGrantId,
  ): Promise<CreateDeathBenefitGrantFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const deathBenefitGrant =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const cnisDocument = (
      deathBenefitGrant.deathBenefitGrantBenefitInstitutor
        ?.deathBenefitGrantDocument ?? []
    ).find(
      (document) => document.type === DeathBenefitGrantDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new DeathBenefitGrantCnisDocumentNotFoundError();
    }

    const deathBenefitGrantResult = deathBenefitGrant.deathBenefitGrantResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        deathBenefitGrantId,
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
      deathBenefitGrant,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysis =
      await this.analysisProcessorGateway.getDeathBenefitGrantFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildFirstAnalysisGrantDataBuffer(deathBenefitGrant),
          ...grantDocumentBuffers,
        ],
        true,
      );

    if (firstAnalysis === null) {
      throw new DeathBenefitGrantNotFoundError();
    }

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysis,
      deathBenefitGrant.deathBenefitGrantPeriod ?? [],
    );

    const resultEntity = new DeathBenefitGrantResultEntity({
      ...(deathBenefitGrantResult !== null && {
        id: deathBenefitGrantResult.id,
      }),
      deathBenefitGrantFirstAnalysis: parsedFirstAnalysis.cleanedJson,
      deathBenefitGrantCompleteAnalysis:
        deathBenefitGrantResult?.deathBenefitGrantCompleteAnalysis ?? null,
      deathBenefitGrantSimplifiedAnalysis:
        deathBenefitGrantResult?.deathBenefitGrantSimplifiedAnalysis ?? null,
      deathBenefitGrantCompleteAnalysisDownload:
        deathBenefitGrantResult?.deathBenefitGrantCompleteAnalysisDownload ??
        null,
    });

    const resultTransaction =
      deathBenefitGrantResult !== null
        ? this.deathBenefitGrantResultCommandRepositoryGateway.updateDeathBenefitGrantResult(
            deathBenefitGrantResult.id,
            resultEntity,
          )
        : this.deathBenefitGrantResultCommandRepositoryGateway.createDeathBenefitGrantResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (deathBenefitGrantResult === null) {
      transactionOperations.push(
        this.deathBenefitGrantCommandRepositoryGateway.updateDeathBenefitGrantResultId(
          deathBenefitGrantId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateDeathBenefitGrantFirstAnalysisResponseDto.build({
      deathBenefitGrantFirstAnalysis: parsedFirstAnalysis.model,
    });
  }

  private parseFirstAnalysisOrThrow(
    firstAnalysis: string,
    sourcePeriods: DeathBenefitGrantFirstAnalysisSourcePeriodInterface[],
  ): ParsedDeathBenefitGrantFirstAnalysisInterface {
    try {
      let cleanedJson = firstAnalysis;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as DeathBenefitGrantFirstAnalysisInterface;

      const normalizedRaw: DeathBenefitGrantFirstAnalysisInterface = {
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
        model: DeathBenefitGrantFirstAnalysisModel.build({
          insuredQualityAnalysis:
            DeathBenefitGrantFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.insuredQualityAnalysis,
            ),
          scheduledRetirementRightAnalysis:
            DeathBenefitGrantFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.scheduledRetirementRightAnalysis,
            ),
          disabilityRetirementRightAnalysis:
            DeathBenefitGrantFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.disabilityRetirementRightAnalysis,
            ),
          dependentQualityAnalysis: normalizedRaw.dependentQualityAnalysis.map(
            (item) =>
              DeathBenefitGrantFirstAnalysisDependentQualityItemModel.build({
                dependentName: item.dependentName,
                dependencyDegree: item.dependencyDegree,
                isQualityConfirmed: item.isQualityConfirmed,
                pensionStartDate: new Date(item.pensionStartDate),
                estimatedPensionDuration: item.estimatedPensionDuration,
              }),
          ),
          retirementRuleSummaries: normalizedRaw.retirementRuleSummaries.map(
            (item) =>
              DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemModel.build(
                {
                  retirementRule: item.retirementRule,
                  result: item.result,
                  ...(item.rightDate !== null && {
                    rightDate: item.rightDate,
                  }),
                  ...(item.estimatedRmi !== null && {
                    estimatedRmi: item.estimatedRmi,
                  }),
                  isBestRmi: item.isBestRmi,
                  isHighestCauseValue: item.isHighestCauseValue,
                  detailedAnalysisDescription: item.detailedAnalysisDescription,
                },
              ),
          ),
          periods: normalizedRaw.periods.map((period) =>
            DeathBenefitGrantFirstAnalysisPeriodModel.build({
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
                  DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemModel.build(
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
      throw new InvalidDeathBenefitGrantFirstAnalysisJsonError();
    }
  }

  private findContributionAverageByPeriod(
    period: DeathBenefitGrantFirstAnalysisInterface['periods'][number],
    sourcePeriods: DeathBenefitGrantFirstAnalysisSourcePeriodInterface[],
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
    period: DeathBenefitGrantFirstAnalysisInterface['periods'][number],
    sourcePeriods: DeathBenefitGrantFirstAnalysisSourcePeriodInterface[],
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
    deathBenefitGrant: Awaited<
      ReturnType<
        typeof this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: deathBenefitGrant.analysisName,
      institutor: deathBenefitGrant.deathBenefitGrantBenefitInstitutor
        ? {
            name: deathBenefitGrant.deathBenefitGrantBenefitInstitutor.name,
            cpf:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor.cpf?.toString() ??
              null,
            birthDate:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor.birthDate,
            gender: deathBenefitGrant.deathBenefitGrantBenefitInstitutor.gender,
            deathDate:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor.deathDate,
            wasRetired:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor.wasRetired,
            retirementBenefitNumber:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .retirementBenefitNumber,
            wasRuralInsured:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .wasRuralInsured,
            ruralPeriodStartDate:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .ruralPeriodStartDate,
            ruralPeriodEndDate:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .ruralPeriodEndDate,
            wasUnemployedAtDeath:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .wasUnemployedAtDeath,
            wantsToProveDisabilityBeforeDeath:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .wantsToProveDisabilityBeforeDeath,
            wantsToProveWorkPeriodNotInCnis:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .wantsToProveWorkPeriodNotInCnis,
          }
        : null,
      dependents: (deathBenefitGrant.deathBenefitGrantDependent ?? []).map(
        (dependent) => ({
          id: dependent.id.toString(),
          name: dependent.name,
          dependentClass: dependent.dependentClass,
          dependentType: dependent.dependentType,
          gender: dependent.gender,
          birthDate: dependent.birthDate,
          hasDisabilityOrInvalidism: dependent.hasDisabilityOrInvalidism,
          isMinorUnder16: dependent.isMinorUnder16,
          stableUnionOrMarriageStartDate:
            dependent.stableUnionOrMarriageStartDate,
        }),
      ),
      documents: (
        deathBenefitGrant.deathBenefitGrantBenefitInstitutor
          ?.deathBenefitGrantDocument ?? []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      inssBenefits: (deathBenefitGrant.deathBenefitGrantInssBenefit ?? []).map(
        (item) => item.inssBenefit,
      ),
      legalProceedings: (
        deathBenefitGrant.deathBenefitGrantLegalProceeding ?? []
      ).map((item) => item.legalProceedingNumber),
      legalRepresentative:
        deathBenefitGrant.deathBenefitGrantLegalRepresentative
          ? {
              name: deathBenefitGrant.deathBenefitGrantLegalRepresentative.name,
              cpf:
                deathBenefitGrant.deathBenefitGrantLegalRepresentative.cpf?.toString() ??
                null,
              birthDate:
                deathBenefitGrant.deathBenefitGrantLegalRepresentative
                  .birthDate,
              isMinorUnderGuardianship:
                deathBenefitGrant.deathBenefitGrantLegalRepresentative
                  .isMinorUnderGuardianship,
              legalRepresentativeRelationship:
                deathBenefitGrant.deathBenefitGrantLegalRepresentative
                  .legalRepresentativeRelationship,
            }
          : null,
      periods: (deathBenefitGrant.deathBenefitGrantPeriod ?? []).map(
        (period) => ({
          id: period.id.toString(),
          startDate: period.startDate,
          endDate: period.endDate,
          category: period.category,
          isPendency: period.isPendency,
          competenceBelowTheMinimum: period.competenceBelowTheMinimum,
          pendencyReason: period.pendencyReason,
          typeOfContribution: period.typeOfContribution,
          status: period.status,
          periodConsideration: period.periodConsideration,
          ...(period.contributionAverage !== null && {
            contributionAverage: period.contributionAverage.toString(),
          }),
          ...(period.bondOrigin !== null && { bondOrigin: period.bondOrigin }),
          ...(period.impact !== null && { impact: period.impact }),
          ...(period.gracePeriod !== null && {
            gracePeriod: period.gracePeriod,
          }),
          ...(period.complementViaMyInss !== null && {
            complementViaMyInss: period.complementViaMyInss,
          }),
        }),
      ),
      // timeAccelerators: (
      //   deathBenefitGrant.deathBenefitGrantTimeAccelerator ?? []
      // ).map((item) => ({
      //   id: item.id.toString(),
      //   type: item.type,
      //   recognitionInss: item.recognitionInss,
      //   recognitionJudicial: item.recognitionJudicial,
      //   viability: item.viability,
      //   technicalNote: item.technicalNote,
      //   startDate: item.startDate,
      //   endDate: item.endDate,
      //   institution: item.institution,
      //   affectsQualifyingPeriod: item.affectsQualifyingPeriod,
      // })),
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async getGrantDocumentBuffers(
    deathBenefitGrant: Awaited<
      ReturnType<
        typeof this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations
      >
    >,
    currentDocumentPath: string,
    currentDocumentBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (
        deathBenefitGrant.deathBenefitGrantBenefitInstitutor
          ?.deathBenefitGrantDocument ?? []
      )
        .filter((document) => document.document !== currentDocumentPath)
        .map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
    );

    const periodDocumentBuffers = await Promise.all(
      (deathBenefitGrant.deathBenefitGrantPeriodDocument ?? []).map(
        (document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const dependentDocumentBuffers = await Promise.all(
      (deathBenefitGrant.deathBenefitGrantDependentDocument ?? []).map(
        (document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    return [
      currentDocumentBuffer,
      ...otherDocumentBuffers,
      ...periodDocumentBuffers,
      ...dependentDocumentBuffers,
    ];
  }

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    deathBenefitGrantId: DeathBenefitGrantId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByDeathBenefitGrantIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDeathBenefitGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        deathBenefitGrantId,
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
