import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-legal-proceeding.query.result';

@Injectable()
export class GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
    ): GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult => {
      return GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult.build(
        {
          ...source,
          id: new Guid(source.id),
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
      GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult,
    ): AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity => {
      return AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          administrativeProcedureInssAnalysis: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult,
      AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
