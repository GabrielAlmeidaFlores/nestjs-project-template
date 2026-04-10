import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/result/get-survivor-pension-analysis-deceased-benefit-dependents.query.result';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents-document/query/result/get-survivor-pension-analysis-deceased-benefit-dependents-document.query.result';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    ): GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult.name,
          sourceClass:
            SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity.name,
        });
      }

      const documents = (source.documents ?? []).map((doc) =>
        this.mapper.map(
          doc,
          SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
          GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult,
        ),
      );

      return GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult.build(
        {
          id: new SurvivorPensionAnalysisDeceasedBenefitDependentsId(source.id),
          survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
            source.survivorPensionAnalysis.id,
          ),
          dependentFullName: source.dependentFullName,
          dependencyClassificationLevel: source.dependencyClassificationLevel,
          type: source.type,
          gender: source.gender,
          dateOfBirth: source.dateOfBirth,
          hasDisabilityOrInvalidity: source.hasDisabilityOrInvalidity,
          unionCommencementDate: source.unionCommencementDate,
          documents,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult,
      mappingFunction,
    );
  }
}
