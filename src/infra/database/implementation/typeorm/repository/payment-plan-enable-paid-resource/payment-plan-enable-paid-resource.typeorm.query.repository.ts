import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enable-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanEnablePaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/query/payment-plan-enable-paid-resource.query.repository.gateway';
import { GetPaymentPlanEnablePaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/query/result/get-payment-plan-enable-paid-resource.query.result';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class PaymentPlanEnablePaidResourceTypeormQueryRepository
  extends BaseTypeormQueryRepository<PaymentPlanEnablePaidResourceTypeormEntity>
  implements PaymentPlanEnablePaidResourceQueryRepositoryGateway
{
  protected readonly _type =
    PaymentPlanEnablePaidResourceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanEnablePaidResourceTypeormEntity)
    repository: Repository<PaymentPlanEnablePaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyByPaymentPlanId(
    paymentPlanId: PaymentPlanId,
  ): Promise<GetPaymentPlanEnablePaidResourceQueryResult[]> {
    const data = await this.repository.find({
      where: {
        paymentPlan: {
          id: paymentPlanId.toString(),
        },
      },
      relations: ['paymentPlan', 'paymentPlanPaidResource'],
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      PaymentPlanEnablePaidResourceTypeormEntity,
      GetPaymentPlanEnablePaidResourceQueryResult,
    );

    return mappedData;
  }
}
