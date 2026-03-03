import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-legal-proceeding.query.result';

@Injectable()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
    ): GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult => {
      return GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult.build(
        {
          ...source,
          id: new Guid(source.id),
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity => {
      return MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity.build(
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
      GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
