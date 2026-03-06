import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time-document/query/result/get-disability-retirement-planning-period-special-time-document.query.result';
import { GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time/query/result/get-disability-retirement-planning-period-special-time.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
    ): GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult => {
      if (!source.disabilityRetirementPlanningPeriodSpecialTimeDocument) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult.name,
          sourceClass:
            DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity.name,
        });
      }

      const documents = this.mapper.mapArray(
        source.disabilityRetirementPlanningPeriodSpecialTimeDocument,
        DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
        GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult,
      );

      return GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult.build({
        id: source.id,
        startDate: source.startDate,
        endDate: source.endDate,
        documents,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
      GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult,
    ): DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity => {
      const documents = this.mapper.mapArray(
        source.documents,
        GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult,
        DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
      );

      return DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity.build({
        id: source.id,
        startDate: source.startDate,
        endDate: source.endDate,
        disabilityRetirementPlanningPeriodSpecialTimeDocument: documents,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult,
      DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
