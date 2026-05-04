import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-legal-proceeding.typeorm.entity';
import { GetBpcDisabilityTerminationLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-legal-proceeding/query/result/get-bpc-disability-termination-legal-proceeding.query.result';
import { BpcDisabilityTerminationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/value-object/bpc-disability-termination-legal-proceeding-id/bpc-disability-termination-legal-proceeding-id.value-object';

@Injectable()
export class GetBpcDisabilityTerminationLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityTerminationLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityTerminationLegalProceedingTypeormEntity,
    ): GetBpcDisabilityTerminationLegalProceedingQueryResult => {
      return GetBpcDisabilityTerminationLegalProceedingQueryResult.build({
        id: new BpcDisabilityTerminationLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationLegalProceedingTypeormEntity,
      GetBpcDisabilityTerminationLegalProceedingQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
