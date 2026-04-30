import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/temporary-incapacity-benefit-termination-work-periods.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationWorkPeriodsEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
      TemporaryIncapacityBenefitTerminationWorkPeriodsEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationWorkPeriodsEntity => {
          if (!source.temporaryIncapacityBenefitTermination) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationWorkPeriodsEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationWorkPeriodsEntity({
            id: new TemporaryIncapacityBenefitTerminationWorkPeriodsId(
              source.id,
            ),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            activityDescription: source.activityDescription,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? new DecimalValue(source.contributionAverage)
                : null,
            impactMonths: source.impactMonths,
            gracePeriod: source.gracePeriod,
            isPendency: source.isPendency,
            wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
            status: source.status,
            temporaryIncapacityBenefitTerminationId:
              new TemporaryIncapacityBenefitTerminationId(
                source.temporaryIncapacityBenefitTermination.id,
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
      TemporaryIncapacityBenefitTerminationWorkPeriodsEntity,
      TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationWorkPeriodsEntity,
        ): TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity =>
          TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity.build({
            id: source.id.toString(),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            activityDescription: source.activityDescription,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? source.contributionAverage.toString()
                : null,
            impactMonths: source.impactMonths,
            gracePeriod: source.gracePeriod,
            isPendency: source.isPendency,
            wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
            status: source.status,
            temporaryIncapacityBenefitTermination:
              TemporaryIncapacityBenefitTerminationTypeormEntity.build({
                id: source.temporaryIncapacityBenefitTerminationId.toString(),
              } as TemporaryIncapacityBenefitTerminationTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
