import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-inss-benefit.typeorm.entity';
import { GetMedicalQuestionGeneratorInssBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-inss-benefit.query.result';
import { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';

@Injectable()
export class GetMedicalQuestionGeneratorInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalQuestionGeneratorInssBenefitQueryResultAutoMapperProfile.name;

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
      MedicalQuestionGeneratorInssBenefitTypeormEntity,
      GetMedicalQuestionGeneratorInssBenefitQueryResult,
      constructUsing((source) =>
        GetMedicalQuestionGeneratorInssBenefitQueryResult.build({
          id: new MedicalQuestionGeneratorInssBenefitId(source.id),
          inssBenefitNumber: source.inssBenefitNumber,
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
      GetMedicalQuestionGeneratorInssBenefitQueryResult,
      MedicalQuestionGeneratorInssBenefitTypeormEntity,
      constructUsing((source) =>
        MedicalQuestionGeneratorInssBenefitTypeormEntity.build({
          id: source.id.toString(),
          inssBenefitNumber: source.inssBenefitNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          medicalQuestionGenerator: undefined,
        }),
      ),
    );
  }
}
