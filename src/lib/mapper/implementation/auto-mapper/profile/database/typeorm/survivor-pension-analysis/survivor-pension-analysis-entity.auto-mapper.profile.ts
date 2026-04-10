import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { GetSurvivorPensionAnalysisQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/result/get-survivor-pension-analysis.query.result';
import { SurvivorPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/survivor-pension-analysis.entity';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: SurvivorPensionAnalysisTypeormEntity,
    ): SurvivorPensionAnalysisEntity => {
      return new SurvivorPensionAnalysisEntity({
        id: new SurvivorPensionAnalysisId(source.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SurvivorPensionAnalysisTypeormEntity,
      SurvivorPensionAnalysisEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SurvivorPensionAnalysisEntity,
    ): SurvivorPensionAnalysisTypeormEntity => {
      return SurvivorPensionAnalysisTypeormEntity.build({
        id: source.id.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        analysisToolRecord: undefined,
        customerProfileIdentification: undefined,
        benefitOriginatorIdentification: undefined,
        deceasedWorkHistory: undefined,
        result: undefined,
        deceasedBenefitDependents: undefined,
      });
    };

    createMap(
      this.mapper,
      SurvivorPensionAnalysisEntity,
      SurvivorPensionAnalysisTypeormEntity,
      constructUsing(convert),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SurvivorPensionAnalysisTypeormEntity,
    ): GetSurvivorPensionAnalysisQueryResult => {
      return GetSurvivorPensionAnalysisQueryResult.build({
        id: new SurvivorPensionAnalysisId(source.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    createMap(
      this.mapper,
      SurvivorPensionAnalysisTypeormEntity,
      GetSurvivorPensionAnalysisQueryResult,
      constructUsing(convert),
    );
  }
}
