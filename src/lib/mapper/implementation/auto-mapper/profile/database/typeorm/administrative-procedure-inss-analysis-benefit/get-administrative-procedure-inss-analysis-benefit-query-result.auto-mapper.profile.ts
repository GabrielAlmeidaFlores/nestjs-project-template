import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AdministrativeProcedureInssAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-benefit.entity';
import { GetAdministrativeProcedureInssAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-benefit.query.result';

@Injectable()
export class GetAdministrativeProcedureInssAnalysisBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAdministrativeProcedureInssAnalysisBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
    ): GetAdministrativeProcedureInssAnalysisBenefitQueryResult => {
      return GetAdministrativeProcedureInssAnalysisBenefitQueryResult.build({
        ...source,
        id: new Guid(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
      GetAdministrativeProcedureInssAnalysisBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAdministrativeProcedureInssAnalysisBenefitQueryResult,
    ): AdministrativeProcedureInssAnalysisBenefitTypeormEntity => {
      return AdministrativeProcedureInssAnalysisBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        administrativeProcedureInssAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAdministrativeProcedureInssAnalysisBenefitQueryResult,
      AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
