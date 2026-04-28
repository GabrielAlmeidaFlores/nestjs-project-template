import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment-document.typeorm.entity';
import { BpcDisabilityTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-document.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { BpcDisabilityTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-inss-benefit.typeorm.entity';
import { BpcDisabilityTerminationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-legal-proceeding.typeorm.entity';
import { BpcDisabilityTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-result.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment-document.query.result';
import { GetBpcDisabilityTerminationDisabilityAssessmentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment.query.result';
import { GetBpcDisabilityTerminationDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-document.query.result';
import { GetBpcDisabilityTerminationFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member.query.result';
import { GetBpcDisabilityTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-with-relations.query.result';
import { GetBpcDisabilityTerminationInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-inss-benefit/query/result/get-bpc-disability-termination-inss-benefit.query.result';
import { GetBpcDisabilityTerminationLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-legal-proceeding/query/result/get-bpc-disability-termination-legal-proceeding.query.result';
import { GetBpcDisabilityTerminationResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/query/result/get-bpc-disability-termination-result.query.result';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationTypeormEntity,
    ): GetBpcDisabilityTerminationWithRelationsQueryResult => {
      const bpcDisabilityTerminationResult =
        source.bpcDisabilityTerminationResult
          ? this.mapper.map(
              source.bpcDisabilityTerminationResult,
              BpcDisabilityTerminationResultTypeormEntity,
              GetBpcDisabilityTerminationResultQueryResult,
            )
          : null;

      const bpcDisabilityTerminationDisabilityAssessment =
        source.bpcDisabilityTerminationDisabilityAssessment
          ? (() => {
              const assessmentDocs =
                source.bpcDisabilityTerminationDisabilityAssessment.bpcDisabilityTerminationDisabilityAssessmentDocument?.map(
                  (doc) =>
                    this.mapper.map(
                      doc,
                      BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
                      GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult,
                    ),
                ) ?? [];

              return GetBpcDisabilityTerminationDisabilityAssessmentQueryResult.build(
                {
                  id: new BpcDisabilityTerminationDisabilityAssessmentId(
                    source.bpcDisabilityTerminationDisabilityAssessment.id,
                  ),
                  estimatedDisabilityStartDate:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .estimatedDisabilityStartDate ?? null,
                  attendsSchoolOrTechnicalCourse:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .attendsSchoolOrTechnicalCourse ?? null,
                  performsLaborActivity:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .performsLaborActivity ?? null,
                  needsThirdPartyHelp:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .needsThirdPartyHelp ?? null,
                  hasAccessToBasicServices:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .hasAccessToBasicServices ?? null,
                  otherBarriersDescription:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .otherBarriersDescription ?? null,
                  bpcDisabilityTerminationDisabilityAssessmentDocument:
                    assessmentDocs,
                  createdAt:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .createdAt,
                  updatedAt:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .updatedAt,
                  deletedAt:
                    source.bpcDisabilityTerminationDisabilityAssessment
                      .deletedAt ?? null,
                },
              );
            })()
          : null;

      const bpcDisabilityTerminationFamilyMember =
        source.bpcDisabilityTerminationFamilyMember?.map((member) =>
          this.mapper.map(
            member,
            BpcDisabilityTerminationFamilyMemberTypeormEntity,
            GetBpcDisabilityTerminationFamilyMemberQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityTerminationDocument =
        source.bpcDisabilityTerminationDocument?.map((doc) =>
          this.mapper.map(
            doc,
            BpcDisabilityTerminationDocumentTypeormEntity,
            GetBpcDisabilityTerminationDocumentQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityTerminationInssBenefit =
        source.bpcDisabilityTerminationInssBenefit?.map((item) =>
          this.mapper.map(
            item,
            BpcDisabilityTerminationInssBenefitTypeormEntity,
            GetBpcDisabilityTerminationInssBenefitQueryResult,
          ),
        ) ?? [];

      const bpcDisabilityTerminationLegalProceeding =
        source.bpcDisabilityTerminationLegalProceeding?.map((item) =>
          this.mapper.map(
            item,
            BpcDisabilityTerminationLegalProceedingTypeormEntity,
            GetBpcDisabilityTerminationLegalProceedingQueryResult,
          ),
        ) ?? [];

      return GetBpcDisabilityTerminationWithRelationsQueryResult.build({
        id: new BpcDisabilityTerminationId(source.id),
        analysisName: source.analysisName ?? null,
        category: source.category ?? null,
        disabilityType: source.disabilityType ?? null,
        disabilityDegree: source.disabilityDegree ?? null,
        benefitCessationReason: source.benefitCessationReason ?? null,
        livesAlone: source.livesAlone ?? null,
        bpcDisabilityTerminationResult,
        bpcDisabilityTerminationDisabilityAssessment,
        bpcDisabilityTerminationFamilyMember,
        bpcDisabilityTerminationDocument,
        bpcDisabilityTerminationInssBenefit,
        bpcDisabilityTerminationLegalProceeding,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationTypeormEntity,
      GetBpcDisabilityTerminationWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
