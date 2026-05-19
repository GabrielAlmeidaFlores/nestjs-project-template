import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantPeriodTypeormEntity,
      DisabilityRetirementPlanningGrantPeriodEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantPeriodTypeormEntity,
        ): DisabilityRetirementPlanningGrantPeriodEntity => {
          if (!source.disabilityRetirementPlanningGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantPeriodEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantPeriodTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantPeriodEntity({
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
            disabilityRetirementPlanningGrantId:
              new DisabilityRetirementPlanningGrantId(
                source.disabilityRetirementPlanningGrant.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantPeriodEntity,
      DisabilityRetirementPlanningGrantPeriodTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantPeriodEntity,
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
            disabilityRetirementPlanningGrant:
              DisabilityRetirementPlanningGrantTypeormEntity.build({
                id: source.disabilityRetirementPlanningGrantId.toString(),
              } as DisabilityRetirementPlanningGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
