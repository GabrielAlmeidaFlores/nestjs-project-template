import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-legal-proceeding.entity';
import { GetAccidentAssistanceTerminatedLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-legal-proceeding.query.result';
import { AccidentAssistanceTerminatedLegalProceedingId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/value-object/accident-assistance-terminated-legal-proceeding-id/accident-assistance-terminated-legal-proceeding-id.value-object';

@Injectable()
export class GetAccidentAssistanceTerminatedLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceTerminatedLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
    ): GetAccidentAssistanceTerminatedLegalProceedingQueryResult => {
      return GetAccidentAssistanceTerminatedLegalProceedingQueryResult.build({
        id: new AccidentAssistanceTerminatedLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
      GetAccidentAssistanceTerminatedLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAccidentAssistanceTerminatedLegalProceedingQueryResult,
    ): AccidentAssistanceTerminatedLegalProceedingTypeormEntity => {
      return AccidentAssistanceTerminatedLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        accidentAssistanceTerminated: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAccidentAssistanceTerminatedLegalProceedingQueryResult,
      AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
