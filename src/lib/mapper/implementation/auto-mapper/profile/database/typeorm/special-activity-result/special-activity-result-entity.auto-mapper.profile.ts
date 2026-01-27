import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { SpecialActivityResultId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';
import { GetSpecialActivityResultQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-result/query/result/get-special-activity-result.query.result';

@Injectable()
export class SpecialActivityResultEntityAutoMapperProfile {
  protected readonly _type = SpecialActivityResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialActivityResultTypeormEntity,
    ): SpecialActivityResultEntity => {
      return new SpecialActivityResultEntity({
        ...source,
        id: new SpecialActivityResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialActivityResultTypeormEntity,
      SpecialActivityResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialActivityResultEntity,
    ): SpecialActivityResultTypeormEntity => {
      return SpecialActivityResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialActivityResultEntity,
      SpecialActivityResultTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityResultTypeormEntity,
    ): GetSpecialActivityResultQueryResult => {
      return GetSpecialActivityResultQueryResult.build({
        id: new SpecialActivityResultId(source.id),
        specialActivityCompleteAnalysis: source.specialActivityCompleteAnalysis,
        specialActivitySimplifiedAnalysis:
          source.specialActivitySimplifiedAnalysis,
        specialActivityCompleteAnalysisDownload:
          source.specialActivityCompleteAnalysisDownload,
        specialActivitySimplifiedAnalysisDownload:
          source.specialActivitySimplifiedAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityResultTypeormEntity,
      GetSpecialActivityResultQueryResult,
      mappingFunction,
    );
  }
}
