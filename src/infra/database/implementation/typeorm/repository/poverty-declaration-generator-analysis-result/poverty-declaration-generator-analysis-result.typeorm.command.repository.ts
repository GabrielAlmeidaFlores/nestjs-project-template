import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PovertyDeclarationGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/poverty-declaration-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PovertyDeclarationGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/repository/poverty-declaration-generator-analysis-result/command/poverty-declaration-generator.command.repository.gateway';
import { PovertyDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.entity';
import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';

@Injectable()
export class PovertyDeclarationGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<PovertyDeclarationGeneratorTypeormEntity>
  implements PovertyDeclarationGeneratorCommandRepositoryGateway
{
  protected readonly _type = PovertyDeclarationGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PovertyDeclarationGeneratorTypeormEntity)
    repository: Repository<PovertyDeclarationGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updatePovertyDeclarationGenerator(
    id: PovertyDeclarationGeneratorId,
    props: PovertyDeclarationGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PovertyDeclarationGeneratorEntity,
      PovertyDeclarationGeneratorTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public createPovertyDeclarationGenerator(
    props: PovertyDeclarationGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PovertyDeclarationGeneratorEntity,
      PovertyDeclarationGeneratorTypeormEntity,
    );
    return this.create(mappedData);
  }
}
