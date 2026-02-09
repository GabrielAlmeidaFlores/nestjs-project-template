import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';

@Injectable()
export class SpeechGeneratorEntityAutoMapperProfile {
  protected readonly _type = SpeechGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpeechGeneratorTypeormEntity,
    ): SpeechGeneratorEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpeechGeneratorEntity.name,
          sourceClass: SpeechGeneratorTypeormEntity.name,
        });
      }

      const speechGeneratorDocument =
        source.speechGeneratorDocument !== undefined
          ? this.mapper.mapArray(
              source.speechGeneratorDocument,
              SpeechGeneratorDocumentTypeormEntity,
              SpeechGeneratorDocumentEntity,
            )
          : [];

      const speechGeneratorResult =
        source.speechGeneratorResult !== undefined
          ? this.mapper.map(
              source.speechGeneratorResult,
              SpeechGeneratorResultTypeormEntity,
              SpeechGeneratorResultEntity,
            )
          : null;

      return new SpeechGeneratorEntity({
        id: new SpeechGeneratorId(source.id),
        speechGeneratorDocument,
        speechGeneratorBenefit: null,
        speechGeneratorLegalProceeding: null,
        speechGeneratorResult,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpeechGeneratorTypeormEntity,
      SpeechGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpeechGeneratorEntity,
    ): SpeechGeneratorTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const speechGeneratorDocument =
        source.speechGeneratorDocument !== undefined &&
        source.speechGeneratorDocument.length > 0
          ? this.mapper.mapArray(
              source.speechGeneratorDocument,
              SpeechGeneratorDocumentEntity,
              SpeechGeneratorDocumentTypeormEntity,
            )
          : undefined;

      const speechGeneratorResult =
        source.speechGeneratorResult !== null
          ? this.mapper.map(
              source.speechGeneratorResult,
              SpeechGeneratorResultEntity,
              SpeechGeneratorResultTypeormEntity,
            )
          : undefined;

      return SpeechGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        speechGeneratorDocument,
        speechGeneratorBenefit: undefined,
        speechGeneratorLegalProceeding: undefined,
        speechGeneratorResult,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpeechGeneratorEntity,
      SpeechGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
