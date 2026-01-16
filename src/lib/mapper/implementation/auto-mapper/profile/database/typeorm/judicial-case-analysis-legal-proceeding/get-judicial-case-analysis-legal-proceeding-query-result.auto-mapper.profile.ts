import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-legal-proceeding.typeorm.entity';
import { GetJudicialCaseAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-legal-proceeding.query.result';
import { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';

@Injectable()
export class GetJudicialCaseAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetJudicialCaseAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisLegalProceedingTypeormEntity,
    ): GetJudicialCaseAnalysisLegalProceedingQueryResult => {
      return GetJudicialCaseAnalysisLegalProceedingQueryResult.build({
        ...source,
        id: new JudicialCaseAnalysisLegalProceedingId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisLegalProceedingTypeormEntity,
      GetJudicialCaseAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetJudicialCaseAnalysisLegalProceedingQueryResult,
    ): JudicialCaseAnalysisLegalProceedingTypeormEntity => {
      return JudicialCaseAnalysisLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetJudicialCaseAnalysisLegalProceedingQueryResult,
      JudicialCaseAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
