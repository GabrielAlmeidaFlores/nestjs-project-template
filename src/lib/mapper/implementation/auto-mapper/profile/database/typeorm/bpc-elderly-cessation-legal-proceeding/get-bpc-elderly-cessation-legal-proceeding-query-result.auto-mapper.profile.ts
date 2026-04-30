import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-legal-proceeding.typeorm.entity';
import { GetBpcElderlyCessationLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-legal-proceeding/query/result/get-bpc-elderly-cessation-legal-proceeding.query.result';
import { BpcElderlyCessationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/value-object/bpc-elderly-cessation-legal-proceeding-id/bpc-elderly-cessation-legal-proceeding-id.value-object';

@Injectable()
export class GetBpcElderlyCessationLegalProceedingQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationLegalProceedingQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationLegalProceedingTypeormEntity,
    ): GetBpcElderlyCessationLegalProceedingQueryResult => {
      return GetBpcElderlyCessationLegalProceedingQueryResult.build({
        id: new BpcElderlyCessationLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationLegalProceedingTypeormEntity,
      GetBpcElderlyCessationLegalProceedingQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
