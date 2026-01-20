import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/value-object/medical-and-social-report-objection-generator-analysis-document-id/medical-and-social-report-objection-generator-analysis-document-id.value-object';

@Injectable()
export class MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntityAutoMapperProfile.name;

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
    ): MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity => {
      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
        MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
      );

      return new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity({
        ...source,
        id: new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId(source.id),
        medicalAndSocialReportObjectionGeneratorAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
    ): MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity => {
      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      );

      return MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        medicalAndSocialReportObjectionGeneratorAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity,
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}

