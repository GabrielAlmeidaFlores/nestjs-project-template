import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantWorkPeriodsEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
      TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantWorkPeriodsEntity => {
          if (!source.temporaryDisabilityBenefitsGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantWorkPeriodsEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantWorkPeriodsEntity({
            id: new TemporaryDisabilityBenefitsGrantWorkPeriodsId(source.id),
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
            temporaryDisabilityBenefitsGrantId:
              new TemporaryDisabilityBenefitsGrantId(
                source.temporaryDisabilityBenefitsGrant.id,
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
      TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
      TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
        ): TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity =>
          TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity.build({
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
            temporaryDisabilityBenefitsGrant:
              TemporaryDisabilityBenefitsGrantTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsGrantId.toString(),
              } as TemporaryDisabilityBenefitsGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
