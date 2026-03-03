import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpeechGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-legal-proceeding.typeorm.entity';
import { GetSpeechGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-legal-proceeding.query.result';
import { SpeechGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/value-object/speech-generator-legal-proceeding-id/speech-generator-legal-proceeding-id.value-object';

@Injectable()
export class GetSpeechGeneratorLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpeechGeneratorLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpeechGeneratorLegalProceedingTypeormEntity,
    ): GetSpeechGeneratorLegalProceedingQueryResult => {
      return GetSpeechGeneratorLegalProceedingQueryResult.build({
        id: new SpeechGeneratorLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorLegalProceedingTypeormEntity,
      GetSpeechGeneratorLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpeechGeneratorLegalProceedingQueryResult,
    ): SpeechGeneratorLegalProceedingTypeormEntity => {
      return SpeechGeneratorLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        speechGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpeechGeneratorLegalProceedingQueryResult,
      SpeechGeneratorLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
