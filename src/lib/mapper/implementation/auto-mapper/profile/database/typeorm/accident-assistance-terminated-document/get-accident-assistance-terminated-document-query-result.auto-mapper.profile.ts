import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/value-object/accident-assistance-terminated-document-id/accident-assistance-terminated-document-id.value-object';
import { GetAccidentAssistanceTerminatedDocumentQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-document.query.result';

@Injectable()
export class GetAccidentAssistanceTerminatedDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceTerminatedDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedDocumentTypeormEntity,
    ): GetAccidentAssistanceTerminatedDocumentQueryResult => {
      return GetAccidentAssistanceTerminatedDocumentQueryResult.build({
        id: new AccidentAssistanceTerminatedDocumentId(source.id),
        document: source.document,
        type: source.type,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedDocumentTypeormEntity,
      GetAccidentAssistanceTerminatedDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAccidentAssistanceTerminatedDocumentQueryResult,
    ): AccidentAssistanceTerminatedDocumentTypeormEntity => {
      return AccidentAssistanceTerminatedDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        accidentAssistanceTerminated: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAccidentAssistanceTerminatedDocumentQueryResult,
      AccidentAssistanceTerminatedDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
