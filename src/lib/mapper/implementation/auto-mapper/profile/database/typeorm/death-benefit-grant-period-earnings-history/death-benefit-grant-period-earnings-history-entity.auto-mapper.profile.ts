import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-earnings-history.typeorm.entity';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { DeathBenefitGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.entity';
import { DeathBenefitGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/value-object/death-benefit-grant-period-earnings-history-id.value-object';

@Injectable()
export class DeathBenefitGrantPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantPeriodEarningsHistoryEntityAutoMapperProfile.name;

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
      DeathBenefitGrantPeriodEarningsHistoryTypeormEntity,
      DeathBenefitGrantPeriodEarningsHistoryEntity,
      constructUsing(
        (
          source: DeathBenefitGrantPeriodEarningsHistoryTypeormEntity,
        ): DeathBenefitGrantPeriodEarningsHistoryEntity => {
          if (!source.deathBenefitGrantPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DeathBenefitGrantPeriodEarningsHistoryEntity.name,
              sourceClass:
                DeathBenefitGrantPeriodEarningsHistoryTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantPeriodEarningsHistoryEntity({
            id: new DeathBenefitGrantPeriodEarningsHistoryId(source.id),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            deathBenefitGrantPeriodId: new DeathBenefitGrantPeriodId(
              source.deathBenefitGrantPeriod.id,
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
      DeathBenefitGrantPeriodEarningsHistoryEntity,
      DeathBenefitGrantPeriodEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantPeriodEarningsHistoryEntity,
        ): DeathBenefitGrantPeriodEarningsHistoryTypeormEntity =>
          DeathBenefitGrantPeriodEarningsHistoryTypeormEntity.build({
            id: source.id.toString(),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            deathBenefitGrantPeriod: DeathBenefitGrantPeriodTypeormEntity.build(
              {
                id: source.deathBenefitGrantPeriodId.toString(),
              } as DeathBenefitGrantPeriodTypeormEntity,
            ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
