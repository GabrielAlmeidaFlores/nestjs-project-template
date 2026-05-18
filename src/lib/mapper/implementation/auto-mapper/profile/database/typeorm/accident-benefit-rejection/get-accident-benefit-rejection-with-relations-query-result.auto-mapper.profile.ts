import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-document.typeorm.entity';
import { AccidentBenefitRejectionEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event.typeorm.entity';
import { AccidentBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-inss-benefit.typeorm.entity';
import { AccidentBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-result.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { GetAccidentBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/result/get-accident-benefit-rejection-with-relations.query.result';
import { AccidentBenefitRejectionEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/accident-benefit-rejection.entity';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity';
import { AccidentBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/value-object/accident-benefit-rejection-document-id.value-object';
import { AccidentBenefitRejectionEventEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity';
import { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';
import { AccidentBenefitRejectionEventDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity';
import { AccidentBenefitRejectionEventDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/value-object/accident-benefit-rejection-event-document-id.value-object';
import { AccidentBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity';
import { AccidentBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/value-object/accident-benefit-rejection-inss-benefit-id.value-object';
import { AccidentBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity';
import { AccidentBenefitRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import { AccidentBenefitRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity';
import { AccidentBenefitRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/value-object/accident-benefit-rejection-work-period-document-id.value-object';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/value-object/accident-benefit-rejection-work-period-earnings-history-id.value-object';

import type { AccidentBenefitRejectionEventDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event-document.typeorm.entity';
import type { AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-document.typeorm.entity';
import type { AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-earnings-history.typeorm.entity';

@Injectable()
export class GetAccidentBenefitRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentBenefitRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: AccidentBenefitRejectionTypeormEntity,
    ): GetAccidentBenefitRejectionWithRelationsQueryResult => {
      const analysisEntity = this.mapper.map(
        source,
        AccidentBenefitRejectionTypeormEntity,
        AccidentBenefitRejectionEntity,
      );

      const accidentBenefitRejectionResult =
        source.accidentBenefitRejectionResult !== null &&
        source.accidentBenefitRejectionResult !== undefined
          ? this.mapper.map(
              source.accidentBenefitRejectionResult,
              AccidentBenefitRejectionResultTypeormEntity,
              AccidentBenefitRejectionResultEntity,
            )
          : null;

      const accidentBenefitRejectionDocument = (
        source.accidentBenefitRejectionDocument ?? []
      ).map(
        (item) =>
          new AccidentBenefitRejectionDocumentEntity({
            id: new AccidentBenefitRejectionDocumentId(item.id),
            document: item.fileName,
            type: item.type,
            accidentBenefitRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const accidentBenefitRejectionInssBenefit = (
        source.accidentBenefitRejectionInssBenefit ?? []
      ).map(
        (item: AccidentBenefitRejectionInssBenefitTypeormEntity) =>
          new AccidentBenefitRejectionInssBenefitEntity({
            id: new AccidentBenefitRejectionInssBenefitId(item.id),
            inssBenefit: item.inssBenefit,
            accidentBenefitRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const accidentBenefitRejectionEvent = (
        source.accidentBenefitRejectionEvent ?? []
      ).map(
        (item: AccidentBenefitRejectionEventTypeormEntity) =>
          new AccidentBenefitRejectionEventEntity({
            id: new AccidentBenefitRejectionEventId(item.id),
            accidentDate: item.accidentDate,
            accidentDescription: item.accidentDescription,
            cidTenId:
              item.cidTen !== null && item.cidTen !== undefined
                ? new CidTenId(item.cidTen.id)
                : null,
            accidentBenefitRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const accidentBenefitRejectionEventDocument = (
        source.accidentBenefitRejectionEvent ?? []
      ).flatMap((event) =>
        (event.accidentBenefitRejectionEventDocument ?? []).map(
          (doc: AccidentBenefitRejectionEventDocumentTypeormEntity) =>
            new AccidentBenefitRejectionEventDocumentEntity({
              id: new AccidentBenefitRejectionEventDocumentId(doc.id),
              document: doc.fileName,
              type: doc.type,
              accidentBenefitRejectionEventId:
                new AccidentBenefitRejectionEventId(event.id),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const accidentBenefitRejectionWorkPeriod = (
        source.accidentBenefitRejectionWorkPeriod ?? []
      ).map(
        (item: AccidentBenefitRejectionWorkPeriodTypeormEntity) =>
          new AccidentBenefitRejectionWorkPeriodEntity({
            id: new AccidentBenefitRejectionWorkPeriodId(item.id),
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
            accidentBenefitRejectionId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const accidentBenefitRejectionWorkPeriodDocument = (
        source.accidentBenefitRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (workPeriod.accidentBenefitRejectionWorkPeriodDocument ?? []).map(
          (doc: AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity) =>
            new AccidentBenefitRejectionWorkPeriodDocumentEntity({
              id: new AccidentBenefitRejectionWorkPeriodDocumentId(doc.id),
              document: doc.fileName,
              type: doc.type,
              accidentBenefitRejectionWorkPeriodId:
                new AccidentBenefitRejectionWorkPeriodId(workPeriod.id),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const accidentBenefitRejectionWorkPeriodEarningsHistory = (
        source.accidentBenefitRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (
          workPeriod.accidentBenefitRejectionWorkPeriodEarningsHistory ?? []
        ).map(
          (
            item: AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
          ) =>
            new AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity({
              id: new AccidentBenefitRejectionWorkPeriodEarningsHistoryId(
                item.id,
              ),
              competence: item.competence,
              remuneration: item.remuneration,
              indicators: item.indicators,
              paymentDate: item.paymentDate,
              contribution: item.contribution,
              contributionSalary: item.contributionSalary,
              competenceBelowTheMinimum: item.competenceBelowTheMinimum,
              accidentBenefitRejectionWorkPeriodId:
                new AccidentBenefitRejectionWorkPeriodId(workPeriod.id),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      return GetAccidentBenefitRejectionWithRelationsQueryResult.build({
        accidentBenefitRejectionId: new AccidentBenefitRejectionId(source.id),
        analysisName: source.analysisName,
        requirementStartDate: source.requirementStartDate,
        rejectionDate: source.rejectionDate,
        category: source.category,
        mainAccidentBenefitRejectionReason:
          source.mainAccidentBenefitRejectionReason,
        otherAccidentBenefitRejectionReason:
          source.otherAccidentBenefitRejectionReason,
        hasPreviousGrantRelated: source.hasPreviousGrantRelated,
        previousGrantBenefitNumber: source.previousGrantBenefitNumber,
        previousGrantStartDate: source.previousGrantStartDate,
        previousGrantTerminationDate: source.previousGrantTerminationDate,
        requestToExtendTemporaryDisabilityBenefit:
          source.requestToExtendTemporaryDisabilityBenefit,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        accidentBenefitRejectionResult,
        accidentBenefitRejectionDocument,
        accidentBenefitRejectionInssBenefit,
        accidentBenefitRejectionEvent,
        accidentBenefitRejectionEventDocument,
        accidentBenefitRejectionWorkPeriod,
        accidentBenefitRejectionWorkPeriodDocument,
        accidentBenefitRejectionWorkPeriodEarningsHistory,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionTypeormEntity,
      GetAccidentBenefitRejectionWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetAccidentBenefitRejectionWithRelationsQueryResult,
    ): AccidentBenefitRejectionTypeormEntity => {
      const accidentBenefitRejectionResult =
        source.accidentBenefitRejectionResult !== null
          ? this.mapper.map(
              source.accidentBenefitRejectionResult,
              AccidentBenefitRejectionResultEntity,
              AccidentBenefitRejectionResultTypeormEntity,
            )
          : undefined;

      const accidentBenefitRejectionDocument = (
        source.accidentBenefitRejectionDocument ?? []
      ).map((item) =>
        AccidentBenefitRejectionDocumentTypeormEntity.build({
          id: item.id.toString(),
          fileName: item.document,
          type: item.type,
          accidentBenefitRejection: {
            id: source.accidentBenefitRejectionId.toString(),
          } as unknown as AccidentBenefitRejectionTypeormEntity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      );

      const accidentBenefitRejectionInssBenefit = (
        source.accidentBenefitRejectionInssBenefit ?? []
      ).map((item) =>
        AccidentBenefitRejectionInssBenefitTypeormEntity.build({
          id: item.id.toString(),
          inssBenefit: item.inssBenefit,
          accidentBenefitRejection: {
            id: source.accidentBenefitRejectionId.toString(),
          } as unknown as AccidentBenefitRejectionTypeormEntity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      );

      const accidentBenefitRejectionEvent = this.mapper.mapArray(
        source.accidentBenefitRejectionEvent ?? [],
        AccidentBenefitRejectionEventEntity,
        AccidentBenefitRejectionEventTypeormEntity,
      );

      const accidentBenefitRejectionWorkPeriod = this.mapper.mapArray(
        source.accidentBenefitRejectionWorkPeriod ?? [],
        AccidentBenefitRejectionWorkPeriodEntity,
        AccidentBenefitRejectionWorkPeriodTypeormEntity,
      );

      return AccidentBenefitRejectionTypeormEntity.build({
        id: source.accidentBenefitRejectionId.toString(),
        analysisName: source.analysisName,
        requirementStartDate: source.requirementStartDate,
        rejectionDate: source.rejectionDate,
        category: source.category,
        mainAccidentBenefitRejectionReason:
          source.mainAccidentBenefitRejectionReason,
        otherAccidentBenefitRejectionReason:
          source.otherAccidentBenefitRejectionReason,
        hasPreviousGrantRelated: source.hasPreviousGrantRelated,
        previousGrantBenefitNumber: source.previousGrantBenefitNumber,
        previousGrantStartDate: source.previousGrantStartDate,
        previousGrantTerminationDate: source.previousGrantTerminationDate,
        requestToExtendTemporaryDisabilityBenefit:
          source.requestToExtendTemporaryDisabilityBenefit,
        accidentBenefitRejectionResult,
        accidentBenefitRejectionDocument,
        accidentBenefitRejectionInssBenefit,
        accidentBenefitRejectionEvent,
        accidentBenefitRejectionWorkPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GetAccidentBenefitRejectionWithRelationsQueryResult,
      AccidentBenefitRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
