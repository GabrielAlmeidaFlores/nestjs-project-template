import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-legal-proceeding.typeorm.entity';
import { GetAudienceQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-legal-proceeding/query/result/get-audience-question-generator-legal-proceeding.query.result';
import { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';

@Injectable()
export class GetAudienceQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAudienceQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AudienceQuestionGeneratorLegalProceedingTypeormEntity,
    ): GetAudienceQuestionGeneratorLegalProceedingQueryResult => {
      return GetAudienceQuestionGeneratorLegalProceedingQueryResult.build({
        ...source,
        id: new AudienceQuestionGeneratorLegalProceedingId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorLegalProceedingTypeormEntity,
      GetAudienceQuestionGeneratorLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAudienceQuestionGeneratorLegalProceedingQueryResult,
    ): AudienceQuestionGeneratorLegalProceedingTypeormEntity => {
      return AudienceQuestionGeneratorLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        audienceQuestionGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetAudienceQuestionGeneratorLegalProceedingQueryResult,
      AudienceQuestionGeneratorLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
