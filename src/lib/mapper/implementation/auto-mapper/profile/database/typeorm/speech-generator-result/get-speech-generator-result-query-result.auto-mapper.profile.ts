import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import { GetSpeechGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/query/result/get-speech-generator-result.query.result';
import { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';

@Injectable()
export class GetSpeechGeneratorResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpeechGeneratorResultQueryResultAutoMapperProfile.name;

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
    ): GetSpeechGeneratorResultQueryResult => {
      return GetSpeechGeneratorResultQueryResult.build({
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
      GetSpeechGeneratorResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpeechGeneratorResultQueryResult,
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
        speechGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpeechGeneratorResultQueryResult,
      SpeechGeneratorResultTypeormEntity,
      mappingFunction,
    );
  }
}
