import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/command/rural-timeline-analysis-cnis-contribution-period-adjustment.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.entity';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/value-object/rural-timeline-analysis-cnis-contribution-period-adjustment-id/rural-timeline-analysis-cnis-contribution-period-adjustment-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity>
  implements RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
    )
    repository: Repository<RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisCnisContributionPeriodAdjustment(
    props: RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity,
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelineAnalysisCnisContributionPeriodAdjustment(
    id: RuralTimelineAnalysisCnisContributionPeriodAdjustmentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
