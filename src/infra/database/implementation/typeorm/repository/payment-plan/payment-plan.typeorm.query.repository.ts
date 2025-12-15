import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { GetPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan/query/result/get-payment-plan.query.result';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PaymentPlanTypeormQueryRepository
  extends BaseTypeormQueryRepository<PaymentPlanTypeormEntity>
  implements PaymentPlanQueryRepositoryGateway
{
  protected readonly _type = PaymentPlanTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanTypeormEntity)
    repository: Repository<PaymentPlanTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listPaymentPlan(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPaymentPlanQueryResult>> {
    const data = await this.list(listData, {
      relations: [
        'paymentPlanEnablePaidResource',
        'paymentPlanEnablePaidResource.paymentPlanPaidResource',
      ],
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      PaymentPlanTypeormEntity,
      GetPaymentPlanQueryResult,
    );

    return new ListDataOutputModel<GetPaymentPlanQueryResult>({
      ...data,
      resource: mappedData,
    });
  }

  public async findOnePaymentPlanByIdOrFail(
    id: PaymentPlanId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPaymentPlanQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
        relations: [
          'paymentPlanEnablePaidResource',
          'paymentPlanEnablePaidResource.paymentPlanPaidResource',
        ],
      },
      err,
    );

    const resource = this.mapperGateway.map(
      data,
      PaymentPlanTypeormEntity,
      GetPaymentPlanQueryResult,
    );

    return resource;
  }
}
