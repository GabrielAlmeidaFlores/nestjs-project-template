import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import { GetOrganizationPaymentPlanWithRelationsQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan-with-relations.query.result';
import { GetPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan/query/result/get-payment-plan.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

@Injectable()
export class OrganizationPaymentPlanQueryResultWithRelationsAutoMapperProfile {
  protected readonly _type =
    OrganizationPaymentPlanQueryResultWithRelationsAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResultWithRelations();
    this.mapQueryResultWithRelationsToOrmEntity();
  }

  private mapOrmEntityToQueryResultWithRelations(): void {
    const convertOrmEntityToQueryResultWithRelations = (
      source: OrganizationPaymentPlanTypeormEntity,
    ): GetOrganizationPaymentPlanWithRelationsQueryResult => {
      if (!source.organization || !source.paymentPlan) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetOrganizationPaymentPlanWithRelationsQueryResult.name,
          sourceClass: OrganizationPaymentPlanTypeormEntity.name,
        });
      }

      const organization = this.mapper.map(
        source.organization,
        OrganizationTypeormEntity,
        GetOrganizationQueryResult,
      );

      const paymentPlan = this.mapper.map(
        source.paymentPlan,
        PaymentPlanTypeormEntity,
        GetPaymentPlanQueryResult,
      );

      return GetOrganizationPaymentPlanWithRelationsQueryResult.build({
        id: new OrganizationPaymentPlanId(source.id),
        bankExternalId: source.bankExternalId,
        name: source.name,
        description: source.description,
        price: new DecimalValue(source.price),
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        cycle: source.cycle,
        totalInstallments: source.totalInstallments,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        organization,
        paymentPlan,
        canceled: source.canceled,
      });
    };

    const mappingFunction = constructUsing(
      convertOrmEntityToQueryResultWithRelations,
    );

    createMap(
      this.mapper,
      OrganizationPaymentPlanTypeormEntity,
      GetOrganizationPaymentPlanWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultWithRelationsToOrmEntity(): void {
    const convertQueryResultWithRelationsToOrmEntity = (
      source: GetOrganizationPaymentPlanWithRelationsQueryResult,
    ): OrganizationPaymentPlanTypeormEntity => {
      const organization = this.mapper.map(
        source.organization,
        GetOrganizationQueryResult,
        OrganizationTypeormEntity,
      );

      const paymentPlan = this.mapper.map(
        source.paymentPlan,
        GetPaymentPlanQueryResult,
        PaymentPlanTypeormEntity,
      );

      return OrganizationPaymentPlanTypeormEntity.build({
        id: source.id.toString(),
        bankExternalId: source.bankExternalId,
        name: source.name,
        description: source.description,
        price: source.price.toString(),
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        cycle: source.cycle,
        totalInstallments: source.totalInstallments,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
        organization,
        paymentPlan,
        canceled: source.canceled,
      });
    };

    const mappingFunction = constructUsing(
      convertQueryResultWithRelationsToOrmEntity,
    );

    createMap(
      this.mapper,
      GetOrganizationPaymentPlanWithRelationsQueryResult,
      OrganizationPaymentPlanTypeormEntity,
      mappingFunction,
    );
  }
}
