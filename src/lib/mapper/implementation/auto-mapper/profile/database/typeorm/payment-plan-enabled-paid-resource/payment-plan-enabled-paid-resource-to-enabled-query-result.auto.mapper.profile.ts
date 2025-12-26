import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/result/get-payment-plan-enabled-paid-resource.query.result';
import { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/value-object/payment-plan-enabled-paid-resource-id/payment-plan-enabled-paid-resource-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class PaymentPlanEnabledPaidResourceToEnabledQueryResultAutoMapperProfile {
  protected readonly _type =
    PaymentPlanEnabledPaidResourceToEnabledQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PaymentPlanEnabledPaidResourceTypeormEntity,
    ): GetPaymentPlanEnabledPaidResourceQueryResult => {
      if (!source.paymentPlanPaidResource || !source.paymentPlan) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetPaymentPlanEnabledPaidResourceQueryResult.name,
          sourceClass: PaymentPlanEnabledPaidResourceTypeormEntity.name,
        });
      }

      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        PaymentPlanPaidResourceTypeormEntity,
        GetPaymentPlanPaidResourceQueryResult,
      );

      return GetPaymentPlanEnabledPaidResourceQueryResult.build({
        id: new PaymentPlanEnabledPaidResourceId(source.id),
        paymentPlanId: new PaymentPlanId(source.paymentPlan.id),
        paymentPlanPaidResourceId: new PaymentPlanPaidResourceId(
          source.paymentPlanPaidResource.id,
        ),
        paymentPlanPaidResource,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PaymentPlanEnabledPaidResourceTypeormEntity,
      GetPaymentPlanEnabledPaidResourceQueryResult,
      mappingFunction,
    );
  }
}
