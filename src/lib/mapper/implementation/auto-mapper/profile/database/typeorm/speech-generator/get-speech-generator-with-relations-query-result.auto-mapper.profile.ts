import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { GetSpeechGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-document.query.result';
import { GetSpeechGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-with-relations.query.result';
import { GetSpeechGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/query/result/get-speech-generator-result.query.result';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';

@Injectable()
export class GetSpeechGeneratorWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpeechGeneratorWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpeechGeneratorTypeormEntity,
    ): GetSpeechGeneratorWithRelationsQueryResult => {
      const speechGeneratorDocument = this.mapper.mapArray(
        source.speechGeneratorDocument ?? [],
        SpeechGeneratorDocumentTypeormEntity,
        GetSpeechGeneratorDocumentQueryResult,
      );

      const speechGeneratorResult =
        source.speechGeneratorResult !== null
          ? this.mapper.map(
              source.speechGeneratorResult,
              SpeechGeneratorResultTypeormEntity,
              GetSpeechGeneratorResultQueryResult,
            )
          : null;

      return GetSpeechGeneratorWithRelationsQueryResult.build({
        id: new SpeechGeneratorId(source.id),
        speechGeneratorDocument,
        speechGeneratorResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorTypeormEntity,
      GetSpeechGeneratorWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpeechGeneratorWithRelationsQueryResult,
    ): SpeechGeneratorTypeormEntity => {
      const speechGeneratorDocument = this.mapper.mapArray(
        source.speechGeneratorDocument,
        GetSpeechGeneratorDocumentQueryResult,
        SpeechGeneratorDocumentTypeormEntity,
      );

      const speechGeneratorResult =
        source.speechGeneratorResult !== null
          ? this.mapper.map(
              source.speechGeneratorResult,
              GetSpeechGeneratorResultQueryResult,
              SpeechGeneratorResultTypeormEntity,
            )
          : undefined;

      return SpeechGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        speechGeneratorDocument,
        speechGeneratorResult,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpeechGeneratorWithRelationsQueryResult,
      SpeechGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
