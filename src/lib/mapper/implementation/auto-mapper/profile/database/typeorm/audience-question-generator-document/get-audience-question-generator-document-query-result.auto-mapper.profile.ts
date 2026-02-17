import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-document.typeorm.entity';
import { GetAudienceQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-document.query.result';
import { AudienceQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/value-object/audience-question-generator-document-id/audience-question-generator-document-id.value-object';

@Injectable()
export class GetAudienceQuestionGeneratorDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAudienceQuestionGeneratorDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorDocumentTypeormEntity,
    ): GetAudienceQuestionGeneratorDocumentQueryResult => {
      return GetAudienceQuestionGeneratorDocumentQueryResult.build({
        ...source,
        id: new AudienceQuestionGeneratorDocumentId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorDocumentTypeormEntity,
      GetAudienceQuestionGeneratorDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAudienceQuestionGeneratorDocumentQueryResult,
    ): AudienceQuestionGeneratorDocumentTypeormEntity => {
      return AudienceQuestionGeneratorDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        audienceQuestionGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAudienceQuestionGeneratorDocumentQueryResult,
      AudienceQuestionGeneratorDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
