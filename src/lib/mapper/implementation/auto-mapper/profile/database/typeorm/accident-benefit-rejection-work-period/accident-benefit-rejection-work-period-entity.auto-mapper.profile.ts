import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';

@Injectable()
export class AccidentBenefitRejectionWorkPeriodEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionWorkPeriodTypeormEntity,
    ): AccidentBenefitRejectionWorkPeriodEntity => {
      if (!source.accidentBenefitRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AccidentBenefitRejectionWorkPeriodEntity.name,
          sourceClass: AccidentBenefitRejectionWorkPeriodTypeormEntity.name,
        });
      }

      return new AccidentBenefitRejectionWorkPeriodEntity({
        id: new AccidentBenefitRejectionWorkPeriodId(source.id),
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
        accidentBenefitRejectionId: new AccidentBenefitRejectionId(
          source.accidentBenefitRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionWorkPeriodTypeormEntity,
      AccidentBenefitRejectionWorkPeriodEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionWorkPeriodEntity,
    ): AccidentBenefitRejectionWorkPeriodTypeormEntity => {
      const accidentBenefitRejection =
        source.accidentBenefitRejectionId !== null
          ? ({
              id: source.accidentBenefitRejectionId.toString(),
            } as AccidentBenefitRejectionTypeormEntity)
          : null;

      return AccidentBenefitRejectionWorkPeriodTypeormEntity.build({
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
        accidentBenefitRejection,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionWorkPeriodEntity,
      AccidentBenefitRejectionWorkPeriodTypeormEntity,
      constructUsing(convert),
    );
  }
}
