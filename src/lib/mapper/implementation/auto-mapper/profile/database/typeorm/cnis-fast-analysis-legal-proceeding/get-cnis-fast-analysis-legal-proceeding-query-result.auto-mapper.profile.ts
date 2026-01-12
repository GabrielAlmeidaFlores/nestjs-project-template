import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { GetCnisFastAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-legal-proceeding/query/result/get-cnis-fast-analysis-legal-proceeding.query.result';
import { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';

export class GetCnisFastAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCnisFastAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisLegalProceedingTypeormEntity,
    ): GetCnisFastAnalysisLegalProceedingQueryResult => {
      return GetCnisFastAnalysisLegalProceedingQueryResult.build({
        ...source,
        id: new CnisFastAnalysisLegalProceedingId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisLegalProceedingTypeormEntity,
      GetCnisFastAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCnisFastAnalysisLegalProceedingQueryResult,
    ): CnisFastAnalysisLegalProceedingTypeormEntity => {
      return CnisFastAnalysisLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCnisFastAnalysisLegalProceedingQueryResult,
      CnisFastAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
