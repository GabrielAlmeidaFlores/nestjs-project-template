import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-legal-proceeding.typeorm.entity';
import { GetMedicalQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-legal-proceeding.query.result';
import { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';

@Injectable()
export class GetMedicalQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      MedicalQuestionGeneratorLegalProceedingTypeormEntity,
      GetMedicalQuestionGeneratorLegalProceedingQueryResult,
      constructUsing((source) =>
        GetMedicalQuestionGeneratorLegalProceedingQueryResult.build({
          id: new MedicalQuestionGeneratorLegalProceedingId(source.id),
          legalProceedingNumber: source.legalProceedingNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt ?? null,
        }),
      ),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    createMap(
      this.mapper,
      GetMedicalQuestionGeneratorLegalProceedingQueryResult,
      MedicalQuestionGeneratorLegalProceedingTypeormEntity,
      constructUsing((source) =>
        MedicalQuestionGeneratorLegalProceedingTypeormEntity.build({
          id: source.id.toString(),
          legalProceedingNumber: source.legalProceedingNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          medicalQuestionGenerator: undefined,
        }),
      ),
    );
  }
}
