import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-inss-benefit.typeorm.entity';
import { GetBpcElderlyAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-inss-benefit/query/result/get-bpc-elderly-analysis-inss-benefit.query.result';
import { BpcElderlyAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/value-object/bpc-elderly-analysis-inss-benefit-id/bpc-elderly-analysis-inss-benefit-id.value-object';

@Injectable()
export class GetBpcElderlyAnalysisInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyAnalysisInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyAnalysisInssBenefitTypeormEntity,
    ): GetBpcElderlyAnalysisInssBenefitQueryResult => {
      return GetBpcElderlyAnalysisInssBenefitQueryResult.build({
        id: new BpcElderlyAnalysisInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisInssBenefitTypeormEntity,
      GetBpcElderlyAnalysisInssBenefitQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
