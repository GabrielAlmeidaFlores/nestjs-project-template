import { Constructor } from '@automapper/core';
import { NotFound } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PaymentPlanPaidResourceIaConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource-ia-config.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';
import { GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/result/get-payment-plan-paid-resource-ia-config-with-relations.query.results';
import { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value.object';

@Injectable()
export class PaymentPlanPaidResourceIaConfigTypeormQueryRepository
  extends BaseTypeormQueryRepository<PaymentPlanPaidResourceIaConfigTypeormEntity>
  implements PaymentPlanPaidResourceIaConfigQueryRepositoryGateway
{
  protected readonly _type =
    PaymentPlanPaidResourceIaConfigTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanPaidResourceIaConfigTypeormEntity)
    repository: Repository<PaymentPlanPaidResourceIaConfigTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOnePaymentPlanPaidResourceIaConfigByIdOrFail(
    id: PaymentPlanPaidResourceIaConfigId,
    err: Constructor<NotFound>,
  ): Promise<GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
      },
      err,
    );

    const resource = this.mapperGateway.map(
      data,
      PaymentPlanPaidResourceIaConfigTypeormEntity,
      GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult,
    );

    return resource;
  }
}
