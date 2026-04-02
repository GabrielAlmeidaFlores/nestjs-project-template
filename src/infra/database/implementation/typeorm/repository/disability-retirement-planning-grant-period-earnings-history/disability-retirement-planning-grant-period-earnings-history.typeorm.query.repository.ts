import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-earnings-history/query/disability-retirement-planning-grant-period-earnings-history.query.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.entity';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findAllByDisabilityRetirementPlanningGrantPeriodId(
    disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId,
  ): Promise<DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity[]> {
    const results = await this.find({
      where: {
        disabilityRetirementPlanningGrantPeriod: {
          id: disabilityRetirementPlanningGrantPeriodId.toString(),
        },
        deletedAt: IsNull(),
      },
      relations: {
        disabilityRetirementPlanningGrantPeriod: true,
      },
    });

    return results.map((item) =>
      this.mapperGateway.map(
        item,
        DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
        DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity,
      ),
    );
  }
}
