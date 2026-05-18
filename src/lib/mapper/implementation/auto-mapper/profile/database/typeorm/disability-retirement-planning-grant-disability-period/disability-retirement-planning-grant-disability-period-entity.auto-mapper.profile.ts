import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantDisabilityPeriodEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
      DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
        ): DisabilityRetirementPlanningGrantDisabilityPeriodEntity => {
          if (!source.disabilityRetirementPlanningGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantDisabilityPeriodEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantDisabilityPeriodEntity({
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
      DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
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
