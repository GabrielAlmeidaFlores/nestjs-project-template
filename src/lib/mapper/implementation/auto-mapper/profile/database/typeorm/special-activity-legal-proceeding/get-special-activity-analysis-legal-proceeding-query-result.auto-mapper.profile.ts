import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-legal-proceeding.typeorm.entity';
import { SpecialActivityLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/value-object/special-activity-legal-proceeding-id.value-object';
import { GetSpecialActivityAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-legal-proceeding/query/result/get-special-activity-analysis-legal-proceeding.query.result';

@Injectable()
export class GetSpecialActivityAnalysisLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialActivityAnalysisLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityLegalProceedingTypeormEntity,
    ): GetSpecialActivityAnalysisLegalProceedingQueryResult => {
      return GetSpecialActivityAnalysisLegalProceedingQueryResult.build({
        id: new SpecialActivityLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityLegalProceedingTypeormEntity,
      GetSpecialActivityAnalysisLegalProceedingQueryResult,
      mappingFunction,
    );
  }
}
