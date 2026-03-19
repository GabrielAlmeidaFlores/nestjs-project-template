import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AffiliateCustomerPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment-plan.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetAffiliateCustomerPaymentPlanQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/result/get-affiliate-customer-payment-plan.query.result';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

@Injectable()
export class AffiliateCustomerPaymentPlanTypeormQueryRepository
  extends BaseTypeormQueryRepository<AffiliateCustomerPaymentPlanTypeormEntity>
  implements AffiliateCustomerPaymentPlanQueryRepositoryGateway
{
  protected readonly _type =
    AffiliateCustomerPaymentPlanTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AffiliateCustomerPaymentPlanTypeormEntity)
    repository: Repository<AffiliateCustomerPaymentPlanTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyByAffiliateCustomerId(
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerPaymentPlanQueryResult[]> {
    const data = await this.find({
      where: {
        affiliateCustomer: { id: affiliateCustomerId.toString() },
      },
    });

    return this.mapperGateway.mapArray(
      data,
      AffiliateCustomerPaymentPlanTypeormEntity,
      GetAffiliateCustomerPaymentPlanQueryResult,
    );
  }
}
