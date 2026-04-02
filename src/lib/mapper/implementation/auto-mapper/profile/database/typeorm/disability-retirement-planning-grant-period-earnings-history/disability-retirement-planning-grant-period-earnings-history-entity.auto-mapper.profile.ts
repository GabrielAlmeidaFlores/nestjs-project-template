import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-earnings-history.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.entity';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/value-object/disability-retirement-planning-grant-period-earnings-history-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmToDomain = (
      source: DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
    ): DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity => {
      if (!source.disabilityRetirementPlanningGrantPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity.name,
          sourceClass:
            DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity.name,
        });
      }

      return new DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity({
        id: new DisabilityRetirementPlanningGrantPeriodEarningsHistoryId(
          source.id,
        ),
        competence: source.competence,
        remuneration: source.remuneration,
        indicators: source.indicators,
        paymentDate: source.paymentDate,
        contribution: source.contribution,
        contributionSalary: source.contributionSalary,
        analysis: source.analysis,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        disabilityRetirementPlanningGrantPeriodId:
          new DisabilityRetirementPlanningGrantPeriodId(
            source.disabilityRetirementPlanningGrantPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity,
      constructUsing(convertOrmToDomain),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainToOrm = (
      source: DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity,
    ): DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity =>
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity.build({
        id: source.id.toString(),
        competence: source.competence,
        remuneration: source.remuneration,
        indicators: source.indicators,
        paymentDate: source.paymentDate,
        contribution: source.contribution,
        contributionSalary: source.contributionSalary,
        analysis: source.analysis,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        disabilityRetirementPlanningGrantPeriod:
          DisabilityRetirementPlanningGrantPeriodTypeormEntity.build({
            id: source.disabilityRetirementPlanningGrantPeriodId.toString(),
          } as DisabilityRetirementPlanningGrantPeriodTypeormEntity),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity,
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
      constructUsing(convertDomainToOrm),
    );
  }
}
