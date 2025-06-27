import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAddressQueryRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.query.repository.gateway';
import { CustomerAddressEntity } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

export class CustomerAddressTypeormQueryRepository
  extends BaseTypeormQueryRepository<CustomerAddressTypeormEntity>
  implements CustomerAddressQueryRepositoryGateway
{
  protected readonly _type = CustomerAddressTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CustomerAddressTypeormEntity)
    repository: Repository<CustomerAddressTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findCustomerAddressByCustomerId(
    customerId: Guid,
  ): Promise<CustomerAddressEntity | null> {
    const customerIdString = customerId.toString();

    const data = await this.findOne({
      where: {
        customer: {
          id: customerIdString,
        },
      },
    });

    const mappedData = this.mapperGateway.map(
      data,
      CustomerAddressTypeormEntity,
      CustomerAddressEntity,
    );

    return mappedData;
  }
}
