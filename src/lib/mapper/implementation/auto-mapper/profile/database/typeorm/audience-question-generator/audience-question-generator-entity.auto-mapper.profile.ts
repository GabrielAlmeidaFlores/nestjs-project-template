import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-document.typeorm.entity';
import { AudienceQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-result.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';

@Injectable()
export class AudienceQuestionGeneratorEntityAutoMapperProfile {
  protected readonly _type = AudienceQuestionGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AudienceQuestionGeneratorTypeormEntity,
    ): AudienceQuestionGeneratorEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AudienceQuestionGeneratorEntity.name,
          sourceClass: AudienceQuestionGeneratorTypeormEntity.name,
        });
      }

      const audienceQuestionGeneratorResult =
        source.audienceQuestionGeneratorResult !== undefined
          ? this.mapper.map(
              source.audienceQuestionGeneratorResult,
              AudienceQuestionGeneratorResultTypeormEntity,
              AudienceQuestionGeneratorResultEntity,
            )
          : null;

      const audienceQuestionGeneratorDocument =
        source.audienceQuestionGeneratorDocument !== undefined
          ? this.mapper.mapArray(
              source.audienceQuestionGeneratorDocument,
              AudienceQuestionGeneratorDocumentTypeormEntity,
              AudienceQuestionGeneratorDocumentEntity,
            )
          : [];

      return new AudienceQuestionGeneratorEntity({
        ...source,
        id: new AudienceQuestionGeneratorId(source.id),
        audienceQuestionGeneratorResult,
        audienceQuestionGeneratorDocument,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorTypeormEntity,
      AudienceQuestionGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AudienceQuestionGeneratorEntity,
    ): AudienceQuestionGeneratorTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const audienceQuestionGeneratorResult =
        source.audienceQuestionGeneratorResult !== null
          ? this.mapper.map(
              source.audienceQuestionGeneratorResult,
              AudienceQuestionGeneratorResultEntity,
              AudienceQuestionGeneratorResultTypeormEntity,
            )
          : undefined;

      const audienceQuestionGeneratorDocument =
        source.audienceQuestionGeneratorDocument !== null
          ? this.mapper.mapArray(
              source.audienceQuestionGeneratorDocument,
              AudienceQuestionGeneratorDocumentEntity,
              AudienceQuestionGeneratorDocumentTypeormEntity,
            )
          : undefined;

      return AudienceQuestionGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        audienceQuestionGeneratorResult,
        audienceQuestionGeneratorDocument,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorEntity,
      AudienceQuestionGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
