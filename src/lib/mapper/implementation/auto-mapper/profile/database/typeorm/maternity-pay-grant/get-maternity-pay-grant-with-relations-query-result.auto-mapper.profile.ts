import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { MaternityPayGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-result.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { GetMaternityPayGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/result/get-maternity-pay-grant-with-relations.query.result';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/maternity-pay-grant-document.entity';
import { MaternityPayGrantDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/value-object/maternity-pay-grant-document-id.value-object';
import { MaternityPayGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity';
import { MaternityPayGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/value-object/maternity-pay-grant-earnings-history-id.value-object';
import { MaternityPayGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity';
import { MaternityPayGrantInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/value-object/maternity-pay-grant-inss-benefit-id.value-object';
import { MaternityPayGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity';
import { MaternityPayGrantLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/value-object/maternity-pay-grant-legal-proceeding-id.value-object';
import { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { MaternityPayGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/maternity-pay-grant-period-document.entity';
import { MaternityPayGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/value-object/maternity-pay-grant-period-document-id.value-object';
import { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';

@Injectable()
export class GetMaternityPayGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMaternityPayGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: MaternityPayGrantTypeormEntity,
    ): GetMaternityPayGrantWithRelationsQueryResult => {
      const maternityPayGrantEntity = this.mapper.map(
        source,
        MaternityPayGrantTypeormEntity,
        MaternityPayGrantEntity,
      );

      const maternityPayGrantResult =
        source.maternityPayGrantResult !== null &&
        source.maternityPayGrantResult !== undefined
          ? this.mapper.map(
              source.maternityPayGrantResult,
              MaternityPayGrantResultTypeormEntity,
              MaternityPayGrantResultEntity,
            )
          : null;

      const maternityPayGrantInssBenefit = (
        source.maternityPayGrantInssBenefit ?? []
      ).map(
        (item) =>
          new MaternityPayGrantInssBenefitEntity({
            id: new MaternityPayGrantInssBenefitId(item.id),
            inssBenefitNumber: item.inssBenefitNumber,
            maternityPayGrantId: maternityPayGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayGrantLegalProceeding = (
        source.maternityPayGrantLegalProceeding ?? []
      ).map(
        (item) =>
          new MaternityPayGrantLegalProceedingEntity({
            id: new MaternityPayGrantLegalProceedingId(item.id),
            legalProceedingNumber: item.legalProceedingNumber,
            maternityPayGrantId: maternityPayGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayGrantDocument = (
        source.maternityPayGrantDocument ?? []
      ).map(
        (item) =>
          new MaternityPayGrantDocumentEntity({
            id: new MaternityPayGrantDocumentId(item.id),
            document: item.document,
            type: item.type,
            maternityPayGrantId: maternityPayGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayGrantPeriod = (
        source.maternityPayGrantPeriod ?? []
      ).map(
        (item) =>
          new MaternityPayGrantPeriodEntity({
            id: new MaternityPayGrantPeriodId(item.id),
            startDate: item.startDate,
            endDate: item.endDate,
            category: item.category,
            isPendency: item.isPendency,
            competenceBelowTheMinimum: item.competenceBelowTheMinimum,
            pendencyReason: item.pendencyReason,
            typeOfContribution: item.typeOfContribution,
            status: item.status,
            periodConsideration: item.periodConsideration,
            contributionAverage:
              item.contributionAverage !== null
                ? new DecimalValue(item.contributionAverage)
                : null,
            bondOrigin: item.bondOrigin,
            maternityPayGrantId: maternityPayGrantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const maternityPayGrantPeriodDocument = (
        source.maternityPayGrantPeriod ?? []
      ).flatMap((period) =>
        (period.maternityPayGrantPeriodDocument ?? []).map(
          (doc) =>
            new MaternityPayGrantPeriodDocumentEntity({
              id: new MaternityPayGrantPeriodDocumentId(doc.id),
              document: doc.document,
              maternityPayGrantPeriodId: new MaternityPayGrantPeriodId(
                period.id,
              ),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const maternityPayGrantEarningsHistory = (
        source.maternityPayGrantEarningsHistory ?? []
      ).map(
        (item) =>
          new MaternityPayGrantEarningsHistoryEntity({
            id: new MaternityPayGrantEarningsHistoryId(item.id),
            competence: item.competence,
            remuneration: item.remuneration,
            indicators: item.indicators,
            paymentDate: item.paymentDate,
            contribution: item.contribution,
            contributionSalary: item.contributionSalary,
            analysis: item.analysis,
            competenceBelowTheMinimum: item.competenceBelowTheMinimum,
            maternityPayGrantId: maternityPayGrantEntity.id,
            maternityPayGrantPeriodId:
              item.maternityPayGrantPeriod !== null &&
              item.maternityPayGrantPeriod !== undefined
                ? new MaternityPayGrantPeriodId(item.maternityPayGrantPeriod.id)
                : null,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      return GetMaternityPayGrantWithRelationsQueryResult.build({
        id: new MaternityPayGrantId(source.id),
        analysisName: source.analysisName,
        category: source.category,
        triggeringEvent: source.triggeringEvent,
        triggeringEventDate: source.triggeringEventDate,
        cnisDocument: source.cnisDocument,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        isUnemployedAtTriggeringEventDate:
          source.isUnemployedAtTriggeringEventDate,
        isRuralInsured: source.isRuralInsured,
        ruralPeriodStartDate: source.ruralPeriodStartDate,
        ruralPeriodEndDate: source.ruralPeriodEndDate,
        ruralPeriodDocumentDescription: source.ruralPeriodDocumentDescription,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        maternityPayGrantResult,
        maternityPayGrantInssBenefit,
        maternityPayGrantLegalProceeding,
        maternityPayGrantDocument,
        maternityPayGrantPeriod,
        maternityPayGrantPeriodDocument,
        maternityPayGrantEarningsHistory,
      });
    };

    createMap(
      this.mapper,
      MaternityPayGrantTypeormEntity,
      GetMaternityPayGrantWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetMaternityPayGrantWithRelationsQueryResult,
    ): MaternityPayGrantTypeormEntity => {
      const maternityPayGrantResult =
        source.maternityPayGrantResult !== null
          ? this.mapper.map(
              source.maternityPayGrantResult,
              MaternityPayGrantResultEntity,
              MaternityPayGrantResultTypeormEntity,
            )
          : undefined;

      return MaternityPayGrantTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category: source.category,
        triggeringEvent: source.triggeringEvent,
        triggeringEventDate: source.triggeringEventDate,
        cnisDocument: source.cnisDocument,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        isUnemployedAtTriggeringEventDate:
          source.isUnemployedAtTriggeringEventDate,
        isRuralInsured: source.isRuralInsured,
        ruralPeriodStartDate: source.ruralPeriodStartDate,
        ruralPeriodEndDate: source.ruralPeriodEndDate,
        ruralPeriodDocumentDescription: source.ruralPeriodDocumentDescription,
        myInssPassword: null,
        maternityPayGrantResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GetMaternityPayGrantWithRelationsQueryResult,
      MaternityPayGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
