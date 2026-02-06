import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { GetMedicalQuestionGeneratorQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator.query.result';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';

@Injectable()
export class GetMedicalQuestionGeneratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalQuestionGeneratorQueryResultAutoMapperProfile.name;

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
    ): GetMedicalQuestionGeneratorQueryResult => {
      return GetMedicalQuestionGeneratorQueryResult.build({
        id: new MedicalQuestionGeneratorId(source.id),
        disabilityDate: source.disabilityDate ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorTypeormEntity,
      GetMedicalQuestionGeneratorQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetMedicalQuestionGeneratorQueryResult,
    ): MedicalQuestionGeneratorTypeormEntity => {
      return MedicalQuestionGeneratorTypeormEntity.build({
        id: source.id.toString(),
        disabilityDate: source.disabilityDate,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetMedicalQuestionGeneratorQueryResult,
      MedicalQuestionGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
