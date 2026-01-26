import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-document.typeorm.entity';
import { MedicalQuestionGeneratorInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-inss-benefit.typeorm.entity';
import { MedicalQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-legal-proceeding.typeorm.entity';
import { MedicalQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-result.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';

@Injectable()
export class MedicalQuestionGeneratorEntityAutoMapperProfile {
  protected readonly _type =
    MedicalQuestionGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalQuestionGeneratorTypeormEntity,
    ): MedicalQuestionGeneratorEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MedicalQuestionGeneratorEntity.name,
          sourceClass: MedicalQuestionGeneratorTypeormEntity.name,
        });
      }

      const medicalQuestionGeneratorResult =
        source.medicalQuestionGeneratorResult !== undefined
          ? this.mapper.map(
              source.medicalQuestionGeneratorResult,
              MedicalQuestionGeneratorResultTypeormEntity,
              MedicalQuestionGeneratorResultEntity,
            )
          : null;

      const medicalQuestionGeneratorInssBenefit =
        source.medicalQuestionGeneratorInssBenefit !== undefined
          ? this.mapper.mapArray(
              source.medicalQuestionGeneratorInssBenefit,
              MedicalQuestionGeneratorInssBenefitTypeormEntity,
              MedicalQuestionGeneratorInssBenefitEntity,
            )
          : [];

      const medicalQuestionGeneratorLegalProceeding =
        source.medicalQuestionGeneratorLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.medicalQuestionGeneratorLegalProceeding,
              MedicalQuestionGeneratorLegalProceedingTypeormEntity,
              MedicalQuestionGeneratorLegalProceedingEntity,
            )
          : [];

      const medicalQuestionGeneratorDocument =
        source.medicalQuestionGeneratorDocument !== undefined
          ? this.mapper.mapArray(
              source.medicalQuestionGeneratorDocument,
              MedicalQuestionGeneratorDocumentTypeormEntity,
              MedicalQuestionGeneratorDocumentEntity,
            )
          : [];

      return new MedicalQuestionGeneratorEntity({
        ...source,
        id: new MedicalQuestionGeneratorId(source.id),
        medicalQuestionGeneratorResult,
        medicalQuestionGeneratorInssBenefit,
        medicalQuestionGeneratorLegalProceeding,
        medicalQuestionGeneratorDocument,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorTypeormEntity,
      MedicalQuestionGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalQuestionGeneratorEntity,
    ): MedicalQuestionGeneratorTypeormEntity => {
      const medicalQuestionGeneratorResult =
        source.medicalQuestionGeneratorResult !== null
          ? this.mapper.map(
              source.medicalQuestionGeneratorResult,
              MedicalQuestionGeneratorResultEntity,
              MedicalQuestionGeneratorResultTypeormEntity,
            )
          : undefined;

      const medicalQuestionGeneratorInssBenefit =
        source.medicalQuestionGeneratorInssBenefit.length > 0
          ? this.mapper.mapArray(
              source.medicalQuestionGeneratorInssBenefit,
              MedicalQuestionGeneratorInssBenefitEntity,
              MedicalQuestionGeneratorInssBenefitTypeormEntity,
            )
          : undefined;

      const medicalQuestionGeneratorLegalProceeding =
        source.medicalQuestionGeneratorLegalProceeding.length > 0
          ? this.mapper.mapArray(
              source.medicalQuestionGeneratorLegalProceeding,
              MedicalQuestionGeneratorLegalProceedingEntity,
              MedicalQuestionGeneratorLegalProceedingTypeormEntity,
            )
          : undefined;

      const medicalQuestionGeneratorDocument =
        source.medicalQuestionGeneratorDocument.length > 0
          ? this.mapper.mapArray(
              source.medicalQuestionGeneratorDocument,
              MedicalQuestionGeneratorDocumentEntity,
              MedicalQuestionGeneratorDocumentTypeormEntity,
            )
          : undefined;

      return MedicalQuestionGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        medicalQuestionGeneratorResult,
        medicalQuestionGeneratorInssBenefit,
        medicalQuestionGeneratorLegalProceeding,
        medicalQuestionGeneratorDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorEntity,
      MedicalQuestionGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
