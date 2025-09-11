import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerAddressQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/query/customer-address.query.repository.gateway';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';

@Injectable()
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

  public async findOneCustomerAddressById(
    id: Guid,
  ): Promise<GetCustomerAddressQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: id.toString(),
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerAddressTypeormEntity,
      GetCustomerAddressQueryResult,
    );

    return mappedData;
  }
}
