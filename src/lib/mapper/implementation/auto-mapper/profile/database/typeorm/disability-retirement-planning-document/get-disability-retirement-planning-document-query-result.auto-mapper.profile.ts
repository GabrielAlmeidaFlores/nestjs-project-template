import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-document.typeorm.entity';
import { GetDisabilityRetirementPlanningDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-document/query/result/get-disability-retirement-planning-document.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningDocumentTypeormEntity,
    ): GetDisabilityRetirementPlanningDocumentQueryResult => {
      return GetDisabilityRetirementPlanningDocumentQueryResult.build({
        id: source.id,
        document: source.document,
        type: source.type,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningDocumentTypeormEntity,
      GetDisabilityRetirementPlanningDocumentQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningDocumentQueryResult,
    ): DisabilityRetirementPlanningDocumentTypeormEntity => {
      return DisabilityRetirementPlanningDocumentTypeormEntity.build({
        id: source.id,
        document: source.document,
        type: source.type,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningDocumentQueryResult,
      DisabilityRetirementPlanningDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
