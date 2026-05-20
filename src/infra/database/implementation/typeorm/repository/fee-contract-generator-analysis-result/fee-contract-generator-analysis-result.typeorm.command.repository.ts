import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { FeeContractGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/fee-contract-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { FeeContractGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/repository/fee-contract-generator-analysis-result/command/fee-contract-generator.command.repository.gateway';
import { FeeContractGeneratorEntity } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.entity';
import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';

@Injectable()
export class FeeContractGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<FeeContractGeneratorTypeormEntity>
  implements FeeContractGeneratorCommandRepositoryGateway
{
  protected readonly _type = FeeContractGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(FeeContractGeneratorTypeormEntity)
    repository: Repository<FeeContractGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateFeeContractGenerator(
    id: FeeContractGeneratorId,
    props: FeeContractGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      FeeContractGeneratorEntity,
      FeeContractGeneratorTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public createFeeContractGenerator(
    props: FeeContractGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      FeeContractGeneratorEntity,
      FeeContractGeneratorTypeormEntity,
    );
    return this.create(mappedData);
  }
}
