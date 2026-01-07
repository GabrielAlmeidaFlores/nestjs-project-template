import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';

@Injectable()
export class AnalysisToolClientLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    AnalysisToolClientLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AnalysisToolClientLegalProceedingTypeormEntity,
    ): AnalysisToolClientLegalProceedingEntity => {
      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        AnalysisToolClientEntity,
      );

      return new AnalysisToolClientLegalProceedingEntity({
        ...source,
        id: new AnalysisToolClientLegalProceedingId(source.id),
        analysisToolClient,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientLegalProceedingTypeormEntity,
      AnalysisToolClientLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AnalysisToolClientLegalProceedingEntity,
    ): AnalysisToolClientLegalProceedingTypeormEntity => {
      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

      return AnalysisToolClientLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClient,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AnalysisToolClientLegalProceedingEntity,
      AnalysisToolClientLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
