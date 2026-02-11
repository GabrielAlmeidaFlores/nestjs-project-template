import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpeechGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-benefit.typeorm.entity';
import { GetSpeechGeneratorBenefitQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-benefit.query.result';
import { SpeechGeneratorBenefitId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/value-object/speech-generator-benefit-id/speech-generator-benefit-id.value-object';

@Injectable()
export class GetSpeechGeneratorBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpeechGeneratorBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpeechGeneratorBenefitTypeormEntity,
    ): GetSpeechGeneratorBenefitQueryResult => {
      return GetSpeechGeneratorBenefitQueryResult.build({
        id: new SpeechGeneratorBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorBenefitTypeormEntity,
      GetSpeechGeneratorBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpeechGeneratorBenefitQueryResult,
    ): SpeechGeneratorBenefitTypeormEntity => {
      return SpeechGeneratorBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        speechGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpeechGeneratorBenefitQueryResult,
      SpeechGeneratorBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
