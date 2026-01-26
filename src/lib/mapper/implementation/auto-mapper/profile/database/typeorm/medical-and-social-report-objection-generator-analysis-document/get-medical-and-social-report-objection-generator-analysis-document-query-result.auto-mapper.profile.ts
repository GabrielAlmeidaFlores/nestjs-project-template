import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-document.entity';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-document.query.result';

@Injectable()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
    ): GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult => {
      return GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult.build(
        {
          ...source,
          id: new Guid(source.id),
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity => {
      return MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          msReportObjectionAnalysis: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
