import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedBenefitId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/value-object/accident-assistance-terminated-benefit-id/accident-assistance-terminated-benefit-id.value-object';
import { GetAccidentAssistanceTerminatedBenefitQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-benefit.query.result';

@Injectable()
export class GetAccidentAssistanceTerminatedBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceTerminatedBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedBenefitTypeormEntity,
    ): GetAccidentAssistanceTerminatedBenefitQueryResult => {
      return GetAccidentAssistanceTerminatedBenefitQueryResult.build({
        id: new AccidentAssistanceTerminatedBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedBenefitTypeormEntity,
      GetAccidentAssistanceTerminatedBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAccidentAssistanceTerminatedBenefitQueryResult,
    ): AccidentAssistanceTerminatedBenefitTypeormEntity => {
      return AccidentAssistanceTerminatedBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        accidentAssistanceTerminated: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAccidentAssistanceTerminatedBenefitQueryResult,
      AccidentAssistanceTerminatedBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
