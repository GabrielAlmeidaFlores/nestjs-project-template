import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AffiliateCustomerConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-config.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateCustomerConfigCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/command/affiliate-customer-config.command.repository.gateway';
import { AffiliateCustomerConfigEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity';
import { AffiliateCustomerConfigId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/value-object/affiliate-customer-config-id/affiliate-customer-config-id.value-object';

@Injectable()
export class AffiliateCustomerConfigTypeormCommandRepository
  extends BaseTypeormCommandRepository<AffiliateCustomerConfigTypeormEntity>
  implements AffiliateCustomerConfigCommandRepositoryGateway
{
  protected readonly _type =
    AffiliateCustomerConfigTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AffiliateCustomerConfigTypeormEntity)
    repository: Repository<AffiliateCustomerConfigTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAffiliateCustomerConfig(
    props: AffiliateCustomerConfigEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AffiliateCustomerConfigEntity,
      AffiliateCustomerConfigTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAffiliateCustomerConfig(
    id: AffiliateCustomerConfigId,
    props: AffiliateCustomerConfigEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AffiliateCustomerConfigEntity,
      AffiliateCustomerConfigTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
