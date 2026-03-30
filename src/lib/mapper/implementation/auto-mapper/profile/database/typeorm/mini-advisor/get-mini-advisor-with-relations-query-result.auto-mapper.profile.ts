import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';
import { MiniAdvisorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { GetMiniAdvisorResultQueryResult } from '@module/customer/analysis-tool/module/mini-advisor/domain/repository/mini-advisor-result/query/result/get-mini-advisor-result.query.result';
import { GetMiniAdvisorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/mini-advisor/domain/repository/mini-advisor/query/result/get-mini-advisor-with-relations.query.result';

@Injectable()
export class GetMiniAdvisorWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMiniAdvisorWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: MiniAdvisorTypeormEntity,
    ): GetMiniAdvisorWithRelationsQueryResult => {
      if (!source.analysisToolRecord?.analysisToolClient) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetMiniAdvisorWithRelationsQueryResult.name,
          sourceClass: MiniAdvisorTypeormEntity.name,
        });
      }

      const miniAdvisorResult = source.miniAdvisorResult
        ? (this.mapper.map(
            source.miniAdvisorResult,
            MiniAdvisorResultTypeormEntity,
            GetMiniAdvisorResultQueryResult,
          ) as unknown as GetMiniAdvisorResultQueryResult)
        : null;

      return GetMiniAdvisorWithRelationsQueryResult.build({
        id: new MiniAdvisorId(source.id),
        analysisToolClientId: new AnalysisToolClientId(
          source.analysisToolRecord.analysisToolClient.id,
        ),
        clientSituation: source.clientSituation,
        clientAge: source.clientAge,
        clientGender: source.clientGender,
        clientWorkHistory: source.clientWorkHistory,
        hasContributedWithInss: source.hasContributedWithInss,
        clientHasDisabilityOrLimitations: source.clientHasDisabilityOrLimitations,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        miniAdvisorResult,
      });
    };

    createMap(
      this.mapper,
      MiniAdvisorTypeormEntity,
      GetMiniAdvisorWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
