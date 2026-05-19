import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/query/disability-retirement-planning-grant-time-accelerator.query.repository.gateway';
import { GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/query/result/get-disability-retirement-planning-grant-time-accelerator.query.result';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDisabilityRetirementPlanningGrantTimeAcceleratorIdOrFail(
    id: DisabilityRetirementPlanningGrantTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult> {
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
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
      GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult,
    );
  }
}
