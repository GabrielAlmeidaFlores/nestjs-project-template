import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-document.typeorm.entity';
import { DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-document.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-earnings-history.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { DisabilityRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-result.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/result/get-disability-retirement-planning-rejection-with-relations.query.result';
import { GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/result/get-disability-retirement-planning-rejection-time-accelerator.query.result';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity';
import { DisabilityRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/value-object/disability-retirement-planning-rejection-document-id/disability-retirement-planning-rejection-document-id.value-object';
import { DisabilityRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity';
import { DisabilityRetirementPlanningRejectionInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/value-object/disability-retirement-planning-rejection-inss-benefit-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.entity';
import { DisabilityRetirementPlanningRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/value-object/disability-retirement-planning-rejection-period-document-id/disability-retirement-planning-rejection-period-document-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/value-object/disability-retirement-planning-rejection-period-earnings-history-id/disability-retirement-planning-rejection-period-earnings-history-id.value-object';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningRejectionTypeormEntity,
      GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult,
      constructUsing((source) => {
        const grantId = new DisabilityRetirementPlanningRejectionId(source.id);

        const result = source.disabilityRetirementPlanningRejectionResult
          ? this.mapResult(source.disabilityRetirementPlanningRejectionResult)
          : null;

        const documents = (
          source.disabilityRetirementPlanningRejectionDocument ?? []
        ).map((doc) => this.mapDocument(doc, grantId));

        const periods = (
          source.disabilityRetirementPlanningRejectionPeriod ?? []
        ).map((period) => this.mapPeriod(period, grantId));

        const periodDocuments = (
          source.disabilityRetirementPlanningRejectionPeriod ?? []
        ).flatMap((period) =>
          (
            period.disabilityRetirementPlanningRejectionPeriodDocument ?? []
          ).map((doc) => this.mapPeriodDocument(doc, period.id)),
        );

        const periodEarningsHistory = (
          source.disabilityRetirementPlanningRejectionPeriod ?? []
        ).flatMap((period) =>
          (
            period.disabilityRetirementPlanningRejectionPeriodEarningsHistory ??
            []
          ).map((hist) => this.mapPeriodEarningsHistory(hist, period.id)),
        );

        const timeAccelerators = (
          source.disabilityRetirementPlanningRejectionTimeAccelerator ?? []
        ).map((ta) => this.mapTimeAccelerator(ta));

        const inssBenefits = (
          source.disabilityRetirementPlanningRejectionInssBenefit ?? []
        ).map((b) => this.mapInssBenefit(b, grantId));

        return GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult.build(
          {
            id: grantId,
            analysisName: source.analysisName,
            requestEntryDate: source.requestEntryDate,
            denialDate: source.denialDate,
            requestedBenefitType: source.requestedBenefitType,
            category: source.category,
            retirementType: source.retirementType,
            denialReason: source.denialReason,
            denialReasonDescription: source.denialReasonDescription,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
            disabilityRetirementPlanningRejectionResult: result,
            disabilityRetirementPlanningRejectionDocument: documents,
            disabilityRetirementPlanningRejectionPeriod: periods,
            disabilityRetirementPlanningRejectionPeriodDocument:
              periodDocuments,
            disabilityRetirementPlanningRejectionPeriodEarningsHistory:
              periodEarningsHistory,
            disabilityRetirementPlanningRejectionTimeAccelerator:
              timeAccelerators,
            disabilityRetirementPlanningRejectionInssBenefit: inssBenefits,
          },
        );
      }),
    );
  }

  private mapResult(
    source: DisabilityRetirementPlanningRejectionResultTypeormEntity,
  ): DisabilityRetirementPlanningRejectionResultEntity {
    return new DisabilityRetirementPlanningRejectionResultEntity({
      id: new DisabilityRetirementPlanningRejectionResultId(source.id),
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
    source: DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
    grantId: DisabilityRetirementPlanningRejectionId,
  ): DisabilityRetirementPlanningRejectionDocumentEntity {
    return new DisabilityRetirementPlanningRejectionDocumentEntity({
      id: new DisabilityRetirementPlanningRejectionDocumentId(source.id),
      document: source.document,
      type: source.type,
      disabilityRetirementPlanningRejectionId: grantId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriod(
    source: DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
    grantId: DisabilityRetirementPlanningRejectionId,
  ): DisabilityRetirementPlanningRejectionPeriodEntity {
    return new DisabilityRetirementPlanningRejectionPeriodEntity({
      id: new DisabilityRetirementPlanningRejectionPeriodId(source.id),
      bondOrigin: source.bondOrigin,
      category: source.category,
      activityDescription: source.activityDescription,
      startDate: source.startDate,
      endDate: source.endDate,
      workType: source.workType,
      impactMonths: source.impactMonths,
      graceMonths: source.graceMonths,
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
      pcdStatus: source.pcdStatus,
      disabilityRetirementPlanningRejectionId: grantId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriodDocument(
    source: DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity,
    periodId: string,
  ): DisabilityRetirementPlanningRejectionPeriodDocumentEntity {
    return new DisabilityRetirementPlanningRejectionPeriodDocumentEntity({
      id: new DisabilityRetirementPlanningRejectionPeriodDocumentId(source.id),
      document: source.document,
      disabilityRetirementPlanningRejectionPeriodId:
        new DisabilityRetirementPlanningRejectionPeriodId(periodId),
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriodEarningsHistory(
    source: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
    periodId: string,
  ): DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity {
    return new DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity(
      {
        id: new DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId(
          source.id,
        ),
        competence: source.competence,
        value: source.value,
        disabilityRetirementPlanningRejectionPeriodId:
          new DisabilityRetirementPlanningRejectionPeriodId(periodId),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      },
    );
  }

  private mapTimeAccelerator(
    source: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
  ): GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult {
    return GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult.build(
      {
        id: new DisabilityRetirementPlanningRejectionTimeAcceleratorId(
          source.id,
        ),
        type: source.type,
        recognitionInss: source.recognitionInss,
        recognitionJudicial: source.recognitionJudicial,
        viability: source.viability,
        technicalNote: source.technicalNote,
        startDate: source.startDate,
        endDate: source.endDate,
        institution: source.institution,
        affectsQualifyingPeriod: source.affectsQualifyingPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      },
    );
  }

  private mapInssBenefit(
    source: DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
    grantId: DisabilityRetirementPlanningRejectionId,
  ): DisabilityRetirementPlanningRejectionInssBenefitEntity {
    return new DisabilityRetirementPlanningRejectionInssBenefitEntity({
      id: new DisabilityRetirementPlanningRejectionInssBenefitId(source.id),
      inssBenefit: source.inssBenefit,
      disabilityRetirementPlanningRejectionId: grantId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }
}
