import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/permanent-incapacity-benefit-terminated-work-periods.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedWorkPeriodsEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
      PermanentIncapacityBenefitTerminatedWorkPeriodsEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedWorkPeriodsEntity => {
          if (!source.permanentIncapacityBenefitTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedWorkPeriodsEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedWorkPeriodsEntity({
            id: new PermanentIncapacityBenefitTerminatedWorkPeriodsId(
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
            permanentIncapacityBenefitTerminatedId:
              new PermanentIncapacityBenefitTerminatedId(
                source.permanentIncapacityBenefitTerminated.id,
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
      PermanentIncapacityBenefitTerminatedWorkPeriodsEntity,
      PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedWorkPeriodsEntity,
        ): PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity =>
          PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity.build({
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
            permanentIncapacityBenefitTerminated:
              PermanentIncapacityBenefitTerminatedTypeormEntity.build({
                id: source.permanentIncapacityBenefitTerminatedId.toString(),
              } as PermanentIncapacityBenefitTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
