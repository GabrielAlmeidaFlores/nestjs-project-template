import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/query/rural-timeline-analysis-period-document.query.repository.gateway';
import { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisPeriodDocumentTypeormEntity>
  implements RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodDocumentTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisPeriodDocumentId,
  ): Promise<RuralTimelineAnalysisPeriodDocumentEntity | null> {
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
      RuralTimelineAnalysisPeriodDocumentTypeormEntity,
      RuralTimelineAnalysisPeriodDocumentEntity,
    );
  }
}
