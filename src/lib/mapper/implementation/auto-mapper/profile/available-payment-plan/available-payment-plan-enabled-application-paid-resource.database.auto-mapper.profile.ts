import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.entity';
import { AvailablePaymentPlanEnabledApplicationPaidResourceEntity } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan-enabled-application-paid-resource/available-payment-plan-enabled-application-paid-resource.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-paid-resource.typeorm.entity';
import { AvailablePaymentPlanEnabledApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan-enabled-application-paid-resource.typeorm.entity';
import { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class AvailablePaymentPlanEnabledApplicationPaidResourceDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type =
    AvailablePaymentPlanEnabledApplicationPaidResourceDatabaseAutoMapperProfile.name;

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
      source: AvailablePaymentPlanEnabledApplicationPaidResourceTypeormEntity,
    ): AvailablePaymentPlanEnabledApplicationPaidResourceEntity => {
      return new AvailablePaymentPlanEnabledApplicationPaidResourceEntity({
        ...source,
        id: new Guid(source.id),
        applicationPaidResource:
          new RelationModel<ApplicationPaidResourceEntity>({
            id: new Guid(source.id),
          }),
        availablePaymentPlan: this.mapper.map(
          source.availablePaymentPlan,
          AvailablePaymentPlanTypeormEntity,
          AvailablePaymentPlanEntity,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AvailablePaymentPlanEnabledApplicationPaidResourceTypeormEntity,
      AvailablePaymentPlanEnabledApplicationPaidResourceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AvailablePaymentPlanEnabledApplicationPaidResourceEntity,
    ): AvailablePaymentPlanEnabledApplicationPaidResourceTypeormEntity => {
      return AvailablePaymentPlanEnabledApplicationPaidResourceTypeormEntity.build(
        {
          ...source,
          id: source.id.toString(),
          applicationPaidResource: {
            id: source.applicationPaidResource.id.toString(),
          } as ApplicationPaidResourceTypeormEntity,
          availablePaymentPlan: this.mapper.map(
            source.availablePaymentPlan,
            AvailablePaymentPlanEntity,
            AvailablePaymentPlanTypeormEntity,
          ),
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AvailablePaymentPlanEnabledApplicationPaidResourceEntity,
      AvailablePaymentPlanEnabledApplicationPaidResourceTypeormEntity,
      mappingFunction,
    );
  }
}
