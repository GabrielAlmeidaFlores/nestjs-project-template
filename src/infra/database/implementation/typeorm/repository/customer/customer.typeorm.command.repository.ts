import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/auth/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerEntity } from '@module/customer/auth/domain/schema/entity/customer/customer.entity';

@Injectable()
export class CustomerTypeormCommandRepository
  extends BaseTypeormCommandRepository<CustomerTypeormEntity>
  implements CustomerCommandRepositoryGateway
{
  protected readonly _type = CustomerTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CustomerTypeormEntity)
    repository: Repository<CustomerTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
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
