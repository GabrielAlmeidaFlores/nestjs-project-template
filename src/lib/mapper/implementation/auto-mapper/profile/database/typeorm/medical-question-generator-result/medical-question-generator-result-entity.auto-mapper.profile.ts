import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { MedicalQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-result.typeorm.entity';
import { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';
import { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';

@Injectable()
export class MedicalQuestionGeneratorResultEntityAutoMapperProfile {
  protected readonly _type =
    MedicalQuestionGeneratorResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalQuestionGeneratorResultTypeormEntity,
    ): MedicalQuestionGeneratorResultEntity => {
      return new MedicalQuestionGeneratorResultEntity({
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
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorResultTypeormEntity,
      MedicalQuestionGeneratorResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalQuestionGeneratorResultEntity,
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

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalQuestionGeneratorResultEntity,
      MedicalQuestionGeneratorResultTypeormEntity,
      mappingFunction,
    );
  }
}
