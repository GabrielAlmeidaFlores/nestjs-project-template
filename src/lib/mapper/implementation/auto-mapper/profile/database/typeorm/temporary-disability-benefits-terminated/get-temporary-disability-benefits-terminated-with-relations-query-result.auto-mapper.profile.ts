import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-inss-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-result.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-period-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/result/get-temporary-disability-benefits-terminated-with-relations.query.result';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/temporary-disability-benefits-terminated-document.entity';

@Injectable()
export class GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedTypeormEntity,
      GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
      constructUsing((source) => {
        const id = new TemporaryDisabilityBenefitsTerminatedId(source.id);

        const result = source.temporaryDisabilityBenefitsTerminatedResult
          ? this.mapResult(source.temporaryDisabilityBenefitsTerminatedResult)
          : null;

        const documents = (source.documents ?? []).map((doc) =>
          this.mapDocument(doc),
        ) as unknown as TemporaryDisabilityBenefitsTerminatedDocumentEntity[];

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

        return new GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult(
          {
            id,
            analysisName: source.analysisName,
            requestEntryDate: source.requestEntryDate,
            benefitCessationDate: source.benefitCessationDate,
            category: source.category,
            myInssPassword: source.myInssPassword,
            benefitCessationReason: source.benefitCessationReason,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            result,
            documents,
            inssBenefits,
            disabilityAnalysis,
            insuredStatus,
            workPeriods,
            analysisToolClient,
          } as GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
        );
      }),
    );
  }

  private mapResult(
    source: TemporaryDisabilityBenefitsTerminatedResultTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['result'] {
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
    source: TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity,
  ): { id: string; fileName: string; type: string } {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInssBenefit(
    source: TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['inssBenefits'][number] {
    return {
      id: source.id,
      inssBenefit: source.inssBenefit,
    };
  }

  private mapDisabilityAnalysis(
    source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['disabilityAnalysis'][number] {
    const cids = (source.cids ?? []).map((cid) => this.mapCid(cid));
    const documents = (source.documents ?? []).map((doc) =>
      this.mapDisabilityAnalysisDocument(doc),
    );
    const previousBenefits = (
      source.temporaryDisabilityBenefitsTerminatedPreviousBenefit ?? []
    ).map((previousBenefit) => this.mapPreviousBenefit(previousBenefit));

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
      previousBenefits,
      cids,
      documents,
    };
  }

  private mapCid(
    source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['disabilityAnalysis'][number]['cids'][number] {
    return {
      id: source.id,
      cidTenId: source.cidTenId,
    };
  }

  private mapDisabilityAnalysisDocument(
    source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['disabilityAnalysis'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapPreviousBenefit(
    source: TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['disabilityAnalysis'][number]['previousBenefits'][number] {
    const documents = (
      source.temporaryDisabilityBenefitsTerminatedPreviousBenefitDocument ?? []
    ).map((document) => this.mapPreviousBenefitDocument(document));

    return {
      id: source.id,
      benefitNumber: source.benefitNumber,
      documents,
    };
  }

  private mapPreviousBenefitDocument(
    source: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['disabilityAnalysis'][number]['previousBenefits'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapInsuredStatus(
    source: TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['insuredStatus'][number] {
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
    source: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['insuredStatus'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapWorkPeriod(
    source: TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['workPeriods'][number] {
    const earningsHistory = (source.earningsHistory ?? []).map((eh) =>
      this.mapEarningsHistory(eh),
    );
    const documents = (
      source.temporaryDisabilityBenefitsTerminatedWorkPeriodDocument ?? []
    ).map((document) => this.mapWorkPeriodDocument(document));

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
      isManualPeriod: source.isManualPeriod,
      documents,
      earningsHistory,
    };
  }

  private mapWorkPeriodDocument(
    source: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['workPeriods'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      type: source.type,
    };
  }

  private mapEarningsHistory(
    source: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
  ): GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult['workPeriods'][number]['earningsHistory'][number] {
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
