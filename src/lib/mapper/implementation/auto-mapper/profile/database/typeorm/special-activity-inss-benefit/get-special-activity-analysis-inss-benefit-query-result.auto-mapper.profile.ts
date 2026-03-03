import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-benefit.typeorm.entity';
import { GetSpecialActivityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-inss-benefit/query/result/get-special-activity-analysis-inss-benefit.query.result';
import { SpecialActivityInssBenefitId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-inss-benefit/value-object/special-activity-inss-benefit-id.value-object';

@Injectable()
export class GetSpecialActivityAnalysisInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialActivityAnalysisInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityInssBenefitTypeormEntity,
    ): GetSpecialActivityAnalysisInssBenefitQueryResult => {
      return GetSpecialActivityAnalysisInssBenefitQueryResult.build({
        id: new SpecialActivityInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityInssBenefitTypeormEntity,
      GetSpecialActivityAnalysisInssBenefitQueryResult,
      mappingFunction,
    );
  }
}
