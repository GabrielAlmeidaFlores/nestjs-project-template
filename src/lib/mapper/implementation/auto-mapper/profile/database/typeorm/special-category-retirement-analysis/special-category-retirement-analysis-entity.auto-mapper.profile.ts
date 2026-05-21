import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-conversion-item.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-rule-item.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/result/get-special-category-retirement-analysis-with-relations.query.result';
import { GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/result/get-special-category-retirement-analysis-period-document.query.result';
import { GetSpecialCategoryRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/result/get-special-category-retirement-analysis-remuneration.query.result';
import { GetSpecialCategoryRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/result/get-special-category-retirement-analysis-result.query.result';
import { GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/query/result/get-special-category-retirement-analysis-result-conversion-item.query.result';
import { GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/query/result/get-special-category-retirement-analysis-result-rule-item.query.result';
import { GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/result/get-special-category-retirement-analysis-work-period.query.result';
import { SpecialCategoryRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    SpecialCategoryRetirementAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToWithRelationsQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisTypeormEntity,
    ): SpecialCategoryRetirementAnalysisEntity => {
      if (!source.analysisToolClient) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialCategoryRetirementAnalysisEntity.name,
          sourceClass: SpecialCategoryRetirementAnalysisTypeormEntity.name,
        });
      }

      return new SpecialCategoryRetirementAnalysisEntity({
        id: new SpecialCategoryRetirementAnalysisId(source.id),
        analysisToolClientId: new AnalysisToolClientId(
          source.analysisToolClient.id,
        ),
        analysisCustomName: source.analysisCustomName,
        retirementAnalysisObjectiveType: source.retirementAnalysisObjectiveType,
        publicServiceFederativeEntityName:
          source.publicServiceFederativeEntityName,
        publicServiceStateAbbreviation: source.publicServiceStateAbbreviation,
        hasConfirmedExposureToHarmfulAgents:
          source.hasConfirmedExposureToHarmfulAgents,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisTypeormEntity,
      SpecialCategoryRetirementAnalysisEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisEntity,
    ): SpecialCategoryRetirementAnalysisTypeormEntity => {
      return SpecialCategoryRetirementAnalysisTypeormEntity.build({
        id: source.id.toString(),
        analysisCustomName: source.analysisCustomName,
        retirementAnalysisObjectiveType: source.retirementAnalysisObjectiveType,
        publicServiceFederativeEntityName:
          source.publicServiceFederativeEntityName,
        publicServiceStateAbbreviation: source.publicServiceStateAbbreviation,
        hasConfirmedExposureToHarmfulAgents:
          source.hasConfirmedExposureToHarmfulAgents,
        analysisToolClient: {
          id: source.analysisToolClientId.toString(),
        } as unknown as AnalysisToolClientTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisEntity,
      SpecialCategoryRetirementAnalysisTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToWithRelationsQueryResult(): void {
    const convert = (
      source: SpecialCategoryRetirementAnalysisTypeormEntity,
    ): GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult => {
      const parentId = new SpecialCategoryRetirementAnalysisId(source.id);
      const analysisToolClientId = source.analysisToolClient
        ? new AnalysisToolClientId(source.analysisToolClient.id)
        : null;
      const workPeriodsOrm = source.workPeriods ?? [];

      const workPeriods = workPeriodsOrm.map((wp) => {
        const workPeriodResult =
          new GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult();
        Object.assign(workPeriodResult, {
          specialCategoryRetirementAnalysisWorkPeriodId:
            new SpecialCategoryRetirementAnalysisWorkPeriodId(wp.id),
          specialCategoryRetirementAnalysisId: parentId,
          publicServiceAdmissionDate: wp.publicServiceAdmissionDate,
          publicServiceCareerStartDate: wp.publicServiceCareerStartDate,
          workPeriodStartDate: wp.workPeriodStartDate,
          workPeriodEndDate: wp.workPeriodEndDate,
          jobPositionTitle: wp.jobPositionTitle,
          careerPathName: wp.careerPathName,
          publicServiceTypeCategory: wp.publicServiceTypeCategory,
          specialTimeRegistrationType: wp.specialTimeRegistrationType,
          effectiveSpecialWorkStartDate: wp.effectiveSpecialWorkStartDate,
          effectiveSpecialWorkEndDate: wp.effectiveSpecialWorkEndDate,
          createdAt: wp.createdAt,
          updatedAt: wp.updatedAt,
          deletedAt: wp.deletedAt,
        });
        return workPeriodResult;
      });

      const periodDocuments = workPeriodsOrm.flatMap((wp) =>
        (wp.periodDocuments ?? []).map((doc) => {
          const docResult =
            new GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult();
          Object.assign(docResult, {
            specialCategoryRetirementAnalysisPeriodDocumentId:
              new SpecialCategoryRetirementAnalysisPeriodDocumentId(doc.id),
            specialCategoryRetirementAnalysisWorkPeriodId:
              new SpecialCategoryRetirementAnalysisWorkPeriodId(wp.id),
            storedFileExternalName: doc.storedFileExternalName,
            originalFileUploadName: doc.originalFileUploadName,
            retirementDocumentTypeCategory: doc.retirementDocumentTypeCategory,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            deletedAt: doc.deletedAt,
          });
          return docResult;
        }),
      );

      const remunerations = (source.remunerations ?? []).map((rem) => {
        const remResult =
          new GetSpecialCategoryRetirementAnalysisRemunerationQueryResult();
        Object.assign(remResult, {
          specialCategoryRetirementAnalysisRemunerationId:
            new SpecialCategoryRetirementAnalysisRemunerationId(rem.id),
          specialCategoryRetirementAnalysisId: parentId,
          remunerationReferenceMonthYear: rem.remunerationReferenceMonthYear,
          remunerationGrossAmount:
            rem.remunerationGrossAmount !== null
              ? new DecimalValue(rem.remunerationGrossAmount)
              : null,
          createdAt: rem.createdAt,
          updatedAt: rem.updatedAt,
          deletedAt: rem.deletedAt,
        });
        return remResult;
      });

      const analysisResult = source.analysisResult
        ? this.mapper.map(
            source.analysisResult,
            SpecialCategoryRetirementAnalysisResultTypeormEntity,
            GetSpecialCategoryRetirementAnalysisResultQueryResult,
          )
        : null;

      const conversionItems = source.analysisResult?.conversionItems
        ? source.analysisResult.conversionItems.map((item) =>
            this.mapper.map(
              item,
              SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
              GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult,
            ),
          )
        : [];

      const ruleItems = source.analysisResult?.ruleItems
        ? source.analysisResult.ruleItems.map((item) =>
            this.mapper.map(
              item,
              SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
              GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult,
            ),
          )
        : [];

      const result =
        new GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult();
      Object.assign(result, {
        id: parentId,
        specialCategoryRetirementAnalysisId: parentId,
        analysisToolRecordId: source.analysisToolRecord
          ? new AnalysisToolRecordId(source.analysisToolRecord.id)
          : null,
        analysisToolClientId,
        analysisCustomName: source.analysisCustomName,
        retirementAnalysisObjectiveType: source.retirementAnalysisObjectiveType,
        publicServiceFederativeEntityName:
          source.publicServiceFederativeEntityName,
        publicServiceStateAbbreviation: source.publicServiceStateAbbreviation,
        hasConfirmedExposureToHarmfulAgents:
          source.hasConfirmedExposureToHarmfulAgents,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        workPeriods,
        periodDocuments,
        remunerations,
        analysisResult,
        conversionItems,
        ruleItems,
      });
      return result;
    };

    createMap(
      this.mapper,
      SpecialCategoryRetirementAnalysisTypeormEntity,
      GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult,
      constructUsing(convert),
    );
  }
}
