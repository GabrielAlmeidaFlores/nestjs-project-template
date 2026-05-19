import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-result.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/result/get-permanent-incapacity-benefit-terminated-with-relations.query.result';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';

@Injectable()
export class GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      PermanentIncapacityBenefitTerminatedTypeormEntity,
      GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
      constructUsing((source) => {
        const id = new PermanentIncapacityBenefitTerminatedId(source.id);

        const result = source.permanentIncapacityBenefitTerminatedResult
          ? this.mapResult(source.permanentIncapacityBenefitTerminatedResult)
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

        return new GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult(
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
          } as GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
        );
      }),
    );
  }

  private mapResult(
    source: PermanentIncapacityBenefitTerminatedResultTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['result'] {
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
    source: PermanentIncapacityBenefitTerminatedDocumentTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInssBenefit(
    source: PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['inssBenefits'][number] {
    return {
      id: source.id,
      inssBenefit: source.inssBenefit,
    };
  }

  private mapDisabilityAnalysis(
    source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['disabilityAnalysis'][number] {
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
    source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['disabilityAnalysis'][number]['cids'][number] {
    return {
      id: source.id,
      cidTenId: source.cidTenId,
    };
  }

  private mapDisabilityAnalysisDocument(
    source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['disabilityAnalysis'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInsuredStatus(
    source: PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['insuredStatus'][number] {
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
    source: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['insuredStatus'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapWorkPeriod(
    source: PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['workPeriods'][number] {
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
    source: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
  ): GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult['workPeriods'][number]['earningsHistory'][number] {
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
