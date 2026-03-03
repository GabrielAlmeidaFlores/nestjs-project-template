import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class GetPaymentPlanPaidResourceQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPaymentPlanPaidResourceQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMap();
  }

  private createMap(): void {
    const convertOrmEntityToQueryResult = (
      source: PaymentPlanPaidResourceTypeormEntity,
    ): GetPaymentPlanPaidResourceQueryResult => {
      return GetPaymentPlanPaidResourceQueryResult.build({
        id: new PaymentPlanPaidResourceId(source.id),
        resource: source.resource,
        creditCost: source.creditCost,
        title: source.title,
        description: source.description,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PaymentPlanPaidResourceTypeormEntity,
      GetPaymentPlanPaidResourceQueryResult,
      mappingFunction,
    );
  }
}
