import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-inss-benefit.typeorm.entity';
import { GetDisabilityRetirementPlanningInssBenefitQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-inss-benefit/query/result/get-disability-retirement-planning-inss-benefit.query.result';

@Injectable()
export class GetDisabilityRetirementPlanningInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningInssBenefitTypeormEntity,
    ): GetDisabilityRetirementPlanningInssBenefitQueryResult => {
      return GetDisabilityRetirementPlanningInssBenefitQueryResult.build({
        id: source.id,
        benefitNumber: source.benefitNumber,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningInssBenefitTypeormEntity,
      GetDisabilityRetirementPlanningInssBenefitQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningInssBenefitQueryResult,
    ): DisabilityRetirementPlanningInssBenefitTypeormEntity => {
      return DisabilityRetirementPlanningInssBenefitTypeormEntity.build({
        id: source.id,
        benefitNumber: source.benefitNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningInssBenefitQueryResult,
      DisabilityRetirementPlanningInssBenefitTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
