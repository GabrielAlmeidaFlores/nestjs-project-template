import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { MedicalQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-result.typeorm.entity';
import { GetMedicalQuestionGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/query/result/get-medical-question-generator-result.query.result';
import { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';

@Injectable()
export class GetMedicalQuestionGeneratorResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalQuestionGeneratorResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: MedicalQuestionGeneratorResultTypeormEntity,
    ): GetMedicalQuestionGeneratorResultQueryResult => {
      return GetMedicalQuestionGeneratorResultQueryResult.build({
        id: new MedicalQuestionGeneratorResultId(source.id),
        clientName: source.clientName,
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? new FederalDocument(source.clientFederalDocument)
            : null,
        clientBirthDate: source.clientBirthDate,
        clientLastAffiliationDate: source.clientLastAffiliationDate,
        medicalQuestionGeneratorCompleteAnalysis:
          source.medicalQuestionGeneratorCompleteAnalysis,
        medicalQuestionGeneratorSimplifiedAnalysis:
          source.medicalQuestionGeneratorSimplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorResultTypeormEntity,
      GetMedicalQuestionGeneratorResultQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetMedicalQuestionGeneratorResultQueryResult,
    ): MedicalQuestionGeneratorResultTypeormEntity => {
      return MedicalQuestionGeneratorResultTypeormEntity.build({
        id: source.id.toString(),
        clientName: source.clientName,
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? source.clientFederalDocument.toString()
            : null,
        clientBirthDate: source.clientBirthDate,
        clientLastAffiliationDate: source.clientLastAffiliationDate,
        medicalQuestionGeneratorCompleteAnalysis:
          source.medicalQuestionGeneratorCompleteAnalysis,
        medicalQuestionGeneratorSimplifiedAnalysis:
          source.medicalQuestionGeneratorSimplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetMedicalQuestionGeneratorResultQueryResult,
      MedicalQuestionGeneratorResultTypeormEntity,
      mappingFunction,
    );
  }
}
