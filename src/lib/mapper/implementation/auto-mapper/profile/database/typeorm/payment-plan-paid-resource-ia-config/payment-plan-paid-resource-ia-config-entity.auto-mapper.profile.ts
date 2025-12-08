import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanPaidResourceIaConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource-ia-config.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceIaConfigEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value.object';

@Injectable()
export class PaymentPlanPaidResourceIaConfigEntityAutoMapperProfile {
  protected readonly _type =
    PaymentPlanPaidResourceIaConfigEntityAutoMapperProfile.name;

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
    ): PaymentPlanPaidResourceIaConfigEntity => {
      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        PaymentPlanPaidResourceTypeormEntity,
        PaymentPlanPaidResourceEntity,
      );

      return new PaymentPlanPaidResourceIaConfigEntity({
        ...source,
        paymentPlanPaidResource,
        id: new PaymentPlanPaidResourceIaConfigId(source.id),
      });
    };
    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PaymentPlanPaidResourceIaConfigTypeormEntity,
      PaymentPlanPaidResourceIaConfigEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PaymentPlanPaidResourceIaConfigEntity,
    ): PaymentPlanPaidResourceIaConfigTypeormEntity => {
      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        PaymentPlanPaidResourceEntity,
        PaymentPlanPaidResourceTypeormEntity,
      );

      return PaymentPlanPaidResourceIaConfigTypeormEntity.build({
        ...source,
        paymentPlanPaidResource,
        id: source.id.toString(),
      });
    };
    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);
    createMap(
      this.mapper,
      PaymentPlanPaidResourceIaConfigEntity,
      PaymentPlanPaidResourceIaConfigTypeormEntity,
      mappingFunction,
    );
  }
}
