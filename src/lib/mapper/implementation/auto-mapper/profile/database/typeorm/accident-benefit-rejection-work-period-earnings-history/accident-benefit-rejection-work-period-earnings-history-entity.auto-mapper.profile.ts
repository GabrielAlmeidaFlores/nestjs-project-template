import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-earnings-history.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/value-object/accident-benefit-rejection-work-period-earnings-history-id.value-object';

@Injectable()
export class AccidentBenefitRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
    ): AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity => {
      if (!source.accidentBenefitRejectionWorkPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity.name,
          sourceClass:
            AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity.name,
        });
      }

      return new AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity({
        id: new AccidentBenefitRejectionWorkPeriodEarningsHistoryId(source.id),
        competence: source.competence,
        remuneration: source.remuneration,
        indicators: source.indicators,
        paymentDate: source.paymentDate,
        contribution: source.contribution,
        contributionSalary: source.contributionSalary,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        accidentBenefitRejectionWorkPeriodId:
          new AccidentBenefitRejectionWorkPeriodId(
            source.accidentBenefitRejectionWorkPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
      AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity,
    ): AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity => {
      const accidentBenefitRejectionWorkPeriod =
        source.accidentBenefitRejectionWorkPeriodId !== null
          ? ({
              id: source.accidentBenefitRejectionWorkPeriodId.toString(),
            } as AccidentBenefitRejectionWorkPeriodTypeormEntity)
          : null;

      return AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity.build(
        {
          id: source.id.toString(),
          competence: source.competence,
          remuneration: source.remuneration,
          indicators: source.indicators,
          paymentDate: source.paymentDate,
          contribution: source.contribution,
          contributionSalary: source.contributionSalary,
          competenceBelowTheMinimum: source.competenceBelowTheMinimum,
          accidentBenefitRejectionWorkPeriod,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity,
      AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
      constructUsing(convert),
    );
  }
}
