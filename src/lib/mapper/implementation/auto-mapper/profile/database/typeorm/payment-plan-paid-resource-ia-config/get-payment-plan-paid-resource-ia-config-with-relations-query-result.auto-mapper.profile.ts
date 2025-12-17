import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanPaidResourceIaConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource-ia-config.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.results';
import { GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/result/get-payment-plan-paid-resource-ia-config-with-relations.query.results';
import { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value-object';

@Injectable()
export class GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PaymentPlanPaidResourceIaConfigTypeormEntity,
    ): GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult => {
      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        PaymentPlanPaidResourceTypeormEntity,
        GetPaymentPlanPaidResourceQueryResult,
      );

      return GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult.build({
        ...source,
        paymentPlanPaidResource,
        id: new PaymentPlanPaidResourceIaConfigId(source.id),
      });
    };
    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PaymentPlanPaidResourceIaConfigTypeormEntity,
      GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult,
    ): PaymentPlanPaidResourceIaConfigTypeormEntity => {
      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        GetPaymentPlanPaidResourceQueryResult,
        PaymentPlanPaidResourceTypeormEntity,
      );

      return PaymentPlanPaidResourceIaConfigTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        paymentPlanPaidResource,
      });
    };
    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);
    createMap(
      this.mapper,
      GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult,
      PaymentPlanPaidResourceIaConfigTypeormEntity,
      mappingFunction,
    );
  }
}
