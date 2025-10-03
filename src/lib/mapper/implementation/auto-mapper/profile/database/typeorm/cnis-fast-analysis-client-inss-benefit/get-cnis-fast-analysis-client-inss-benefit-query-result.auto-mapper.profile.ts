import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CnisFastAnalysisClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-inss-benefit.typeorm.entity';
import { GetCnisFastAnalysisClientInssBenefitQueryResult } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client-inss-benefit/query/result/get-cnis-fast-analysis-client-inss-benefit.query.result';
import { CnisFastAnalysisClientInssBenefitId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

@Injectable()
export class GetCnisFastAnalysisClientInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCnisFastAnalysisClientInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisClientInssBenefitTypeormEntity,
    ): GetCnisFastAnalysisClientInssBenefitQueryResult => {
      return GetCnisFastAnalysisClientInssBenefitQueryResult.build({
        ...source,
        id: new CnisFastAnalysisClientInssBenefitId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisClientInssBenefitTypeormEntity,
      GetCnisFastAnalysisClientInssBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCnisFastAnalysisClientInssBenefitQueryResult,
    ): CnisFastAnalysisClientInssBenefitTypeormEntity => {
      return CnisFastAnalysisClientInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCnisFastAnalysisClientInssBenefitQueryResult,
      CnisFastAnalysisClientInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
