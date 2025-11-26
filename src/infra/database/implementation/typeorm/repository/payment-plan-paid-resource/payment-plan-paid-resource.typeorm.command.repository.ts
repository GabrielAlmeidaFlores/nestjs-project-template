import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/command/payment-plan-paid-resource.command.repository.gateway';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value.object';

@Injectable()
export class PaymentPlanPaidResourceTypeormCommandRepository
  extends BaseTypeormCommandRepository<PaymentPlanPaidResourceTypeormEntity>
  implements PaymentPlanPaidResourceCommandRepositoryGateway
{
  protected readonly _type =
    PaymentPlanPaidResourceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanPaidResourceTypeormEntity)
    repository: Repository<PaymentPlanPaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPaymentPlanPaidResource(
    props: PaymentPlanPaidResourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanPaidResourceEntity,
      PaymentPlanPaidResourceTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updatePaymentPlanPaidResource(
    id: PaymentPlanPaidResourceId,
    props: PaymentPlanPaidResourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanPaidResourceEntity,
      PaymentPlanPaidResourceTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
