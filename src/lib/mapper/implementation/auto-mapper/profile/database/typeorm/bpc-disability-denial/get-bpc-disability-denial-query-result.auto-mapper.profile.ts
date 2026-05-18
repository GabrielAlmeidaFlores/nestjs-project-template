import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { GetBpcDisabilityDenialQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial.query.result';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';

@Injectable()
export class GetBpcDisabilityDenialQueryResultAutoMapperProfile {
  protected readonly _type =
    GetBpcDisabilityDenialQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BpcDisabilityDenialTypeormEntity,
    ): GetBpcDisabilityDenialQueryResult => {
      return GetBpcDisabilityDenialQueryResult.build({
        id: new BpcDisabilityDenialId(source.id),
        analysisName: source.analysisName ?? null,
        requestEntryDate: source.requestEntryDate ?? null,
        denialDate: source.denialDate ?? null,
        requestedBenefitType: source.requestedBenefitType ?? null,
        category: source.category ?? null,
        denialReason: source.denialReason ?? null,
        denialReasonDescription: source.denialReasonDescription ?? null,
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
        livesAlone: source.livesAlone ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialTypeormEntity,
      GetBpcDisabilityDenialQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
