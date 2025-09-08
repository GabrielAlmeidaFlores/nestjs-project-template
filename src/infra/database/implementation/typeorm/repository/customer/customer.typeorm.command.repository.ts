import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/command/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';

@Injectable()
export class CustomerTypeormCommandRepository
  extends BaseTypeormCommandRepository<CustomerTypeormEntity>
  implements CustomerCommandRepositoryGateway
{
  protected readonly _type = CustomerTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CustomerTypeormEntity)
    repository: Repository<CustomerTypeormEntity>,
    @InjectDataSource()
    dataSource: DataSource,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository, dataSource);
  }

  public createCustomer(props: CustomerEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CustomerEntity,
      CustomerTypeormEntity,
    );

    return this.create(mappedData);
  }
}
