import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-earnings-history.typeorm.entity';
import { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import { MaternityPayRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity';
import { MaternityPayRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/value-object/maternity-pay-rejection-work-period-earnings-history-id.value-object';

@Injectable()
export class MaternityPayRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity,
    ): MaternityPayRejectionWorkPeriodEarningsHistoryEntity => {
      if (!source.maternityPayRejectionWorkPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            MaternityPayRejectionWorkPeriodEarningsHistoryEntity.name,
          sourceClass:
            MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity.name,
        });
      }

      return new MaternityPayRejectionWorkPeriodEarningsHistoryEntity({
        id: new MaternityPayRejectionWorkPeriodEarningsHistoryId(source.id),
        competence: source.competence,
        remuneration: source.remuneration,
        indicators: source.indicators,
        paymentDate: source.paymentDate,
        contribution: source.contribution,
        contributionSalary: source.contributionSalary,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        maternityPayRejectionWorkPeriodId:
          new MaternityPayRejectionWorkPeriodId(
            source.maternityPayRejectionWorkPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity,
      MaternityPayRejectionWorkPeriodEarningsHistoryEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionWorkPeriodEarningsHistoryEntity,
    ): MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity => {
      const relationProps =
        source.maternityPayRejectionWorkPeriodId !== null
          ? {
              maternityPayRejectionWorkPeriod: {
                id: source.maternityPayRejectionWorkPeriodId.toString(),
              } as MaternityPayRejectionWorkPeriodTypeormEntity,
            }
          : {};

      return MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity.build({
        id: source.id.toString(),
        competence: source.competence,
        remuneration: source.remuneration,
        indicators: source.indicators,
        paymentDate: source.paymentDate,
        contribution: source.contribution,
        contributionSalary: source.contributionSalary,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        ...relationProps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionWorkPeriodEarningsHistoryEntity,
      MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity,
      constructUsing(convert),
    );
  }
}
