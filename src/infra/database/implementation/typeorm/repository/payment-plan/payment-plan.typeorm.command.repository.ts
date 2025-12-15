import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class PaymentPlanTypeormCommandRepository
  extends BaseTypeormCommandRepository<PaymentPlanTypeormEntity>
  implements PaymentPlanCommandRepositoryGateway
{
  protected readonly _type = PaymentPlanTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanTypeormEntity)
    repository: Repository<PaymentPlanTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPaymentPlan(props: PaymentPlanEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanEntity,
      PaymentPlanTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updatePaymentPlan(
    id: PaymentPlanId,
    props: PaymentPlanEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanEntity,
      PaymentPlanTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deletePaymentPlan(id: PaymentPlanId): TransactionType {
    return this.delete(id.toString());
  }
}
