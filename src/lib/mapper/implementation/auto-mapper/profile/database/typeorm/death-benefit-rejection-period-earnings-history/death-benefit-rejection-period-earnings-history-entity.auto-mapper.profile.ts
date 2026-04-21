import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-earnings-history.typeorm.entity';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeathBenefitRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.entity';
import { DeathBenefitRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/value-object/death-benefit-rejection-period-earnings-history-id.value-object';

@Injectable()
export class DeathBenefitRejectionPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionPeriodEarningsHistoryEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity,
      DeathBenefitRejectionPeriodEarningsHistoryEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity,
        ): DeathBenefitRejectionPeriodEarningsHistoryEntity => {
          if (!source.deathBenefitRejectionPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DeathBenefitRejectionPeriodEarningsHistoryEntity.name,
              sourceClass:
                DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionPeriodEarningsHistoryEntity({
            id: new DeathBenefitRejectionPeriodEarningsHistoryId(source.id),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            deathBenefitRejectionPeriodId: new DeathBenefitRejectionPeriodId(
              source.deathBenefitRejectionPeriod.id,
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
      DeathBenefitRejectionPeriodEarningsHistoryEntity,
      DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionPeriodEarningsHistoryEntity,
        ): DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity =>
          DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity.build({
            id: source.id.toString(),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            deathBenefitRejectionPeriod:
              DeathBenefitRejectionPeriodTypeormEntity.build({
                id: source.deathBenefitRejectionPeriodId.toString(),
              } as DeathBenefitRejectionPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
