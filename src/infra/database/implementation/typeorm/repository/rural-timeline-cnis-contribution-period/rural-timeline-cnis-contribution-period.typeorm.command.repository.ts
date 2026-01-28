import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-cnis-contribution-period/command/rural-timeline-cnis-contribution-period.command.repository.gateway';
import { RuralTimelineCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/rural-timeline-cnis-contribution-period.entity';
import { RuralTimelineCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/value-object/rural-timeline-cnis-contribution-period-id/rural-timeline-cnis-contribution-period-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineCnisContributionPeriodTypeormEntity>
  implements RuralTimelineCnisContributionPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineCnisContributionPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineCnisContributionPeriodTypeormEntity)
    repository: Repository<RuralTimelineCnisContributionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineCnisContributionPeriod(
    props: RuralTimelineCnisContributionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineCnisContributionPeriodEntity,
      RuralTimelineCnisContributionPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelineCnisContributionPeriod(
    id: RuralTimelineCnisContributionPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
