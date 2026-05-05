import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-inss-benefit.typeorm.entity';
import { GetBpcElderlyCessationInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-inss-benefit/query/result/get-bpc-elderly-cessation-inss-benefit.query.result';
import { BpcElderlyCessationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/value-object/bpc-elderly-cessation-inss-benefit-id/bpc-elderly-cessation-inss-benefit-id.value-object';

@Injectable()
export class GetBpcElderlyCessationInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationInssBenefitTypeormEntity,
    ): GetBpcElderlyCessationInssBenefitQueryResult => {
      return GetBpcElderlyCessationInssBenefitQueryResult.build({
        id: new BpcElderlyCessationInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationInssBenefitTypeormEntity,
      GetBpcElderlyCessationInssBenefitQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
