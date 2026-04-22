import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-earnings-history.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/value-object/disability-retirement-planning-rejection-period-earnings-history-id/disability-retirement-planning-rejection-period-earnings-history-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
        ): DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity => {
          if (!source.disabilityRetirementPlanningRejectionPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity.name,
              sourceClass:
                DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity(
            {
              id: new DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              value: source.value,
              disabilityRetirementPlanningRejectionPeriodId:
                new DisabilityRetirementPlanningRejectionPeriodId(
                  source.disabilityRetirementPlanningRejectionPeriod.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity,
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity,
        ): DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity =>
          DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              value: source.value,
              disabilityRetirementPlanningRejectionPeriod:
                DisabilityRetirementPlanningRejectionPeriodTypeormEntity.build({
                  id: source.disabilityRetirementPlanningRejectionPeriodId.toString(),
                } as DisabilityRetirementPlanningRejectionPeriodTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
