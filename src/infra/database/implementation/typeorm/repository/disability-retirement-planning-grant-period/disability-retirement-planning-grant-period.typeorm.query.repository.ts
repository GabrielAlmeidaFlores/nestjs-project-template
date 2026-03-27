import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/query/disability-retirement-planning-grant-period.query.repository.gateway';
import { GetDisabilityRetirementPlanningGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/query/result/get-disability-retirement-planning-grant-period.query.result';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningGrantPeriodTypeormEntity>
  implements DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningGrantPeriodTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDisabilityRetirementPlanningGrantPeriodIdOrFail(
    id: DisabilityRetirementPlanningGrantPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantPeriodQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          deletedAt: IsNull(),
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DisabilityRetirementPlanningGrantPeriodTypeormEntity,
      GetDisabilityRetirementPlanningGrantPeriodQueryResult,
    );
  }
}
