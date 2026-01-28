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
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-benefit.query.result';
import { GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-document.query.result';
import { GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-legal-proceeding.query.result';
import { GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-with-relations.query.result';
import { GetDisabilityAssessmentForBpcAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/query/result/get-disability-assessment-for-bpc-analysis-result.query.result';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';

@Injectable()
export class GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResultAutoMapperProfile.name;

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
    ): GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult.name,
          sourceClass: DisabilityAssessmentForBpcAnalysisTypeormEntity.name,
        });
      }

      const disabilityAssessmentForBpcAnalysisResult =
        source.disabilityAssessmentForBpcAnalysisResult
          ? this.mapper.map(
              source.disabilityAssessmentForBpcAnalysisResult,
              DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
              GetDisabilityAssessmentForBpcAnalysisResultQueryResult,
            )
          : null;

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const disabilityAssessmentForBpcAnalysisBenefit = this.mapper.mapArray(
        source.disabilityAssessmentForBpcAnalysisBenefit ?? [],
        DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
        GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult,
      );

      const disabilityAssessmentForBpcAnalysisLegalProceeding =
        this.mapper.mapArray(
          source.disabilityAssessmentForBpcAnalysisLegalProceeding ?? [],
          DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
          GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult,
        );

      const disabilityAssessmentForBpcAnalysisDocument = this.mapper.mapArray(
        source.disabilityAssessmentForBpcAnalysisDocument ?? [],
        DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
        GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult,
      );

      return GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult.build(
        {
          ...source,
          id: new DisabilityAssessmentForBpcAnalysisId(source.id),
          disabilityAssessmentForBpcAnalysisResult,
          createdBy,
          updatedBy,
          disabilityAssessmentForBpcAnalysisLegalProceeding,
          disabilityAssessmentForBpcAnalysisBenefit,
          disabilityAssessmentForBpcAnalysisDocument,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult,
    ): DisabilityAssessmentForBpcAnalysisTypeormEntity => {
      const disabilityAssessmentForBpcAnalysisResult =
        source.disabilityAssessmentForBpcAnalysisResult
          ? this.mapper.map(
              source.disabilityAssessmentForBpcAnalysisResult,
              GetDisabilityAssessmentForBpcAnalysisResultQueryResult,
              DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
            )
          : undefined;

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const disabilityAssessmentForBpcAnalysisBenefit = this.mapper.mapArray(
        source.disabilityAssessmentForBpcAnalysisBenefit,
        GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult,
        DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
      );

      const disabilityAssessmentForBpcAnalysisLegalProceeding =
        this.mapper.mapArray(
          source.disabilityAssessmentForBpcAnalysisLegalProceeding,
          GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult,
          DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
        );

      const disabilityAssessmentForBpcAnalysisDocument = this.mapper.mapArray(
        source.disabilityAssessmentForBpcAnalysisDocument,
        GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult,
        DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
      );

      return DisabilityAssessmentForBpcAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        disabilityAssessmentForBpcAnalysisResult,
        updatedBy,
        createdBy,
        disabilityAssessmentForBpcAnalysisBenefit,
        disabilityAssessmentForBpcAnalysisLegalProceeding,
        disabilityAssessmentForBpcAnalysisDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
