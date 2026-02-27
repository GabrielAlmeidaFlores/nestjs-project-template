import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResultAutoMapperProfile {
  protected readonly _type = GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
    ): GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult => {
      return GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult.build({
        id: source.id,
        document: source.document,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
      GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult,
    ): DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity => {
      return DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity.build({
        id: source.id,
        document: source.document,
        disabilityRetirementPlanningPeriodDisability: undefined as unknown as DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult,
      DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
