import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-result.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/result/get-temporary-incapacity-benefit-rejection-with-relations.query.result';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';

@Injectable()
export class GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      TemporaryIncapacityBenefitRejectionTypeormEntity,
      GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
      constructUsing((source) => {
        const id = new TemporaryIncapacityBenefitRejectionId(source.id);

        const result = source.temporaryIncapacityBenefitRejectionResult
          ? this.mapResult(source.temporaryIncapacityBenefitRejectionResult)
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

        return new GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult(
          {
            id,
            analysisName: source.analysisName,
            requestEntryDate: source.requestEntryDate,
            denialDate: source.denialDate,
            requestedBenefitType: source.requestedBenefitType,
            category: source.category,
            denialReason: source.denialReason,
            denialReasonDescription: source.denialReasonDescription,
            condition: source.condition,
            conditionDescription: source.conditionDescription,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            result,
            documents,
            inssBenefits,
            disabilityAnalysis,
            insuredStatus,
            workPeriods,
            analysisToolClient,
          } as GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
        );
      }),
    );
  }

  private mapResult(
    source: TemporaryIncapacityBenefitRejectionResultTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['result'] {
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
    source: TemporaryIncapacityBenefitRejectionDocumentTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInssBenefit(
    source: TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['inssBenefits'][number] {
    return {
      id: source.id,
      inssBenefit: source.inssBenefit,
    };
  }

  private mapDisabilityAnalysis(
    source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['disabilityAnalysis'][number] {
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
    source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['disabilityAnalysis'][number]['cids'][number] {
    return {
      id: source.id,
      cidTenId: source.cidTenId,
    };
  }

  private mapDisabilityAnalysisDocument(
    source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['disabilityAnalysis'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInsuredStatus(
    source: TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['insuredStatus'][number] {
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
    source: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['insuredStatus'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapWorkPeriod(
    source: TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['workPeriods'][number] {
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
    source: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
  ): GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult['workPeriods'][number]['earningsHistory'][number] {
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
