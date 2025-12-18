import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/command/payment-plan-enabled-paid-resource.command.repository.gateway';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity';

export class PaymentPlanEnabledPaidResourceTypeormCommandRepository
  extends BaseTypeormCommandRepository<PaymentPlanEnabledPaidResourceTypeormEntity>
  implements PaymentPlanEnabledPaidResourceCommandRepositoryGateway
{
  protected readonly _type =
    PaymentPlanEnabledPaidResourceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanEnabledPaidResourceTypeormEntity)
    private readonly ormRepository: Repository<PaymentPlanEnabledPaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(ormRepository);
  }

  public createPaymentPlanEnabledPaidResource(
    props: PaymentPlanEnabledPaidResourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanEnabledPaidResourceEntity,
      PaymentPlanEnabledPaidResourceTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPaymentPlanId(
    paymentPlanId: PaymentPlanId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo =
        manager.getRepository<PaymentPlanEnabledPaidResourceTypeormEntity>(
          this.ormRepository.target,
        );

      await repo.delete({
        paymentPlan: { id: paymentPlanId.toString() },
      });
    };
  }
}
