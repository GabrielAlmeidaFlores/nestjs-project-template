import { createMap, forMember, mapFrom } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { GetRuralTimelineAnalysisPeriodPropertyQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

import type { Mapper } from '@automapper/core';

@Injectable()
export class GetRuralTimelineAnalysisPeriodPropertyQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRuralTimelineAnalysisPeriodPropertyQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap(this.mapper);
  }

  private createMap(mapper: Mapper): void {
    createMap(
      mapper,
      RuralTimelineAnalysisPeriodPropertyTypeormEntity,
      GetRuralTimelineAnalysisPeriodPropertyQueryResult,
      forMember(
        (destination) => destination.id,
        mapFrom(
          (source) => new RuralTimelineAnalysisPeriodPropertyId(source.id),
        ),
      ),
      forMember(
        (destination) => destination.propertyName,

        mapFrom((source) => source.propertyName),
      ),
      forMember(
        (destination) => destination.ownerName,

        mapFrom((source) => source.ownerName),
      ),
      forMember(
        (destination) => destination.postalCode,

        mapFrom((source) =>
          source.postalCode !== null && source.postalCode !== undefined
            ? new PostalCode(source.postalCode)
            : null,
        ),
      ),
      forMember(
        (destination) => destination.stateCode,

        mapFrom((source) => source.stateCode),
      ),
      forMember(
        (destination) => destination.city,

        mapFrom((source) => source.city),
      ),
      forMember(
        (destination) => destination.neighborhood,

        mapFrom((source) => source.neighborhood),
      ),
      forMember(
        (destination) => destination.street,

        mapFrom((source) => source.street),
      ),
      forMember(
        (destination) => destination.streetNumber,

        mapFrom((source) => source.streetNumber),
      ),
      forMember(
        (destination) => destination.landOwnershipType,

        mapFrom((source) => source.landOwnershipType),
      ),
    );
  }
}
