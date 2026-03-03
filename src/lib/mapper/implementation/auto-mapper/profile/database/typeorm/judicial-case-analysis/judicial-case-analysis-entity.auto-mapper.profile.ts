import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-benefit.typeorm.entity';
import { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import { JudicialCaseAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-legal-proceeding.typeorm.entity';
import { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';

@Injectable()
export class JudicialCaseAnalysisEntityAutoMapperProfile {
  protected readonly _type = JudicialCaseAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisTypeormEntity,
    ): JudicialCaseAnalysisEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: JudicialCaseAnalysisEntity.name,
          sourceClass: JudicialCaseAnalysisTypeormEntity.name,
        });
      }

      const judicialCaseAnalysisResult =
        source.judicialCaseAnalysisResult !== undefined
          ? this.mapper.map(
              source.judicialCaseAnalysisResult,
              JudicialCaseAnalysisResultTypeormEntity,
              JudicialCaseAnalysisResultEntity,
            )
          : null;

      const judicialCaseAnalysisBenefit =
        source.judicialCaseAnalysisBenefit !== undefined
          ? this.mapper.mapArray(
              source.judicialCaseAnalysisBenefit,
              JudicialCaseAnalysisBenefitTypeormEntity,
              JudicialCaseAnalysisBenefitEntity,
            )
          : [];

      const judicialCaseAnalysisLegalProceeding =
        source.judicialCaseAnalysisLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.judicialCaseAnalysisLegalProceeding,
              JudicialCaseAnalysisLegalProceedingTypeormEntity,
              JudicialCaseAnalysisLegalProceedingEntity,
            )
          : [];

      const judicialCaseAnalysisDocument =
        source.judicialCaseAnalysisDocument !== undefined
          ? this.mapper.mapArray(
              source.judicialCaseAnalysisDocument,
              JudicialCaseAnalysisDocumentTypeormEntity,
              JudicialCaseAnalysisDocumentEntity,
            )
          : [];

      return new JudicialCaseAnalysisEntity({
        ...source,
        id: new JudicialCaseAnalysisId(source.id),
        judicialCaseAnalysisResult,
        judicialCaseAnalysisBenefit,
        judicialCaseAnalysisLegalProceeding,
        judicialCaseAnalysisDocument,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisTypeormEntity,
      JudicialCaseAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: JudicialCaseAnalysisEntity,
    ): JudicialCaseAnalysisTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const judicialCaseAnalysisResult =
        source.judicialCaseAnalysisResult !== null
          ? this.mapper.map(
              source.judicialCaseAnalysisResult,
              JudicialCaseAnalysisResultEntity,
              JudicialCaseAnalysisResultTypeormEntity,
            )
          : undefined;

      const judicialCaseAnalysisBenefit =
        source.judicialCaseAnalysisBenefit !== null
          ? this.mapper.mapArray(
              source.judicialCaseAnalysisBenefit,
              JudicialCaseAnalysisBenefitEntity,
              JudicialCaseAnalysisBenefitTypeormEntity,
            )
          : undefined;

      const judicialCaseAnalysisLegalProceeding =
        source.judicialCaseAnalysisLegalProceeding !== null
          ? this.mapper.mapArray(
              source.judicialCaseAnalysisLegalProceeding,
              JudicialCaseAnalysisLegalProceedingEntity,
              JudicialCaseAnalysisLegalProceedingTypeormEntity,
            )
          : undefined;

      const judicialCaseAnalysisDocument =
        source.judicialCaseAnalysisDocument !== null
          ? this.mapper.mapArray(
              source.judicialCaseAnalysisDocument,
              JudicialCaseAnalysisDocumentEntity,
              JudicialCaseAnalysisDocumentTypeormEntity,
            )
          : undefined;

      return JudicialCaseAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysisResult,
        judicialCaseAnalysisBenefit,
        judicialCaseAnalysisLegalProceeding,
        judicialCaseAnalysisDocument,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisEntity,
      JudicialCaseAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
