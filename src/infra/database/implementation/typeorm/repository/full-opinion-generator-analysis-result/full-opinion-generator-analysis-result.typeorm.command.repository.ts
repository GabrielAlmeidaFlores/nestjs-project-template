import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { FullOpinionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/full-opinion-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { FullOpinionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/command/full-opinion-generator.command.repository.gateway';
import { FullOpinionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.entity';
import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';

@Injectable()
export class FullOpinionGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<FullOpinionGeneratorTypeormEntity>
  implements FullOpinionGeneratorCommandRepositoryGateway
{
  protected readonly _type = FullOpinionGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(FullOpinionGeneratorTypeormEntity)
    repository: Repository<FullOpinionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateFullOpinionGenerator(
    id: FullOpinionGeneratorId,
    props: FullOpinionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      FullOpinionGeneratorEntity,
      FullOpinionGeneratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createFullOpinionGenerator(
    props: FullOpinionGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      FullOpinionGeneratorEntity,
      FullOpinionGeneratorTypeormEntity,
    );

    return this.create(mappedData);
  }
}
