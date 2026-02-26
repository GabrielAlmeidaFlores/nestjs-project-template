import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-legal-proceeding.typeorm.entity';
import { GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-legal-proceeding/query/result/get-general-urban-retirement-analysis-legal-proceeding.query.result';
import { GeneralUrbanRetirementAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/value-object/general-urban-retirement-analysis-legal-proceeding-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
    ): GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult => {
      return GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementAnalysisLegalProceedingId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
      GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult,
    ): GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity => {
      return GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementAnalysis: undefined,
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult,
      GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
