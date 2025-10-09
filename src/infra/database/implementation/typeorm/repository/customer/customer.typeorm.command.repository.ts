import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

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

  public updateCustomer(
    customerId: CustomerId,
    props: CustomerEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CustomerEntity,
      CustomerTypeormEntity,
    );

    return this.update(customerId.toString(), mappedData);
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
