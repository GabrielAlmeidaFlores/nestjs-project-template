import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AdministrativeRequestGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-request-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdministrativeRequestGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/command/administrative-request-generator.command.repository.gateway';
import { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';

@Injectable()
export class AdministrativeRequestGeneratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<AdministrativeRequestGeneratorTypeormEntity>
  implements AdministrativeRequestGeneratorCommandRepositoryGateway
{
  protected readonly _type =
    AdministrativeRequestGeneratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AdministrativeRequestGeneratorTypeormEntity)
    repository: Repository<AdministrativeRequestGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateAdministrativeRequestGenerator(
    id: AdministrativeRequestGeneratorId,
    props: AdministrativeRequestGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeRequestGeneratorEntity,
      AdministrativeRequestGeneratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createAdministrativeRequestGenerator(
    props: AdministrativeRequestGeneratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeRequestGeneratorEntity,
      AdministrativeRequestGeneratorTypeormEntity,
    );

    return this.create(mappedData);
  }
}
