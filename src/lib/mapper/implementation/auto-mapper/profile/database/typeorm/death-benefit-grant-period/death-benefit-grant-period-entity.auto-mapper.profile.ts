import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

@Injectable()
export class DeathBenefitGrantPeriodEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantPeriodEntityAutoMapperProfile.name;

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
      DeathBenefitGrantPeriodTypeormEntity,
      DeathBenefitGrantPeriodEntity,
      constructUsing(
        (
          source: DeathBenefitGrantPeriodTypeormEntity,
        ): DeathBenefitGrantPeriodEntity => {
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantPeriodEntity.name,
              sourceClass: DeathBenefitGrantPeriodTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantPeriodEntity({
            id: new DeathBenefitGrantPeriodId(source.id),
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            typeOfContribution: source.typeOfContribution,
            status: source.status,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? new DecimalValue(source.contributionAverage)
                : null,
            bondOrigin: source.bondOrigin,
            deathBenefitGrantId: new DeathBenefitGrantId(
              source.deathBenefitGrant.id,
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
      DeathBenefitGrantPeriodEntity,
      DeathBenefitGrantPeriodTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantPeriodEntity,
        ): DeathBenefitGrantPeriodTypeormEntity =>
          DeathBenefitGrantPeriodTypeormEntity.build({
            id: source.id.toString(),
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            typeOfContribution: source.typeOfContribution,
            status: source.status,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? source.contributionAverage.toString()
                : null,
            bondOrigin: source.bondOrigin,
            deathBenefitGrant: DeathBenefitGrantTypeormEntity.build({
              id: source.deathBenefitGrantId.toString(),
            } as DeathBenefitGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
