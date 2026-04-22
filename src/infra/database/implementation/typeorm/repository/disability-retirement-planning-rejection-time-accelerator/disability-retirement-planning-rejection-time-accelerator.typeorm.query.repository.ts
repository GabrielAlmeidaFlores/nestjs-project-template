import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/disability-retirement-planning-rejection-time-accelerator.query.repository.gateway';
import { GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/result/get-disability-retirement-planning-rejection-time-accelerator.query.result';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity>
  implements
    DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDisabilityRetirementPlanningRejectionTimeAcceleratorIdOrFail(
    id: DisabilityRetirementPlanningRejectionTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString(), deletedAt: IsNull() },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
      GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult,
    );
  }
}
