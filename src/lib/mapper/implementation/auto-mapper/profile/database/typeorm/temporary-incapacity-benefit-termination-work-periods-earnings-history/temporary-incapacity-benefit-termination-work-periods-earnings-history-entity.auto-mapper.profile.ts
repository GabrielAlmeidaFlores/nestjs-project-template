import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/temporary-incapacity-benefit-termination-work-periods-earnings-history.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/value-object/temporary-incapacity-benefit-termination-work-periods-earnings-history-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity,
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity => {
          if (!source.temporaryIncapacityBenefitTerminationWorkPeriods) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity(
            {
              id: new TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              temporaryIncapacityBenefitTerminationWorkPeriodsId:
                new TemporaryIncapacityBenefitTerminationWorkPeriodsId(
                  source.temporaryIncapacityBenefitTerminationWorkPeriods.id,
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
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity,
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity,
        ): TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity =>
          TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              temporaryIncapacityBenefitTerminationWorkPeriods:
                TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitTerminationWorkPeriodsId.toString(),
                  } as TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
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
