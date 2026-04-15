import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-document.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-document.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { GeneralUrbanRetirementDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-result.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { GetGeneralUrbanRetirementDenialWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/result/get-general-urban-retirement-denial-with-relations.query.result';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';
import { GeneralUrbanRetirementDenialDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/value-object/general-urban-retirement-denial-document-id/general-urban-retirement-denial-document-id.value-object';
import { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/value-object/general-urban-retirement-denial-period-document-id/general-urban-retirement-denial-period-document-id.value-object';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/value-object/general-urban-retirement-denial-period-earnings-history-id/general-urban-retirement-denial-period-earnings-history-id.value-object';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementDenialWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementDenialWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      GeneralUrbanRetirementDenialTypeormEntity,
      GetGeneralUrbanRetirementDenialWithRelationsQueryResult,
      constructUsing((source) => {
        const grantId = new GeneralUrbanRetirementDenialId(source.id);

        const result = source.generalUrbanRetirementDenialResult
          ? this.mapResult(source.generalUrbanRetirementDenialResult)
          : null;

        const documents = (
          source.generalUrbanRetirementDenialDocument ?? []
        ).map((doc) => this.mapDocument(doc, grantId));

        const periods = (source.generalUrbanRetirementDenialPeriod ?? []).map(
          (period) => this.mapPeriod(period, grantId),
        );

        const periodDocuments = (
          source.generalUrbanRetirementDenialPeriod ?? []
        ).flatMap((period) =>
          (period.generalUrbanRetirementDenialPeriodDocument ?? []).map((doc) =>
            this.mapPeriodDocument(doc, period.id),
          ),
        );

        const periodEarningsHistory = (
          source.generalUrbanRetirementDenialPeriod ?? []
        ).flatMap((period) =>
          (period.generalUrbanRetirementDenialPeriodEarningsHistory ?? []).map(
            (hist) => this.mapPeriodEarningsHistory(hist, period.id),
          ),
        );

        return GetGeneralUrbanRetirementDenialWithRelationsQueryResult.build({
          id: grantId,
          analysisName: source.analysisName,
          requestEntryDate: source.requestEntryDate,
          denialDate: source.denialDate,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          generalUrbanRetirementDenialResult: result,
          generalUrbanRetirementDenialDocument: documents,
          generalUrbanRetirementDenialPeriod: periods,
          generalUrbanRetirementDenialPeriodDocument: periodDocuments,
          generalUrbanRetirementDenialPeriodEarningsHistory:
            periodEarningsHistory,
        });
      }),
    );
  }

  private mapResult(
    source: GeneralUrbanRetirementDenialResultTypeormEntity,
  ): GeneralUrbanRetirementDenialResultEntity {
    return new GeneralUrbanRetirementDenialResultEntity({
      id: new GeneralUrbanRetirementDenialResultId(source.id),
      inssDecisionAnalysis: source.inssDecisionAnalysis,
      firstAnalysis: source.firstAnalysis,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapDocument(
    source: GeneralUrbanRetirementDenialDocumentTypeormEntity,
    grantId: GeneralUrbanRetirementDenialId,
  ): GeneralUrbanRetirementDenialDocumentEntity {
    return new GeneralUrbanRetirementDenialDocumentEntity({
      id: new GeneralUrbanRetirementDenialDocumentId(source.id),
      document: source.document,
      type: source.type,
      generalUrbanRetirementDenialId: grantId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriod(
    source: GeneralUrbanRetirementDenialPeriodTypeormEntity,
    grantId: GeneralUrbanRetirementDenialId,
  ): GeneralUrbanRetirementDenialPeriodEntity {
    return new GeneralUrbanRetirementDenialPeriodEntity({
      id: new GeneralUrbanRetirementDenialPeriodId(source.id),
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
      generalUrbanRetirementDenialId: grantId,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriodDocument(
    source: GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity,
    periodId: string,
  ): GeneralUrbanRetirementDenialPeriodDocumentEntity {
    return new GeneralUrbanRetirementDenialPeriodDocumentEntity({
      id: new GeneralUrbanRetirementDenialPeriodDocumentId(source.id),
      document: source.document,
      generalUrbanRetirementDenialPeriodId:
        new GeneralUrbanRetirementDenialPeriodId(periodId),
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }

  private mapPeriodEarningsHistory(
    source: GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
    periodId: string,
  ): GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity {
    return new GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity({
      id: new GeneralUrbanRetirementDenialPeriodEarningsHistoryId(source.id),
      competence: source.competence,
      value: source.value,
      generalUrbanRetirementDenialPeriodId:
        new GeneralUrbanRetirementDenialPeriodId(periodId),
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      deletedAt: source.deletedAt,
    });
  }
}
