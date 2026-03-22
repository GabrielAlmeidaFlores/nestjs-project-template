import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';
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
    ): OrganizationPaymentPlanAffiliateCommissionEntity =>
      new OrganizationPaymentPlanAffiliateCommissionEntity({
        ...source,
        id: new OrganizationPaymentPlanAffiliateCommissionId(source.id),
        organizationPaymentPlan: new OrganizationPaymentPlanId(
          source.organizationPaymentPlanId,
        ),
        affiliateCustomer: new AffiliateCustomerId(source.affiliateCustomerId),
        commissionPercentage: parseFloat(source.commissionPercentage),
      });

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
        organizationPaymentPlanId: source.organizationPaymentPlan.toString(),
        affiliateCustomerId: source.affiliateCustomer.toString(),
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
