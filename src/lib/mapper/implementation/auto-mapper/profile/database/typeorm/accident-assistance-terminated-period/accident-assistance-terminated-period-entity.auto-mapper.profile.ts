import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AccidentAssistanceTerminatedPeriodEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedPeriodEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceTerminatedPeriodEntityAutoMapperProfile.name;

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
      AccidentAssistanceTerminatedPeriodTypeormEntity,
      AccidentAssistanceTerminatedPeriodEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedPeriodTypeormEntity,
        ): AccidentAssistanceTerminatedPeriodEntity =>
          new AccidentAssistanceTerminatedPeriodEntity({
            id: new AccidentAssistanceTerminatedPeriodId(source.id),
            sequencial: source.sequencial,
            periodName: source.periodName,
            periodStart: source.periodStart,
            periodEnd: source.periodEnd,
            category: source.category,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            contributionAverage:
              source.contributionAverage !== null
                ? new DecimalValue(source.contributionAverage)
                : null,
            typeOfContribution: source.typeOfContribution,
            status: source.status,
            reasonPendency: source.reasonPendency,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      AccidentAssistanceTerminatedPeriodEntity,
      AccidentAssistanceTerminatedPeriodTypeormEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedPeriodEntity,
        ): AccidentAssistanceTerminatedPeriodTypeormEntity =>
          AccidentAssistanceTerminatedPeriodTypeormEntity.build({
            id: source.id.toString(),
            sequencial: source.sequencial ?? 0,
            periodName: source.periodName ?? '',
            periodStart: source.periodStart ?? new Date(),
            periodEnd: source.periodEnd ?? new Date(),
            category: source.category ?? '',
            isPendency: source.isPendency ?? false,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum ?? false,
            contributionAverage:
              source.contributionAverage !== null
                ? source.contributionAverage.toString()
                : null,
            typeOfContribution: source.typeOfContribution ?? '',
            status: source.status ?? false,
            reasonPendency: source.reasonPendency ?? null,
            accidentAssistanceTerminated:
              AccidentAssistanceTerminatedTypeormEntity.build({
                id: '',
              } as AccidentAssistanceTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt ?? null,
          }),
      ),
    );
  }
}
