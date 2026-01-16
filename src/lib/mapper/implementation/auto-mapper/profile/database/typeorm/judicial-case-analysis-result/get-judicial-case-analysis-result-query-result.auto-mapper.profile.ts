import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import { GetJudicialCaseAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/query/result/get-judicial-case-analysis-result.query.result';
import { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';

@Injectable()
export class GetJudicialCaseAnalysisResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetJudicialCaseAnalysisResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisResultTypeormEntity,
    ): GetJudicialCaseAnalysisResultQueryResult => {
      return GetJudicialCaseAnalysisResultQueryResult.build({
        ...source,
        id: new JudicialCaseAnalysisResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisResultTypeormEntity,
      GetJudicialCaseAnalysisResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetJudicialCaseAnalysisResultQueryResult,
    ): JudicialCaseAnalysisResultTypeormEntity => {
      return JudicialCaseAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetJudicialCaseAnalysisResultQueryResult,
      JudicialCaseAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
