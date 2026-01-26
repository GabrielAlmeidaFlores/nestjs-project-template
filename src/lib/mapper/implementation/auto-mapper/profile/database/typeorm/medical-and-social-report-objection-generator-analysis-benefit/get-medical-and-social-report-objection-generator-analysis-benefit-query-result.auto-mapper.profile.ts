import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-benefit.query.result';

@Injectable()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
    ): GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult => {
      return GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult.build(
        {
          ...source,
          id: new Guid(source.id),
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
      GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity => {
      return MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity.build(
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
      GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult,
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
