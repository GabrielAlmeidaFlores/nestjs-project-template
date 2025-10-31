import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerTermsCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/command/customer-terms.command.repository.gateway';
import { CustomerTermsEntity } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity';
import { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';

@Injectable()
export class CustomerTermsTypeormCommandRepository
  extends BaseTypeormCommandRepository<CustomerTermsTypeormEntity>
  implements CustomerTermsCommandRepositoryGateway
{
  protected readonly _type = CustomerTermsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CustomerTermsTypeormEntity)
    repository: Repository<CustomerTermsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public updateCustomerTerms(
    id: CustomerTermsId,
    props: CustomerTermsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CustomerTermsEntity,
      CustomerTermsTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createCustomerTerms(props: CustomerTermsEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CustomerTermsEntity,
      CustomerTermsTypeormEntity,
    );

    return this.create(mappedData);
  }
}
