import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GetAccidentAssistanceTerminatedPeriodQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/query/result/get-accident-assistance-terminated-period.query.result';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

@Injectable()
export class GetAccidentAssistanceTerminatedPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceTerminatedPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedPeriodTypeormEntity,
    ): GetAccidentAssistanceTerminatedPeriodQueryResult => {
      return GetAccidentAssistanceTerminatedPeriodQueryResult.build({
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
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedPeriodTypeormEntity,
      GetAccidentAssistanceTerminatedPeriodQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAccidentAssistanceTerminatedPeriodQueryResult,
    ): AccidentAssistanceTerminatedPeriodTypeormEntity => {
      return AccidentAssistanceTerminatedPeriodTypeormEntity.build({
        id: source.id.toString(),
        sequencial: source.sequencial,
        periodName: source.periodName,
        periodStart: source.periodStart,
        periodEnd: source.periodEnd,
        category: source.category,
        isPendency: source.isPendency,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        contributionAverage:
          source.contributionAverage !== null
            ? source.contributionAverage.toString()
            : null,
        typeOfContribution: source.typeOfContribution,
        status: source.status,
        reasonPendency: source.reasonPendency,
        accidentAssistanceTerminated: undefined,
        createdAt: source.createdAt ?? new Date(),
        updatedAt: source.updatedAt ?? new Date(),
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAccidentAssistanceTerminatedPeriodQueryResult,
      AccidentAssistanceTerminatedPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
