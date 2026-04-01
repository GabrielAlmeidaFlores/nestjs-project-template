import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { GetMiniAdvisorResultQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/query/result/get-mini-advisor-result.query.result';

@Injectable()
export class GetMiniAdvisorResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMiniAdvisorResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: MiniAdvisorResultTypeormEntity,
    ): GetMiniAdvisorResultQueryResult => {
      if (!source.miniAdvisor) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetMiniAdvisorResultQueryResult.name,
          sourceClass: MiniAdvisorResultTypeormEntity.name,
        });
      }

      return GetMiniAdvisorResultQueryResult.build({
        id: new MiniAdvisorResultId(source.id),
        miniAdvisorId: new MiniAdvisorId(source.miniAdvisor.id),
        chosenAnalysis: source.chosenAnalysis,
        benefitDescription: source.benefitDescription,
        attentionNote: source.attentionNote,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    createMap(
      this.mapper,
      MiniAdvisorResultTypeormEntity,
      GetMiniAdvisorResultQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
