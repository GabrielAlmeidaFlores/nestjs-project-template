import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisBenefitId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/value-object/administrative-procedure-inss-analysis-benefit-id/administrative-procedure-inss-analysis-benefit-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisBenefitEntityAutoMapperProfile {
  protected readonly _type =
    AdministrativeProcedureInssAnalysisBenefitEntityAutoMapperProfile.name;

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
    ): AdministrativeProcedureInssAnalysisBenefitEntity => {
      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisTypeormEntity,
        AdministrativeProcedureInssAnalysisEntity,
      );

      return new AdministrativeProcedureInssAnalysisBenefitEntity({
        ...source,
        id: new AdministrativeProcedureInssAnalysisBenefitId(source.id),
        administrativeProcedureInssAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
      AdministrativeProcedureInssAnalysisBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AdministrativeProcedureInssAnalysisBenefitEntity,
    ): AdministrativeProcedureInssAnalysisBenefitTypeormEntity => {
      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisEntity,
        AdministrativeProcedureInssAnalysisTypeormEntity,
      );

      return AdministrativeProcedureInssAnalysisBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        administrativeProcedureInssAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisBenefitEntity,
      AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
