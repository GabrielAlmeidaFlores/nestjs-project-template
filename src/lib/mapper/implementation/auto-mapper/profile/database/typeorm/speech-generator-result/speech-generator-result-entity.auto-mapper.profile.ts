import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';

@Injectable()
export class SpeechGeneratorResultEntityAutoMapperProfile {
  protected readonly _type = SpeechGeneratorResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpeechGeneratorResultTypeormEntity,
    ): SpeechGeneratorResultEntity => {
      return new SpeechGeneratorResultEntity({
        id: new SpeechGeneratorResultId(source.id),
        clientName: source.clientName,
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? new FederalDocument(source.clientFederalDocument)
            : null,
        clientBirthDate: source.clientBirthDate,
        clientLastAffiliationDate: source.clientLastAffiliationDate,
        speechGeneratorCompleteContent: source.speechGeneratorCompleteContent,
        speechGeneratorSimplifiedContent:
          source.speechGeneratorSimplifiedContent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorResultTypeormEntity,
      SpeechGeneratorResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpeechGeneratorResultEntity,
    ): SpeechGeneratorResultTypeormEntity => {
      return SpeechGeneratorResultTypeormEntity.build({
        id: source.id.toString(),
        clientName: source.clientName,
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? source.clientFederalDocument.toString()
            : null,
        clientBirthDate: source.clientBirthDate,
        clientLastAffiliationDate: source.clientLastAffiliationDate,
        speechGeneratorCompleteContent: source.speechGeneratorCompleteContent,
        speechGeneratorSimplifiedContent:
          source.speechGeneratorSimplifiedContent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpeechGeneratorResultEntity,
      SpeechGeneratorResultTypeormEntity,
      mappingFunction,
    );
  }
}
