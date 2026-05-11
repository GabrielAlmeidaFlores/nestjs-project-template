import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history.typeorm.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/retirement-permanent-disability-revision-work-periods-earnings-history.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/value-object/retirement-permanent-disability-revision-work-periods-earnings-history-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity,
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity,
        ): RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity => {
          if (!source.retirementPermanentDisabilityRevisionWorkPeriods) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity(
            {
              id: new RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              retirementPermanentDisabilityRevisionWorkPeriodsId:
                new RetirementPermanentDisabilityRevisionWorkPeriodsId(
                  source.retirementPermanentDisabilityRevisionWorkPeriods.id,
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
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity,
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity,
        ): RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity =>
          RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              retirementPermanentDisabilityRevisionWorkPeriods:
                RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity.build(
                  {
                    id: source.retirementPermanentDisabilityRevisionWorkPeriodsId.toString(),
                  } as RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
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
