import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryDisabilityBenefitsGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/result/get-temporary-disability-benefits-grant-with-relations.query.result';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity';
import { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';
import { TemporaryDisabilityBenefitsGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit.entity';
import { TemporaryDisabilityBenefitsGrantInssBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/value-object/temporary-disability-benefits-grant-inss-benefit-id.value-object';
import { TemporaryDisabilityBenefitsGrantInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/value-object/temporary-disability-benefits-grant-insured-status-document-id.value-object';
import { TemporaryDisabilityBenefitsGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding.entity';
import { TemporaryDisabilityBenefitsGrantLegalProceedingId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/value-object/temporary-disability-benefits-grant-legal-proceeding-id.value-object';
import { TemporaryDisabilityBenefitsGrantPeriodEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.entity';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/value-object/temporary-disability-benefits-grant-period-document-id.value-object';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/value-object/temporary-disability-benefits-grant-previous-benefits-document-id.value-object';
import { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/value-object/temporary-disability-benefits-grant-work-periods-earnings-history-id.value-object';

import type { TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-inss-benefit.typeorm.entity';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status-document.typeorm.entity';
import type { TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-legal-proceeding.typeorm.entity';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period-document.typeorm.entity';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits-document.typeorm.entity';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.entity';

@Injectable()
export class GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: TemporaryDisabilityBenefitsGrantTypeormEntity,
    ): GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult => {
      const grantEntity = this.mapper.map(
        source,
        TemporaryDisabilityBenefitsGrantTypeormEntity,
        TemporaryDisabilityBenefitsGrantEntity,
      );

      const temporaryDisabilityBenefitsGrantResult =
        source.temporaryDisabilityBenefitsGrantResult !== null &&
        source.temporaryDisabilityBenefitsGrantResult !== undefined
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsGrantResult,
              TemporaryDisabilityBenefitsGrantResultTypeormEntity,
              TemporaryDisabilityBenefitsGrantResultEntity,
            )
          : null;

      const temporaryDisabilityBenefitsGrantDocument = (
        source.temporaryDisabilityBenefitsGrantDocument ?? []
      ).map(
        (item) =>
          new TemporaryDisabilityBenefitsGrantDocumentEntity({
            id: new TemporaryDisabilityBenefitsGrantDocumentId(item.id),
            fileName: item.fileName,
            type: item.type,
            temporaryDisabilityBenefitsGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const temporaryDisabilityBenefitsGrantInsuredStatus = (
        source.temporaryDisabilityBenefitsGrantInsuredStatus ?? []
      ).map(
        (item) =>
          new TemporaryDisabilityBenefitsGrantInsuredStatusEntity({
            id: new TemporaryDisabilityBenefitsGrantInsuredStatusId(item.id),
            involuntaryUnemployment: item.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              item.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: item.ruralInsuredClient,
            ruralPeriodStartDate: item.ruralPeriodStartDate,
            ruralPeriodEndDate: item.ruralPeriodEndDate,
            documentsDescription: item.documentsDescription,
            temporaryDisabilityBenefitsGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const temporaryDisabilityBenefitsGrantInsuredStatusDocument = (
        source.temporaryDisabilityBenefitsGrantInsuredStatus ?? []
      ).flatMap((insuredStatus) =>
        (
          insuredStatus.temporaryDisabilityBenefitsGrantInsuredStatusDocument ??
          []
        ).map(
          (
            doc: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
          ) =>
            new TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity({
              id: new TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId(
                doc.id,
              ),
              fileName: doc.fileName,
              type: doc.type,
              temporaryDisabilityBenefitsGrantInsuredStatusId:
                new TemporaryDisabilityBenefitsGrantInsuredStatusId(
                  insuredStatus.id,
                ),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const temporaryDisabilityBenefitsGrantPeriod = (
        source.temporaryDisabilityBenefitsGrantPeriod ?? []
      ).map(
        (item) =>
          new TemporaryDisabilityBenefitsGrantPeriodEntity({
            id: new TemporaryDisabilityBenefitsGrantPeriodId(item.id),
            startDate: item.startDate,
            cidTenId: item.cidTenId,
            description: item.description,
            jobDerivatedDisability: item.jobDerivatedDisability,
            disablingConditionDescription: item.disablingConditionDescription,
            disabilityFromSevereDisease: item.disabilityFromSevereDisease,
            severeDisease: item.severeDisease,
            diseaseStartDate: item.diseaseStartDate,
            needsConstantAssistanceFromAnotherPerson:
              item.needsConstantAssistanceFromAnotherPerson,
            temporaryDisabilityBenefitsGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const temporaryDisabilityBenefitsGrantPeriodDocument = (
        source.temporaryDisabilityBenefitsGrantPeriod ?? []
      ).flatMap((period) =>
        (period.temporaryDisabilityBenefitsGrantPeriodDocument ?? []).map(
          (doc: TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity) =>
            new TemporaryDisabilityBenefitsGrantPeriodDocumentEntity({
              id: new TemporaryDisabilityBenefitsGrantPeriodDocumentId(doc.id),
              fileName: doc.fileName,
              type: doc.type,
              temporaryDisabilityBenefitsGrantPeriodId:
                new TemporaryDisabilityBenefitsGrantPeriodId(period.id),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const temporaryDisabilityBenefitsGrantPreviousBenefits = (
        source.temporaryDisabilityBenefitsGrantPeriod ?? []
      ).flatMap((period) =>
        (period.temporaryDisabilityBenefitsGrantPreviousBenefits ?? []).map(
          (
            item: TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
          ) =>
            new TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity({
              id: new TemporaryDisabilityBenefitsGrantPreviousBenefitsId(
                item.id,
              ),
              benefitNumber: item.benefitNumber,
              temporaryDisabilityBenefitsGrantPeriodId:
                new TemporaryDisabilityBenefitsGrantPeriodId(period.id),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      const temporaryDisabilityBenefitsGrantPreviousBenefitsDocument = (
        source.temporaryDisabilityBenefitsGrantPeriod ?? []
      ).flatMap((period) =>
        (period.temporaryDisabilityBenefitsGrantPreviousBenefits ?? []).flatMap(
          (
            previousBenefits: TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
          ) =>
            (
              previousBenefits.temporaryDisabilityBenefitsGrantPreviousBenefitsDocument ??
              []
            ).map(
              (
                doc: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
              ) =>
                new TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity(
                  {
                    id: new TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId(
                      doc.id,
                    ),
                    fileName: doc.fileName,
                    type: doc.type,
                    temporaryDisabilityBenefitsGrantPreviousBenefitsId:
                      new TemporaryDisabilityBenefitsGrantPreviousBenefitsId(
                        previousBenefits.id,
                      ),
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt,
                    deletedAt: doc.deletedAt,
                  },
                ),
            ),
        ),
      );

      const temporaryDisabilityBenefitsGrantWorkPeriods = (
        source.temporaryDisabilityBenefitsGrantWorkPeriods ?? []
      ).map(
        (item) =>
          new TemporaryDisabilityBenefitsGrantWorkPeriodsEntity({
            id: new TemporaryDisabilityBenefitsGrantWorkPeriodsId(item.id),
            bondOrigin: item.bondOrigin,
            startDate: item.startDate,
            endDate: item.endDate,
            category: item.category,
            competenceBelowTheMinimum: item.competenceBelowTheMinimum,
            pendencyReason: item.pendencyReason,
            periodConsideration: item.periodConsideration,
            contributionAverage:
              item.contributionAverage !== null
                ? new DecimalValue(item.contributionAverage)
                : null,
            status: item.status,
            gracePeriod: item.gracePeriod,
            temporaryDisabilityBenefitsGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory = (
        source.temporaryDisabilityBenefitsGrantWorkPeriods ?? []
      ).flatMap((workPeriod) =>
        (
          workPeriod.temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory ??
          []
        ).map(
          (
            item: TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
          ) =>
            new TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity(
              {
                id: new TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId(
                  item.id,
                ),
                competence: item.competence,
                remuneration: item.remuneration,
                indicators: item.indicators,
                paymentDate: item.paymentDate,
                contribution: item.contribution,
                contributionSalary: item.contributionSalary,
                competenceBelowTheMinimum: item.competenceBelowTheMinimum,
                temporaryDisabilityBenefitsGrantWorkPeriodsId:
                  new TemporaryDisabilityBenefitsGrantWorkPeriodsId(
                    workPeriod.id,
                  ),
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                deletedAt: item.deletedAt,
              },
            ),
        ),
      );

      const temporaryDisabilityBenefitsGrantInssBenefit = (
        source.temporaryDisabilityBenefitsGrantInssBenefit ?? []
      ).map(
        (item: TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity) =>
          new TemporaryDisabilityBenefitsGrantInssBenefitEntity({
            id: new TemporaryDisabilityBenefitsGrantInssBenefitId(item.id),
            inssBenefit: item.inssBenefit,
            temporaryDisabilityBenefitsGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const temporaryDisabilityBenefitsGrantLegalProceeding = (
        source.temporaryDisabilityBenefitsGrantLegalProceeding ?? []
      ).map(
        (item: TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity) =>
          new TemporaryDisabilityBenefitsGrantLegalProceedingEntity({
            id: new TemporaryDisabilityBenefitsGrantLegalProceedingId(item.id),
            legalProceedingNumber: item.legalProceedingNumber,
            temporaryDisabilityBenefitsGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      return GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult.build({
        temporaryDisabilityBenefitsGrantId:
          new TemporaryDisabilityBenefitsGrantId(source.id),
        category: source.category,
        analysisName: source.analysisName,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        temporaryDisabilityBenefitsGrantResult,
        temporaryDisabilityBenefitsGrantDocument,
        temporaryDisabilityBenefitsGrantInsuredStatus,
        temporaryDisabilityBenefitsGrantInsuredStatusDocument,
        temporaryDisabilityBenefitsGrantPeriod,
        temporaryDisabilityBenefitsGrantPeriodDocument,
        temporaryDisabilityBenefitsGrantPreviousBenefits,
        temporaryDisabilityBenefitsGrantPreviousBenefitsDocument,
        temporaryDisabilityBenefitsGrantWorkPeriods,
        temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory,
        temporaryDisabilityBenefitsGrantInssBenefit,
        temporaryDisabilityBenefitsGrantLegalProceeding,
      });
    };

    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsGrantTypeormEntity,
      GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult,
    ): TemporaryDisabilityBenefitsGrantTypeormEntity => {
      const temporaryDisabilityBenefitsGrantResult =
        source.temporaryDisabilityBenefitsGrantResult !== null
          ? this.mapper.map(
              source.temporaryDisabilityBenefitsGrantResult,
              TemporaryDisabilityBenefitsGrantResultEntity,
              TemporaryDisabilityBenefitsGrantResultTypeormEntity,
            )
          : undefined;

      const temporaryDisabilityBenefitsGrantDocument = (
        source.temporaryDisabilityBenefitsGrantDocument ?? []
      ).map((item) =>
        TemporaryDisabilityBenefitsGrantDocumentTypeormEntity.build({
          id: item.id.toString(),
          fileName: item.fileName,
          type: item.type,
          temporaryDisabilityBenefitsGrant: {
            id: source.temporaryDisabilityBenefitsGrantId.toString(),
          } as unknown as TemporaryDisabilityBenefitsGrantTypeormEntity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      );

      const temporaryDisabilityBenefitsGrantInsuredStatus =
        this.mapper.mapArray(
          source.temporaryDisabilityBenefitsGrantInsuredStatus ?? [],
          TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
          TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
        );

      const temporaryDisabilityBenefitsGrantPeriod = this.mapper.mapArray(
        source.temporaryDisabilityBenefitsGrantPeriod ?? [],
        TemporaryDisabilityBenefitsGrantPeriodEntity,
        TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
      );

      const temporaryDisabilityBenefitsGrantWorkPeriods = this.mapper.mapArray(
        source.temporaryDisabilityBenefitsGrantWorkPeriods ?? [],
        TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
        TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
      );

      return TemporaryDisabilityBenefitsGrantTypeormEntity.build({
        id: source.temporaryDisabilityBenefitsGrantId.toString(),
        category: source.category,
        analysisName: source.analysisName,
        temporaryDisabilityBenefitsGrantResult,
        temporaryDisabilityBenefitsGrantDocument,
        temporaryDisabilityBenefitsGrantInsuredStatus,
        temporaryDisabilityBenefitsGrantPeriod,
        temporaryDisabilityBenefitsGrantWorkPeriods,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult,
      TemporaryDisabilityBenefitsGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
