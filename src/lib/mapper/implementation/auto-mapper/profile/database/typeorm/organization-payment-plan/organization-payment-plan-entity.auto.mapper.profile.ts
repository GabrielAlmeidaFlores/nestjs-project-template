import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class OrganizationPaymentPlanEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationPaymentPlanEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToMapOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationPaymentPlanTypeormEntity,
    ): OrganizationPaymentPlanEntity => {
      if (source.organization?.id === undefined) {
        throw new Error('Organization is required');
      }

      if (source.paymentPlan?.id === undefined) {
        throw new Error('PaymentPlan is required');
      }

      return new OrganizationPaymentPlanEntity({
        ...source,
        price: new DecimalValue(source.price),
        id: new OrganizationPaymentPlanId(source.id),
        organization: new OrganizationId(source.organization.id),
        paymentPlan: new PaymentPlanId(source.paymentPlan.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationPaymentPlanTypeormEntity,
      OrganizationPaymentPlanEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToMapOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationPaymentPlanEntity,
    ): OrganizationPaymentPlanTypeormEntity => {
      const organization = {
        id: source.organization.toString(),
      } as OrganizationTypeormEntity;

      const paymentPlan = {
        id: source.paymentPlan.toString(),
      } as PaymentPlanTypeormEntity;

      return OrganizationPaymentPlanTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        name: source.name,
        description: source.description,
        price: source.price.toString(),
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        active: source.active,
        cycle: source.cycle,
        organization,
        paymentPlan,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationPaymentPlanEntity,
      OrganizationPaymentPlanTypeormEntity,
      mappingFunction,
    );
  }
}
