import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import { GetAdministrativeProcedureInssAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-document.query.result';

@Injectable()
export class GetAdministrativeProcedureInssAnalysisDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAdministrativeProcedureInssAnalysisDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
    ): GetAdministrativeProcedureInssAnalysisDocumentQueryResult => {
      return GetAdministrativeProcedureInssAnalysisDocumentQueryResult.build({
        ...source,
        id: new Guid(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
      GetAdministrativeProcedureInssAnalysisDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAdministrativeProcedureInssAnalysisDocumentQueryResult,
    ): AdministrativeProcedureInssAnalysisDocumentTypeormEntity => {
      return AdministrativeProcedureInssAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        administrativeProcedureInssAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAdministrativeProcedureInssAnalysisDocumentQueryResult,
      AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
