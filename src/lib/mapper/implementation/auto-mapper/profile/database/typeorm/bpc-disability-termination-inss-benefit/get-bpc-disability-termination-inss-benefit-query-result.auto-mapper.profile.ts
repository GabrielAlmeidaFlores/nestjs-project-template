import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-inss-benefit.typeorm.entity';
import { GetBpcDisabilityTerminationInssBenefitQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-inss-benefit/query/result/get-bpc-disability-termination-inss-benefit.query.result';
import { BpcDisabilityTerminationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/value-object/bpc-disability-termination-inss-benefit-id/bpc-disability-termination-inss-benefit-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationInssBenefitTypeormEntity,
    ): GetBpcDisabilityTerminationInssBenefitQueryResult => {
      return GetBpcDisabilityTerminationInssBenefitQueryResult.build({
        id: new BpcDisabilityTerminationInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationInssBenefitTypeormEntity,
      GetBpcDisabilityTerminationInssBenefitQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
