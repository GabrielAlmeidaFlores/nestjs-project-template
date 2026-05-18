import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result.entity';
import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
    ): GeneralUrbanRetirementGrantAnalysisResultEntity => {
      if (!source.generalUrbanRetirementGrant) {
        throw new Error(
          'generalUrbanRetirementGrant is required for GeneralUrbanRetirementGrantAnalysisResultEntity',
        );
      }

      const generalUrbanRetirementGrant = this.mapper.map(
        source.generalUrbanRetirementGrant,
        GeneralUrbanRetirementGrantTypeormEntity,
        GeneralUrbanRetirementGrantEntity,
      );

      return new GeneralUrbanRetirementGrantAnalysisResultEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantAnalysisResultId(source.id),
        generalUrbanRetirementGrant,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
      GeneralUrbanRetirementGrantAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantAnalysisResultEntity,
    ): GeneralUrbanRetirementGrantAnalysisResultTypeormEntity => {
      const generalUrbanRetirementGrant = this.mapper.map(
        source.generalUrbanRetirementGrant,
        GeneralUrbanRetirementGrantEntity,
        GeneralUrbanRetirementGrantTypeormEntity,
      );

      return GeneralUrbanRetirementGrantAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrant,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantAnalysisResultEntity,
      GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
