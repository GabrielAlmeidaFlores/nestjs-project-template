import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-result.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/result/get-temporary-incapacity-benefit-termination-with-relations.query.result';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';

@Injectable()
export class GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      TemporaryIncapacityBenefitTerminationTypeormEntity,
      GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
      constructUsing((source) => {
        const id = new TemporaryIncapacityBenefitTerminationId(source.id);

        const result = source.temporaryIncapacityBenefitTerminationResult
          ? this.mapResult(source.temporaryIncapacityBenefitTerminationResult)
          : null;

        const documents = (source.documents ?? []).map((doc) =>
          this.mapDocument(doc),
        );

        const inssBenefits = (source.inssBenefits ?? []).map((b) =>
          this.mapInssBenefit(b),
        );

        const disabilityAnalysis = (source.disabilityAnalysis ?? []).map((da) =>
          this.mapDisabilityAnalysis(da),
        );

        const insuredStatus = (source.insuredStatus ?? []).map((is) =>
          this.mapInsuredStatus(is),
        );

        const workPeriods = (source.workPeriods ?? []).map((wp) =>
          this.mapWorkPeriod(wp),
        );

        const analysisToolClient = source.analysisToolRecord?.analysisToolClient
          ? {
              analysisToolClientId:
                source.analysisToolRecord.analysisToolClient.id,
              name: source.analysisToolRecord.analysisToolClient.name,
              federalDocument:
                source.analysisToolRecord.analysisToolClient.federalDocument,
              birthDate: source.analysisToolRecord.analysisToolClient.birthDate,
              email: source.analysisToolRecord.analysisToolClient.email,
              sex: source.analysisToolRecord.analysisToolClient.gender as
                | string
                | null,
              phone: source.analysisToolRecord.analysisToolClient.phoneNumber,
            }
          : null;

        return new GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult(
          {
            id,
            analysisName: source.analysisName,
            benefitTerminationDate: source.benefitTerminationDate,
            category: source.category,
            terminationReason: source.terminationReason,
            terminationReasonDescription: source.terminationReasonDescription,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            result,
            documents,
            inssBenefits,
            disabilityAnalysis,
            insuredStatus,
            workPeriods,
            analysisToolClient,
          } as GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
        );
      }),
    );
  }

  private mapResult(
    source: TemporaryIncapacityBenefitTerminationResultTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['result'] {
    return {
      id: source.id,
      inssDecisionAnalysis: source.inssDecisionAnalysis,
      firstAnalysis: source.firstAnalysis,
      completeAnalysis: source.completeAnalysis,
      completeAnalysisDownload: source.completeAnalysisDownload,
      simplifiedAnalysis: source.simplifiedAnalysis,
    };
  }

  private mapDocument(
    source: TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInssBenefit(
    source: TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['inssBenefits'][number] {
    return {
      id: source.id,
      inssBenefit: source.inssBenefit,
    };
  }

  private mapDisabilityAnalysis(
    source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['disabilityAnalysis'][number] {
    const cids = (source.cids ?? []).map((cid) => this.mapCid(cid));
    const documents = (source.documents ?? []).map((doc) =>
      this.mapDisabilityAnalysisDocument(doc),
    );

    return {
      id: source.id,
      estimatedDisabilityStartDate: source.estimatedDisabilityStartDate,
      shortDisabilityDescription: source.shortDisabilityDescription,
      disabilityFromAccident: source.disabilityFromAccident,
      disablingConditionDescription: source.disablingConditionDescription,
      disabilityFromSevereDisease: source.disabilityFromSevereDisease,
      severeDisease: source.severeDisease,
      diseaseCustomName: source.diseaseCustomName,
      diseaseStartDate: source.diseaseStartDate,
      needsConstantAssistanceFromAnotherPerson:
        source.needsConstantAssistanceFromAnotherPerson,
      previousDisabilityBenefit: source.previousDisabilityBenefit,
      previousBenefitNumber: source.previousBenefitNumber,
      cids,
      documents,
    };
  }

  private mapCid(
    source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['disabilityAnalysis'][number]['cids'][number] {
    return {
      id: source.id,
      cidTenId: source.cidTenId,
    };
  }

  private mapDisabilityAnalysisDocument(
    source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['disabilityAnalysis'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInsuredStatus(
    source: TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['insuredStatus'][number] {
    const documents = (source.documents ?? []).map((doc) =>
      this.mapInsuredStatusDocument(doc),
    );

    return {
      id: source.id,
      involuntaryUnemployment: source.involuntaryUnemployment,
      intentionToProveInvoluntaryUnemployment:
        source.intentionToProveInvoluntaryUnemployment,
      ruralInsuredClient: source.ruralInsuredClient,
      ruralPeriodStartDate: source.ruralPeriodStartDate,
      ruralPeriodEndDate: source.ruralPeriodEndDate,
      documentsDescription: source.documentsDescription,
      documents,
    };
  }

  private mapInsuredStatusDocument(
    source: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['insuredStatus'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapWorkPeriod(
    source: TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['workPeriods'][number] {
    const earningsHistory = (source.earningsHistory ?? []).map((eh) =>
      this.mapEarningsHistory(eh),
    );

    return {
      id: source.id,
      bondOrigin: source.bondOrigin,
      startDate: source.startDate,
      endDate: source.endDate,
      category: source.category,
      activityDescription: source.activityDescription,
      competenceBelowTheMinimum: source.competenceBelowTheMinimum,
      pendencyReason: source.pendencyReason,
      periodConsideration: source.periodConsideration,
      contributionAverage:
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null,
      impactMonths: source.impactMonths,
      gracePeriod: source.gracePeriod,
      isPendency: source.isPendency,
      wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
      status: source.status,
      earningsHistory,
    };
  }

  private mapEarningsHistory(
    source: TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity,
  ): GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult['workPeriods'][number]['earningsHistory'][number] {
    return {
      id: source.id,
      competence: source.competence,
      remuneration: source.remuneration,
      indicators: source.indicators,
      paymentDate: source.paymentDate,
      contribution: source.contribution,
      contributionSalary: source.contributionSalary,
      competenceBelowTheMinimum: source.competenceBelowTheMinimum,
    };
  }
}
