import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-benefit.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity';
import { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';

@Injectable()
export class AudienceQuestionGeneratorBenefitEntityAutoMapperProfile {
  protected readonly _type =
    AudienceQuestionGeneratorBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorBenefitTypeormEntity,
    ): AudienceQuestionGeneratorBenefitEntity => {
      const audienceQuestionGenerator = this.mapper.map(
        source.audienceQuestionGenerator,
        AudienceQuestionGeneratorTypeormEntity,
        AudienceQuestionGeneratorEntity,
      );

      return new AudienceQuestionGeneratorBenefitEntity({
        ...source,
        id: new AudienceQuestionGeneratorBenefitId(source.id),
        audienceQuestionGenerator,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorBenefitTypeormEntity,
      AudienceQuestionGeneratorBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AudienceQuestionGeneratorBenefitEntity,
    ): AudienceQuestionGeneratorBenefitTypeormEntity => {
      const audienceQuestionGenerator = this.mapper.map(
        source.audienceQuestionGenerator,
        AudienceQuestionGeneratorEntity,
        AudienceQuestionGeneratorTypeormEntity,
      );

      return AudienceQuestionGeneratorBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        audienceQuestionGenerator,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorBenefitEntity,
      AudienceQuestionGeneratorBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
