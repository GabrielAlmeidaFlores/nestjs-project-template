import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { CnisFastAnalysisClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-legal-proceeding.typeorm.entity';
import { GetCnisFastAnalysisClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-client-legal-proceeding/query/result/get-cnis-fast-analysis-client-legal-proceeding.query.result';
import { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

export class GetCnisFastAnalysisClientLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCnisFastAnalysisClientLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisClientLegalProceedingTypeormEntity,
    ): GetCnisFastAnalysisClientLegalProceedingQueryResult => {
      return GetCnisFastAnalysisClientLegalProceedingQueryResult.build({
        ...source,
        id: new CnisFastAnalysisClientLegalProceedingId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisClientLegalProceedingTypeormEntity,
      GetCnisFastAnalysisClientLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCnisFastAnalysisClientLegalProceedingQueryResult,
    ): CnisFastAnalysisClientLegalProceedingTypeormEntity => {
      return CnisFastAnalysisClientLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCnisFastAnalysisClientLegalProceedingQueryResult,
      CnisFastAnalysisClientLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
