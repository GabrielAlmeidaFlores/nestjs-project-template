import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetSurvivorPensionAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/result/get-survivor-pension-analysis-with-relations.query.result';
import { SurvivorPensionAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/survivor-pension-analysis.query.repository.gateway';
import { SurvivorPensionAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/command/survivor-pension-analysis-result.command.repository.gateway';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/command/survivor-pension-analysis-result-dependent-pension-analysis.command.repository.gateway';
import { SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/command/survivor-pension-analysis-result-retirement-rule.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.entity';
import { SurvivorPensionAnalysisResultRetirementRuleEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/survivor-pension-analysis-result-retirement-rule.entity';
import { CreateSurvivorPensionAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-result.response.dto';
import { InvalidSurvivorPensionAnalysisResultJsonError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/invalid-survivor-pension-analysis-result-json.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface SpaResultAiResponseInterface {
  isInsuredStatusConfirmed: boolean;
  insuredStatusSummary: string;
  isRetirementRightConfirmed: boolean;
  retirementRightSummary: string;
  completeAnalysis: string;
}

interface SpaRetirementRulesAiResponseInterface {
  retirementRules: Array<{
    ruleName: string;
    isRequirementMet: boolean;
    entitlementDate: string | null;
    estimatedRmi: number | null;
    isBestRmi: boolean;
    isHighestClaimValue: boolean;
    detailedAnalysis: string;
  }>;
}

interface SpaDependentPensionAnalysesAiResponseInterface {
  dependentPensionAnalyses: Array<{
    dependentName: string;
    dependencyDegree: string;
    isDependencyVerified: boolean;
    pensionStartDate: string | null;
    estimatedPensionDuration: string;
  }>;
}

@Injectable()
export class CreateSurvivorPensionAnalysisResultUseCase {
  protected readonly _type = CreateSurvivorPensionAnalysisResultUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisQueryRepositoryGateway)
    private readonly survivorPensionAnalysisQueryRepositoryGateway: SurvivorPensionAnalysisQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultCommandRepositoryGateway)
    private readonly survivorPensionAnalysisResultCommandRepositoryGateway: SurvivorPensionAnalysisResultCommandRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultQueryRepositoryGateway: SurvivorPensionAnalysisResultQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway)
    private readonly survivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway: SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway: SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCaseGateway: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCaseGateway: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<CreateSurvivorPensionAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const [spaData, prompts] = await Promise.all([
      this.survivorPensionAnalysisQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisId,
        SurvivorPensionAnalysisNotFoundError,
      ),
      Promise.all([
        this.getPaymentPlanPaidResourcePromptUseCaseGateway.execute(
          PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS,
        ),
        this.getPaymentPlanPaidResourcePromptUseCaseGateway.execute(
          PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_RETIREMENT_RULES,
        ),
        this.getPaymentPlanPaidResourcePromptUseCaseGateway.execute(
          PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_DEPENDENT_PENSION_ANALYSES,
        ),
      ]),
    ]);

    const [resultPrompt, retirementRulesPrompt, dependentAnalysesPrompt] =
      prompts;

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCaseGateway.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const dataBuffer = this.buildAnalysisDataBuffer(spaData);

    const allDocumentFileNames: string[] = [
      ...(spaData.customerProfileIdentification?.documents.map(
        (d) => d.documentName,
      ) ?? []),
      ...(spaData.benefitOriginatorIdentification?.documents.map(
        (d) => d.documentName,
      ) ?? []),
      ...(spaData.deceasedWorkHistory?.periods.flatMap((p) =>
        p.documents.map((d) => d.documentName),
      ) ?? []),
      ...spaData.deceasedBenefitDependents.flatMap((dbd) =>
        dbd.documents.map((d) => d.documentName),
      ),
    ];

    const documentBuffers = await Promise.all(
      allDocumentFileNames.map((fileName) =>
        this.fileProcessorGateway.getFileBuffer(fileName),
      ),
    );

    const sharedFiles = [dataBuffer, ...documentBuffers];

    const [rawResult, rawRetirementRules, rawDependentAnalyses] =
      await Promise.all([
        this.analysisProcessorGateway.getSurvivorPensionAnalysisResult(
          resultPrompt.prompt,
          sharedFiles,
        ),
        this.analysisProcessorGateway.getSurvivorPensionAnalysisRetirementRules(
          retirementRulesPrompt.prompt,
          sharedFiles,
        ),
        this.analysisProcessorGateway.getSurvivorPensionAnalysisDependentPensionAnalyses(
          dependentAnalysesPrompt.prompt,
          sharedFiles,
        ),
      ]);

    const parsedResult = this.parseResultResponse(rawResult);
    const parsedRetirementRules =
      this.parseRetirementRulesResponse(rawRetirementRules);
    const parsedDependentAnalyses =
      this.parseDependentPensionAnalysesResponse(rawDependentAnalyses);

    const existingResult =
      await this.survivorPensionAnalysisResultQueryRepositoryGateway.findOneBySurvivorPensionAnalysisId(
        survivorPensionAnalysisId,
      );

    const resultEntity =
      existingResult !== null
        ? new SurvivorPensionAnalysisResultEntity({
            id: existingResult.id,
            survivorPensionAnalysisId,
            isInsuredStatusConfirmed: parsedResult.isInsuredStatusConfirmed,
            insuredStatusSummary: parsedResult.insuredStatusSummary,
            isRetirementRightConfirmed: parsedResult.isRetirementRightConfirmed,
            retirementRightSummary: parsedResult.retirementRightSummary,
            completeAnalysis: parsedResult.completeAnalysis,
            simplifiedAnalysis: existingResult.simplifiedAnalysis,
          })
        : new SurvivorPensionAnalysisResultEntity({
            survivorPensionAnalysisId,
            isInsuredStatusConfirmed: parsedResult.isInsuredStatusConfirmed,
            insuredStatusSummary: parsedResult.insuredStatusSummary,
            isRetirementRightConfirmed: parsedResult.isRetirementRightConfirmed,
            retirementRightSummary: parsedResult.retirementRightSummary,
            completeAnalysis: parsedResult.completeAnalysis,
          });

    const rrEntities = parsedRetirementRules.retirementRules.map(
      (rr) =>
        new SurvivorPensionAnalysisResultRetirementRuleEntity({
          survivorPensionAnalysisResultId: resultEntity.id,
          ruleName: rr.ruleName,
          isRequirementMet: rr.isRequirementMet,
          entitlementDate:
            rr.entitlementDate !== null ? new Date(rr.entitlementDate) : null,
          estimatedRmi:
            rr.estimatedRmi !== null ? new DecimalValue(rr.estimatedRmi) : null,
          isBestRmi: rr.isBestRmi,
          isHighestClaimValue: rr.isHighestClaimValue,
          detailedAnalysis: rr.detailedAnalysis,
        }),
    );

    const dpaEntities = parsedDependentAnalyses.dependentPensionAnalyses.map(
      (dpa) =>
        new SurvivorPensionAnalysisResultDependentPensionAnalysisEntity({
          survivorPensionAnalysisResultId: resultEntity.id,
          dependentName: dpa.dependentName,
          dependencyDegree: dpa.dependencyDegree,
          isDependencyVerified: dpa.isDependencyVerified,
          pensionStartDate:
            dpa.pensionStartDate !== null
              ? new Date(dpa.pensionStartDate)
              : null,
          estimatedPensionDuration: dpa.estimatedPensionDuration,
        }),
    );

    const resultTransaction =
      existingResult !== null
        ? this.survivorPensionAnalysisResultCommandRepositoryGateway.updateSurvivorPensionAnalysisResult(
            existingResult.id,
            resultEntity,
          )
        : this.survivorPensionAnalysisResultCommandRepositoryGateway.createSurvivorPensionAnalysisResult(
            resultEntity,
          );

    const deleteOldTransactions =
      existingResult !== null
        ? [
            this.survivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway.deleteAllBySurvivorPensionAnalysisResultId(
              resultEntity.id,
            ),
            this.survivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway.deleteAllBySurvivorPensionAnalysisResultId(
              resultEntity.id,
            ),
          ]
        : [];

    const rrTransactions = rrEntities.map((rr) =>
      this.survivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway.createSurvivorPensionAnalysisResultRetirementRule(
        rr,
      ),
    );

    const dpaTransactions = dpaEntities.map((dpa) =>
      this.survivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway.createSurvivorPensionAnalysisResultDependentPensionAnalysis(
        dpa,
      ),
    );

    const txn = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      resultTransaction,
      ...deleteOldTransactions,
      ...rrTransactions,
      ...dpaTransactions,
    ]);

    await txn.commit();

    return CreateSurvivorPensionAnalysisResultResponseDto.build({
      survivorPensionAnalysisResultId: resultEntity.id,
    });
  }

  private buildAnalysisDataBuffer(
    spaData: GetSurvivorPensionAnalysisWithRelationsQueryResult,
  ): Buffer {
    return Buffer.from(
      JSON.stringify({
        customerProfileIdentification: spaData.customerProfileIdentification
          ? {
              analysisName: spaData.customerProfileIdentification.analysisName,
              analysisPurpose:
                spaData.customerProfileIdentification.analysisPurpose,
              clientJobTitle:
                spaData.customerProfileIdentification.clientJobTitle,
              legalProceedingNumber:
                spaData.customerProfileIdentification.legalProceedingNumber,
              inssBenefitNumber:
                spaData.customerProfileIdentification.inssBenefitNumber,
            }
          : null,
        benefitOriginatorIdentification: spaData.benefitOriginatorIdentification
          ? {
              clientName: spaData.benefitOriginatorIdentification.clientName,
              clientFederalDocument:
                spaData.benefitOriginatorIdentification.clientFederalDocument?.toString() ??
                null,
              clientBirthDate:
                spaData.benefitOriginatorIdentification.clientBirthDate,
              clientGender:
                spaData.benefitOriginatorIdentification.clientGender,
              deathDate: spaData.benefitOriginatorIdentification.deathDate,
              federativeEntity:
                spaData.benefitOriginatorIdentification.federativeEntity,
              stateCode: spaData.benefitOriginatorIdentification.stateCode,
              beneficiaryWasRetired:
                spaData.benefitOriginatorIdentification.beneficiaryWasRetired,
            }
          : null,
        deceasedWorkHistory: spaData.deceasedWorkHistory
          ? {
              startDate: spaData.deceasedWorkHistory.startDate,
              endDate: spaData.deceasedWorkHistory.endDate,
              periods: spaData.deceasedWorkHistory.periods.map((p) => ({
                startDate: p.startDate,
                endDate: p.endDate,
                specialPeriodStartDate: p.specialPeriodStartDate,
                specialPeriodEndDate: p.specialPeriodEndDate,
                specialTimeType: p.specialTimeType,
                jobTitle: p.jobTitle,
                careerName: p.careerName,
                serviceType: p.serviceType,
                department: p.department,
              })),
            }
          : null,
        deceasedBenefitDependents: spaData.deceasedBenefitDependents.map(
          (d) => ({
            dependentFullName: d.dependentFullName,
            dependencyClassificationLevel: d.dependencyClassificationLevel,
            type: d.type,
            gender: d.gender,
            dateOfBirth: d.dateOfBirth,
            hasDisabilityOrInvalidity: d.hasDisabilityOrInvalidity,
            unionCommencementDate: d.unionCommencementDate,
          }),
        ),
      }),
      'utf-8',
    );
  }

  private parseResultResponse(
    raw: string | null,
  ): SpaResultAiResponseInterface {
    return this.parseJson<SpaResultAiResponseInterface>(raw, (data) => {
      if (
        typeof data.isInsuredStatusConfirmed !== 'boolean' ||
        typeof data.insuredStatusSummary !== 'string' ||
        typeof data.isRetirementRightConfirmed !== 'boolean' ||
        typeof data.retirementRightSummary !== 'string' ||
        typeof data.completeAnalysis !== 'string'
      ) {
        throw new InvalidSurvivorPensionAnalysisResultJsonError();
      }
    });
  }
  private parseRetirementRulesResponse(
    raw: string | null,
  ): SpaRetirementRulesAiResponseInterface {
    return this.parseJson<SpaRetirementRulesAiResponseInterface>(
      raw,
      (data) => {
        if (!Array.isArray(data.retirementRules)) {
          throw new InvalidSurvivorPensionAnalysisResultJsonError();
        }
      },
    );
  }

  private parseDependentPensionAnalysesResponse(
    raw: string | null,
  ): SpaDependentPensionAnalysesAiResponseInterface {
    return this.parseJson<SpaDependentPensionAnalysesAiResponseInterface>(
      raw,
      (data) => {
        if (!Array.isArray(data.dependentPensionAnalyses)) {
          throw new InvalidSurvivorPensionAnalysisResultJsonError();
        }
      },
    );
  }

  private parseJson<T>(raw: string | null, validate: (data: T) => void): T {
    if (raw === null) {
      throw new InvalidSurvivorPensionAnalysisResultJsonError();
    }
    try {
      let parsed: unknown = JSON.parse(raw);
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      const data = parsed as T;
      validate(data);
      return data;
    } catch {
      throw new InvalidSurvivorPensionAnalysisResultJsonError();
    }
  }
}
