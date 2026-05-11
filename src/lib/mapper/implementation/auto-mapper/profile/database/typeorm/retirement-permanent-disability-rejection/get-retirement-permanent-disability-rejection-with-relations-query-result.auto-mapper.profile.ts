import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-cid.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-earnings-history.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';
import { RetirementPermanentDisabilityRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-result.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/result/get-retirement-permanent-disability-rejection-with-relations.query.result';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document.entity';
import { RetirementPermanentDisabilityRejectionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/value-object/retirement-permanent-disability-rejection-document-id/retirement-permanent-disability-rejection-document-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/value-object/retirement-permanent-disability-rejection-incapacity-cid-id/retirement-permanent-disability-rejection-incapacity-cid-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/value-object/retirement-permanent-disability-rejection-incapacity-document-id/retirement-permanent-disability-rejection-incapacity-document-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit.entity';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/value-object/retirement-permanent-disability-rejection-incapacity-previous-benefit-id/retirement-permanent-disability-rejection-incapacity-previous-benefit-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/value-object/retirement-permanent-disability-rejection-insured-quality-document-id/retirement-permanent-disability-rejection-insured-quality-document-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity';
import { RetirementPermanentDisabilityRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/value-object/retirement-permanent-disability-rejection-period-document-id/retirement-permanent-disability-rejection-period-document-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/value-object/retirement-permanent-disability-rejection-period-earnings-history-id/retirement-permanent-disability-rejection-period-earnings-history-id.value-object';
import { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';
import { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

@Injectable()
export class GetRetirementPermanentDisabilityRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionTypeormEntity,
      GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult,
      constructUsing((source) => {
        const mainId = new RetirementPermanentDisabilityRejectionId(source.id);

        const result = source.retirementPermanentDisabilityRejectionResult
          ? this.mapResult(source.retirementPermanentDisabilityRejectionResult)
          : null;

        const documents = (
          source.retirementPermanentDisabilityRejectionDocument ?? []
        ).map((doc) => this.mapDocument(doc, mainId));

        const incapacity =
          source.retirementPermanentDisabilityRejectionIncapacity
            ? this.mapIncapacity(
                source.retirementPermanentDisabilityRejectionIncapacity,
              )
            : null;

        const incapacityEntity =
          source.retirementPermanentDisabilityRejectionIncapacity;

        const incapacityCids = incapacityEntity
          ? (
              incapacityEntity.retirementPermanentDisabilityRejectionIncapacityCid ??
              []
            ).map((cid) =>
              this.mapIncapacityCid(
                cid,
                new RetirementPermanentDisabilityRejectionIncapacityId(
                  incapacityEntity.id,
                ),
              ),
            )
          : [];

        const incapacityDocuments = incapacityEntity
          ? (
              incapacityEntity.retirementPermanentDisabilityRejectionIncapacityDocument ??
              []
            ).map((doc) =>
              this.mapIncapacityDocument(
                doc,
                new RetirementPermanentDisabilityRejectionIncapacityId(
                  incapacityEntity.id,
                ),
              ),
            )
          : [];

        const incapacityPreviousBenefits = incapacityEntity
          ? (
              incapacityEntity.retirementPermanentDisabilityRejectionIncapacityPreviousBenefit ??
              []
            ).map((pb) =>
              this.mapIncapacityPreviousBenefit(
                pb,
                new RetirementPermanentDisabilityRejectionIncapacityId(
                  incapacityEntity.id,
                ),
              ),
            )
          : [];

        const insuredQuality =
          source.retirementPermanentDisabilityRejectionInsuredQuality
            ? this.mapInsuredQuality(
                source.retirementPermanentDisabilityRejectionInsuredQuality,
              )
            : null;

        const insuredQualityEntity =
          source.retirementPermanentDisabilityRejectionInsuredQuality;

        const insuredQualityDocuments = insuredQualityEntity
          ? (
              insuredQualityEntity.retirementPermanentDisabilityRejectionInsuredQualityDocument ??
              []
            ).map((doc) =>
              this.mapInsuredQualityDocument(
                doc,
                new RetirementPermanentDisabilityRejectionInsuredQualityId(
                  insuredQualityEntity.id,
                ),
              ),
            )
          : [];

        const periods = (
          source.retirementPermanentDisabilityRejectionPeriod ?? []
        ).map((period) => this.mapPeriod(period, mainId));

        const periodDocuments = (
          source.retirementPermanentDisabilityRejectionPeriod ?? []
        ).flatMap((period) =>
          (
            period.retirementPermanentDisabilityRejectionPeriodDocument ?? []
          ).map((doc) => this.mapPeriodDocument(doc, period.id)),
        );

        const periodEarningsHistory = (
          source.retirementPermanentDisabilityRejectionPeriod ?? []
        ).flatMap((period) =>
          (
            period.retirementPermanentDisabilityRejectionPeriodEarningsHistory ??
            []
          ).map((hist) => this.mapPeriodEarningsHistory(hist, period.id)),
        );

        return GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult.build(
          {
            id: mainId,
            analysisName: source.analysisName,
            requestEntryDate: source.requestEntryDate,
            denialDate: source.denialDate,
            category: source.category,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
            retirementPermanentDisabilityRejectionResult: result,
            retirementPermanentDisabilityRejectionDocument: documents,
            retirementPermanentDisabilityRejectionIncapacity: incapacity,
            retirementPermanentDisabilityRejectionIncapacityCid: incapacityCids,
            retirementPermanentDisabilityRejectionIncapacityDocument:
              incapacityDocuments,
            retirementPermanentDisabilityRejectionIncapacityPreviousBenefit:
              incapacityPreviousBenefits,
            retirementPermanentDisabilityRejectionInsuredQuality:
              insuredQuality,
            retirementPermanentDisabilityRejectionInsuredQualityDocument:
              insuredQualityDocuments,
            retirementPermanentDisabilityRejectionPeriod: periods,
            retirementPermanentDisabilityRejectionPeriodDocument:
              periodDocuments,
            retirementPermanentDisabilityRejectionPeriodEarningsHistory:
              periodEarningsHistory,
          },
        );
      }),
    );
  }

  private mapResult(
    source: RetirementPermanentDisabilityRejectionResultTypeormEntity,
  ): RetirementPermanentDisabilityRejectionResultEntity {
    return new RetirementPermanentDisabilityRejectionResultEntity({
      id: new RetirementPermanentDisabilityRejectionResultId(source.id),
      inssDecisionAnalysis: source.inssDecisionAnalysis,
      firstAnalysis: source.firstAnalysis,
      completeAnalysis: source.completeAnalysis,
      completeAnalysisDownload: source.completeAnalysisDownload,
      simplifiedAnalysis: source.simplifiedAnalysis,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapDocument(
    source: RetirementPermanentDisabilityRejectionDocumentTypeormEntity,
    mainId: RetirementPermanentDisabilityRejectionId,
  ): RetirementPermanentDisabilityRejectionDocumentEntity {
    return new RetirementPermanentDisabilityRejectionDocumentEntity({
      id: new RetirementPermanentDisabilityRejectionDocumentId(source.id),
      document: source.document,
      type: source.type,
      retirementPermanentDisabilityRejectionId: mainId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapIncapacity(
    source: RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
  ): RetirementPermanentDisabilityRejectionIncapacityEntity {
    return new RetirementPermanentDisabilityRejectionIncapacityEntity({
      id: new RetirementPermanentDisabilityRejectionIncapacityId(source.id),
      incapacityStartDate: source.incapacityStartDate,
      diseaseDescription: source.diseaseDescription,
      isIncapacityFromAccident: source.isIncapacityFromAccident,
      incapacitatingEventDescription: source.incapacitatingEventDescription,
      isIncapacityFromSeriousDisease: source.isIncapacityFromSeriousDisease,
      seriousDiseaseType: source.seriousDiseaseType,
      seriousDiseaseOtherDescription: source.seriousDiseaseOtherDescription,
      seriousDiseaseStartDate: source.seriousDiseaseStartDate,
      needsPermanentAssistance: source.needsPermanentAssistance,
      hasPreviousIncapacityBenefit: source.hasPreviousIncapacityBenefit,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapIncapacityPreviousBenefit(
    source: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity {
    return new RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity(
      {
        id: new RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId(
          source.id,
        ),
        benefitNumber: source.benefitNumber,
        startDate: source.startDate,
        endDate: source.endDate,
        retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      },
    );
  }

  private mapIncapacityCid(
    source: RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): RetirementPermanentDisabilityRejectionIncapacityCidEntity {
    return new RetirementPermanentDisabilityRejectionIncapacityCidEntity({
      id: new RetirementPermanentDisabilityRejectionIncapacityCidId(source.id),
      cid: source.cid,
      type: source.type,
      retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapIncapacityDocument(
    source: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): RetirementPermanentDisabilityRejectionIncapacityDocumentEntity {
    return new RetirementPermanentDisabilityRejectionIncapacityDocumentEntity({
      id: new RetirementPermanentDisabilityRejectionIncapacityDocumentId(
        source.id,
      ),
      document: source.document,
      type: source.type,
      retirementPermanentDisabilityRejectionIncapacityId: incapacityId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapInsuredQuality(
    source: RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
  ): RetirementPermanentDisabilityRejectionInsuredQualityEntity {
    return new RetirementPermanentDisabilityRejectionInsuredQualityEntity({
      id: new RetirementPermanentDisabilityRejectionInsuredQualityId(source.id),
      isInvoluntaryUnemployed: source.isInvoluntaryUnemployed,
      intendsToProveInvoluntaryUnemployment:
        source.intendsToProveInvoluntaryUnemployment,
      isRuralInsuredAtGeneratingFact: source.isRuralInsuredAtGeneratingFact,
      ruralInsuredStartDate: source.ruralInsuredStartDate,
      ruralInsuredEndDate: source.ruralInsuredEndDate,
      ruralInsuredDescription: source.ruralInsuredDescription,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapInsuredQualityDocument(
    source: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
    insuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId,
  ): RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity {
    return new RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity(
      {
        id: new RetirementPermanentDisabilityRejectionInsuredQualityDocumentId(
          source.id,
        ),
        document: source.document,
        type: source.type,
        retirementPermanentDisabilityRejectionInsuredQualityId:
          insuredQualityId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      },
    );
  }

  private mapPeriod(
    source: RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
    mainId: RetirementPermanentDisabilityRejectionId,
  ): RetirementPermanentDisabilityRejectionPeriodEntity {
    return new RetirementPermanentDisabilityRejectionPeriodEntity({
      id: new RetirementPermanentDisabilityRejectionPeriodId(source.id),
      bondOrigin: source.bondOrigin,
      category: source.category,
      activityDescription: source.activityDescription,
      startDate: source.startDate,
      endDate: source.endDate,
      workType: source.workType,
      isPendency: source.isPendency,
      competenceBelowTheMinimum: source.competenceBelowTheMinimum,
      contributionAverage:
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null,
      pendencyReason: source.pendencyReason,
      periodConsideration: source.periodConsideration,
      wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
      status: source.status,
      local: source.local,
      retirementPermanentDisabilityRejectionId: mainId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriodDocument(
    source: RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
    periodId: string,
  ): RetirementPermanentDisabilityRejectionPeriodDocumentEntity {
    return new RetirementPermanentDisabilityRejectionPeriodDocumentEntity({
      id: new RetirementPermanentDisabilityRejectionPeriodDocumentId(source.id),
      document: source.document,
      retirementPermanentDisabilityRejectionPeriodId:
        new RetirementPermanentDisabilityRejectionPeriodId(periodId),
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriodEarningsHistory(
    source: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
    periodId: string,
  ): RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity {
    return new RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity(
      {
        id: new RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId(
          source.id,
        ),
        competence: source.competence,
        value: source.value,
        retirementPermanentDisabilityRejectionPeriodId:
          new RetirementPermanentDisabilityRejectionPeriodId(periodId),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      },
    );
  }
}
