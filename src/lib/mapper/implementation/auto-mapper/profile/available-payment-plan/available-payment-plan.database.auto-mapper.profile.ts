import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class AvailablePaymentPlanDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = AvailablePaymentPlanDatabaseAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    super();
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AvailablePaymentPlanTypeormEntity,
    ): AvailablePaymentPlanEntity => {
      return new AvailablePaymentPlanEntity({
        ...source,
        id: new Guid(source.id),
        price: new DecimalValue(source.price),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AvailablePaymentPlanTypeormEntity,
      AvailablePaymentPlanEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AvailablePaymentPlanEntity,
    ): AvailablePaymentPlanTypeormEntity => {
      return AvailablePaymentPlanTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        price: source.price.toString(),
        availablePaymentPlanEnabledApplicationPaidResource: undefined,
        affiliateCustomer: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AvailablePaymentPlanEntity,
      AvailablePaymentPlanTypeormEntity,
      mappingFunction,
    );
  }
}
