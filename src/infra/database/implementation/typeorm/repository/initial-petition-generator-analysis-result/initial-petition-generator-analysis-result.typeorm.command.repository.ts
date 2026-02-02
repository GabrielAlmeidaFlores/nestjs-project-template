import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { InitialPetitionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/initial-petition-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { InitialPetitionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result.entity';
import { InitialPetitionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/command/initial-petition-generator-analysis-result.command.repository.gateway';

@Injectable()
export class InitialPetitionGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<InitialPetitionGeneratorTypeormEntity>
  implements InitialPetitionGeneratorCommandRepositoryGateway
{
  protected readonly _type =
    InitialPetitionGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(InitialPetitionGeneratorTypeormEntity)
    repository: Repository<InitialPetitionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateInitialPetitionGenerator(
    id: InitialPetitionGeneratorId,
    props: InitialPetitionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InitialPetitionGeneratorEntity,
      InitialPetitionGeneratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createInitialPetitionGenerator(
    props: InitialPetitionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InitialPetitionGeneratorEntity,
      InitialPetitionGeneratorTypeormEntity,
    );

    return this.create(mappedData);
  }
}
