import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-legal-proceeding.typeorm.entity';
import { GetBpcElderlyAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-legal-proceeding/query/result/get-bpc-elderly-analysis-legal-proceeding.query.result';
import { BpcElderlyAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/value-object/bpc-elderly-analysis-legal-proceeding-id/bpc-elderly-analysis-legal-proceeding-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisLegalProceedingTypeormEntity,
    ): GetBpcElderlyAnalysisLegalProceedingQueryResult => {
      return GetBpcElderlyAnalysisLegalProceedingQueryResult.build({
        id: new BpcElderlyAnalysisLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisLegalProceedingTypeormEntity,
      GetBpcElderlyAnalysisLegalProceedingQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
