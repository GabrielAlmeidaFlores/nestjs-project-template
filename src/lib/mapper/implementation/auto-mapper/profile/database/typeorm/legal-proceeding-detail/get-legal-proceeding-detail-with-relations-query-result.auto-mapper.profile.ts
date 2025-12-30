import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { GetLegalProceedingDetailWithRelationsQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail-with-relations.query.result';
import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';

@Injectable()
export class GetLegalProceedingDetailWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalProceedingDetailWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: LegalProceedingDetailTypeormEntity,
    ): GetLegalProceedingDetailWithRelationsQueryResult => {
      const analysisToolClientLegalProceeding = this.mapper.map(
        source.analysisToolClientLegalProceeding,
        AnalysisToolClientLegalProceedingTypeormEntity,
        GetAnalysisToolClientLegalProceedingQueryResult,
      );
      return GetLegalProceedingDetailWithRelationsQueryResult.build({
        ...source,
        id: new LegalProceedingDetailId(source.id),
        detail: source.detail,
        analysisToolClientLegalProceeding,
      });
    };

    createMap(
      this.mapper,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: GetLegalProceedingDetailWithRelationsQueryResult,
    ): LegalProceedingDetailTypeormEntity => {
      const analysisToolClientLegalProceeding = this.mapper.map(
        source.analysisToolClientLegalProceeding,
        GetAnalysisToolClientLegalProceedingQueryResult,
        AnalysisToolClientLegalProceedingTypeormEntity,
      );
      return LegalProceedingDetailTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        detail: source.detail.toString(),
        analysisToolClientLegalProceeding,
      });
    };

    createMap(
      this.mapper,
      GetLegalProceedingDetailWithRelationsQueryResult,
      LegalProceedingDetailTypeormEntity,
      constructUsing(convert),
    );
  }
}
