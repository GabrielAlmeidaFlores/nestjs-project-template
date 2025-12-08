import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PaymentPlanPaidResourceIaConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource-ia-config.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanPaidResourceIaConfigCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/command/payment-plan-paid-resource-ia-config.command.repository.gateway';
import { PaymentPlanPaidResourceIaConfigEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value.object';

@Injectable()
export class PaymentPlanPaidResourceIaConfigTypeormCommandRepository
  extends BaseTypeormCommandRepository<PaymentPlanPaidResourceIaConfigTypeormEntity>
  implements PaymentPlanPaidResourceIaConfigCommandRepositoryGateway
{
  protected readonly _type =
    PaymentPlanPaidResourceIaConfigTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanPaidResourceIaConfigTypeormEntity)
    repository: Repository<PaymentPlanPaidResourceIaConfigTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPaymentPlanPaidResourceIaConfig(
    props: PaymentPlanPaidResourceIaConfigEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanPaidResourceIaConfigEntity,
      PaymentPlanPaidResourceIaConfigTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updatePaymentPlanPaidResourceIaConfig(
    id: PaymentPlanPaidResourceIaConfigId,
    props: PaymentPlanPaidResourceIaConfigEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanPaidResourceIaConfigEntity,
      PaymentPlanPaidResourceIaConfigTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
