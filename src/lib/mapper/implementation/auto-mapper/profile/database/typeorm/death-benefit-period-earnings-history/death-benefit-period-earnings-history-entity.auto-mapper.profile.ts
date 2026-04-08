import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-earnings-history.typeorm.entity';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { DeathBenefitPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/death-benefit-period-earnings-history.entity';
import { DeathBenefitPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/value-object/death-benefit-period-earnings-history-id.value-object';

@Injectable()
export class DeathBenefitPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitPeriodEarningsHistoryEntityAutoMapperProfile.name;

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
      DeathBenefitPeriodEarningsHistoryTypeormEntity,
      DeathBenefitPeriodEarningsHistoryEntity,
      constructUsing(
        (source: DeathBenefitPeriodEarningsHistoryTypeormEntity): DeathBenefitPeriodEarningsHistoryEntity => {
          if (!source.deathBenefitPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitPeriodEarningsHistoryEntity.name,
              sourceClass: DeathBenefitPeriodEarningsHistoryTypeormEntity.name,
            });
          }

          return new DeathBenefitPeriodEarningsHistoryEntity({
            id: new DeathBenefitPeriodEarningsHistoryId(source.id),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            deathBenefitPeriodId: new DeathBenefitPeriodId(source.deathBenefitPeriod.id),
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
      DeathBenefitPeriodEarningsHistoryEntity,
      DeathBenefitPeriodEarningsHistoryTypeormEntity,
      constructUsing(
        (source: DeathBenefitPeriodEarningsHistoryEntity): DeathBenefitPeriodEarningsHistoryTypeormEntity =>
          DeathBenefitPeriodEarningsHistoryTypeormEntity.build({
            id: source.id.toString(),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            deathBenefitPeriod: DeathBenefitPeriodTypeormEntity.build({
              id: source.deathBenefitPeriodId.toString(),
            } as DeathBenefitPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
