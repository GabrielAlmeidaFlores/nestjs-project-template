import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enable-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';

@Injectable()
export class PaymentPlanEnablePaidResourceEntityAutoMapperProfile {
  protected readonly _type =
    PaymentPlanEnablePaidResourceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PaymentPlanEnablePaidResourceTypeormEntity,
    ): PaymentPlanEnablePaidResourceEntity => {
      const paymentPlan = this.mapper.map(
        source.paymentPlan,
        PaymentPlanTypeormEntity,
        PaymentPlanEntity,
      );

      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        PaymentPlanPaidResourceTypeormEntity,
        PaymentPlanPaidResourceEntity,
      );

      return new PaymentPlanEnablePaidResourceEntity({
        paymentPlan,
        paymentPlanPaidResource,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PaymentPlanEnablePaidResourceTypeormEntity,
      PaymentPlanEnablePaidResourceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PaymentPlanEnablePaidResourceEntity,
    ): PaymentPlanEnablePaidResourceTypeormEntity => {
      const paymentPlan = this.mapper.map(
        source.paymentPlan,
        PaymentPlanEntity,
        PaymentPlanTypeormEntity,
      );

      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        PaymentPlanPaidResourceEntity,
        PaymentPlanPaidResourceTypeormEntity,
      );

      return PaymentPlanEnablePaidResourceTypeormEntity.build({
        id: source.id.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        paymentPlan,
        paymentPlanPaidResource,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PaymentPlanEnablePaidResourceEntity,
      PaymentPlanEnablePaidResourceTypeormEntity,
      mappingFunction,
    );
  }
}
