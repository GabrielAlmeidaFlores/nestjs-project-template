import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import { GetAccidentAssistanceTerminatedResultQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-result/query/result/get-accident-assistance-terminated-result.query.result';
import { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';

@Injectable()
export class GetAccidentAssistanceTerminatedResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceTerminatedResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedResultTypeormEntity,
    ): GetAccidentAssistanceTerminatedResultQueryResult => {
      return GetAccidentAssistanceTerminatedResultQueryResult.build({
        id: new AccidentAssistanceTerminatedResultId(source.id),
        clientName: null,
        accidentAssistanceTerminatedCompleteAnalysis:
          source.accidentAssistanceTerminatedCompleteAnalysis,
        accidentAssistanceTerminatedSimplifiedAnalysis:
          source.accidentAssistanceTerminatedSimplifiedAnalysis,
        decisionDetails: source.decisionDetails,
        firstAnalysis: source.firstAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedResultTypeormEntity,
      GetAccidentAssistanceTerminatedResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAccidentAssistanceTerminatedResultQueryResult,
    ): AccidentAssistanceTerminatedResultTypeormEntity => {
      return AccidentAssistanceTerminatedResultTypeormEntity.build({
        id: source.id.toString(),
        accidentAssistanceTerminatedCompleteAnalysis:
          source.accidentAssistanceTerminatedCompleteAnalysis,
        accidentAssistanceTerminatedSimplifiedAnalysis:
          source.accidentAssistanceTerminatedSimplifiedAnalysis,
        decisionDetails: source.decisionDetails,
        firstAnalysis: source.firstAnalysis,
        accidentAssistanceTerminated: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAccidentAssistanceTerminatedResultQueryResult,
      AccidentAssistanceTerminatedResultTypeormEntity,
      mappingFunction,
    );
  }
}
