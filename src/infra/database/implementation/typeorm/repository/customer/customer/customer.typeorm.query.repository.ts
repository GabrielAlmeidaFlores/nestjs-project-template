import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

export class CustomerTypeormQueryRepository
  extends BaseTypeormQueryRepository<CustomerTypeormEntity>
  implements CustomerQueryRepositoryGateway
{
  protected readonly _type = CustomerTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CustomerTypeormEntity)
    repository: Repository<CustomerTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findCustomerById(id: string): Promise<CustomerEntity | null> {
    const data = await this.findOne({
      where: {
        id,
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      CustomerEntity,
    );

    return mappedData;
  }

  public async findCustomerByEmailOrFederalDocument(
    identifier: Email | FederalDocument,
  ): Promise<CustomerEntity | null> {
    const identifierAsString = identifier.toString();

    const data = await this.findOne({
      where: [
        {
          email: identifierAsString,
        },
        {
          federalDocument: identifierAsString,
        },
      ],
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      CustomerEntity,
    );

    return mappedData;
  }

  public async findCustomerByEmail(
    email: Email,
  ): Promise<CustomerEntity | null> {
    const emailAsString = email.toString();

    const data = await this.findOne({
      where: {
        email: emailAsString,
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      CustomerEntity,
    );

    return mappedData;
  }
}
