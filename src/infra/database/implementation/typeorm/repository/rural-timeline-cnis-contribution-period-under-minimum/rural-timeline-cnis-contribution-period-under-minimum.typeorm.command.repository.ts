import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-under-minimum.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineCnisContributionPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-cnis-contribution-period-under-minimum/command/rural-timeline-cnis-contribution-period-under-minimum.command.repository.gateway';
import { RuralTimelineCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/rural-timeline-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/value-object/rural-timeline-cnis-contribution-period-under-minimum-id/rural-timeline-cnis-contribution-period-under-minimum-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodUnderMinimumTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity>
  implements
    RuralTimelineCnisContributionPeriodUnderMinimumCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineCnisContributionPeriodUnderMinimumTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity,
    )
    repository: Repository<RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineCnisContributionPeriodUnderMinimum(
    props: RuralTimelineCnisContributionPeriodUnderMinimumEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineCnisContributionPeriodUnderMinimumEntity,
      RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelineCnisContributionPeriodUnderMinimum(
    id: RuralTimelineCnisContributionPeriodUnderMinimumId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
