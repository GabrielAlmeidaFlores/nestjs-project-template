import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelinePeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-family-group-member.typeorm.entity';
import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';
import { RuralTimelinePeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/rural-timeline-period.entity';
import { RuralTimelinePeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/rural-timeline-period-family-group-member.entity';
import { RuralTimelinePeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/value-object/rural-timeline-period-family-group-member-id/rural-timeline-period-family-group-member-id.value-object';

@Injectable()
export class RuralTimelinePeriodFamilyGroupMemberEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelinePeriodFamilyGroupMemberEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelinePeriodFamilyGroupMemberTypeormEntity,
    ): RuralTimelinePeriodFamilyGroupMemberEntity => {
      const ruralTimelinePeriod = this.mapper.map(
        source.ruralTimelinePeriod,
        RuralTimelinePeriodTypeormEntity,
        RuralTimelinePeriodEntity,
      );

      return new RuralTimelinePeriodFamilyGroupMemberEntity({
        ...source,
        id: new RuralTimelinePeriodFamilyGroupMemberId(source.id),
        ruralTimelinePeriodId: ruralTimelinePeriod.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodFamilyGroupMemberTypeormEntity,
      RuralTimelinePeriodFamilyGroupMemberEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelinePeriodFamilyGroupMemberEntity,
    ): RuralTimelinePeriodFamilyGroupMemberTypeormEntity => {
      return RuralTimelinePeriodFamilyGroupMemberTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelinePeriodFamilyGroupMemberEntity,
      RuralTimelinePeriodFamilyGroupMemberTypeormEntity,
      mappingFunction,
    );
  }
}
