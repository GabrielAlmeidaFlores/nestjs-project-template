import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { GetAudienceQuestionGeneratorQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator.query.result';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

@Injectable()
export class GetAudienceQuestionGeneratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAudienceQuestionGeneratorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorTypeormEntity,
    ): GetAudienceQuestionGeneratorQueryResult => {
      return GetAudienceQuestionGeneratorQueryResult.build({
        ...source,
        id: new AudienceQuestionGeneratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorTypeormEntity,
      GetAudienceQuestionGeneratorQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAudienceQuestionGeneratorQueryResult,
    ): AudienceQuestionGeneratorTypeormEntity => {
      return AudienceQuestionGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAudienceQuestionGeneratorQueryResult,
      AudienceQuestionGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
