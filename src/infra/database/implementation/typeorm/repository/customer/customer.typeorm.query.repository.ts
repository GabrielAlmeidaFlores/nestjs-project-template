import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';

@Injectable()
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

  public async findCustomerById(
    id: Guid,
  ): Promise<GetCustomerQueryResult | null> {
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
      CustomerTypeormEntity,
      GetCustomerQueryResult,
    );

    return mappedData;
  }

  public async findCustomerByEmailOrFederalDocument(
    identifier: Email | FederalDocument,
  ): Promise<GetCustomerQueryResult | null> {
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
      GetCustomerQueryResult,
    );

    return mappedData;
  }

  public async findCustomerByEmail(
    email: Email,
  ): Promise<GetCustomerQueryResult | null> {
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
      GetCustomerQueryResult,
    );

    return mappedData;
  }
}
