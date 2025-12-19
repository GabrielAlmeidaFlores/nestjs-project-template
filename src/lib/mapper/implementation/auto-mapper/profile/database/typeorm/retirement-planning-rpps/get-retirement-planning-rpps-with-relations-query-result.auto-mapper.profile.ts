import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-inss-benefit.typeorm.entity';
import { RetirementPlanningRppsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-legal-proceeding.typeorm.entity';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningRppsRemunerationCalculationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration-calculation.typeorm.entity';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetRetirementPlanningRppsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps-with-relations.query.result';
import { GetRetirementPlanningRppsInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-inss-benefit/query/result/get-retirement-planning-rpps-inss-benefit.query.result';
import { GetRetirementPlanningRppsLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-legal-proceeding/query/result/get-retirement-planning-rpps-legal-proceeding.query.result';
import { GetRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/query/result/get-retirement-planning-rpps-period.query.result';
import { GetRetirementPlanningRppsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/query/result/get-retirement-planning-rpps-period-document.query.result';
import { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import { GetRetirementPlanningRppsRemunerationCalculationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/query/result/get-retirement-planning-rpps-remuneration-calculation.query.result';
import { GetRetirementPlanningRppsResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/query/result/get-retirement-planning-rpps-result.query.result';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsTypeormEntity,
    ): GetRetirementPlanningRppsWithRelationsQueryResult => {
      if (
        !source.retirementPlanningRppsInssBenefit ||
        !source.retirementPlanningRppsLegalProceeding
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetRetirementPlanningRppsWithRelationsQueryResult.name,
          sourceClass: RetirementPlanningRppsTypeormEntity.name,
        });
      }
      const retirementPlanningRppsResult = source.retirementPlanningRppsResult
        ? this.mapper.map(
            source.retirementPlanningRppsResult,
            RetirementPlanningRppsResultTypeormEntity,
            GetRetirementPlanningRppsResultQueryResult,
          )
        : null;

      const retirementPlanningRppsRemunerationCalculation =
        source.retirementPlanningRppsRemunerationCalculation
          ? this.mapper.map(
              source.retirementPlanningRppsRemunerationCalculation,
              RetirementPlanningRppsRemunerationCalculationTypeormEntity,
              GetRetirementPlanningRppsRemunerationCalculationQueryResult,
            )
          : null;

      const remunerations = source.remunerations
        ? this.mapper.mapArray(
            source.remunerations,
            RetirementPlanningRppsRemunerationTypeormEntity,
            GetRetirementPlanningRppsRemunerationQueryResult,
          )
        : [];

      const periods = source.periods
        ? this.mapper.mapArray(
            source.periods,
            RetirementPlanningRppsPeriodTypeormEntity,
            GetRetirementPlanningRppsPeriodQueryResult,
          )
        : [];

      const retirementPlanningRppsInssBenefit = this.mapper.mapArray(
        source.retirementPlanningRppsInssBenefit,
        RetirementPlanningRppsInssBenefitTypeormEntity,
        GetRetirementPlanningRppsInssBenefitQueryResult,
      );

      const retirementPlanningRppsLegalProceeding = this.mapper.mapArray(
        source.retirementPlanningRppsLegalProceeding,
        RetirementPlanningRppsLegalProceedingTypeormEntity,
        GetRetirementPlanningRppsLegalProceedingQueryResult,
      );

      const ctcDocuments = source.documents
        ? this.mapper.mapArray(
            source.documents,
            RetirementPlanningRppsPeriodDocumentTypeormEntity,
            GetRetirementPlanningRppsPeriodDocumentQueryResult,
          )
        : [];

      return GetRetirementPlanningRppsWithRelationsQueryResult.build({
        id: new RetirementPlanningRppsId(source.id),
        careerStartDate: source.careerStartDate,
        publicServiceStartDate: source.publicServiceStartDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        retirementPlanningRppsResult,
        retirementPlanningRppsRemunerationCalculation,
        retirementPlanningRppsInssBenefit,
        retirementPlanningRppsLegalProceeding,
        ctcDocuments,
        remunerations,
        periods,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsTypeormEntity,
      GetRetirementPlanningRppsWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsWithRelationsQueryResult,
    ): RetirementPlanningRppsTypeormEntity => {
      const retirementPlanningRppsResult = source.retirementPlanningRppsResult
        ? this.mapper.map(
            source.retirementPlanningRppsResult,
            GetRetirementPlanningRppsResultQueryResult,
            RetirementPlanningRppsResultTypeormEntity,
          )
        : undefined;

      const remunerations = source.remunerations
        ? this.mapper.mapArray(
            source.remunerations,
            GetRetirementPlanningRppsRemunerationQueryResult,
            RetirementPlanningRppsRemunerationTypeormEntity,
          )
        : undefined;

      const periods = source.periods
        ? this.mapper.mapArray(
            source.periods,
            GetRetirementPlanningRppsPeriodQueryResult,
            RetirementPlanningRppsPeriodTypeormEntity,
          )
        : undefined;

      const retirementPlanningRppsInssBenefit =
        source.retirementPlanningRppsInssBenefit
          ? this.mapper.mapArray(
              source.retirementPlanningRppsInssBenefit,
              GetRetirementPlanningRppsInssBenefitQueryResult,
              RetirementPlanningRppsInssBenefitTypeormEntity,
            )
          : [];

      const retirementPlanningRppsLegalProceeding =
        source.retirementPlanningRppsLegalProceeding
          ? this.mapper.mapArray(
              source.retirementPlanningRppsLegalProceeding,
              GetRetirementPlanningRppsLegalProceedingQueryResult,
              RetirementPlanningRppsLegalProceedingTypeormEntity,
            )
          : [];

      const retirementPlanningRppsRemunerationCalculation =
        source.retirementPlanningRppsRemunerationCalculation
          ? this.mapper.map(
              source.retirementPlanningRppsRemunerationCalculation,
              GetRetirementPlanningRppsRemunerationCalculationQueryResult,
              RetirementPlanningRppsRemunerationCalculationTypeormEntity,
            )
          : undefined;

      return RetirementPlanningRppsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRppsResult,
        retirementPlanningRppsInssBenefit,
        retirementPlanningRppsLegalProceeding,
        retirementPlanningRppsRemunerationCalculation,
        remunerations,
        periods,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsWithRelationsQueryResult,
      RetirementPlanningRppsTypeormEntity,
      mappingFunction,
    );
  }
}
