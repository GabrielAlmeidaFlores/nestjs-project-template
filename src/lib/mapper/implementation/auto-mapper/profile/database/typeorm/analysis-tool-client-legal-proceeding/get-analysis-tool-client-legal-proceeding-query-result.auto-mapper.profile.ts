import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

@Injectable()
export class GetAnalysisToolClientLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolClientLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AnalysisToolClientLegalProceedingTypeormEntity,
    ): GetAnalysisToolClientLegalProceedingQueryResult => {
      return GetAnalysisToolClientLegalProceedingQueryResult.build({
        ...source,
        id: new AnalysisToolClientLegalProceedingId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientLegalProceedingTypeormEntity,
      GetAnalysisToolClientLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAnalysisToolClientLegalProceedingQueryResult,
    ): AnalysisToolClientLegalProceedingTypeormEntity => {
      return AnalysisToolClientLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClient: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolClientLegalProceedingQueryResult,
      AnalysisToolClientLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
