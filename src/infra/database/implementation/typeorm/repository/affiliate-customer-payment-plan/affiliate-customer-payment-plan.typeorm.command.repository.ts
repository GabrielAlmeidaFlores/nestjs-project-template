import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AffiliateCustomerPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment-plan.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateCustomerPaymentPlanCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/command/affiliate-customer-payment-plan.command.repository.gateway';
import { AffiliateCustomerPaymentPlanEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/affiliate-customer-payment-plan.entity';
import { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';

@Injectable()
export class AffiliateCustomerPaymentPlanTypeormCommandRepository
  extends BaseTypeormCommandRepository<AffiliateCustomerPaymentPlanTypeormEntity>
  implements AffiliateCustomerPaymentPlanCommandRepositoryGateway
{
  protected readonly _type =
    AffiliateCustomerPaymentPlanTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AffiliateCustomerPaymentPlanTypeormEntity)
    repository: Repository<AffiliateCustomerPaymentPlanTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAffiliateCustomerPaymentPlan(
    props: AffiliateCustomerPaymentPlanEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AffiliateCustomerPaymentPlanEntity,
      AffiliateCustomerPaymentPlanTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAffiliateCustomerPaymentPlan(
    id: AffiliateCustomerPaymentPlanId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
