import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PowerOfAttorneyGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/power-of-attorney-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PowerOfAttorneyGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/repository/power-of-attorney-generator-analysis-result/command/power-of-attorney-generator.command.repository.gateway';
import { PowerOfAttorneyGeneratorEntity } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.entity';
import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';

@Injectable()
export class PowerOfAttorneyGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<PowerOfAttorneyGeneratorTypeormEntity>
  implements PowerOfAttorneyGeneratorCommandRepositoryGateway
{
  protected readonly _type = PowerOfAttorneyGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PowerOfAttorneyGeneratorTypeormEntity)
    repository: Repository<PowerOfAttorneyGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updatePowerOfAttorneyGenerator(
    id: PowerOfAttorneyGeneratorId,
    props: PowerOfAttorneyGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PowerOfAttorneyGeneratorEntity,
      PowerOfAttorneyGeneratorTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public createPowerOfAttorneyGenerator(
    props: PowerOfAttorneyGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PowerOfAttorneyGeneratorEntity,
      PowerOfAttorneyGeneratorTypeormEntity,
    );
    return this.create(mappedData);
  }
}
