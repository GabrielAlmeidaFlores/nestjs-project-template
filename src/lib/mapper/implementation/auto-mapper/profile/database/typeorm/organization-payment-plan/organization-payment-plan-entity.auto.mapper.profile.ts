import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value.object';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';

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
      const organization = this.mapper.map(
        source.organization,
        OrganizationTypeormEntity,
        OrganizationEntity,
      );

      const paymentPlan = this.mapper.map(
        source.paymentPlan,
        PaymentPlanTypeormEntity,
        PaymentPlanEntity,
      );

      return new OrganizationPaymentPlanEntity({
        ...source,
        id: new OrganizationPaymentPlanId(source.id),
        description: source.description,
        price: source.price,
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.mounthlyCreditAmount,
        active: source.active,
        cycle: source.cycle,
        organization,
        paymentPlan,
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
      const organization = this.mapper.map(
        source.organization,
        OrganizationEntity,
        OrganizationTypeormEntity,
      );

      const paymentPlan = this.mapper.map(
        source.paymentPlan,
        PaymentPlanEntity,
        PaymentPlanTypeormEntity,
      );

      return OrganizationPaymentPlanTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        name: source.name,
        description: source.description,
        price: source.price,
        maxMemberCount: source.maxMemberCount,
        mounthlyCreditAmount: source.mounthlyCreditAmount,
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
