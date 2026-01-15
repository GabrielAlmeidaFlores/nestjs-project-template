import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { GetJudicialCaseAnalysisQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis.query.result';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';

@Injectable()
export class GetJudicialCaseAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetJudicialCaseAnalysisQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisTypeormEntity,
    ): GetJudicialCaseAnalysisQueryResult => {
      return GetJudicialCaseAnalysisQueryResult.build({
        ...source,
        id: new JudicialCaseAnalysisId(source.id),
        judicialCaseAnalysisDocument:
          source.judicialCaseAnalysisDocument ?? [],
        judicialCaseAnalysisResult:
          source.judicialCaseAnalysisResult ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisTypeormEntity,
      GetJudicialCaseAnalysisQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetJudicialCaseAnalysisQueryResult,
    ): JudicialCaseAnalysisTypeormEntity => {
      return JudicialCaseAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysisResult: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetJudicialCaseAnalysisQueryResult,
      JudicialCaseAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}

