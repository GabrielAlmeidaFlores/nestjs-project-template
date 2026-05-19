import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/command/death-benefit-rejection-time-accelerator.command.repository.gateway';
import { DeathBenefitRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.entity';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

@Injectable()
export class DeathBenefitRejectionTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionTimeAcceleratorTypeormEntity>
  implements DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionTimeAcceleratorTypeormEntity)
    repository: Repository<DeathBenefitRejectionTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionTimeAccelerator(
    props: DeathBenefitRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionTimeAcceleratorEntity,
      DeathBenefitRejectionTimeAcceleratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitRejectionTimeAccelerator(
    id: DeathBenefitRejectionTimeAcceleratorId,
    props: DeathBenefitRejectionTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionTimeAcceleratorEntity,
      DeathBenefitRejectionTimeAcceleratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
