import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';

@Injectable()
export class MaternityPayRejectionWorkPeriodEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayRejectionWorkPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionWorkPeriodTypeormEntity,
    ): MaternityPayRejectionWorkPeriodEntity => {
      if (!source.maternityPayRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MaternityPayRejectionWorkPeriodEntity.name,
          sourceClass: MaternityPayRejectionWorkPeriodTypeormEntity.name,
        });
      }

      return new MaternityPayRejectionWorkPeriodEntity({
        id: new MaternityPayRejectionWorkPeriodId(source.id),
        bondOrigin: source.bondOrigin,
        startDate: source.startDate,
        endDate: source.endDate,
        category: source.category,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        pendencyReason: source.pendencyReason,
        periodConsideration: source.periodConsideration,
        contributionAverage: source.contributionAverage,
        status: source.status,
        gracePeriod: source.gracePeriod,
        jobType: source.jobType,
        activityDescription: source.activityDescription,
        maternityPayRejectionId: new MaternityPayRejectionId(
          source.maternityPayRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionWorkPeriodTypeormEntity,
      MaternityPayRejectionWorkPeriodEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionWorkPeriodEntity,
    ): MaternityPayRejectionWorkPeriodTypeormEntity => {
      const relationProps =
        source.maternityPayRejectionId !== null
          ? {
              maternityPayRejection: {
                id: source.maternityPayRejectionId.toString(),
              } as MaternityPayRejectionTypeormEntity,
            }
          : {};

      return MaternityPayRejectionWorkPeriodTypeormEntity.build({
        id: source.id.toString(),
        bondOrigin: source.bondOrigin,
        startDate: source.startDate,
        endDate: source.endDate,
        category: source.category,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        pendencyReason: source.pendencyReason,
        periodConsideration: source.periodConsideration,
        contributionAverage: source.contributionAverage,
        status: source.status,
        gracePeriod: source.gracePeriod,
        jobType: source.jobType,
        activityDescription: source.activityDescription,
        ...relationProps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionWorkPeriodEntity,
      MaternityPayRejectionWorkPeriodTypeormEntity,
      constructUsing(convert),
    );
  }
}
