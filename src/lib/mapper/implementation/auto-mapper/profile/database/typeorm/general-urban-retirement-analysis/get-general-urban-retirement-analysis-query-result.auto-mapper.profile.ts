import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GetGeneralUrbanRetirementAnalysisQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis.query.result';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementAnalysisQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementAnalysisTypeormEntity,
    ): GetGeneralUrbanRetirementAnalysisQueryResult =>
      GetGeneralUrbanRetirementAnalysisQueryResult.build({
        id: new GeneralUrbanRetirementAnalysisId(source.id),
        careerStartDate: source.careerStartDate,
        publicServiceStartDate: source.publicServiceStartDate,
        generalUrbanRetirementBenefitAnalysis:
          source.generalUrbanRetirementBenefitAnalysis ?? null,
        federativeEntity: source.federativeEntity ?? null,
        state: source.state ?? null,
        municipality: source.municipality ?? null,
        name: source.name ?? null,
        benefitType: source.benefitType ?? null,
        currentPosition: source.currentPosition ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      GetGeneralUrbanRetirementAnalysisQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
