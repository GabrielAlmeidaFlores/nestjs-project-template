import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment-document.typeorm.entity';
import { GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-disability-assessment-document.query.result';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/value-object/bpc-disability-termination-disability-assessment-document-id/bpc-disability-termination-disability-assessment-document-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
    ): GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult => {
      return GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult.build(
        {
          id: new BpcDisabilityTerminationDisabilityAssessmentDocumentId(
            source.id,
          ),
          document: source.document,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt ?? null,
        },
      );
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
      GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
