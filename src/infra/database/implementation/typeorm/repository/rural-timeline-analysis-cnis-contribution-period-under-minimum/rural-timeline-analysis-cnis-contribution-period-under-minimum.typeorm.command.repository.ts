import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/command/rural-timeline-analysis-cnis-contribution-period-under-minimum.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/value-object/rural-timeline-analysis-cnis-contribution-period-under-minimum-id/rural-timeline-analysis-cnis-contribution-period-under-minimum-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity>
  implements
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
    )
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisCnisContributionPeriodUnderMinimum(
    props: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity,
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelineAnalysisCnisContributionPeriodUnderMinimum(
    id: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
