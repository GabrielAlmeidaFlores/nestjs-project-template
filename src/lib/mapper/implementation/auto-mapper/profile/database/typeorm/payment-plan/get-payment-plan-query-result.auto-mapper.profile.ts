import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan/query/result/get-payment-plan.query.result';
import { GetPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/result/get-payment-plan-enabled-paid-resource.query.result';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

@Injectable()
export class GetPaymentPlanQueryResultAutoMapperProfile {
  protected readonly _type = GetPaymentPlanQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PaymentPlanTypeormEntity,
    ): GetPaymentPlanQueryResult => {
      if (!source.paymentPlanEnabledPaidResource) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetPaymentPlanQueryResult.name,
          sourceClass: PaymentPlanTypeormEntity.name,
        });
      }

      return GetPaymentPlanQueryResult.build({
        id: new PaymentPlanId(source.id),
        name: source.name,
        description: source.description,
        price: new DecimalValue(source.price),
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        active: source.active,
        cycle: source.cycle as PaymentPlanCycleEnum,
        enabledPaidResources: this.mapper.mapArray(
          source.paymentPlanEnabledPaidResource,
          PaymentPlanEnabledPaidResourceTypeormEntity,
          GetPaymentPlanEnabledPaidResourceQueryResult,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PaymentPlanTypeormEntity,
      GetPaymentPlanQueryResult,
      mappingFunction,
    );
  }
}
