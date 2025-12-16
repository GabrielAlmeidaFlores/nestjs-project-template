import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enable-paid-resource.typeorm.entity';
import { GetPaymentPlanEnablePaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/query/result/get-payment-plan-enable-paid-resource.query.result';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/value-object/payment-plan-enable-paid-resource-id/payment-plan-enable-paid-resource-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class GetPaymentPlanEnablePaidResourceQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPaymentPlanEnablePaidResourceQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PaymentPlanEnablePaidResourceTypeormEntity,
    ): GetPaymentPlanEnablePaidResourceQueryResult => {
      return GetPaymentPlanEnablePaidResourceQueryResult.build({
        id: new PaymentPlanEnablePaidResourceId(source.id),
        paymentPlanId: new PaymentPlanId(source.paymentPlan?.id ?? ''),
        paymentPlanPaidResourceId: new PaymentPlanPaidResourceId(
          source.paymentPlanPaidResource?.id ?? '',
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PaymentPlanEnablePaidResourceTypeormEntity,
      GetPaymentPlanEnablePaidResourceQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetPaymentPlanEnablePaidResourceQueryResult,
    ): PaymentPlanEnablePaidResourceTypeormEntity => {
      return PaymentPlanEnablePaidResourceTypeormEntity.build({
        id: source.id.toString(),
        paymentPlan: null,
        paymentPlanPaidResource: null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetPaymentPlanEnablePaidResourceQueryResult,
      PaymentPlanEnablePaidResourceTypeormEntity,
      mappingFunction,
    );
  }
}
