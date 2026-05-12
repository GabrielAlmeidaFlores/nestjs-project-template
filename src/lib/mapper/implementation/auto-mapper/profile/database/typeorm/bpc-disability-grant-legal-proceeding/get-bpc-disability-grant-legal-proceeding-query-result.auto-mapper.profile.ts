import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-proceeding.typeorm.entity';
import { GetBpcDisabilityGrantLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-legal-proceeding/query/result/get-bpc-disability-grant-legal-proceeding.query.result';
import { BpcDisabilityGrantLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/value-object/bpc-disability-grant-legal-proceeding-id/bpc-disability-grant-legal-proceeding-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantLegalProceedingTypeormEntity,
    ): GetBpcDisabilityGrantLegalProceedingQueryResult => {
      return GetBpcDisabilityGrantLegalProceedingQueryResult.build({
        id: new BpcDisabilityGrantLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantLegalProceedingTypeormEntity,
      GetBpcDisabilityGrantLegalProceedingQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
