import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-earnings-history.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/value-object/retirement-permanent-disability-rejection-period-earnings-history-id/retirement-permanent-disability-rejection-period-earnings-history-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
        ): RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity => {
          if (!source.retirementPermanentDisabilityRejectionPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity(
            {
              id: new RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              value: source.value,
              retirementPermanentDisabilityRejectionPeriodId:
                new RetirementPermanentDisabilityRejectionPeriodId(
                  source.retirementPermanentDisabilityRejectionPeriod.id,
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
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity,
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity,
        ): RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity =>
          RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              value: source.value,
              retirementPermanentDisabilityRejectionPeriod:
                RetirementPermanentDisabilityRejectionPeriodTypeormEntity.build(
                  {
                    id: source.retirementPermanentDisabilityRejectionPeriodId.toString(),
                  } as RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
