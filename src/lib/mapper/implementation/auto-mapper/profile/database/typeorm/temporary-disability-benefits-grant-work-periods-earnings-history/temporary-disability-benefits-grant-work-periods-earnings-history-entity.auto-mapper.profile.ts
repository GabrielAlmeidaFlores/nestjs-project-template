import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/value-object/temporary-disability-benefits-grant-work-periods-earnings-history-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity => {
          if (!source.temporaryDisabilityBenefitsGrantWorkPeriods) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity(
            {
              id: new TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId(
                source.id,
              ),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              temporaryDisabilityBenefitsGrantWorkPeriodsId:
                new TemporaryDisabilityBenefitsGrantWorkPeriodsId(
                  source.temporaryDisabilityBenefitsGrantWorkPeriods.id,
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
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity,
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity,
        ): TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity =>
          TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity.build(
            {
              id: source.id.toString(),
              competence: source.competence,
              remuneration: source.remuneration,
              indicators: source.indicators,
              paymentDate: source.paymentDate,
              contribution: source.contribution,
              contributionSalary: source.contributionSalary,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              temporaryDisabilityBenefitsGrantWorkPeriods:
                TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity.build({
                  id: source.temporaryDisabilityBenefitsGrantWorkPeriodsId.toString(),
                } as TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
