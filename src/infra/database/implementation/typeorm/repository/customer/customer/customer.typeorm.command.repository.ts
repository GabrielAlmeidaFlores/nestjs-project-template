import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer.entity';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

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

  public async createCustomer(data: CustomerEntity): Promise<void> {
    const mappedData = this.mapperGateway.map(
      data,
      CustomerEntity,
      CustomerTypeormEntity,
    );

    await this.create(mappedData);
  }
}
