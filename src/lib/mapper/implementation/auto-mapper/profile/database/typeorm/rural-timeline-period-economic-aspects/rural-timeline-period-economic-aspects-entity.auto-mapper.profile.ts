import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelinePeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-economic-aspects.typeorm.entity';
import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';
import { RuralTimelinePeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/rural-timeline-period.entity';
import { RuralTimelinePeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/rural-timeline-period-economic-aspects.entity';
import { RuralTimelinePeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/value-object/rural-timeline-period-economic-aspects-id/rural-timeline-period-economic-aspects-id.value-object';

@Injectable()
export class RuralTimelinePeriodEconomicAspectsEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelinePeriodEconomicAspectsEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelinePeriodEconomicAspectsTypeormEntity,
    ): RuralTimelinePeriodEconomicAspectsEntity => {
      const ruralTimelinePeriod = this.mapper.map(
        source.ruralTimelinePeriod,
        RuralTimelinePeriodTypeormEntity,
        RuralTimelinePeriodEntity,
      );

      return new RuralTimelinePeriodEconomicAspectsEntity({
        ...source,
        id: new RuralTimelinePeriodEconomicAspectsId(source.id),
        ruralTimelinePeriodId: ruralTimelinePeriod.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodEconomicAspectsTypeormEntity,
      RuralTimelinePeriodEconomicAspectsEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelinePeriodEconomicAspectsEntity,
    ): RuralTimelinePeriodEconomicAspectsTypeormEntity => {
      return RuralTimelinePeriodEconomicAspectsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodEconomicAspectsEntity,
      RuralTimelinePeriodEconomicAspectsTypeormEntity,
      mappingFunction,
    );
  }
}
