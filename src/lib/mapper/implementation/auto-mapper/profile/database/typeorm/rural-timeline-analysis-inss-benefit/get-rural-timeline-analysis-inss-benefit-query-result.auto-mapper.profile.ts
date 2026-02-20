import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-inss-benefit.typeorm.entity';
import { GetRuralTimelineAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/query/result/get-rural-timeline-analysis-inss-benefit.query.result';
import { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';

@Injectable()
export class GetRuralTimelineAnalysisInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisInssBenefitTypeormEntity,
    ): GetRuralTimelineAnalysisInssBenefitQueryResult => {
      return GetRuralTimelineAnalysisInssBenefitQueryResult.build({
        id: new RuralTimelineAnalysisInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisInssBenefitTypeormEntity,
      GetRuralTimelineAnalysisInssBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRuralTimelineAnalysisInssBenefitQueryResult,
    ): RuralTimelineAnalysisInssBenefitTypeormEntity => {
      return RuralTimelineAnalysisInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
        ruralTimelineAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRuralTimelineAnalysisInssBenefitQueryResult,
      RuralTimelineAnalysisInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
