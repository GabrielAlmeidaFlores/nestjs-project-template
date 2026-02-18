import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/query/rural-timeline-analysis-document.query.repository.gateway';
import { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';

@Injectable()
export class RuralTimelineAnalysisDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisDocumentTypeormEntity>
  implements RuralTimelineAnalysisDocumentQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisDocumentTypeormEntity)
    repository: Repository<RuralTimelineAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisDocumentId,
  ): Promise<RuralTimelineAnalysisDocumentEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimeline: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisDocumentTypeormEntity,
      RuralTimelineAnalysisDocumentEntity,
    );
  }
}
