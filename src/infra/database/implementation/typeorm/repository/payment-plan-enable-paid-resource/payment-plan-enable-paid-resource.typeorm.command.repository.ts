import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enable-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanEnablePaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/command/payment-plan-enable-paid-resource.command.repository.gateway';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity';

export class PaymentPlanEnablePaidResourceTypeormCommandRepository
  extends BaseTypeormCommandRepository<PaymentPlanEnablePaidResourceTypeormEntity>
  implements PaymentPlanEnablePaidResourceCommandRepositoryGateway
{
  protected readonly _type =
    PaymentPlanEnablePaidResourceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanEnablePaidResourceTypeormEntity)
    private readonly ormRepository: Repository<PaymentPlanEnablePaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(ormRepository);
  }

  public createPaymentPlanEnablePaidResource(
    props: PaymentPlanEnablePaidResourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PaymentPlanEnablePaidResourceEntity,
      PaymentPlanEnablePaidResourceTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPaymentPlanId(
    paymentPlanId: PaymentPlanId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo =
        manager.getRepository<PaymentPlanEnablePaidResourceTypeormEntity>(
          this.ormRepository.target,
        );

      await repo.delete({
        paymentPlan: { id: paymentPlanId.toString() },
      });
    };
  }
}
