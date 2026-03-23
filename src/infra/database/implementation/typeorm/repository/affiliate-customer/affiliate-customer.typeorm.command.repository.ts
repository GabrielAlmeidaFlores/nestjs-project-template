import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

@Injectable()
export class AffiliateCustomerTypeormCommandRepository
  extends BaseTypeormCommandRepository<AffiliateCustomerTypeormEntity>
  implements AffiliateCustomerCommandRepositoryGateway
{
  protected readonly _type = AffiliateCustomerTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AffiliateCustomerTypeormEntity)
    repository: Repository<AffiliateCustomerTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAffiliateCustomer(
    props: AffiliateCustomerEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AffiliateCustomerEntity,
      AffiliateCustomerTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAffiliateCustomer(
    id: AffiliateCustomerId,
    props: AffiliateCustomerEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AffiliateCustomerEntity,
      AffiliateCustomerTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAffiliateCustomer(id: AffiliateCustomerId): TransactionType {
    return this.delete(id.toString());
  }
}
