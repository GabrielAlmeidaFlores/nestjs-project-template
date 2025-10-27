import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/query/result/get-analysis-tool-client-inss-benefit.query.result';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';

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
      source: AnalysisToolClientInssBenefitTypeormEntity,
    ): GetAnalysisToolClientInssBenefitQueryResult => {
      return GetAnalysisToolClientInssBenefitQueryResult.build({
        ...source,
        id: new AnalysisToolClientInssBenefitId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolClientInssBenefitTypeormEntity,
      GetAnalysisToolClientInssBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetAnalysisToolClientInssBenefitQueryResult,
    ): AnalysisToolClientInssBenefitTypeormEntity => {
      return AnalysisToolClientInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClient: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolClientInssBenefitQueryResult,
      AnalysisToolClientInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
