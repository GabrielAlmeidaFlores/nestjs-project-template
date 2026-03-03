import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-legal-proceeding.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity';
import { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    AudienceQuestionGeneratorLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorLegalProceedingTypeormEntity,
    ): AudienceQuestionGeneratorLegalProceedingEntity => {
      const audienceQuestionGenerator = this.mapper.map(
        source.audienceQuestionGenerator,
        AudienceQuestionGeneratorTypeormEntity,
        AudienceQuestionGeneratorEntity,
      );

      return new AudienceQuestionGeneratorLegalProceedingEntity({
        ...source,
        id: new AudienceQuestionGeneratorLegalProceedingId(source.id),
        audienceQuestionGenerator,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorLegalProceedingTypeormEntity,
      AudienceQuestionGeneratorLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AudienceQuestionGeneratorLegalProceedingEntity,
    ): AudienceQuestionGeneratorLegalProceedingTypeormEntity => {
      const audienceQuestionGenerator = this.mapper.map(
        source.audienceQuestionGenerator,
        AudienceQuestionGeneratorEntity,
        AudienceQuestionGeneratorTypeormEntity,
      );

      return AudienceQuestionGeneratorLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        audienceQuestionGenerator,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorLegalProceedingEntity,
      AudienceQuestionGeneratorLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
