import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PaymentPlanPaidResourceTypeormQueryRepository
  extends BaseTypeormQueryRepository<PaymentPlanPaidResourceTypeormEntity>
  implements PaymentPlanPaidResourceQueryRepositoryGateway
{
  protected readonly _type = PaymentPlanPaidResourceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PaymentPlanPaidResourceTypeormEntity)
    repository: Repository<PaymentPlanPaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOnePaymentPlanPaidResourceByResourceType(
    resource: PaymentPlanPaidResourceTypeEnum,
  ): Promise<GetPaymentPlanPaidResourceQueryResult> {
    const data = await this.findOne({
      where: {
        resource,
      },
    });

    const mappedData = this.mapperGateway.map(
      data,
      PaymentPlanPaidResourceTypeormEntity,
      GetPaymentPlanPaidResourceQueryResult,
    );

    return mappedData;
  }

  public async listPaymentPlanPaidResource(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetPaymentPlanPaidResourceQueryResult>> {
    const data = await this.list(listData);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      PaymentPlanPaidResourceTypeormEntity,
      GetPaymentPlanPaidResourceQueryResult,
    );

    return new ListDataOutputModel<GetPaymentPlanPaidResourceQueryResult>({
      ...data,
      resource: mappedData,
    });
  }

  public async findOnePaymentPlanPaidResourceByIdOrFail(
    id: PaymentPlanPaidResourceId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPaymentPlanPaidResourceQueryResult> {
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
      PaymentPlanPaidResourceTypeormEntity,
      GetPaymentPlanPaidResourceQueryResult,
    );

    return resource;
  }
}
