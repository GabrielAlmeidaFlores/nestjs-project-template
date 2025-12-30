import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/command/retirement-planning-rgps-time-accelerator.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.entity';

@Injectable()
export class RetirementPlanningRgpsTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsTimeAcceleratorTypeormEntity>
  implements RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsTimeAcceleratorTypeormEntity)
    repository: Repository<RetirementPlanningRgpsTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPlanningRgpsTimeAccelerator(
    props: RetirementPlanningRgpsTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsTimeAcceleratorEntity,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRetirementPlanningRgpsTimeAccelerator(
    id: RetirementPlanningRgpsTimeAcceleratorId,
    props: RetirementPlanningRgpsTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsTimeAcceleratorEntity,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
