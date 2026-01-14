import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisDocumentId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/value-object/administrative-procedure-inss-analysis-document-id/administrative-procedure-inss-analysis-document-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    AdministrativeProcedureInssAnalysisDocumentEntityAutoMapperProfile.name;

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
    ): AdministrativeProcedureInssAnalysisDocumentEntity => {
      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisTypeormEntity,
        AdministrativeProcedureInssAnalysisEntity,
      );

      return new AdministrativeProcedureInssAnalysisDocumentEntity({
        ...source,
        id: new AdministrativeProcedureInssAnalysisDocumentId(source.id),
        administrativeProcedureInssAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
      AdministrativeProcedureInssAnalysisDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AdministrativeProcedureInssAnalysisDocumentEntity,
    ): AdministrativeProcedureInssAnalysisDocumentTypeormEntity => {
      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisEntity,
        AdministrativeProcedureInssAnalysisTypeormEntity,
      );

      return AdministrativeProcedureInssAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        administrativeProcedureInssAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisDocumentEntity,
      AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
