import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline/query/rural-timeline.query.repository.gateway';
import { RuralTimelineEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity';
import { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

@Injectable()
export class RuralTimelineTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineTypeormEntity>
  implements RuralTimelineQueryRepositoryGateway
{
  protected readonly _type = RuralTimelineTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineTypeormEntity)
    repository: Repository<RuralTimelineTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdWithRelations(
    id: RuralTimelineId,
  ): Promise<RuralTimelineEntity | null> {
    const ruralTimelineORM = await this.repository.findOne({
      where: { id: id.toString() },
      relations: [
        'ruralTimelineDocument',
        'ruralTimelinePeriod',
        'ruralTimelinePeriod.ruralTimelinePeriodProperty',
        'ruralTimelinePeriod.ruralTimelinePeriodResidence',
        'ruralTimelinePeriod.ruralTimelinePeriodDocument',
        'ruralTimelinePeriod.ruralTimelinePeriodEconomicAspects',
        'ruralTimelinePeriod.ruralTimelinePeriodFamilyGroupMember',
        'ruralTimelineCnisContributionPeriod',
        'ruralTimelineCnisContributionPeriod.ruralTimelineCnisContributionPeriodUnderMinimum',
      ],
    });

    if (!ruralTimelineORM) {
      return null;
    }

    return this.mapperGateway.map(
      ruralTimelineORM,
      RuralTimelineTypeormEntity,
      RuralTimelineEntity,
    );
  }
}
