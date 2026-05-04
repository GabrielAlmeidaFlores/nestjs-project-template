import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/value-object/temporary-disability-benefits-terminated-work-periods-earnings-history-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity => {
          if (!source.temporaryDisabilityBenefitsTerminatedWorkPeriods) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity(
            {
              id: new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              temporaryDisabilityBenefitsTerminatedWorkPeriodsId:
                new TemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
                  source.temporaryDisabilityBenefitsTerminatedWorkPeriods.id,
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
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity,
        ): TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              temporaryDisabilityBenefitsTerminatedWorkPeriods:
                TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsTerminatedWorkPeriodsId.toString(),
                  } as TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
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
