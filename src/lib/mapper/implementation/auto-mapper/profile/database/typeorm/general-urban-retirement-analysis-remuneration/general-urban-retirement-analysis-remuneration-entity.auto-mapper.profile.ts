import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-remuneration.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration.entity';
import { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisRemunerationEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementAnalysisRemunerationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
    ): GeneralUrbanRetirementAnalysisRemunerationEntity => {
      if (source.generalUrbanRetirementAnalysis === undefined) {
        throw new IncompleteSourceDataForMappingError({
          sourceClass:
            GeneralUrbanRetirementAnalysisRemunerationTypeormEntity.name,
          destinationClass:
            GeneralUrbanRetirementAnalysisRemunerationEntity.name,
        });
      }

      const generalUrbanRetirementAnalysis = this.mapper.map(
        source.generalUrbanRetirementAnalysis,
        GeneralUrbanRetirementAnalysisTypeormEntity,
        GeneralUrbanRetirementAnalysisEntity,
      );

      return new GeneralUrbanRetirementAnalysisRemunerationEntity({
        id: new GeneralUrbanRetirementAnalysisRemunerationId(source.id),
        remunerationDate: source.remunerationDate,
        remunerationAmount: new DecimalValue(source.remunerationAmount),
        generalUrbanRetirementAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
      GeneralUrbanRetirementAnalysisRemunerationEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementAnalysisRemunerationEntity,
    ): GeneralUrbanRetirementAnalysisRemunerationTypeormEntity => {
      return GeneralUrbanRetirementAnalysisRemunerationTypeormEntity.build({
        id: source.id.toString(),
        remunerationDate: source.remunerationDate,
        remunerationAmount: source.remunerationAmount.toString(),
        generalUrbanRetirementAnalysis:
          source.generalUrbanRetirementAnalysis?.id !== null
            ? ({
                id: source.generalUrbanRetirementAnalysis.id.toString(),
              } as GeneralUrbanRetirementAnalysisTypeormEntity)
            : undefined,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisRemunerationEntity,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
