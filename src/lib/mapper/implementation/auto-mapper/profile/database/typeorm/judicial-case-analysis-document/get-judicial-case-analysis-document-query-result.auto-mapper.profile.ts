import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import { GetJudicialCaseAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-document.query.result';
import { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';

@Injectable()
export class GetJudicialCaseAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetJudicialCaseAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisDocumentTypeormEntity,
    ): GetJudicialCaseAnalysisDocumentQueryResult => {
      return GetJudicialCaseAnalysisDocumentQueryResult.build({
        ...source,
        id: new JudicialCaseAnalysisDocumentId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisDocumentTypeormEntity,
      GetJudicialCaseAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetJudicialCaseAnalysisDocumentQueryResult,
    ): JudicialCaseAnalysisDocumentTypeormEntity => {
      return JudicialCaseAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetJudicialCaseAnalysisDocumentQueryResult,
      JudicialCaseAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
