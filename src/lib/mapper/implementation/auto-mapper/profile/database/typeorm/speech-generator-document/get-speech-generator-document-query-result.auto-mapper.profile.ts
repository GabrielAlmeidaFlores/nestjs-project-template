import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { GetSpeechGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-document.query.result';
import { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';

@Injectable()
export class GetSpeechGeneratorDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpeechGeneratorDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpeechGeneratorDocumentTypeormEntity,
    ): GetSpeechGeneratorDocumentQueryResult => {
      return GetSpeechGeneratorDocumentQueryResult.build({
        id: new SpeechGeneratorDocumentId(source.id),
        document: source.document,
        type: source.type,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorDocumentTypeormEntity,
      GetSpeechGeneratorDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpeechGeneratorDocumentQueryResult,
    ): SpeechGeneratorDocumentTypeormEntity => {
      return SpeechGeneratorDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        speechGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpeechGeneratorDocumentQueryResult,
      SpeechGeneratorDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
