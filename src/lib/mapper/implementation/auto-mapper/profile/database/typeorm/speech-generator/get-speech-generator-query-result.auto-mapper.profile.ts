import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { GetSpeechGeneratorQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator.query.result';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';

@Injectable()
export class GetSpeechGeneratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpeechGeneratorQueryResultAutoMapperProfile.name;

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
    ): GetSpeechGeneratorQueryResult => {
      return GetSpeechGeneratorQueryResult.build({
        id: new SpeechGeneratorId(source.id),
        speechGeneratorDocument: source.speechGeneratorDocument ?? [],
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        speechGeneratorResult: source.speechGeneratorResult ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorTypeormEntity,
      GetSpeechGeneratorQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpeechGeneratorQueryResult,
    ): SpeechGeneratorTypeormEntity => {
      return SpeechGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        speechGeneratorDocument: undefined,
        speechGeneratorResult: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpeechGeneratorQueryResult,
      SpeechGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
