import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetRetirementPlanningRppsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/query/result/get-retirement-planning-rpps-period-document.query.result';
import { GetRetirementPlanningRppsPeriodSpecialTimeQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-special-time/query/result/get-retirement-planning-rpps-period-special-time.query.result';
import { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsPeriodSpecialTimeQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsPeriodSpecialTimeQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
    ): GetRetirementPlanningRppsPeriodSpecialTimeQueryResult => {
      if (!source.specialTimeDocuments) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetRetirementPlanningRppsPeriodSpecialTimeQueryResult.name,
          sourceClass:
            RetirementPlanningRppsPeriodSpecialTimeTypeormEntity.name,
        });
      }

      const documents = this.mapper.mapArray(
        source.specialTimeDocuments,
        RetirementPlanningRppsPeriodDocumentTypeormEntity,
        GetRetirementPlanningRppsPeriodDocumentQueryResult,
      );

      return GetRetirementPlanningRppsPeriodSpecialTimeQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsPeriodSpecialTimeId(source.id),
        documents,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
      GetRetirementPlanningRppsPeriodSpecialTimeQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsPeriodSpecialTimeQueryResult,
    ): RetirementPlanningRppsPeriodSpecialTimeTypeormEntity => {
      return RetirementPlanningRppsPeriodSpecialTimeTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsPeriodSpecialTimeQueryResult,
      RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
      mappingFunction,
    );
  }
}
