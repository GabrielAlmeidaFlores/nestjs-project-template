import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { JefWaiverDeclarationGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/jef-waiver-declaration-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { JefWaiverDeclarationGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/repository/jef-waiver-declaration-generator-analysis-result/command/jef-waiver-declaration-generator.command.repository.gateway';
import { JefWaiverDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.entity';
import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';

@Injectable()
export class JefWaiverDeclarationGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<JefWaiverDeclarationGeneratorTypeormEntity>
  implements JefWaiverDeclarationGeneratorCommandRepositoryGateway
{
  protected readonly _type = JefWaiverDeclarationGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(JefWaiverDeclarationGeneratorTypeormEntity)
    repository: Repository<JefWaiverDeclarationGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateJefWaiverDeclarationGenerator(
    id: JefWaiverDeclarationGeneratorId,
    props: JefWaiverDeclarationGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JefWaiverDeclarationGeneratorEntity,
      JefWaiverDeclarationGeneratorTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public createJefWaiverDeclarationGenerator(
    props: JefWaiverDeclarationGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JefWaiverDeclarationGeneratorEntity,
      JefWaiverDeclarationGeneratorTypeormEntity,
    );
    return this.create(mappedData);
  }
}
