import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRuralTimelineAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';

@Injectable()
export class RuralTimelineAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisTypeormEntity>
  implements RuralTimelineAnalysisQueryRepositoryGateway
{
  protected readonly _type = RuralTimelineAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisTypeormEntity)
    repository: Repository<RuralTimelineAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisId,
  ): Promise<RuralTimelineAnalysisEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisTypeormEntity,
      RuralTimelineAnalysisEntity,
    );
  }

  public async findOneByIdWithRelations(
    id: RuralTimelineAnalysisId,
  ): Promise<GetRuralTimelineAnalysisWithRelationsQueryResult | null> {
    const ruralTimelineORM = await this.repository.findOne({
      where: { id: id.toString() },
      relations: [
        'ruralTimelineDocument',
        'ruralTimelineAnalysisInssBenefit',
        'ruralTimelineAnalysisLegalProceeding',
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
      RuralTimelineAnalysisTypeormEntity,
      GetRuralTimelineAnalysisWithRelationsQueryResult,
    );
  }

  public async findWithRelationsByRuralTimelineAnalysisIdOrFail(
    id: RuralTimelineAnalysisId,
  ): Promise<GetRuralTimelineAnalysisWithRelationsQueryResult> {
    const result = await this.findOneByIdWithRelations(id);

    if (result === null) {
      throw new RuralTimelineAnalysisNotFoundError();
    }

    return result;
  }
}
