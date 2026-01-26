import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-legal-proceeding.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    MedicalQuestionGeneratorLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalQuestionGeneratorLegalProceedingTypeormEntity,
    ): MedicalQuestionGeneratorLegalProceedingEntity => {
      const medicalQuestionGenerator = this.mapper.map(
        source.medicalQuestionGenerator,
        MedicalQuestionGeneratorTypeormEntity,
        MedicalQuestionGeneratorEntity,
      );

      return new MedicalQuestionGeneratorLegalProceedingEntity({
        id: new MedicalQuestionGeneratorLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        medicalQuestionGenerator,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorLegalProceedingTypeormEntity,
      MedicalQuestionGeneratorLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalQuestionGeneratorLegalProceedingEntity,
    ): MedicalQuestionGeneratorLegalProceedingTypeormEntity => {
      return MedicalQuestionGeneratorLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        medicalQuestionGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorLegalProceedingEntity,
      MedicalQuestionGeneratorLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
