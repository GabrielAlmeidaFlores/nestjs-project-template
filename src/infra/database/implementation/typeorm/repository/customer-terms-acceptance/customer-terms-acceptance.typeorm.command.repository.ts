import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerTermsAcceptanceCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/command/customer-terms-acceptance.command.repository.gateway';
import { CustomerTermsAcceptanceEntity } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/customer-terms-acceptance.entity';

@Injectable()
export class CustomerTermsAcceptanceTypeormCommandRepository
  extends BaseTypeormCommandRepository<CustomerTermsAcceptanceTypeormEntity>
  implements CustomerTermsAcceptanceCommandRepositoryGateway
{
  protected readonly _type =
    CustomerTermsAcceptanceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CustomerTermsAcceptanceTypeormEntity)
    repository: Repository<CustomerTermsAcceptanceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createCustomerTermsAcceptance(
    props: CustomerTermsAcceptanceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CustomerTermsAcceptanceEntity,
      CustomerTermsAcceptanceTypeormEntity,
    );

    return this.create(mappedData);
  }
}
