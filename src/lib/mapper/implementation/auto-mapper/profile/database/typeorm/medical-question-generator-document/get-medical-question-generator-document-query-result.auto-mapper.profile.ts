import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-document.typeorm.entity';
import { GetMedicalQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-document.query.result';
import { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';

@Injectable()
export class GetMedicalQuestionGeneratorDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalQuestionGeneratorDocumentQueryResultAutoMapperProfile.name;

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
      MedicalQuestionGeneratorDocumentTypeormEntity,
      GetMedicalQuestionGeneratorDocumentQueryResult,
      constructUsing((source) =>
        GetMedicalQuestionGeneratorDocumentQueryResult.build({
          id: new MedicalQuestionGeneratorDocumentId(source.id),
          document: source.document,
          type: source.type,
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
      GetMedicalQuestionGeneratorDocumentQueryResult,
      MedicalQuestionGeneratorDocumentTypeormEntity,
      constructUsing((source) =>
        MedicalQuestionGeneratorDocumentTypeormEntity.build({
          id: source.id.toString(),
          document: source.document,
          type: source.type,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        }),
      ),
    );
  }
}
