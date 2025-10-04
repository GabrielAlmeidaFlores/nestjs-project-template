import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/query/result/get-cnis-fast-analysis-inss-benefit.query.result';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';

@Injectable()
export class GetAnalysisToolClientInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolClientInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisInssBenefitTypeormEntity,
    ): GetAnalysisToolClientInssBenefitQueryResult => {
      return GetAnalysisToolClientInssBenefitQueryResult.build({
        ...source,
        id: new AnalysisToolClientInssBenefitId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisInssBenefitTypeormEntity,
      GetAnalysisToolClientInssBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAnalysisToolClientInssBenefitQueryResult,
    ): CnisFastAnalysisInssBenefitTypeormEntity => {
      return CnisFastAnalysisInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolClientInssBenefitQueryResult,
      CnisFastAnalysisInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
