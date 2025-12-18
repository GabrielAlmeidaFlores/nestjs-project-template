import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity';
import { PaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/value-object/payment-plan-enabled-paid-resource-id/payment-plan-enabled-paid-resource-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class PaymentPlanEnabledPaidResourceEntityAutoMapperProfile {
  protected readonly _type =
    PaymentPlanEnabledPaidResourceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PaymentPlanEnabledPaidResourceTypeormEntity,
    ): PaymentPlanEnabledPaidResourceEntity => {
      if (!source.paymentPlanPaidResource || !source.paymentPlan) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: PaymentPlanEnabledPaidResourceEntity.name,
          sourceClass: PaymentPlanEnabledPaidResourceTypeormEntity.name,
        });
      }

      return new PaymentPlanEnabledPaidResourceEntity({
        id: new PaymentPlanEnabledPaidResourceId(source.id),
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
      PaymentPlanEnabledPaidResourceTypeormEntity,
      PaymentPlanEnabledPaidResourceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PaymentPlanEnabledPaidResourceEntity,
    ): PaymentPlanEnabledPaidResourceTypeormEntity => {
      const paymentPlan = {
        id: source.paymentPlan.toString(),
      } as PaymentPlanTypeormEntity;

      const paymentPlanPaidResource = {
        id: source.paymentPlanPaidResource.toString(),
      } as PaymentPlanPaidResourceTypeormEntity;

      return PaymentPlanEnabledPaidResourceTypeormEntity.build({
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
      PaymentPlanEnabledPaidResourceEntity,
      PaymentPlanEnabledPaidResourceTypeormEntity,
      mappingFunction,
    );
  }
}
