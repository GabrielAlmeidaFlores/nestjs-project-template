import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanAffiliateCommissionEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.entity';
import { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';

@Injectable()
export class OrganizationPaymentPlanAffiliateCommissionEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationPaymentPlanAffiliateCommissionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
    ): OrganizationPaymentPlanAffiliateCommissionEntity => {
      if (!source.organizationPaymentPlan || !source.affiliateCustomer) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            OrganizationPaymentPlanAffiliateCommissionEntity.name,
          sourceClass:
            OrganizationPaymentPlanAffiliateCommissionTypeormEntity.name,
        });
      }

      return new OrganizationPaymentPlanAffiliateCommissionEntity({
        ...source,
        id: new OrganizationPaymentPlanAffiliateCommissionId(source.id),
        organizationPaymentPlan: new OrganizationPaymentPlanId(
          source.organizationPaymentPlan.id,
        ),
        affiliateCustomer: new AffiliateCustomerId(source.affiliateCustomer.id),
        commissionPercentage: parseFloat(source.commissionPercentage),
      });
    };

    createMap(
      this.mapper,
      OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
      OrganizationPaymentPlanAffiliateCommissionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: OrganizationPaymentPlanAffiliateCommissionEntity,
    ): OrganizationPaymentPlanAffiliateCommissionTypeormEntity =>
      OrganizationPaymentPlanAffiliateCommissionTypeormEntity.build({
        id: source.id.toString(),
        organizationPaymentPlan: {
          id: source.organizationPaymentPlan.toString(),
        } as OrganizationPaymentPlanTypeormEntity,
        affiliateCustomer: {
          id: source.affiliateCustomer.toString(),
        } as AffiliateCustomerTypeormEntity,
        commissionPercentage: source.commissionPercentage.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });

    createMap(
      this.mapper,
      OrganizationPaymentPlanAffiliateCommissionEntity,
      OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
      constructUsing(convert),
    );
  }
}
