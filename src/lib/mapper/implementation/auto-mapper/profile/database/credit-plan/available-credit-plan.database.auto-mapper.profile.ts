import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AvailableCreditPlanEntity } from '@core/domain/schema/entity/credit-plan/available-credit-plan/available-credit-plan.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AvailableCreditPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-credit-plan.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class AvailableCreditPlanDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = AvailableCreditPlanDatabaseAutoMapperProfile.name;

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
      source: AvailableCreditPlanTypeormEntity,
    ): AvailableCreditPlanEntity => {
      return new AvailableCreditPlanEntity({
        ...source,
        id: new Guid(source.id),
        price: new DecimalValue(source.price),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AvailableCreditPlanTypeormEntity,
      AvailableCreditPlanEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AvailableCreditPlanEntity,
    ): AvailableCreditPlanTypeormEntity => {
      return AvailableCreditPlanTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        price: source.price.toString(),
        organizationCreditPlan: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AvailableCreditPlanEntity,
      AvailableCreditPlanTypeormEntity,
      mappingFunction,
    );
  }
}
