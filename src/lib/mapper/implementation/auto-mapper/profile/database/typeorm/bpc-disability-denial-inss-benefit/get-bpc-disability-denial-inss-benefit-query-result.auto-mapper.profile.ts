import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-inss-benefit.typeorm.entity';
import { GetBpcDisabilityDenialInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-inss-benefit/query/result/get-bpc-disability-denial-inss-benefit.query.result';
import { BpcDisabilityDenialInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/value-object/bpc-disability-denial-inss-benefit-id/bpc-disability-denial-inss-benefit-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialInssBenefitTypeormEntity,
    ): GetBpcDisabilityDenialInssBenefitQueryResult => {
      return GetBpcDisabilityDenialInssBenefitQueryResult.build({
        id: new BpcDisabilityDenialInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialInssBenefitTypeormEntity,
      GetBpcDisabilityDenialInssBenefitQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
