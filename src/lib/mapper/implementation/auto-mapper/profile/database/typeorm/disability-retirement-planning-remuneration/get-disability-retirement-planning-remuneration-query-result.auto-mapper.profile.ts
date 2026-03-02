import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-remuneration.typeorm.entity';
import { GetDisabilityRetirementPlanningRemunerationListQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/result/get-disability-retirement-planning-remuneration-list.query.result';
import { GetDisabilityRetirementPlanningRemunerationQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';
import { DisabilityRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/value-object/disability-retirement-planning-remuneration-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningRemunerationQueryResultAutoMapperProfile {
  protected readonly _type = GetDisabilityRetirementPlanningRemunerationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: DisabilityRetirementPlanningRemunerationTypeormEntity,
    ): GetDisabilityRetirementPlanningRemunerationListQueryResult => {
      return GetDisabilityRetirementPlanningRemunerationListQueryResult.build({
        id: new DisabilityRetirementPlanningRemunerationId(source.id),
        remunerationDate: source.remunerationDate,
        remunerationAmount: parseFloat(source.remunerationAmount),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
      GetDisabilityRetirementPlanningRemunerationListQueryResult,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningRemunerationTypeormEntity,
    ): GetDisabilityRetirementPlanningRemunerationQueryResult => {
      return GetDisabilityRetirementPlanningRemunerationQueryResult.build({
        id: source.id,
        remunerationDate: source.remunerationDate,
        remunerationAmount: parseFloat(source.remunerationAmount),
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
      GetDisabilityRetirementPlanningRemunerationQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningRemunerationQueryResult,
    ): DisabilityRetirementPlanningRemunerationTypeormEntity => {
      return DisabilityRetirementPlanningRemunerationTypeormEntity.build({
        id: source.id,
        remunerationDate: source.remunerationDate,
        remunerationAmount: String(source.remunerationAmount),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningRemunerationQueryResult,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
