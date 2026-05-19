import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-result.typeorm.entity';
import { GetBpcDisabilityGrantResultQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-result/query/result/get-bpc-disability-grant-result.query.result';
import { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantResultTypeormEntity,
    ): GetBpcDisabilityGrantResultQueryResult => {
      return GetBpcDisabilityGrantResultQueryResult.build({
        id: new BpcDisabilityGrantResultId(source.id),
        completeAnalysis: source.completeAnalysis ?? null,
        simplifiedAnalysis: source.simplifiedAnalysis ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantResultTypeormEntity,
      GetBpcDisabilityGrantResultQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
