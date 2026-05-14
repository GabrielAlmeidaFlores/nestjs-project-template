import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/permanent-incapacity-benefit-terminated-work-periods-earnings-history.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/value-object/permanent-incapacity-benefit-terminated-work-periods-earnings-history-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity => {
          if (!source.permanentIncapacityBenefitTerminatedWorkPeriods) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity(
            {
              id: new PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              permanentIncapacityBenefitTerminatedWorkPeriodsId:
                new PermanentIncapacityBenefitTerminatedWorkPeriodsId(
                  source.permanentIncapacityBenefitTerminatedWorkPeriods.id,
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
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity,
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity,
        ): PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity =>
          PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              permanentIncapacityBenefitTerminatedWorkPeriods:
                PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity.build(
                  {
                    id: source.permanentIncapacityBenefitTerminatedWorkPeriodsId.toString(),
                  } as PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
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
