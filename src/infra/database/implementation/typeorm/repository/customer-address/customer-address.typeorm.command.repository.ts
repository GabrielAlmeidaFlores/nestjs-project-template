import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/command/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';

@Injectable()
export class CustomerAddressTypeormCommandRepository
  extends BaseTypeormCommandRepository<CustomerAddressTypeormEntity>
  implements CustomerAddressCommandRepositoryGateway
{
  protected readonly _type = CustomerAddressTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CustomerAddressTypeormEntity)
    repository: Repository<CustomerAddressTypeormEntity>,
    @InjectDataSource()
    dataSource: DataSource,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository, dataSource);
  }

  public createCustomerAddress(props: CustomerAddressEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CustomerAddressEntity,
      CustomerAddressTypeormEntity,
    );

    return this.create(mappedData);
  }
}
