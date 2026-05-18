import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { GetBpcElderlyCessationQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation.query.result';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';

@Injectable()
export class GetBpcElderlyCessationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcElderlyCessationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcElderlyCessationTypeormEntity,
    ): GetBpcElderlyCessationQueryResult => {
      return GetBpcElderlyCessationQueryResult.build({
        id: new BpcElderlyCessationId(source.id),
        analysisName: source.analysisName ?? null,
        decisionDate: source.decisionDate ?? null,
        previousInssBenefitNumber: source.previousInssBenefitNumber ?? null,
        category: source.category ?? null,
        cessationReason: source.cessationReason ?? null,
        cessationReasonDescription: source.cessationReasonDescription ?? null,
        isAppealDeadlineExpired: source.isAppealDeadlineExpired ?? null,
        myInssPassword: source.myInssPassword ?? null,
        civilStatus: source.civilStatus ?? null,
        educationLevel: source.educationLevel ?? null,
        currentAddress: source.currentAddress ?? null,
        previousAddress: source.previousAddress ?? null,
        hasAddressChangedSinceDecision:
          source.hasAddressChangedSinceDecision ?? null,
        livesAlone: source.livesAlone ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyCessationTypeormEntity,
      GetBpcElderlyCessationQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
