import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { AffiliateCustomerPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment-plan.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AffiliateCustomerPaymentPlanEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/affiliate-customer-payment-plan.entity';
import { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class AffiliateCustomerPaymentPlanEntityAutoMapperProfile {
  protected readonly _type =
    AffiliateCustomerPaymentPlanEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AffiliateCustomerPaymentPlanTypeormEntity,
    ): AffiliateCustomerPaymentPlanEntity => {
      if (!source.affiliateCustomer || !source.paymentPlan) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AffiliateCustomerPaymentPlanEntity.name,
          sourceClass: AffiliateCustomerPaymentPlanTypeormEntity.name,
        });
      }

      return new AffiliateCustomerPaymentPlanEntity({
        ...source,
        id: new AffiliateCustomerPaymentPlanId(source.id),
        affiliateCustomer: new AffiliateCustomerId(source.affiliateCustomer.id),
        paymentPlan: new PaymentPlanId(source.paymentPlan.id),
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerPaymentPlanTypeormEntity,
      AffiliateCustomerPaymentPlanEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AffiliateCustomerPaymentPlanEntity,
    ): AffiliateCustomerPaymentPlanTypeormEntity => {
      const affiliateCustomer = {
        id: source.affiliateCustomer.toString(),
      } as AffiliateCustomerTypeormEntity;

      const paymentPlan = {
        id: source.paymentPlan.toString(),
      } as PaymentPlanTypeormEntity;

      return AffiliateCustomerPaymentPlanTypeormEntity.build({
        id: source.id.toString(),
        affiliateCustomer,
        paymentPlan,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      AffiliateCustomerPaymentPlanEntity,
      AffiliateCustomerPaymentPlanTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
