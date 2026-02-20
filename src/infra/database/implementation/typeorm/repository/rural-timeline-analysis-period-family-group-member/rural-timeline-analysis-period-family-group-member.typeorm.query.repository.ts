import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-family-group-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/query/rural-timeline-analysis-period-family-group-member.query.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity>
  implements RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisPeriodFamilyGroupMemberId,
  ): Promise<RuralTimelineAnalysisPeriodFamilyGroupMemberEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: {
        ruralTimelinePeriod: {
          ruralTimeline: true,
        },
      },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
      RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
    );
  }
}
