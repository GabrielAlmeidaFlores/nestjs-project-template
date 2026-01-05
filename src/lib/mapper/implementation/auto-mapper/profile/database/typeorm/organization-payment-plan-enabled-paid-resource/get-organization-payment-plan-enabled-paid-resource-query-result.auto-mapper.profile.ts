import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/query/result/get-organization-payment-plan-enabled-paid-resource.query.result';
import { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/value-object/organization-payment-plan-enabled-paid-resource-id/organization-payment-plan-enabled-paid-resource-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class GetOrganizationPaymentPlanEnabledPaidResourceQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationPaymentPlanEnabledPaidResourceQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
    ): GetOrganizationPaymentPlanEnabledPaidResourceQueryResult => {
      if (!source.organizationPaymentPlan || !source.paymentPlanPaidResource) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetOrganizationPaymentPlanEnabledPaidResourceQueryResult.name,
          sourceClass:
            OrganizationPaymentPlanEnabledPaidResourceTypeormEntity.name,
        });
      }

      const paymentPlanPaidResource = this.mapper.map(
        source.paymentPlanPaidResource,
        PaymentPlanPaidResourceTypeormEntity,
        GetPaymentPlanPaidResourceQueryResult,
      );

      return GetOrganizationPaymentPlanEnabledPaidResourceQueryResult.build({
        id: new OrganizationPaymentPlanEnabledPaidResourceId(source.id),
        organizationPaymentPlanId: new OrganizationPaymentPlanId(
          source.organizationPaymentPlan.id,
        ),
        paymentPlanPaidResourceId: new PaymentPlanPaidResourceId(
          source.paymentPlanPaidResource.id,
        ),
        paymentPlanPaidResource,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
      GetOrganizationPaymentPlanEnabledPaidResourceQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetOrganizationPaymentPlanEnabledPaidResourceQueryResult,
    ): OrganizationPaymentPlanEnabledPaidResourceTypeormEntity => {
      return OrganizationPaymentPlanEnabledPaidResourceTypeormEntity.build({
        id: source.id.toString(),
        organizationPaymentPlan: null,
        paymentPlanPaidResource: null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetOrganizationPaymentPlanEnabledPaidResourceQueryResult,
      OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
      mappingFunction,
    );
  }
}
