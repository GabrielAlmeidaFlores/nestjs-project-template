import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolClientLegalProceedingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding-with-relations.query.result';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { GetLegalProceedingDetailQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail.query.result';

@Injectable()
export class GetAnalysisToolClientLegalProceedingWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolClientLegalProceedingWithRelationsQueryResultAutoMapperProfile.name;

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
    ): GetAnalysisToolClientLegalProceedingWithRelationsQueryResult => {
      if (!source.legalProceedingDetail) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetAnalysisToolClientLegalProceedingWithRelationsQueryResult.name,
          sourceClass: AnalysisToolClientLegalProceedingTypeormEntity.name,
        });
      }

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        GetAnalysisToolClientWithRelationsQueryResult,
      );

      const legalProceedingDetail = this.mapper.mapArray(
        source.legalProceedingDetail,
        LegalProceedingDetailTypeormEntity,
        GetLegalProceedingDetailQueryResult,
      );

      return GetAnalysisToolClientLegalProceedingWithRelationsQueryResult.build(
        {
          ...source,
          id: new AnalysisToolClientLegalProceedingId(source.id),
          analysisToolClient,
          legalProceedingDetail,
          type: source.type ?? null,
          status: source.status ?? null,
          lastUpdated: source.lastUpdated ?? null,
          deadline: source.deadline ?? null,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientLegalProceedingTypeormEntity,
      GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
    ): AnalysisToolClientLegalProceedingTypeormEntity => {
      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        GetAnalysisToolClientWithRelationsQueryResult,
        AnalysisToolClientTypeormEntity,
      );

      const legalProceedingDetail = this.mapper.mapArray(
        source.legalProceedingDetail,
        GetLegalProceedingDetailQueryResult,
        LegalProceedingDetailTypeormEntity,
      );

      return AnalysisToolClientLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClient,
        legalProceedingDetail,
        type: source.type,
        status: source.status,
        lastUpdated: source.lastUpdated,
        deadline: source.deadline,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
      AnalysisToolClientLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
