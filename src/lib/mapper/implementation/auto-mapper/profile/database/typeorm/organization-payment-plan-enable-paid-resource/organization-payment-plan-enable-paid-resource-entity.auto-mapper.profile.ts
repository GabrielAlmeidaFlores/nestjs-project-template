import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationPaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enable-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { OrganizationPaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource.entity';
import { OrganizationPaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/value-object/organization-payment-plan-enable-paid-resource-id/organization-payment-plan-enable-paid-resource-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class OrganizationPaymentPlanEnablePaidResourceEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationPaymentPlanEnablePaidResourceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationPaymentPlanEnablePaidResourceTypeormEntity,
    ): OrganizationPaymentPlanEnablePaidResourceEntity => {
      return new OrganizationPaymentPlanEnablePaidResourceEntity({
        id: new OrganizationPaymentPlanEnablePaidResourceId(source.id),
        paymentPlan: new PaymentPlanId(source.paymentPlan?.id ?? ''),
        paymentPlanPaidResource: new PaymentPlanPaidResourceId(
          source.paymentPlanPaidResource?.id ?? '',
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationPaymentPlanEnablePaidResourceTypeormEntity,
      OrganizationPaymentPlanEnablePaidResourceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationPaymentPlanEnablePaidResourceEntity,
    ): OrganizationPaymentPlanEnablePaidResourceTypeormEntity => {
      const paymentPlan = {
        id: source.paymentPlan.toString(),
      } as PaymentPlanTypeormEntity;

      const paymentPlanPaidResource = {
        id: source.paymentPlanPaidResource.toString(),
      } as PaymentPlanPaidResourceTypeormEntity;

      return OrganizationPaymentPlanEnablePaidResourceTypeormEntity.build({
        id: source.id.toString(),
        paymentPlan,
        paymentPlanPaidResource,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationPaymentPlanEnablePaidResourceEntity,
      OrganizationPaymentPlanEnablePaidResourceTypeormEntity,
      mappingFunction,
    );
  }
}
