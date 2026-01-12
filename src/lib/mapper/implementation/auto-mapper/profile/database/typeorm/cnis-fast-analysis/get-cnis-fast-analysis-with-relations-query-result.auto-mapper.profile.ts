import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { GetCnisFastAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-inss-benefit/query/result/get-cnis-fast-analysis-inss-benefit.query.result';
import { GetCnisFastAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-legal-proceeding/query/result/get-cnis-fast-analysis-legal-proceeding.query.result';
import { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

@Injectable()
export class GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisTypeormEntity,
    ): GetCnisFastAnalysisWithRelationsQueryResult => {
      if (
        !source.cnisFastAnalysisInssBenefit ||
        !source.cnisFastAnalysisLegalProceeding
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetCnisFastAnalysisWithRelationsQueryResult.name,
          sourceClass: CnisFastAnalysisTypeormEntity.name,
        });
      }

      const cnisFastAnalysisResult = this.mapper.map(
        source.cnisFastAnalysisResult,
        CnisFastAnalysisResultTypeormEntity,
        GetCnisFastAnalysisResultQueryResult,
      );

      const cnisFastAnalysisInssBenefit = this.mapper.mapArray(
        source.cnisFastAnalysisInssBenefit,
        CnisFastAnalysisInssBenefitTypeormEntity,
        GetCnisFastAnalysisInssBenefitQueryResult,
      );

      const cnisFastAnalysisLegalProceeding = this.mapper.mapArray(
        source.cnisFastAnalysisLegalProceeding,
        CnisFastAnalysisLegalProceedingTypeormEntity,
        GetCnisFastAnalysisLegalProceedingQueryResult,
      );

      return GetCnisFastAnalysisWithRelationsQueryResult.build({
        ...source,
        id: new CnisFastAnalysisId(source.id),
        cnisFastAnalysisResult,
        cnisFastAnalysisInssBenefit,
        cnisFastAnalysisLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisTypeormEntity,
      GetCnisFastAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCnisFastAnalysisWithRelationsQueryResult,
    ): CnisFastAnalysisTypeormEntity => {
      const cnisFastAnalysisResult = this.mapper.map(
        source.cnisFastAnalysisResult,
        GetCnisFastAnalysisResultQueryResult,
        CnisFastAnalysisResultTypeormEntity,
      );

      const cnisFastAnalysisInssBenefit = this.mapper.mapArray(
        source.cnisFastAnalysisInssBenefit,
        GetCnisFastAnalysisInssBenefitQueryResult,
        CnisFastAnalysisInssBenefitTypeormEntity,
      );

      const cnisFastAnalysisLegalProceeding = this.mapper.mapArray(
        source.cnisFastAnalysisLegalProceeding,
        GetCnisFastAnalysisLegalProceedingQueryResult,
        CnisFastAnalysisLegalProceedingTypeormEntity,
      );

      return CnisFastAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysisResult,
        cnisFastAnalysisInssBenefit,
        cnisFastAnalysisLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCnisFastAnalysisWithRelationsQueryResult,
      CnisFastAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
