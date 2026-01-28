import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-inss-benefit.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    MedicalQuestionGeneratorInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalQuestionGeneratorInssBenefitTypeormEntity,
    ): MedicalQuestionGeneratorInssBenefitEntity => {
      const medicalQuestionGenerator = this.mapper.map(
        source.medicalQuestionGenerator,
        MedicalQuestionGeneratorTypeormEntity,
        MedicalQuestionGeneratorEntity,
      );

      return new MedicalQuestionGeneratorInssBenefitEntity({
        id: new MedicalQuestionGeneratorInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        medicalQuestionGenerator,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorInssBenefitTypeormEntity,
      MedicalQuestionGeneratorInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalQuestionGeneratorInssBenefitEntity,
    ): MedicalQuestionGeneratorInssBenefitTypeormEntity => {
      const medicalQuestionGenerator = this.mapper.map(
        source.medicalQuestionGenerator,
        MedicalQuestionGeneratorEntity,
        MedicalQuestionGeneratorTypeormEntity,
      );

      return MedicalQuestionGeneratorInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        medicalQuestionGenerator,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorInssBenefitEntity,
      MedicalQuestionGeneratorInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
