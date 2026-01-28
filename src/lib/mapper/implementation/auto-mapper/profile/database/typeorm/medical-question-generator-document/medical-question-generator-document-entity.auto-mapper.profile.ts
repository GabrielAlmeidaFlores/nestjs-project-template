import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-document.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorDocumentEntityAutoMapperProfile {
  protected readonly _type =
    MedicalQuestionGeneratorDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalQuestionGeneratorDocumentTypeormEntity,
    ): MedicalQuestionGeneratorDocumentEntity => {
      const medicalQuestionGenerator = this.mapper.map(
        source.medicalQuestionGenerator,
        MedicalQuestionGeneratorTypeormEntity,
        MedicalQuestionGeneratorEntity,
      );

      return new MedicalQuestionGeneratorDocumentEntity({
        id: new MedicalQuestionGeneratorDocumentId(source.id),
        document: source.document,
        type: source.type,
        medicalQuestionGenerator,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorDocumentTypeormEntity,
      MedicalQuestionGeneratorDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalQuestionGeneratorDocumentEntity,
    ): MedicalQuestionGeneratorDocumentTypeormEntity => {
      const medicalQuestionGenerator = this.mapper.map(
        source.medicalQuestionGenerator,
        MedicalQuestionGeneratorEntity,
        MedicalQuestionGeneratorTypeormEntity,
      );

      return MedicalQuestionGeneratorDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        medicalQuestionGenerator,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorDocumentEntity,
      MedicalQuestionGeneratorDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
