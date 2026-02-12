import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-family-group-member.typeorm.entity';
import { GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
      GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult,
      forMember(
        (destination) => destination.name,
        mapFrom((source) => source.name),
      ),
      forMember(
        (destination) => destination.federalDocument,
        mapFrom((source) => new FederalDocument(source.federalDocument)),
      ),
      forMember(
        (destination) => destination.kinship,
        mapFrom((source) => source.kinship),
      ),
      forMember(
        (destination) => destination.receivesRuralBenefit,
        mapFrom((source) => source.receivesRuralBenefit),
      ),
      forMember(
        (destination) => destination.benefitNumber,
        mapFrom((source) => source.benefitNumber),
      ),
      forMember(
        (destination) => destination.cnisDocument,
        mapFrom((source) => source.cnisDocument ?? null),
      ),
    );
  }
}
