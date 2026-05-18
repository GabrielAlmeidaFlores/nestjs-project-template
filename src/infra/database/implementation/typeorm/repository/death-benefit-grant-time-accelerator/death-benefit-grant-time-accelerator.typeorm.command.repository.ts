import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/command/death-benefit-grant-time-accelerator.command.repository.gateway';
import { DeathBenefitGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.entity';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

@Injectable()
export class DeathBenefitGrantTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantTimeAcceleratorTypeormEntity>
  implements DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantTimeAcceleratorTypeormEntity)
    repository: Repository<DeathBenefitGrantTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantTimeAccelerator(
    props: DeathBenefitGrantTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantTimeAcceleratorEntity,
      DeathBenefitGrantTimeAcceleratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitGrantTimeAccelerator(
    id: DeathBenefitGrantTimeAcceleratorId,
    props: DeathBenefitGrantTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantTimeAcceleratorEntity,
      DeathBenefitGrantTimeAcceleratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
