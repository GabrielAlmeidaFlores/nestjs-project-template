import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-result.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/value-object/medical-and-social-report-objection-generator-analysis-result-id/medical-and-social-report-objection-generator-analysis-result-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisResultEntityAutoMapperProfile.name;

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
    ): MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity => {
      return new MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity({
        ...source,
        id: new MedicalAndSocialReportObjectionGeneratorAnalysisResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity => {
      return MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}

