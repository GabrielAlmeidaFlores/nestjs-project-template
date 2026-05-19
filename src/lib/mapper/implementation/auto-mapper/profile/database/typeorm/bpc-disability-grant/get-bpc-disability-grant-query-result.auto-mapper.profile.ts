import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { GetBpcDisabilityGrantQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant.query.result';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';

@Injectable()
export class GetBpcDisabilityGrantQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityGrantQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityGrantTypeormEntity,
    ): GetBpcDisabilityGrantQueryResult => {
      return GetBpcDisabilityGrantQueryResult.build({
        id: new BpcDisabilityGrantId(source.id),
        analysisName: source.analysisName ?? null,
        requestEntryDate: source.requestEntryDate ?? null,
        denialDate: source.denialDate ?? null,
        requestedBenefitType: source.requestedBenefitType ?? null,
        category: source.category ?? null,
        denialReason: null,
        denialReasonDescription: null,
        disabilityType: source.disabilityType ?? null,
        disabilityDegree: source.disabilityDegree ?? null,
        estimatedDisabilityStartDate:
          source.estimatedDisabilityStartDate ?? null,
        attendsSchoolOrTechnicalCourse:
          source.attendsSchoolOrTechnicalCourse ?? null,
        performsLaborActivity: source.performsLaborActivity ?? null,
        needsThirdPartyHelp: source.needsThirdPartyHelp ?? null,
        hasAccessToBasicServices: source.hasAccessToBasicServices ?? null,
        otherBarriersDescription: source.otherBarriersDescription ?? null,
        livesAlone: null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantTypeormEntity,
      GetBpcDisabilityGrantQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
