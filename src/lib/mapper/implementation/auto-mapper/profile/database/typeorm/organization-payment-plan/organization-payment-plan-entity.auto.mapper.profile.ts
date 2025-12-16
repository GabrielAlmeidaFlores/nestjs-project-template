import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetOrganizationPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan.query.result';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

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
    this.mapOrmEntityToQueryResult();
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

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: OrganizationPaymentPlanTypeormEntity,
    ): GetOrganizationPaymentPlanQueryResult => {
      const result = new GetOrganizationPaymentPlanQueryResult();
      result.id = new OrganizationPaymentPlanId(source.id);
      result.bankExternalId = source.bankExternalId;
      result.name = source.name;
      result.description = source.description;
      result.price = new DecimalValue(source.price);
      result.maxMemberCount = source.maxMemberCount;
      result.monthlyCreditAmount = source.monthlyCreditAmount;
      result.cycle = source.cycle as PaymentPlanCycleEnum;
      result.createdAt = source.createdAt;
      result.updatedAt = source.updatedAt;
      return result;
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      OrganizationPaymentPlanTypeormEntity,
      GetOrganizationPaymentPlanQueryResult,
      mappingFunction,
    );
  }
}
