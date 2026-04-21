import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/temporary-incapacity-benefit-rejection-work-periods.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionWorkPeriodsEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
      TemporaryIncapacityBenefitRejectionWorkPeriodsEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionWorkPeriodsEntity => {
          if (!source.temporaryIncapacityBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionWorkPeriodsEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionWorkPeriodsEntity({
            id: new TemporaryIncapacityBenefitRejectionWorkPeriodsId(source.id),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? new DecimalValue(source.contributionAverage)
                : null,
            status: source.status,
            gracePeriod: source.gracePeriod,
            temporaryIncapacityBenefitRejectionId:
              new TemporaryIncapacityBenefitRejectionId(
                source.temporaryIncapacityBenefitRejection.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TemporaryIncapacityBenefitRejectionWorkPeriodsEntity,
      TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionWorkPeriodsEntity,
        ): TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity =>
          TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity.build({
            id: source.id.toString(),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? source.contributionAverage.toString()
                : null,
            status: source.status,
            gracePeriod: source.gracePeriod,
            temporaryIncapacityBenefitRejection:
              TemporaryIncapacityBenefitRejectionTypeormEntity.build({
                id: source.temporaryIncapacityBenefitRejectionId.toString(),
              } as TemporaryIncapacityBenefitRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
