import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification-document.typeorm.entity';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification-document/query/result/get-survivor-pension-analysis-benefit-originator-identification-document.query.result';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/value-object/survivor-pension-analysis-benefit-originator-identification-document-id/survivor-pension-analysis-benefit-originator-identification-document-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
    ): GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult => {
      return GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult.build(
        {
          id: new SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId(
            source.id,
          ),
          documentType: source.documentType,
          documentName: source.documentName,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    createMap(
      this.mapper,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
      GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
