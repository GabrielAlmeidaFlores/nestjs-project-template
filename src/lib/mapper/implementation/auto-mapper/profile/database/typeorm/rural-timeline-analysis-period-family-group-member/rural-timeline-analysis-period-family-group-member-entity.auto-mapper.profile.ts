import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-family-group-member.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodFamilyGroupMemberEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisPeriodFamilyGroupMemberEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
    ): RuralTimelineAnalysisPeriodFamilyGroupMemberEntity => {
      const ruralTimelinePeriod = this.mapper.map(
        source.ruralTimelinePeriod,
        RuralTimelineAnalysisPeriodTypeormEntity,
        RuralTimelineAnalysisPeriodEntity,
      );

      return new RuralTimelineAnalysisPeriodFamilyGroupMemberEntity({
        ...source,
        id: new RuralTimelineAnalysisPeriodFamilyGroupMemberId(source.id),
        ruralTimelinePeriodId: ruralTimelinePeriod.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
      RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
    ): RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity => {
      const ormEntity =
        RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity.build({
          id: source.id.toString(),
          name: source.name,
          federalDocument: source.federalDocument,
          kinship: source.kinship,
          receivesRuralBenefit: source.receivesRuralBenefit,
          benefitNumber: source.benefitNumber,
          cnisDocument: source.cnisDocument,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        });

      ormEntity.ruralTimelinePeriod = {
        id: source.ruralTimelinePeriodId.toString(),
      } as unknown as RuralTimelineAnalysisPeriodTypeormEntity;

      return ormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
      mappingFunction,
    );
  }
}
