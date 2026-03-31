import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { GetPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan/query/result/get-payment-plan.query.result';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
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

  public async listActivePaymentPlan(
    listData: ListDataInputModel,
    cycles?: PaymentPlanCycleEnum[],
  ): Promise<ListDataOutputModel<GetPaymentPlanQueryResult>> {
    const data = await this.list(listData, {
      where: {
        active: true,
        ...(cycles !== undefined && cycles.length > 0 && { cycle: In(cycles) }),
      },
      relations: [
        'paymentPlanEnabledPaidResource',
        'paymentPlanEnabledPaidResource.paymentPlan',
        'paymentPlanEnabledPaidResource.paymentPlanPaidResource',
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

  public async listPaymentPlan(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPaymentPlanQueryResult>> {
    const data = await this.list(listData, {
      relations: [
        'paymentPlanEnabledPaidResource',
        'paymentPlanEnabledPaidResource.paymentPlan',
        'paymentPlanEnabledPaidResource.paymentPlanPaidResource',
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

  public async findOnePaymentPlanById(
    id: PaymentPlanId,
  ): Promise<GetPaymentPlanQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: id.toString(),
      },
      relations: [
        'paymentPlanEnabledPaidResource',
        'paymentPlanEnabledPaidResource.paymentPlan',
        'paymentPlanEnabledPaidResource.paymentPlanPaidResource',
      ],
    });

    if (!data) {
      return null;
    }

    const resource = this.mapperGateway.map(
      data,
      PaymentPlanTypeormEntity,
      GetPaymentPlanQueryResult,
    );

    return resource;
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
          'paymentPlanEnabledPaidResource',
          'paymentPlanEnabledPaidResource.paymentPlan',
          'paymentPlanEnabledPaidResource.paymentPlanPaidResource',
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

  public async countActivePaymentPlans(): Promise<number> {
    return this.repository.count({
      where: {
        active: true,
      },
    });
  }
}
