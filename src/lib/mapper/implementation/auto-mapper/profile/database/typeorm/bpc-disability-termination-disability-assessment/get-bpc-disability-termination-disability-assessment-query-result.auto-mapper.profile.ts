import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment-document.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment.typeorm.entity';
import { GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment-document.query.result';
import { GetBpcDisabilityTerminationDisabilityAssessmentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment.query.result';
import { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationDisabilityAssessmentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationDisabilityAssessmentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
    ): GetBpcDisabilityTerminationDisabilityAssessmentQueryResult => {
      const bpcDisabilityTerminationDisabilityAssessmentDocument =
        source.bpcDisabilityTerminationDisabilityAssessmentDocument?.map(
          (doc) =>
            this.mapper.map(
              doc,
              BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
              GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult,
            ),
        ) ?? [];

      return GetBpcDisabilityTerminationDisabilityAssessmentQueryResult.build({
        id: new BpcDisabilityTerminationDisabilityAssessmentId(source.id),
        estimatedDisabilityStartDate:
          source.estimatedDisabilityStartDate ?? null,
        attendsSchoolOrTechnicalCourse:
          source.attendsSchoolOrTechnicalCourse ?? null,
        performsLaborActivity: source.performsLaborActivity ?? null,
        needsThirdPartyHelp: source.needsThirdPartyHelp ?? null,
        hasAccessToBasicServices: source.hasAccessToBasicServices ?? null,
        otherBarriersDescription: source.otherBarriersDescription ?? null,
        bpcDisabilityTerminationDisabilityAssessmentDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
      GetBpcDisabilityTerminationDisabilityAssessmentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
