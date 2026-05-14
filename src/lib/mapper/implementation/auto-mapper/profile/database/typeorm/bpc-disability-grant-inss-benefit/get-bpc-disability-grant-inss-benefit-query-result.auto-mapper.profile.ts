import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-inss-benefit.typeorm.entity';
import { GetBpcDisabilityGrantInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-inss-benefit/query/result/get-bpc-disability-grant-inss-benefit.query.result';
import { BpcDisabilityGrantInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/value-object/bpc-disability-grant-inss-benefit-id/bpc-disability-grant-inss-benefit-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantInssBenefitTypeormEntity,
    ): GetBpcDisabilityGrantInssBenefitQueryResult => {
      return GetBpcDisabilityGrantInssBenefitQueryResult.build({
        id: new BpcDisabilityGrantInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantInssBenefitTypeormEntity,
      GetBpcDisabilityGrantInssBenefitQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
