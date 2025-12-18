import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { GetOrganizationPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

@Injectable()
export class OrganizationPaymentPlanQueryResultAutoMapperProfile {
  protected readonly _type =
    OrganizationPaymentPlanQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: OrganizationPaymentPlanTypeormEntity,
    ): GetOrganizationPaymentPlanQueryResult => {
      return GetOrganizationPaymentPlanQueryResult.build({
        id: new OrganizationPaymentPlanId(source.id),
        bankExternalId: source.bankExternalId,
        name: source.name,
        description: source.description,
        price: new DecimalValue(source.price),
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        cycle: source.cycle as PaymentPlanCycleEnum,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      OrganizationPaymentPlanTypeormEntity,
      GetOrganizationPaymentPlanQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetOrganizationPaymentPlanQueryResult,
    ): OrganizationPaymentPlanTypeormEntity => {
      return OrganizationPaymentPlanTypeormEntity.build({
        id: source.id.toString(),
        bankExternalId: source.bankExternalId,
        name: source.name,
        description: source.description,
        price: source.price.toString(),
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        cycle: source.cycle,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        organization: undefined,
        paymentPlan: undefined,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetOrganizationPaymentPlanQueryResult,
      OrganizationPaymentPlanTypeormEntity,
      mappingFunction,
    );
  }
}
