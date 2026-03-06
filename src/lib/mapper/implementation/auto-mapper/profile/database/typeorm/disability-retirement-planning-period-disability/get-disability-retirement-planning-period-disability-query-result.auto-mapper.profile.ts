import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability-document/query/result/get-disability-retirement-planning-period-disability-document.query.result';
import { GetDisabilityRetirementPlanningPeriodDisabilityQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability/query/result/get-disability-retirement-planning-period-disability.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningPeriodDisabilityQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
    ): GetDisabilityRetirementPlanningPeriodDisabilityQueryResult => {
      if (!source.disabilityRetirementPlanningPeriodDisabilityDocument) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetDisabilityRetirementPlanningPeriodDisabilityQueryResult.name,
          sourceClass:
            DisabilityRetirementPlanningPeriodDisabilityTypeormEntity.name,
        });
      }

      const documents = this.mapper.mapArray(
        source.disabilityRetirementPlanningPeriodDisabilityDocument,
        DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
        GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult,
      );

      return GetDisabilityRetirementPlanningPeriodDisabilityQueryResult.build({
        id: source.id,
        startDate: source.startDate,
        endDate: source.endDate,
        disabilityDegree: source.disabilityDegree,
        disabilityCategory: source.disabilityCategory,
        cidTenId: source.cidTen?.id ?? null,
        disabilityType: source.disabilityType,
        disabilityDescription: source.disabilityDescription,
        activityImpact: source.activityImpact,
        documents,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
      GetDisabilityRetirementPlanningPeriodDisabilityQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningPeriodDisabilityQueryResult,
    ): DisabilityRetirementPlanningPeriodDisabilityTypeormEntity => {
      const documents = this.mapper.mapArray(
        source.documents,
        GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult,
        DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
      );

      return DisabilityRetirementPlanningPeriodDisabilityTypeormEntity.build({
        id: source.id,
        startDate: source.startDate,
        endDate: source.endDate,
        disabilityDegree: source.disabilityDegree,
        disabilityCategory: source.disabilityCategory,
        disabilityType: source.disabilityType,
        disabilityDescription: source.disabilityDescription,
        activityImpact: source.activityImpact,
        disabilityRetirementPlanningPeriodDisabilityDocument: documents,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningPeriodDisabilityQueryResult,
      DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
