import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-document.typeorm.entity';
import { GetGeneralUrbanRetirementAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/query/result/get-general-urban-retirement-analysis-document.query.result';
import { GeneralUrbanRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/value-object/general-urban-retirement-analysis-document-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementAnalysisDocumentTypeormEntity,
    ): GetGeneralUrbanRetirementAnalysisDocumentQueryResult => {
      return GetGeneralUrbanRetirementAnalysisDocumentQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementAnalysisDocumentId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisDocumentTypeormEntity,
      GetGeneralUrbanRetirementAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetGeneralUrbanRetirementAnalysisDocumentQueryResult,
    ): GeneralUrbanRetirementAnalysisDocumentTypeormEntity => {
      return GeneralUrbanRetirementAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementAnalysis: null,
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementAnalysisDocumentQueryResult,
      GeneralUrbanRetirementAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
