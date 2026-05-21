import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { GetDisabilityRetirementPlanningRejectionPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/result/get-disability-retirement-planning-rejection-period.query.result';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningRejectionPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningRejectionPeriodQueryResultAutoMapperProfile.name;

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
      DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
      GetDisabilityRetirementPlanningRejectionPeriodQueryResult,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
        ): GetDisabilityRetirementPlanningRejectionPeriodQueryResult =>
          GetDisabilityRetirementPlanningRejectionPeriodQueryResult.build({
            id: new DisabilityRetirementPlanningRejectionPeriodId(source.id),
            bondOrigin: source.bondOrigin,
            category: source.category,
            activityDescription: source.activityDescription,
            startDate: source.startDate,
            endDate: source.endDate,
            workType: source.workType,
            impactMonths: source.impactMonths,
            graceMonths: source.graceMonths,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            contributionAverage: source.contributionAverage,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
            status: source.status,
            pcdStatus: source.pcdStatus,
            local: source.local,
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
      GetDisabilityRetirementPlanningRejectionPeriodQueryResult,
      DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
      constructUsing(
        (
          source: GetDisabilityRetirementPlanningRejectionPeriodQueryResult,
        ): DisabilityRetirementPlanningRejectionPeriodTypeormEntity =>
          DisabilityRetirementPlanningRejectionPeriodTypeormEntity.build({
            id: source.id.toString(),
            bondOrigin: source.bondOrigin,
            category: source.category,
            activityDescription: source.activityDescription,
            startDate: source.startDate,
            endDate: source.endDate,
            workType: source.workType,
            impactMonths: source.impactMonths,
            graceMonths: source.graceMonths,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            contributionAverage: source.contributionAverage,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
            status: source.status,
            pcdStatus: source.pcdStatus,
            local: source.local,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
