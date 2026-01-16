import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/value-object/administrative-procedure-inss-analysis-legal-proceeding-id/administrative-procedure-inss-analysis-legal-proceeding-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    AdministrativeProcedureInssAnalysisLegalProceedingEntityAutoMapperProfile.name;

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
    ): AdministrativeProcedureInssAnalysisLegalProceedingEntity => {
      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisTypeormEntity,
        AdministrativeProcedureInssAnalysisEntity,
      );

      return new AdministrativeProcedureInssAnalysisLegalProceedingEntity({
        ...source,
        id: new AdministrativeProcedureInssAnalysisLegalProceedingId(source.id),
        administrativeProcedureInssAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
      AdministrativeProcedureInssAnalysisLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AdministrativeProcedureInssAnalysisLegalProceedingEntity,
    ): AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity => {
      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisEntity,
        AdministrativeProcedureInssAnalysisTypeormEntity,
      );

      return AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          administrativeProcedureInssAnalysis,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisLegalProceedingEntity,
      AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
