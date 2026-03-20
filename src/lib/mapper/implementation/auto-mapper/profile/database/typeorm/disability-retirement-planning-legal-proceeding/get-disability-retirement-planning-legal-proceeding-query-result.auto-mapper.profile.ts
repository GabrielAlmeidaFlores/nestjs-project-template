import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-legal-proceeding.typeorm.entity';
import { GetDisabilityRetirementPlanningLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-legal-proceeding/query/result/get-disability-retirement-planning-legal-proceeding.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningLegalProceedingTypeormEntity,
    ): GetDisabilityRetirementPlanningLegalProceedingQueryResult => {
      return GetDisabilityRetirementPlanningLegalProceedingQueryResult.build({
        id: source.id,
        legalProceedingNumber: source.legalProceedingNumber,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningLegalProceedingTypeormEntity,
      GetDisabilityRetirementPlanningLegalProceedingQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningLegalProceedingQueryResult,
    ): DisabilityRetirementPlanningLegalProceedingTypeormEntity => {
      return DisabilityRetirementPlanningLegalProceedingTypeormEntity.build({
        id: source.id,
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningLegalProceedingQueryResult,
      DisabilityRetirementPlanningLegalProceedingTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
