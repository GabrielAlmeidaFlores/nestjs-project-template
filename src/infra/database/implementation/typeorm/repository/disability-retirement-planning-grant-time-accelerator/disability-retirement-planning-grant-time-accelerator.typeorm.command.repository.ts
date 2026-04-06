import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/command/disability-retirement-planning-grant-time-accelerator.command.repository.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantTimeAccelerator(
    props: DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningGrantTimeAccelerator(
    id: DisabilityRetirementPlanningGrantTimeAcceleratorId,
    props: DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
