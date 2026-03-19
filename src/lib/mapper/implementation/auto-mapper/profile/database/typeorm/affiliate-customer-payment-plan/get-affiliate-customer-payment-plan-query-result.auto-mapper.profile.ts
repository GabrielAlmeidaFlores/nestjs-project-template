import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateCustomerPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment-plan.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetAffiliateCustomerPaymentPlanQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/result/get-affiliate-customer-payment-plan.query.result';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class GetAffiliateCustomerPaymentPlanQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAffiliateCustomerPaymentPlanQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AffiliateCustomerPaymentPlanTypeormEntity,
    ): GetAffiliateCustomerPaymentPlanQueryResult => {
      if (!source.affiliateCustomer || !source.paymentPlan) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetAffiliateCustomerPaymentPlanQueryResult.name,
          sourceClass: AffiliateCustomerPaymentPlanTypeormEntity.name,
        });
      }

      return GetAffiliateCustomerPaymentPlanQueryResult.build({
        ...source,
        id: new AffiliateCustomerPaymentPlanId(source.id),
        affiliateCustomerId: new AffiliateCustomerId(
          source.affiliateCustomer.id,
        ),
        paymentPlanId: new PaymentPlanId(source.paymentPlan.id),
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerPaymentPlanTypeormEntity,
      GetAffiliateCustomerPaymentPlanQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAffiliateCustomerPaymentPlanQueryResult,
    ): AffiliateCustomerPaymentPlanTypeormEntity => {
      return AffiliateCustomerPaymentPlanTypeormEntity.build({
        id: source.id.toString(),
        affiliateCustomer: null,
        paymentPlan: null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      GetAffiliateCustomerPaymentPlanQueryResult,
      AffiliateCustomerPaymentPlanTypeormEntity,
      constructUsing(convertQueryResultToOrmEntity),
    );
  }
}
