import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-result.entity';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/query/result/get-medical-and-social-report-objection-generator-analysis-result.query.result';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';

@Injectable()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
    ): GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult => {
      return GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult.build({
        ...source,
        id: new MedicalAndSocialReportObjectionGeneratorAnalysisResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity => {
      return MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResult,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}

