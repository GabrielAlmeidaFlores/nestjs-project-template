import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { GetBpcDisabilityTerminationQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination.query.result';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationTypeormEntity,
    ): GetBpcDisabilityTerminationQueryResult => {
      return GetBpcDisabilityTerminationQueryResult.build({
        id: new BpcDisabilityTerminationId(source.id),
        analysisName: source.analysisName ?? null,
        category: source.category ?? null,
        disabilityType: source.disabilityType ?? null,
        disabilityDegree: source.disabilityDegree ?? null,
        benefitCessationReason: source.benefitCessationReason ?? null,
        livesAlone: source.livesAlone ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationTypeormEntity,
      GetBpcDisabilityTerminationQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
