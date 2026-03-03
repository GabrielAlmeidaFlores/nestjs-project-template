import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';

@Injectable()
export class SpeechGeneratorDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SpeechGeneratorDocumentEntityAutoMapperProfile.name;

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
    ): SpeechGeneratorDocumentEntity => {
      const { speechGenerator: _parent, ...rest } = source;

      return new SpeechGeneratorDocumentEntity({
        ...rest,
        id: new SpeechGeneratorDocumentId(source.id),
        speechGenerator: null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorDocumentTypeormEntity,
      SpeechGeneratorDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpeechGeneratorDocumentEntity,
    ): SpeechGeneratorDocumentTypeormEntity => {
      const speechGenerator = source.speechGenerator
        ? ({
            id: source.speechGenerator.id.toString(),
          } as SpeechGeneratorTypeormEntity)
        : undefined;

      return SpeechGeneratorDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        speechGenerator,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpeechGeneratorDocumentEntity,
      SpeechGeneratorDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
