import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { GetRuralTimelineAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
@Injectable()
export class RuralTimelineAnalysisEntityAutoMapperProfile {
  protected readonly _type = RuralTimelineAnalysisEntityAutoMapperProfile.name;

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
      source: RuralTimelineAnalysisTypeormEntity,
    ): RuralTimelineAnalysisEntity => {
      const analysisToolRecord = this.mapper.map(
        source.analysisToolRecord,
        AnalysisToolRecordTypeormEntity,
        AnalysisToolRecordEntity,
      );

      return new RuralTimelineAnalysisEntity({
        ...source,
        id: new RuralTimelineAnalysisId(source.id),
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisTypeormEntity,
      RuralTimelineAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisEntity,
    ): RuralTimelineAnalysisTypeormEntity => {
      return RuralTimelineAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisEntity,
      RuralTimelineAnalysisTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const mappingFunction = constructUsing(
      (source: RuralTimelineAnalysisTypeormEntity) =>
        this.mapper.map(
          source,
          RuralTimelineAnalysisTypeormEntity,
          GetRuralTimelineAnalysisWithRelationsQueryResult,
        ),
    );

    createMap(
      this.mapper,
      RuralTimelineAnalysisTypeormEntity,
      GetRuralTimelineAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
