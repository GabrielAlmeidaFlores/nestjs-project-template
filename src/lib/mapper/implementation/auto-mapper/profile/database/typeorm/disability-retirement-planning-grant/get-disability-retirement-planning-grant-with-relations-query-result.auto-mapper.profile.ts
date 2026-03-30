import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-result.typeorm.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-time-accelerator.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { GetDisabilityRetirementPlanningGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/result/get-disability-retirement-planning-grant-with-relations.query.result';
import { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/value-object/disability-retirement-planning-grant-disability-period-document-id.value-object';
import { DisabilityRetirementPlanningGrantDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity';
import { DisabilityRetirementPlanningGrantDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/value-object/disability-retirement-planning-grant-document-id.value-object';
import { DisabilityRetirementPlanningGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.entity';
import { DisabilityRetirementPlanningGrantInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/value-object/disability-retirement-planning-grant-inss-benefit-id.value-object';
import { DisabilityRetirementPlanningGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/value-object/disability-retirement-planning-grant-legal-proceeding-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.entity';
import { DisabilityRetirementPlanningGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/value-object/disability-retirement-planning-grant-period-document-id.value-object';
import { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: DisabilityRetirementPlanningGrantTypeormEntity,
    ): GetDisabilityRetirementPlanningGrantWithRelationsQueryResult => {
      const grantEntity = this.mapper.map(
        source,
        DisabilityRetirementPlanningGrantTypeormEntity,
        DisabilityRetirementPlanningGrantEntity,
      );

      const disabilityRetirementPlanningGrantResult =
        source.disabilityRetirementPlanningGrantResult !== null &&
        source.disabilityRetirementPlanningGrantResult !== undefined
          ? this.mapper.map(
              source.disabilityRetirementPlanningGrantResult,
              DisabilityRetirementPlanningGrantResultTypeormEntity,
              DisabilityRetirementPlanningGrantResultEntity,
            )
          : null;

      const disabilityRetirementPlanningGrantDocument = (
        source.disabilityRetirementPlanningGrantDocument ?? []
      ).map(
        (item) =>
          new DisabilityRetirementPlanningGrantDocumentEntity({
            id: new DisabilityRetirementPlanningGrantDocumentId(item.id),
            document: item.document,
            type: item.type,
            disabilityRetirementPlanningGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const disabilityRetirementPlanningGrantInssBenefit = (
        source.disabilityRetirementPlanningGrantInssBenefit ?? []
      ).map(
        (item) =>
          new DisabilityRetirementPlanningGrantInssBenefitEntity({
            id: new DisabilityRetirementPlanningGrantInssBenefitId(item.id),
            inssBenefit: item.inssBenefit,
            disabilityRetirementPlanningGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const disabilityRetirementPlanningGrantLegalProceeding = (
        source.disabilityRetirementPlanningGrantLegalProceeding ?? []
      ).map(
        (item) =>
          new DisabilityRetirementPlanningGrantLegalProceedingEntity({
            id: new DisabilityRetirementPlanningGrantLegalProceedingId(item.id),
            legalProceedingNumber: item.legalProceedingNumber,
            disabilityRetirementPlanningGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const disabilityRetirementPlanningGrantPeriod = (
        source.disabilityRetirementPlanningGrantPeriod ?? []
      ).map(
        (item) =>
          new DisabilityRetirementPlanningGrantPeriodEntity({
            id: new DisabilityRetirementPlanningGrantPeriodId(item.id),
            startDate: item.startDate,
            endDate: item.endDate,
            category: item.category,
            isPendency: item.isPendency,
            competenceBelowTheMinimum: item.competenceBelowTheMinimum,
            pendencyReason: item.pendencyReason,
            typeOfContribution: item.typeOfContribution,
            status: item.status,
            disabilityStatus: item.disabilityStatus,
            periodConsideration: item.periodConsideration,
            contributionAverage:
              item.contributionAverage !== null
                ? new DecimalValue(item.contributionAverage)
                : null,
            bondOrigin: item.bondOrigin,
            disabilityRetirementPlanningGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const disabilityRetirementPlanningGrantDisabilityPeriod = (
        source.disabilityRetirementPlanningGrantDisabilityPeriod ?? []
      ).map(
        (item) =>
          new DisabilityRetirementPlanningGrantDisabilityPeriodEntity({
            id: new DisabilityRetirementPlanningGrantDisabilityPeriodId(
              item.id,
            ),
            disabilityDegree: item.disabilityDegree,
            disabilityCategory: item.disabilityCategory,
            disabilityDescription: item.disabilityDescription,
            dailyImpact: item.dailyImpact,
            startDate: item.startDate,
            endDate: item.endDate,
            cidTenId: item.cidTenId,
            disabilityRetirementPlanningGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const disabilityRetirementPlanningGrantTimeAccelerator = (
        source.disabilityRetirementPlanningGrantTimeAccelerator ?? []
      ).map(
        (item) =>
          new DisabilityRetirementPlanningGrantTimeAcceleratorEntity({
            id: new DisabilityRetirementPlanningGrantTimeAcceleratorId(item.id),
            type: item.type,
            recognitionInss: item.recognitionInss,
            recognitionJudicial: item.recognitionJudicial,
            viability: item.viability,
            technicalNote: item.technicalNote,
            startDate: item.startDate,
            endDate: item.endDate,
            institution: item.institution,
            affectsQualifyingPeriod: item.affectsQualifyingPeriod,
            disabilityRetirementPlanningGrantId: grantEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const disabilityRetirementPlanningGrantPeriodDocument = (
        source.disabilityRetirementPlanningGrantPeriod ?? []
      ).flatMap((period) =>
        (period.disabilityRetirementPlanningGrantPeriodDocument ?? []).map(
          (doc) =>
            new DisabilityRetirementPlanningGrantPeriodDocumentEntity({
              id: new DisabilityRetirementPlanningGrantPeriodDocumentId(doc.id),
              document: doc.document,
              disabilityRetirementPlanningGrantPeriodId:
                new DisabilityRetirementPlanningGrantPeriodId(period.id),
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              deletedAt: doc.deletedAt,
            }),
        ),
      );

      const disabilityRetirementPlanningGrantDisabilityPeriodDocument = (
        source.disabilityRetirementPlanningGrantDisabilityPeriod ?? []
      ).flatMap((disabilityPeriod) =>
        (
          disabilityPeriod.disabilityRetirementPlanningGrantDisabilityPeriodDocument ??
          []
        ).map(
          (doc) =>
            new DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity(
              {
                id: new DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId(
                  doc.id,
                ),
                document: doc.document,
                type: doc.type,
                disabilityRetirementPlanningGrantDisabilityPeriodId:
                  new DisabilityRetirementPlanningGrantDisabilityPeriodId(
                    disabilityPeriod.id,
                  ),
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt,
                deletedAt: doc.deletedAt,
              },
            ),
        ),
      );

      return GetDisabilityRetirementPlanningGrantWithRelationsQueryResult.build(
        {
          id: new DisabilityRetirementPlanningGrantId(source.id),
          category: source.category,
          analysisName: source.analysisName,
          longPrizeDisability: source.longPrizeDisability,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          disabilityRetirementPlanningGrantResult,
          disabilityRetirementPlanningGrantDocument,
          disabilityRetirementPlanningGrantInssBenefit,
          disabilityRetirementPlanningGrantLegalProceeding,
          disabilityRetirementPlanningGrantPeriod,
          disabilityRetirementPlanningGrantPeriodDocument,
          disabilityRetirementPlanningGrantDisabilityPeriod,
          disabilityRetirementPlanningGrantDisabilityPeriodDocument,
          disabilityRetirementPlanningGrantTimeAccelerator,
        },
      );
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantTypeormEntity,
      GetDisabilityRetirementPlanningGrantWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetDisabilityRetirementPlanningGrantWithRelationsQueryResult,
    ): DisabilityRetirementPlanningGrantTypeormEntity => {
      const disabilityRetirementPlanningGrantResult =
        source.disabilityRetirementPlanningGrantResult !== null
          ? this.mapper.map(
              source.disabilityRetirementPlanningGrantResult,
              DisabilityRetirementPlanningGrantResultEntity,
              DisabilityRetirementPlanningGrantResultTypeormEntity,
            )
          : undefined;

      const disabilityRetirementPlanningGrantDocument = (
        source.disabilityRetirementPlanningGrantDocument ?? []
      ).map((item) =>
        DisabilityRetirementPlanningGrantDocumentTypeormEntity.build({
          id: item.id.toString(),
          document: item.document,
          type: item.type,
          disabilityRetirementPlanningGrant: {
            id: source.id.toString(),
          } as unknown as DisabilityRetirementPlanningGrantTypeormEntity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      );

      const disabilityRetirementPlanningGrantInssBenefit = this.mapper.mapArray(
        source.disabilityRetirementPlanningGrantInssBenefit ?? [],
        DisabilityRetirementPlanningGrantInssBenefitEntity,
        DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
      );

      const disabilityRetirementPlanningGrantLegalProceeding =
        this.mapper.mapArray(
          source.disabilityRetirementPlanningGrantLegalProceeding ?? [],
          DisabilityRetirementPlanningGrantLegalProceedingEntity,
          DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
        );

      const disabilityRetirementPlanningGrantPeriod = this.mapper.mapArray(
        source.disabilityRetirementPlanningGrantPeriod ?? [],
        DisabilityRetirementPlanningGrantPeriodEntity,
        DisabilityRetirementPlanningGrantPeriodTypeormEntity,
      );

      const disabilityRetirementPlanningGrantDisabilityPeriod =
        this.mapper.mapArray(
          source.disabilityRetirementPlanningGrantDisabilityPeriod ?? [],
          DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
          DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
        );

      const disabilityRetirementPlanningGrantTimeAccelerator =
        this.mapper.mapArray(
          source.disabilityRetirementPlanningGrantTimeAccelerator ?? [],
          DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
          DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
        );

      return DisabilityRetirementPlanningGrantTypeormEntity.build({
        id: source.id.toString(),
        category: source.category,
        analysisName: source.analysisName,
        longPrizeDisability: source.longPrizeDisability,
        disabilityRetirementPlanningGrantResult,
        disabilityRetirementPlanningGrantDocument,
        disabilityRetirementPlanningGrantInssBenefit,
        disabilityRetirementPlanningGrantLegalProceeding,
        disabilityRetirementPlanningGrantPeriod,
        disabilityRetirementPlanningGrantDisabilityPeriod,
        disabilityRetirementPlanningGrantTimeAccelerator,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningGrantWithRelationsQueryResult,
      DisabilityRetirementPlanningGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
