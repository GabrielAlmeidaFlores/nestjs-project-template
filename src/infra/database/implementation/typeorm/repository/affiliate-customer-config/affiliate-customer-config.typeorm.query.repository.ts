import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AffiliateCustomerConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-config.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateCustomerConfigQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/query/affiliate-customer-config.query.repository.gateway';
import { AffiliateCustomerConfigEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity';
import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';

@Injectable()
export class AffiliateCustomerConfigTypeormQueryRepository implements AffiliateCustomerConfigQueryRepositoryGateway {
  protected readonly _type = AffiliateCustomerConfigTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AffiliateCustomerConfigTypeormEntity)
    private readonly repository: Repository<AffiliateCustomerConfigTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByConfig(
    config: AffiliateCustomerConfigConfigEnum,
  ): Promise<AffiliateCustomerConfigEntity | null> {
    const result = await this.repository.findOne({ where: { config } });

    if (!result) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      AffiliateCustomerConfigTypeormEntity,
      AffiliateCustomerConfigEntity,
    );
  }

  public async findAll(): Promise<AffiliateCustomerConfigEntity[]> {
    const results = await this.repository.find();

    return results.map((result) =>
      this.mapperGateway.map(
        result,
        AffiliateCustomerConfigTypeormEntity,
        AffiliateCustomerConfigEntity,
      ),
    );
  }
}
