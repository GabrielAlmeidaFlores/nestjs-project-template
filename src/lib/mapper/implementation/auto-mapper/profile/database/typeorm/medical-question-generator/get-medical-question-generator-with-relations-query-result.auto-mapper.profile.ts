import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-document.typeorm.entity';
import { MedicalQuestionGeneratorInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-inss-benefit.typeorm.entity';
import { MedicalQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-legal-proceeding.typeorm.entity';
import { MedicalQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-result.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { GetMedicalQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-document.query.result';
import { GetMedicalQuestionGeneratorInssBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-inss-benefit.query.result';
import { GetMedicalQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-legal-proceeding.query.result';
import { GetMedicalQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-with-relations.query.result';
import { GetMedicalQuestionGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/query/result/get-medical-question-generator-result.query.result';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

@Injectable()
export class GetMedicalQuestionGeneratorWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalQuestionGeneratorWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: MedicalQuestionGeneratorTypeormEntity,
    ): GetMedicalQuestionGeneratorWithRelationsQueryResult => {
      const medicalQuestionGeneratorResult =
        source.medicalQuestionGeneratorResult
          ? this.mapper.map(
              source.medicalQuestionGeneratorResult,
              MedicalQuestionGeneratorResultTypeormEntity,
              GetMedicalQuestionGeneratorResultQueryResult,
            )
          : null;

      const medicalQuestionGeneratorInssBenefit = this.mapper.mapArray(
        source.medicalQuestionGeneratorInssBenefit ?? [],
        MedicalQuestionGeneratorInssBenefitTypeormEntity,
        GetMedicalQuestionGeneratorInssBenefitQueryResult,
      );

      const medicalQuestionGeneratorLegalProceeding = this.mapper.mapArray(
        source.medicalQuestionGeneratorLegalProceeding ?? [],
        MedicalQuestionGeneratorLegalProceedingTypeormEntity,
        GetMedicalQuestionGeneratorLegalProceedingQueryResult,
      );

      const medicalQuestionGeneratorDocument = this.mapper.mapArray(
        source.medicalQuestionGeneratorDocument ?? [],
        MedicalQuestionGeneratorDocumentTypeormEntity,
        GetMedicalQuestionGeneratorDocumentQueryResult,
      );

      return GetMedicalQuestionGeneratorWithRelationsQueryResult.build({
        id: new MedicalQuestionGeneratorId(source.id),
        disabilityDate: source.disabilityDate ?? null,
        medicalQuestionGeneratorResult,
        medicalQuestionGeneratorInssBenefit,
        medicalQuestionGeneratorLegalProceeding,
        medicalQuestionGeneratorDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorTypeormEntity,
      GetMedicalQuestionGeneratorWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetMedicalQuestionGeneratorWithRelationsQueryResult,
    ): MedicalQuestionGeneratorTypeormEntity => {
      const medicalQuestionGeneratorResult =
        source.medicalQuestionGeneratorResult
          ? this.mapper.map(
              source.medicalQuestionGeneratorResult,
              GetMedicalQuestionGeneratorResultQueryResult,
              MedicalQuestionGeneratorResultTypeormEntity,
            )
          : undefined;

      const medicalQuestionGeneratorInssBenefit = this.mapper.mapArray(
        source.medicalQuestionGeneratorInssBenefit,
        GetMedicalQuestionGeneratorInssBenefitQueryResult,
        MedicalQuestionGeneratorInssBenefitTypeormEntity,
      );

      const medicalQuestionGeneratorLegalProceeding = this.mapper.mapArray(
        source.medicalQuestionGeneratorLegalProceeding,
        GetMedicalQuestionGeneratorLegalProceedingQueryResult,
        MedicalQuestionGeneratorLegalProceedingTypeormEntity,
      );

      const medicalQuestionGeneratorDocument = this.mapper.mapArray(
        source.medicalQuestionGeneratorDocument,
        GetMedicalQuestionGeneratorDocumentQueryResult,
        MedicalQuestionGeneratorDocumentTypeormEntity,
      );

      return MedicalQuestionGeneratorTypeormEntity.build({
        id: source.id.toString(),
        disabilityDate: source.disabilityDate,
        medicalQuestionGeneratorResult,
        medicalQuestionGeneratorInssBenefit,
        medicalQuestionGeneratorLegalProceeding,
        medicalQuestionGeneratorDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetMedicalQuestionGeneratorWithRelationsQueryResult,
      MedicalQuestionGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
