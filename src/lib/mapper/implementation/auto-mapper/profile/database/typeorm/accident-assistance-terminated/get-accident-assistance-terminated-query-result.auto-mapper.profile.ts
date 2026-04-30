import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { GetAccidentAssistanceTerminatedQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated.query.result';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

@Injectable()
export class GetAccidentAssistanceTerminatedQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceTerminatedQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedTypeormEntity,
    ): GetAccidentAssistanceTerminatedQueryResult => {
      return GetAccidentAssistanceTerminatedQueryResult.build({
        ...source,
        id: new AccidentAssistanceTerminatedId(source.id),
        accidentAssistanceTerminatedDocument:
          source.accidentAssistanceTerminatedDocument ?? [],
        accidentAssistanceTerminatedResult:
          source.accidentAssistanceTerminatedResult ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedTypeormEntity,
      GetAccidentAssistanceTerminatedQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAccidentAssistanceTerminatedQueryResult,
    ): AccidentAssistanceTerminatedTypeormEntity => {
      return AccidentAssistanceTerminatedTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        accidentDate: source.accidentDate,
        accidentDescription: source.accidentDescription,
        accidentAssistanceTerminatedResult: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAccidentAssistanceTerminatedQueryResult,
      AccidentAssistanceTerminatedTypeormEntity,
      mappingFunction,
    );
  }
}
