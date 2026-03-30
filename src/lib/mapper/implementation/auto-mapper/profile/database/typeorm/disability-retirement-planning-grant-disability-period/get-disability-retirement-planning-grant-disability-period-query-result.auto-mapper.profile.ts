import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/query/result/get-disability-retirement-planning-grant-disability-period.query.result';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
      GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
        ): GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult =>
          GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult.build(
            {
              id: new DisabilityRetirementPlanningGrantDisabilityPeriodId(
                source.id,
              ),
              disabilityDegree: source.disabilityDegree,
              disabilityCategory: source.disabilityCategory,
              disabilityDescription: source.disabilityDescription,
              dailyImpact: source.dailyImpact,
              startDate: source.startDate,
              endDate: source.endDate,
              cidTenId: source.cidTenId,
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult,
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
      constructUsing(
        (
          source: GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult,
        ): DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity =>
          DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity.build({
            id: source.id.toString(),
            disabilityDegree: source.disabilityDegree,
            disabilityCategory: source.disabilityCategory,
            disabilityDescription: source.disabilityDescription,
            dailyImpact: source.dailyImpact,
            startDate: source.startDate,
            endDate: source.endDate,
            cidTenId: source.cidTenId,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
