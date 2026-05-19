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
import { DeathBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/command/death-benefit-rejection.command.repository.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-result/command/death-benefit-rejection-result.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import { DeathBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-document-type.enum';
import { CreateDeathBenefitRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-first-analysis.response.dto';
import { DeathBenefitRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-cnis-document-not-found.error';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { InvalidDeathBenefitRejectionFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/invalid-death-benefit-rejection-first-analysis-json.error';
import {
  DeathBenefitRejectionFirstAnalysisAnalysisSectionModel,
  DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemModel,
  DeathBenefitRejectionFirstAnalysisDependentQualityItemModel,
  DeathBenefitRejectionFirstAnalysisModel,
  DeathBenefitRejectionFirstAnalysisPeriodModel,
  DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemModel,
} from '@module/customer/analysis-tool/module/death-benefit-rejection/model/generic/death-benefit-rejection-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { DeathBenefitRejectionFirstAnalysisSourcePeriodInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/model/interface/death-benefit-rejection-first-analysis-source-period.interface';
import type { DeathBenefitRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/model/interface/death-benefit-rejection-first-analysis.interface';
import type { ParsedDeathBenefitRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/model/interface/parsed-death-benefit-rejection-first-analysis.interface';

@Injectable()
export class CreateDeathBenefitRejectionFirstAnalysisUseCase {
  protected readonly _type =
    CreateDeathBenefitRejectionFirstAnalysisUseCase.name;

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
    @Inject(DeathBenefitRejectionCommandRepositoryGateway)
    private readonly deathBenefitRejectionCommandRepositoryGateway: DeathBenefitRejectionCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionResultCommandRepositoryGateway)
    private readonly deathBenefitRejectionResultCommandRepositoryGateway: DeathBenefitRejectionResultCommandRepositoryGateway,
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
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<CreateDeathBenefitRejectionFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const deathBenefitRejection =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const cnisDocument = (
      deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
        ?.deathBenefitRejectionDocument ?? []
    ).find(
      (document) =>
        document.type === DeathBenefitRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new DeathBenefitRejectionCnisDocumentNotFoundError();
    }

    const deathBenefitRejectionResult =
      deathBenefitRejection.deathBenefitRejectionResult;

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
        deathBenefitRejectionId,
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
      deathBenefitRejection,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysis =
      await this.analysisProcessorGateway.getDeathBenefitRejectionFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildFirstAnalysisGrantDataBuffer(deathBenefitRejection),
          ...grantDocumentBuffers,
        ],
        true,
      );

    if (firstAnalysis === null) {
      throw new DeathBenefitRejectionNotFoundError();
    }

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysis,
      deathBenefitRejection.deathBenefitRejectionPeriod ?? [],
    );

    const resultEntity = new DeathBenefitRejectionResultEntity({
      ...(deathBenefitRejectionResult !== null && {
        id: deathBenefitRejectionResult.id,
      }),
      deathBenefitRejectionFirstAnalysis: parsedFirstAnalysis.cleanedJson,
      deathBenefitRejectionCompleteAnalysis:
        deathBenefitRejectionResult?.deathBenefitRejectionCompleteAnalysis ??
        null,
      deathBenefitRejectionSimplifiedAnalysis:
        deathBenefitRejectionResult?.deathBenefitRejectionSimplifiedAnalysis ??
        null,
      deathBenefitRejectionCompleteAnalysisDownload:
        deathBenefitRejectionResult?.deathBenefitRejectionCompleteAnalysisDownload ??
        null,
    });

    const resultTransaction =
      deathBenefitRejectionResult !== null
        ? this.deathBenefitRejectionResultCommandRepositoryGateway.updateDeathBenefitRejectionResult(
            deathBenefitRejectionResult.id,
            resultEntity,
          )
        : this.deathBenefitRejectionResultCommandRepositoryGateway.createDeathBenefitRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (deathBenefitRejectionResult === null) {
      transactionOperations.push(
        this.deathBenefitRejectionCommandRepositoryGateway.updateDeathBenefitRejectionResultId(
          deathBenefitRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateDeathBenefitRejectionFirstAnalysisResponseDto.build({
      deathBenefitRejectionFirstAnalysis: parsedFirstAnalysis.model,
    });
  }

  private parseFirstAnalysisOrThrow(
    firstAnalysis: string,
    sourcePeriods: DeathBenefitRejectionFirstAnalysisSourcePeriodInterface[],
  ): ParsedDeathBenefitRejectionFirstAnalysisInterface {
    try {
      let cleanedJson = firstAnalysis;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as DeathBenefitRejectionFirstAnalysisInterface;

      const normalizedRaw: DeathBenefitRejectionFirstAnalysisInterface = {
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
        model: DeathBenefitRejectionFirstAnalysisModel.build({
          insuredQualityAnalysis:
            DeathBenefitRejectionFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.insuredQualityAnalysis,
            ),
          scheduledRetirementRightAnalysis:
            DeathBenefitRejectionFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.scheduledRetirementRightAnalysis,
            ),
          disabilityRetirementRightAnalysis:
            DeathBenefitRejectionFirstAnalysisAnalysisSectionModel.build(
              normalizedRaw.disabilityRetirementRightAnalysis,
            ),
          dependentQualityAnalysis: normalizedRaw.dependentQualityAnalysis.map(
            (item) =>
              DeathBenefitRejectionFirstAnalysisDependentQualityItemModel.build(
                {
                  dependentName: item.dependentName,
                  dependencyDegree: item.dependencyDegree,
                  isQualityConfirmed: item.isQualityConfirmed,
                  pensionStartDate: new Date(item.pensionStartDate),
                  estimatedPensionDuration: item.estimatedPensionDuration,
                },
              ),
          ),
          retirementRuleSummaries: normalizedRaw.retirementRuleSummaries.map(
            (item) =>
              DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemModel.build(
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
            DeathBenefitRejectionFirstAnalysisPeriodModel.build({
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
                  DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemModel.build(
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
      throw new InvalidDeathBenefitRejectionFirstAnalysisJsonError();
    }
  }

  private findContributionAverageByPeriod(
    period: DeathBenefitRejectionFirstAnalysisInterface['periods'][number],
    sourcePeriods: DeathBenefitRejectionFirstAnalysisSourcePeriodInterface[],
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
    period: DeathBenefitRejectionFirstAnalysisInterface['periods'][number],
    sourcePeriods: DeathBenefitRejectionFirstAnalysisSourcePeriodInterface[],
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
    deathBenefitRejection: Awaited<
      ReturnType<
        typeof this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: deathBenefitRejection.analysisName,
      institutor: deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
        ? {
            name: deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
              .name,
            cpf:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor.cpf?.toString() ??
              null,
            birthDate:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .birthDate,
            gender:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .gender,
            deathDate:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .deathDate,
            wasRetired:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .wasRetired,
            retirementBenefitNumber:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .retirementBenefitNumber,
            wasRuralInsured:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .wasRuralInsured,
            ruralPeriodStartDate:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .ruralPeriodStartDate,
            ruralPeriodEndDate:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .ruralPeriodEndDate,
            wasUnemployedAtDeath:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .wasUnemployedAtDeath,
            wantsToProveDisabilityBeforeDeath:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .wantsToProveDisabilityBeforeDeath,
            wantsToProveWorkPeriodNotInCnis:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .wantsToProveWorkPeriodNotInCnis,
          }
        : null,
      dependents: (
        deathBenefitRejection.deathBenefitRejectionDependent ?? []
      ).map((dependent) => ({
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
      })),
      documents: (
        deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
          ?.deathBenefitRejectionDocument ?? []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      inssBenefits: (
        deathBenefitRejection.deathBenefitRejectionInssBenefit ?? []
      ).map((item) => item.inssBenefit),
      legalProceedings: (
        deathBenefitRejection.deathBenefitRejectionLegalProceeding ?? []
      ).map((item) => item.legalProceedingNumber),
      legalRepresentative:
        deathBenefitRejection.deathBenefitRejectionLegalRepresentative
          ? {
              name: deathBenefitRejection
                .deathBenefitRejectionLegalRepresentative.name,
              cpf:
                deathBenefitRejection.deathBenefitRejectionLegalRepresentative.cpf?.toString() ??
                null,
              birthDate:
                deathBenefitRejection.deathBenefitRejectionLegalRepresentative
                  .birthDate,
              isMinorUnderGuardianship:
                deathBenefitRejection.deathBenefitRejectionLegalRepresentative
                  .isMinorUnderGuardianship,
              legalRepresentativeRelationship:
                deathBenefitRejection.deathBenefitRejectionLegalRepresentative
                  .legalRepresentativeRelationship,
            }
          : null,
      periods: (deathBenefitRejection.deathBenefitRejectionPeriod ?? []).map(
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
      //   deathBenefitRejection.deathBenefitRejectionTimeAccelerator ?? []
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
    deathBenefitRejection: Awaited<
      ReturnType<
        typeof this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations
      >
    >,
    currentDocumentPath: string,
    currentDocumentBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (
        deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
          ?.deathBenefitRejectionDocument ?? []
      )
        .filter((document) => document.document !== currentDocumentPath)
        .map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
    );

    const periodDocumentBuffers = await Promise.all(
      (deathBenefitRejection.deathBenefitRejectionPeriodDocument ?? []).map(
        (document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const dependentDocumentBuffers = await Promise.all(
      (deathBenefitRejection.deathBenefitRejectionDependentDocument ?? []).map(
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
    deathBenefitRejectionId: DeathBenefitRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByDeathBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDeathBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        deathBenefitRejectionId,
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
