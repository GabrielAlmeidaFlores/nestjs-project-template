import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document.typeorm.entity';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents-document/query/result/get-survivor-pension-analysis-deceased-benefit-dependents-document.query.result';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/value-object/survivor-pension-analysis-deceased-benefit-dependents-document-id/survivor-pension-analysis-deceased-benefit-dependents-document-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
    ): GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult => {
      return GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult.build(
        {
          id: new SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId(
            source.id,
          ),
          documentType: source.documentType,
          documentName: source.documentName,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult,
      mappingFunction,
    );
  }
}
