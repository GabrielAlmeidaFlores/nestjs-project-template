import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationPaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity';
import { OrganizationPaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/value-object/organization-payment-plan-enabled-paid-resource-id/organization-payment-plan-enabled-paid-resource-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class OrganizationPaymentPlanEnabledPaidResourceEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationPaymentPlanEnabledPaidResourceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
    ): OrganizationPaymentPlanEnabledPaidResourceEntity => {
      if (!source.paymentPlanPaidResource || !source.paymentPlan) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            OrganizationPaymentPlanEnabledPaidResourceEntity.name,
          sourceClass:
            OrganizationPaymentPlanEnabledPaidResourceTypeormEntity.name,
        });
      }

      return new OrganizationPaymentPlanEnabledPaidResourceEntity({
        id: new OrganizationPaymentPlanEnabledPaidResourceId(source.id),
        paymentPlan: new PaymentPlanId(source.paymentPlan.id),
        paymentPlanPaidResource: new PaymentPlanPaidResourceId(
          source.paymentPlanPaidResource.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
      OrganizationPaymentPlanEnabledPaidResourceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationPaymentPlanEnabledPaidResourceEntity,
    ): OrganizationPaymentPlanEnabledPaidResourceTypeormEntity => {
      const paymentPlan = {
        id: source.paymentPlan.toString(),
      } as PaymentPlanTypeormEntity;

      const paymentPlanPaidResource = {
        id: source.paymentPlanPaidResource.toString(),
      } as PaymentPlanPaidResourceTypeormEntity;

      return OrganizationPaymentPlanEnabledPaidResourceTypeormEntity.build({
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
      OrganizationPaymentPlanEnabledPaidResourceEntity,
      OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
      mappingFunction,
    );
  }
}
