import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
    ): GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult => {
      return GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult.build(
        {
          id: source.id,
          document: source.document,
        },
      );
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
      GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult,
    ): DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity => {
      return DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity.build(
        {
          id: source.id,
          document: source.document,
          disabilityRetirementPlanningPeriodSpecialTime:
            undefined as unknown as DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      );
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
