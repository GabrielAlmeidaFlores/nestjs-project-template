import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/value-object/medical-and-social-report-objection-generator-analysis-benefit-id/medical-and-social-report-objection-generator-analysis-benefit-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntityAutoMapperProfile {
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntityAutoMapperProfile.name;

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
    ): MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity => {
      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.msReportObjectionAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
        MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
      );

      return new MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity({
        ...source,
        id: new MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId(
          source.id,
        ),
        medicalAndSocialReportObjectionGeneratorAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity => {
      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      );

      return MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity.build(
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
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
