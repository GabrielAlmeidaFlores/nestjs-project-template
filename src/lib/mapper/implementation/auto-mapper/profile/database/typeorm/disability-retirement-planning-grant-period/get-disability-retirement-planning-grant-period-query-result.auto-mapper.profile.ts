import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { GetDisabilityRetirementPlanningGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/query/result/get-disability-retirement-planning-grant-period.query.result';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningGrantPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningGrantPeriodQueryResultAutoMapperProfile.name;

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
      DisabilityRetirementPlanningGrantPeriodTypeormEntity,
      GetDisabilityRetirementPlanningGrantPeriodQueryResult,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantPeriodTypeormEntity,
        ): GetDisabilityRetirementPlanningGrantPeriodQueryResult =>
          GetDisabilityRetirementPlanningGrantPeriodQueryResult.build({
            id: new DisabilityRetirementPlanningGrantPeriodId(source.id),
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            typeOfContribution: source.typeOfContribution,
            status: source.status,
            disabilityStatus: source.disabilityStatus,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? new DecimalValue(source.contributionAverage)
                : null,
            bondOrigin: source.bondOrigin,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningGrantPeriodQueryResult,
      DisabilityRetirementPlanningGrantPeriodTypeormEntity,
      constructUsing(
        (
          source: GetDisabilityRetirementPlanningGrantPeriodQueryResult,
        ): DisabilityRetirementPlanningGrantPeriodTypeormEntity =>
          DisabilityRetirementPlanningGrantPeriodTypeormEntity.build({
            id: source.id.toString(),
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            typeOfContribution: source.typeOfContribution,
            status: source.status,
            disabilityStatus: source.disabilityStatus,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? source.contributionAverage.toString()
                : null,
            bondOrigin: source.bondOrigin,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
