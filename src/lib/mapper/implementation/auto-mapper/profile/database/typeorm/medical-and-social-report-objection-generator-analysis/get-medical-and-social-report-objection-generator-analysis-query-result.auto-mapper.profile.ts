import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis.query.result';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';

@Injectable()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    ): GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult => {
      return GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult.build(
        {
          ...source,
          id: new MedicalAndSocialReportObjectionGeneratorAnalysisId(source.id),
          medicalAndSocialReportObjectionGeneratorAnalysisResult:
            source.msReportObjectionAnalysisResult ?? null,
          medicalAndSocialReportObjectionGeneratorAnalysisBenefit:
            source.medicalAndSocialReportObjectionGeneratorAnalysisBenefit ??
            [],
          medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding:
            source.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding ??
            [],
          medicalAndSocialReportObjectionGeneratorAnalysisDocument:
            source.medicalAndSocialReportObjectionGeneratorAnalysisDocument ??
            [],
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity => {
      return MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          msReportObjectionAnalysisResult: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
