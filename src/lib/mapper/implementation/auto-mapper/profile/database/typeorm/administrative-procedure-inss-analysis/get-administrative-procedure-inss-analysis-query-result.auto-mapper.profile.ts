import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { GetAdministrativeProcedureInssAnalysisQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis.query.result';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';

@Injectable()
export class GetAdministrativeProcedureInssAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAdministrativeProcedureInssAnalysisQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeProcedureInssAnalysisTypeormEntity,
    ): GetAdministrativeProcedureInssAnalysisQueryResult => {
      return GetAdministrativeProcedureInssAnalysisQueryResult.build({
        ...source,
        id: new AdministrativeProcedureInssAnalysisId(source.id),
        administrativeProcedureInssAnalysisDocument:
          source.administrativeProcedureInssAnalysisDocument ?? [],
        administrativeProcedureInssAnalysisResult:
          source.administrativeProcedureInssAnalysisResult ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      GetAdministrativeProcedureInssAnalysisQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAdministrativeProcedureInssAnalysisQueryResult,
    ): AdministrativeProcedureInssAnalysisTypeormEntity => {
      return AdministrativeProcedureInssAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        administrativeProcedureInssAnalysisResult: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAdministrativeProcedureInssAnalysisQueryResult,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
