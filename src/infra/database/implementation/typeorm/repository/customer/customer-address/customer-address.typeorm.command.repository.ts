import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAddressCommandRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.command.repository.gateway';
import { CustomerAddressEntity } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

export class CustomerAddressTypeormCommandRepository
  extends BaseTypeormCommandRepository<CustomerAddressTypeormEntity>
  implements CustomerAddressCommandRepositoryGateway
{
  protected readonly _type = CustomerAddressTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CustomerAddressTypeormEntity)
    repository: Repository<CustomerAddressTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async createCustomerAddress(
    props: CustomerAddressEntity,
  ): Promise<void> {
    const mappedData = this.mapperGateway.map(
      props,
      CustomerAddressEntity,
      CustomerAddressTypeormEntity,
    );

    await this.create(mappedData);
  }
}
