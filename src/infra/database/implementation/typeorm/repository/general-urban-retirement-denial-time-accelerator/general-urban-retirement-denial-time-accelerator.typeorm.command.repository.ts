import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/command/general-urban-retirement-denial-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementDenialTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.entity';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity>
  implements GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementDenialTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity)
    repository: Repository<GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementDenialTimeAccelerator(
    props: GeneralUrbanRetirementDenialTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialTimeAcceleratorEntity,
      GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateGeneralUrbanRetirementDenialTimeAccelerator(
    id: GeneralUrbanRetirementDenialTimeAcceleratorId,
    props: GeneralUrbanRetirementDenialTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementDenialTimeAcceleratorEntity,
      GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
