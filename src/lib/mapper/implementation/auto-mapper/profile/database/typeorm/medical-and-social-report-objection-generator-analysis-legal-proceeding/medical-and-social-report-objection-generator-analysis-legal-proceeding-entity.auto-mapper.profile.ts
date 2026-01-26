import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/value-object/medical-and-social-report-objection-generator-analysis-legal-proceeding-id/medical-and-social-report-objection-generator-analysis-legal-proceeding-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntityAutoMapperProfile.name;

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
    ): MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity => {
      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.msReportObjectionAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
        MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
      );

      return new MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity(
        {
          ...source,
          id: new MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId(
            source.id,
          ),
          medicalAndSocialReportObjectionGeneratorAnalysis,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity => {
      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      );

      return MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          msReportObjectionAnalysis:
            medicalAndSocialReportObjectionGeneratorAnalysis,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
