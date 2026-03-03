import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-result.typeorm.entity';
import { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorResultEntityAutoMapperProfile {
  protected readonly _type =
    AudienceQuestionGeneratorResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorResultTypeormEntity,
    ): AudienceQuestionGeneratorResultEntity => {
      return new AudienceQuestionGeneratorResultEntity({
        ...source,
        id: new AudienceQuestionGeneratorResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorResultTypeormEntity,
      AudienceQuestionGeneratorResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AudienceQuestionGeneratorResultEntity,
    ): AudienceQuestionGeneratorResultTypeormEntity => {
      return AudienceQuestionGeneratorResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorResultEntity,
      AudienceQuestionGeneratorResultTypeormEntity,
      mappingFunction,
    );
  }
}
