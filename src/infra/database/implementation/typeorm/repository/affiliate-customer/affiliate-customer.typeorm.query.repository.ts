import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { ListAffiliateCustomersQueryParam } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/param/list-affiliate-customers.query.param';
import { GetAffiliateCustomerQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/result/get-affiliate-customer.query.result';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

@Injectable()
export class AffiliateCustomerTypeormQueryRepository
  extends BaseTypeormQueryRepository<AffiliateCustomerTypeormEntity>
  implements AffiliateCustomerQueryRepositoryGateway
{
  protected readonly _type = AffiliateCustomerTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AffiliateCustomerTypeormEntity)
    repository: Repository<AffiliateCustomerTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: { customer: true },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );
  }

  public async findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetAffiliateCustomerQueryResult | null> {
    const data = await this.findOne({
      where: {
        customer: { id: customerId.toString() },
      },
      relations: { customer: true },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );
  }

  public async listAll(): Promise<GetAffiliateCustomerQueryResult[]> {
    const data = await this.find({ relations: { customer: true } });

    return this.mapperGateway.mapArray(
      data,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );
  }

  public async listWithPagination(
    param: ListAffiliateCustomersQueryParam,
  ): Promise<ListDataOutputModel<GetAffiliateCustomerQueryResult>> {
    const result = await this.list(param, { relations: { customer: true } });

    const resource = this.mapperGateway.mapArray(
      result.resource,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );

    return new ListDataOutputModel({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      resource,
    });
  }
}
