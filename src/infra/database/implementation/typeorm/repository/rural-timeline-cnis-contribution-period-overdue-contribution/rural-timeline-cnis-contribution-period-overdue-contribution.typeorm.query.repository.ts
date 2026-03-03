import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineCnisContributionPeriodOverdueContributionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/query/rural-timeline-cnis-contribution-period-overdue-contribution.query.repository.gateway';
import { RuralTimelineCnisContributionPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodOverdueContributionTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity>
  implements
    RuralTimelineCnisContributionPeriodOverdueContributionQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineCnisContributionPeriodOverdueContributionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
    )
    repository: Repository<RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineCnisContributionPeriodOverdueContributionId,
  ): Promise<RuralTimelineCnisContributionPeriodOverdueContributionEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelineCnisContributionPeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
      RuralTimelineCnisContributionPeriodOverdueContributionEntity,
    );
  }
}
