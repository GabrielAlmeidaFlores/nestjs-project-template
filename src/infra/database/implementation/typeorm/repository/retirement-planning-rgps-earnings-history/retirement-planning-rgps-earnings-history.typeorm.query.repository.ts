import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RetirementPlanningRgpsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-earnings-history/query/retirement-planning-rgps-earnings-history.query.repository.gateway';
import { RetirementPlanningRgpsEarningsHistoryEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.entity';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

@Injectable()
export class RetirementPlanningRgpsEarningsHistoryTypeormQueryRepository implements RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway {
  protected readonly _type =
    RetirementPlanningRgpsEarningsHistoryTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsEarningsHistoryTypeormEntity)
    private readonly repository: Repository<RetirementPlanningRgpsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findByRetirementPlanningRgpsPeriodId(
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<RetirementPlanningRgpsEarningsHistoryEntity[]> {
    const results = await this.repository.find({
      where: {
        retirementPlanningRgpsPeriod: {
          id: retirementPlanningRgpsPeriodId.toString(),
        },
      },
    });

    return results.map((r) =>
      this.mapperGateway.map(
        r,
        RetirementPlanningRgpsEarningsHistoryTypeormEntity,
        RetirementPlanningRgpsEarningsHistoryEntity,
      ),
    );
  }
}
