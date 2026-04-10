import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/result/get-survivor-pension-analysis-benefit-originator-identification.query.result';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification-document/query/result/get-survivor-pension-analysis-benefit-originator-identification-document.query.result';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    ): GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult.name,
          sourceClass:
            SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity.name,
        });
      }

      const documents = (source.documents ?? []).map((doc) =>
        this.mapper.map(
          doc,
          SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
          GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult,
        ),
      );

      return GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult.build(
        {
          id: new SurvivorPensionAnalysisBenefitOriginatorIdentificationId(
            source.id,
          ),
          survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
            source.survivorPensionAnalysis.id,
          ),
          analysisToolClientId:
            source.analysisToolClientId !== null
              ? new AnalysisToolClientId(source.analysisToolClientId)
              : null,
          deathDate: source.deathDate,
          federativeEntity: source.federativeEntity,
          stateCode: source.stateCode,
          beneficiaryWasRetired: source.beneficiaryWasRetired,
          documents,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult,
      mappingFunction,
    );
  }
}
