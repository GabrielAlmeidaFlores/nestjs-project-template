import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineCnisContributionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRuralTimelineCnisContributionPeriodDocumentQueryResultType } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/query/result/get-rural-timeline-cnis-contribution-period-document.query.result';
import { RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/query/rural-timeline-cnis-contribution-period-document.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineCnisContributionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.entity';
import { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineCnisContributionPeriodDocumentTypeormEntity>
  implements RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineCnisContributionPeriodDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineCnisContributionPeriodDocumentTypeormEntity)
    repository: Repository<RuralTimelineCnisContributionPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneRuralTimelineCnisContributionPeriodDocumentById(
    id: RuralTimelineCnisContributionPeriodDocumentId,
  ): Promise<GetRuralTimelineCnisContributionPeriodDocumentQueryResultType | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: { ruralTimelineCnisContributionPeriod: true },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
      RuralTimelineCnisContributionPeriodDocumentEntity,
    );
  }

  public async listRuralTimelineCnisContributionPeriodDocumentsByPeriodId(
    periodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): Promise<GetRuralTimelineCnisContributionPeriodDocumentQueryResultType[]> {
    const results = await this.find({
      where: {
        ruralTimelineCnisContributionPeriod: { id: periodId.toString() },
      },
      relations: { ruralTimelineCnisContributionPeriod: true },
    });

    return this.mapperGateway.mapArray(
      results,
      RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
      RuralTimelineCnisContributionPeriodDocumentEntity,
    );
  }
}
