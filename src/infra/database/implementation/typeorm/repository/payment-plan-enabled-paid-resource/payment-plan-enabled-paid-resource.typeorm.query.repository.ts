import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { GetPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/result/get-payment-plan-enabled-paid-resource.query.result';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class PaymentPlanEnabledPaidResourceTypeormQueryRepository
  extends BaseTypeormQueryRepository<PaymentPlanEnabledPaidResourceTypeormEntity>
  implements PaymentPlanEnabledPaidResourceQueryRepositoryGateway
{
  protected readonly _type =
    PaymentPlanEnabledPaidResourceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanEnabledPaidResourceTypeormEntity)
    repository: Repository<PaymentPlanEnabledPaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyByPaymentPlanId(
    paymentPlanId: PaymentPlanId,
  ): Promise<GetPaymentPlanEnabledPaidResourceQueryResult[]> {
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
      PaymentPlanEnabledPaidResourceTypeormEntity,
      GetPaymentPlanEnabledPaidResourceQueryResult,
    );

    return mappedData;
  }
}
