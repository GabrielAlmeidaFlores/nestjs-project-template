import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/query/disability-retirement-planning-grant-disability-period.query.repository.gateway';
import { GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/query/result/get-disability-retirement-planning-grant-disability-period.query.result';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantDisabilityPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDisabilityRetirementPlanningGrantDisabilityPeriodIdOrFail(
    id: DisabilityRetirementPlanningGrantDisabilityPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult> {
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
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
      GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult,
    );
  }
}
