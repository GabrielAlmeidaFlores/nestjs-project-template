import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetRuralTimelineAnalysisCnisContributionPeriodQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { ListRuralTimelineAnalysisCnisContributionPeriodQueryParam } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/param/list-rural-timeline-analysis-cnis-contribution-period.query.param';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralTimelineAnalysisCnisContributionPeriodTypeormEntity>
  implements RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisCnisContributionPeriodTypeormEntity)
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodEntity | null> {
    const result = await this.findOne({
      where: { id: id.toString() },
    });

    if (result === null) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodEntity,
    );
  }

  public async listByRuralTimelineAnalysisId(
    _organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    listData: ListRuralTimelineAnalysisCnisContributionPeriodQueryParam,
  ): Promise<
    ListDataOutputModel<GetRuralTimelineAnalysisCnisContributionPeriodQueryResult>
  > {
    const where = listData.ruralTimelineAnalysis
      ? {
          ruralTimeline: {
            id: listData.ruralTimelineAnalysis.toString(),
          },
        }
      : {};

    const result = await this.list(listData, {
      where,
      relations: {
        ruralTimelineCnisContributionPeriodUnderMinimum: true,
      },
    });

    const mappedResource = result.resource.map((item) =>
      this.mapperGateway.map(
        item,
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        GetRuralTimelineAnalysisCnisContributionPeriodQueryResult,
      ),
    );

    return new ListDataOutputModel<GetRuralTimelineAnalysisCnisContributionPeriodQueryResult>(
      {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        resource: mappedResource,
      },
    );
  }
}
