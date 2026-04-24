import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-document.typeorm.entity';
import { MaternityPayRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-inss-benefit.typeorm.entity';
import { MaternityPayRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-legal-proceeding.typeorm.entity';
import { MaternityPayRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-result.typeorm.entity';
import { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { GetMaternityPayRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/result/get-maternity-pay-rejection-with-relations.query.result';
import { MaternityPayRejectionEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity';
import { MaternityPayRejectionDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/value-object/maternity-pay-rejection-document-id.value-object';
import { MaternityPayRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.entity';
import { MaternityPayRejectionInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/value-object/maternity-pay-rejection-inss-benefit-id.value-object';
import { MaternityPayRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.entity';
import { MaternityPayRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/value-object/maternity-pay-rejection-legal-proceeding-id.value-object';
import { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';
import { MaternityPayRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import { MaternityPayRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity';
import { MaternityPayRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/value-object/maternity-pay-rejection-work-period-document-id.value-object';
import { MaternityPayRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity';
import { MaternityPayRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/value-object/maternity-pay-rejection-work-period-earnings-history-id.value-object';

import type { MaternityPayRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-document.typeorm.entity';
import type { MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-earnings-history.typeorm.entity';

@Injectable()
export class GetMaternityPayRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMaternityPayRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: MaternityPayRejectionTypeormEntity,
    ): GetMaternityPayRejectionWithRelationsQueryResult => {
      const analysisEntity = this.mapper.map(
        source,
        MaternityPayRejectionTypeormEntity,
        MaternityPayRejectionEntity,
      );

      const maternityPayRejectionResult =
        source.maternityPayRejectionResult !== null
          ? this.mapper.map(
              source.maternityPayRejectionResult,
              MaternityPayRejectionResultTypeormEntity,
              MaternityPayRejectionResultEntity,
            )
          : null;

      const maternityPayRejectionDocument = (
        source.maternityPayRejectionDocument ?? []
      ).map(
        (item: MaternityPayRejectionDocumentTypeormEntity) =>
          new MaternityPayRejectionDocumentEntity({
            id: new MaternityPayRejectionDocumentId(item.id),
            document: item.document,
            type: item.type,
            maternityPayRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayRejectionInssBenefit = (
        source.maternityPayRejectionInssBenefit ?? []
      ).map(
        (item: MaternityPayRejectionInssBenefitTypeormEntity) =>
          new MaternityPayRejectionInssBenefitEntity({
            id: new MaternityPayRejectionInssBenefitId(item.id),
            inssBenefit: item.inssBenefit,
            maternityPayRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayRejectionLegalProceeding = (
        source.maternityPayRejectionLegalProceeding ?? []
      ).map(
        (item: MaternityPayRejectionLegalProceedingTypeormEntity) =>
          new MaternityPayRejectionLegalProceedingEntity({
            id: new MaternityPayRejectionLegalProceedingId(item.id),
            legalProceedingNumber: item.legalProceedingNumber,
            maternityPayRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayRejectionWorkPeriod = (
        source.maternityPayRejectionWorkPeriod ?? []
      ).map(
        (item: MaternityPayRejectionWorkPeriodTypeormEntity) =>
          new MaternityPayRejectionWorkPeriodEntity({
            id: new MaternityPayRejectionWorkPeriodId(item.id),
            bondOrigin: item.bondOrigin,
            startDate: item.startDate,
            endDate: item.endDate,
            category: item.category,
            competenceBelowTheMinimum: item.competenceBelowTheMinimum,
            pendencyReason: item.pendencyReason,
            periodConsideration: item.periodConsideration,
            contributionAverage: item.contributionAverage,
            status: item.status,
            gracePeriod: item.gracePeriod,
            jobType: item.jobType,
            activityDescription: item.activityDescription,
            maternityPayRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayRejectionWorkPeriodDocument = (
        source.maternityPayRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (workPeriod.maternityPayRejectionWorkPeriodDocument ?? []).map(
          (doc: MaternityPayRejectionWorkPeriodDocumentTypeormEntity) =>
            new MaternityPayRejectionWorkPeriodDocumentEntity({
              id: new MaternityPayRejectionWorkPeriodDocumentId(doc.id),
              document: doc.document,
              type: doc.type,
              maternityPayRejectionWorkPeriodId:
                new MaternityPayRejectionWorkPeriodId(workPeriod.id),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const maternityPayRejectionWorkPeriodEarningsHistory = (
        source.maternityPayRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (workPeriod.maternityPayRejectionWorkPeriodEarningsHistory ?? []).map(
          (item: MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity) =>
            new MaternityPayRejectionWorkPeriodEarningsHistoryEntity({
              id: new MaternityPayRejectionWorkPeriodEarningsHistoryId(item.id),
              competence: item.competence,
              remuneration: item.remuneration,
              indicators: item.indicators,
              paymentDate: item.paymentDate,
              contribution: item.contribution,
              contributionSalary: item.contributionSalary,
              competenceBelowTheMinimum: item.competenceBelowTheMinimum,
              maternityPayRejectionWorkPeriodId:
                new MaternityPayRejectionWorkPeriodId(workPeriod.id),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      return GetMaternityPayRejectionWithRelationsQueryResult.build({
        id: new MaternityPayRejectionId(source.id),
        triggeringEvent: source.triggeringEvent,
        analysisName: source.analysisName,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        category: source.category,
        triggeringEventDate: source.triggeringEventDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        maternityPayRejectionResult,
        maternityPayRejectionDocument,
        maternityPayRejectionInssBenefit,
        maternityPayRejectionLegalProceeding,
        maternityPayRejectionWorkPeriod,
        maternityPayRejectionWorkPeriodDocument,
        maternityPayRejectionWorkPeriodEarningsHistory,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionTypeormEntity,
      GetMaternityPayRejectionWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetMaternityPayRejectionWithRelationsQueryResult,
    ): MaternityPayRejectionTypeormEntity => {
      const maternityPayRejectionResult =
        source.maternityPayRejectionResult !== null
          ? this.mapper.map(
              source.maternityPayRejectionResult,
              MaternityPayRejectionResultEntity,
              MaternityPayRejectionResultTypeormEntity,
            )
          : null;

      const maternityPayRejectionDocument = (
        source.maternityPayRejectionDocument ?? []
      ).map((item: MaternityPayRejectionDocumentEntity) =>
        MaternityPayRejectionDocumentTypeormEntity.build({
          id: item.id.toString(),
          document: item.document,
          type: item.type,
          maternityPayRejection: {
            id: source.id.toString(),
          } as unknown as MaternityPayRejectionTypeormEntity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      );

      const maternityPayRejectionInssBenefit = (
        source.maternityPayRejectionInssBenefit ?? []
      ).map((item: MaternityPayRejectionInssBenefitEntity) =>
        MaternityPayRejectionInssBenefitTypeormEntity.build({
          id: item.id.toString(),
          inssBenefit: item.inssBenefit,
          maternityPayRejection: {
            id: source.id.toString(),
          } as unknown as MaternityPayRejectionTypeormEntity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      );

      const maternityPayRejectionLegalProceeding = (
        source.maternityPayRejectionLegalProceeding ?? []
      ).map((item: MaternityPayRejectionLegalProceedingEntity) =>
        MaternityPayRejectionLegalProceedingTypeormEntity.build({
          id: item.id.toString(),
          legalProceedingNumber: item.legalProceedingNumber,
          maternityPayRejection: {
            id: source.id.toString(),
          } as unknown as MaternityPayRejectionTypeormEntity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      );

      const maternityPayRejectionWorkPeriod = this.mapper.mapArray(
        source.maternityPayRejectionWorkPeriod ?? [],
        MaternityPayRejectionWorkPeriodEntity,
        MaternityPayRejectionWorkPeriodTypeormEntity,
      );

      return MaternityPayRejectionTypeormEntity.build({
        id: source.id.toString(),
        triggeringEvent: source.triggeringEvent,
        analysisName: source.analysisName,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        category: source.category,
        triggeringEventDate: source.triggeringEventDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        ...(maternityPayRejectionResult !== null && {
          maternityPayRejectionResult,
        }),
        maternityPayRejectionDocument,
        maternityPayRejectionInssBenefit,
        maternityPayRejectionLegalProceeding,
        maternityPayRejectionWorkPeriod,
      });
    };

    createMap(
      this.mapper,
      GetMaternityPayRejectionWithRelationsQueryResult,
      MaternityPayRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
