import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/temporary-incapacity-benefit-rejection-work-periods-earnings-history.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/value-object/temporary-incapacity-benefit-rejection-work-periods-earnings-history-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity => {
          if (!source.workPeriods) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity(
            {
              id: new TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              temporaryIncapacityBenefitRejectionWorkPeriodsId:
                new TemporaryIncapacityBenefitRejectionWorkPeriodsId(
                  source.workPeriods.id,
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
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity,
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity,
        ): TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity =>
          TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              workPeriods:
                TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitRejectionWorkPeriodsId.toString(),
                  } as TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
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
