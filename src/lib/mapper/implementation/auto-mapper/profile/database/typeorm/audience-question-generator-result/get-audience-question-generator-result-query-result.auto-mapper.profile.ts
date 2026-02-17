import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-result.typeorm.entity';
import { GetAudienceQuestionGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/query/result/get-audience-question-generator-result.query.result';
import { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';

@Injectable()
export class GetAudienceQuestionGeneratorResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAudienceQuestionGeneratorResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorResultTypeormEntity,
    ): GetAudienceQuestionGeneratorResultQueryResult => {
      return GetAudienceQuestionGeneratorResultQueryResult.build({
        ...source,
        id: new AudienceQuestionGeneratorResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorResultTypeormEntity,
      GetAudienceQuestionGeneratorResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAudienceQuestionGeneratorResultQueryResult,
    ): AudienceQuestionGeneratorResultTypeormEntity => {
      return AudienceQuestionGeneratorResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAudienceQuestionGeneratorResultQueryResult,
      AudienceQuestionGeneratorResultTypeormEntity,
      mappingFunction,
    );
  }
}
