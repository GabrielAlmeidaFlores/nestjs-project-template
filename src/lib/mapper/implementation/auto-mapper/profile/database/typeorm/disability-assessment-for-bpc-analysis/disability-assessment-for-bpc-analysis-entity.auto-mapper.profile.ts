import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityAssessmentForBpcAnalysisTypeormEntity,
    ): DisabilityAssessmentForBpcAnalysisEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: DisabilityAssessmentForBpcAnalysisEntity.name,
          sourceClass: DisabilityAssessmentForBpcAnalysisTypeormEntity.name,
        });
      }

      const disabilityAssessmentForBpcAnalysisResult =
        source.disabilityAssessmentForBpcAnalysisResult !== undefined
          ? this.mapper.map(
              source.disabilityAssessmentForBpcAnalysisResult,
              DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
              DisabilityAssessmentForBpcAnalysisResultEntity,
            )
          : null;

      const disabilityAssessmentForBpcAnalysisBenefit =
        source.disabilityAssessmentForBpcAnalysisBenefit !== undefined
          ? this.mapper.mapArray(
              source.disabilityAssessmentForBpcAnalysisBenefit,
              DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
              DisabilityAssessmentForBpcAnalysisBenefitEntity,
            )
          : [];

      const disabilityAssessmentForBpcAnalysisLegalProceeding =
        source.disabilityAssessmentForBpcAnalysisLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.disabilityAssessmentForBpcAnalysisLegalProceeding,
              DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
              DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
            )
          : [];

      const disabilityAssessmentForBpcAnalysisDocument =
        source.disabilityAssessmentForBpcAnalysisDocument !== undefined
          ? this.mapper.mapArray(
              source.disabilityAssessmentForBpcAnalysisDocument,
              DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
              DisabilityAssessmentForBpcAnalysisDocumentEntity,
            )
          : [];

      return new DisabilityAssessmentForBpcAnalysisEntity({
        ...source,
        id: new DisabilityAssessmentForBpcAnalysisId(source.id),
        disabilityAssessmentForBpcAnalysisResult,
        disabilityAssessmentForBpcAnalysisBenefit,
        disabilityAssessmentForBpcAnalysisLegalProceeding,
        disabilityAssessmentForBpcAnalysisDocument,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      DisabilityAssessmentForBpcAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityAssessmentForBpcAnalysisEntity,
    ): DisabilityAssessmentForBpcAnalysisTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const disabilityAssessmentForBpcAnalysisResult =
        source.disabilityAssessmentForBpcAnalysisResult !== null
          ? this.mapper.map(
              source.disabilityAssessmentForBpcAnalysisResult,
              DisabilityAssessmentForBpcAnalysisResultEntity,
              DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
            )
          : undefined;

      const disabilityAssessmentForBpcAnalysisBenefit =
        source.disabilityAssessmentForBpcAnalysisBenefit !== undefined
          ? this.mapper.mapArray(
              source.disabilityAssessmentForBpcAnalysisBenefit,
              DisabilityAssessmentForBpcAnalysisBenefitEntity,
              DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
            )
          : undefined;

      const disabilityAssessmentForBpcAnalysisLegalProceeding =
        source.disabilityAssessmentForBpcAnalysisLegalProceeding !== undefined
          ? this.mapper.mapArray(
              source.disabilityAssessmentForBpcAnalysisLegalProceeding,
              DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
              DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
            )
          : undefined;

      const disabilityAssessmentForBpcAnalysisDocument =
        source.disabilityAssessmentForBpcAnalysisDocument !== undefined
          ? this.mapper.mapArray(
              source.disabilityAssessmentForBpcAnalysisDocument,
              DisabilityAssessmentForBpcAnalysisDocumentEntity,
              DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
            )
          : undefined;

      return DisabilityAssessmentForBpcAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        disabilityAssessmentForBpcAnalysisResult,
        disabilityAssessmentForBpcAnalysisBenefit,
        disabilityAssessmentForBpcAnalysisLegalProceeding,
        disabilityAssessmentForBpcAnalysisDocument,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisEntity,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
