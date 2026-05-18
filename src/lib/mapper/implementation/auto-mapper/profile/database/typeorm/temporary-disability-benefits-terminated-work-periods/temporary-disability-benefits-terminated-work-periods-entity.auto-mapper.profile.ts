import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity => {
          if (!source.temporaryDisabilityBenefitsTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity({
            id: new TemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
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
            isManualPeriod: source.isManualPeriod,
            temporaryDisabilityBenefitsTerminatedId:
              new TemporaryDisabilityBenefitsTerminatedId(
                source.temporaryDisabilityBenefitsTerminated.id,
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
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity,
        ): TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity.build({
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
            isManualPeriod: source.isManualPeriod,
            temporaryDisabilityBenefitsTerminated:
              TemporaryDisabilityBenefitsTerminatedTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsTerminatedId.toString(),
              } as TemporaryDisabilityBenefitsTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
