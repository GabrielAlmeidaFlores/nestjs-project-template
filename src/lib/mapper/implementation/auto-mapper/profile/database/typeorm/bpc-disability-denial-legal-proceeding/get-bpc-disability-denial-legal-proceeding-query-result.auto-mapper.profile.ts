import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-legal-proceeding.typeorm.entity';
import { GetBpcDisabilityDenialLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-legal-proceeding/query/result/get-bpc-disability-denial-legal-proceeding.query.result';
import { BpcDisabilityDenialLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/value-object/bpc-disability-denial-legal-proceeding-id/bpc-disability-denial-legal-proceeding-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialLegalProceedingTypeormEntity,
    ): GetBpcDisabilityDenialLegalProceedingQueryResult => {
      return GetBpcDisabilityDenialLegalProceedingQueryResult.build({
        id: new BpcDisabilityDenialLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialLegalProceedingTypeormEntity,
      GetBpcDisabilityDenialLegalProceedingQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
