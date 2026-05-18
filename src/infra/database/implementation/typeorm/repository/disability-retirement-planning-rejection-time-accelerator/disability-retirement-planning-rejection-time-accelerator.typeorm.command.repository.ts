import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/command/disability-retirement-planning-rejection-time-accelerator.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity>
  implements
    DisabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejectionTimeAccelerator(
    props: DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningRejectionTimeAccelerator(
    id: DisabilityRetirementPlanningRejectionTimeAcceleratorId,
    props: DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
