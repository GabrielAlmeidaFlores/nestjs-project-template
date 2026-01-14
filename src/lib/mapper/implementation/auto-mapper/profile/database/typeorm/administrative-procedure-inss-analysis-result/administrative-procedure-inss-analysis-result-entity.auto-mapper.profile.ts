import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisResultId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/value-object/administrative-procedure-inss-analysis-result-id/administrative-procedure-inss-analysis-result-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    AdministrativeProcedureInssAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeProcedureInssAnalysisResultTypeormEntity,
    ): AdministrativeProcedureInssAnalysisResultEntity => {
      return new AdministrativeProcedureInssAnalysisResultEntity({
        ...source,
        id: new AdministrativeProcedureInssAnalysisResultId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisResultTypeormEntity,
      AdministrativeProcedureInssAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AdministrativeProcedureInssAnalysisResultEntity,
    ): AdministrativeProcedureInssAnalysisResultTypeormEntity => {
      return AdministrativeProcedureInssAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisResultEntity,
      AdministrativeProcedureInssAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
