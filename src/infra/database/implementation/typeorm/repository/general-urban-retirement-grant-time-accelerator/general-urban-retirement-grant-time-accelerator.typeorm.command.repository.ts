import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/command/general-urban-retirement-grant-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.entity';
import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity>
  implements GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementGrantTimeAccelerator(
    id: GeneralUrbanRetirementGrantTimeAcceleratorId,
    props: GeneralUrbanRetirementGrantTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantTimeAcceleratorEntity,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementGrantTimeAccelerator(
    props: GeneralUrbanRetirementGrantTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantTimeAcceleratorEntity,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
    );

    return this.create(mappedData);
  }
}
