import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { GetOrganizationPaymentPlanBankPaymentQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/result/get-organization-payment-plan-bank-payment.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class GetOrganizationPaymentPlanBankPaymentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationPaymentPlanBankPaymentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: OrganizationPaymentPlanBankPaymentTypeormEntity,
    ): GetOrganizationPaymentPlanBankPaymentQueryResult => {
      return GetOrganizationPaymentPlanBankPaymentQueryResult.build({
        id: new OrganizationPaymentPlanBankPaymentId(source.id),
        organizationPaymentPlan: new OrganizationPaymentPlanId(
          source.organizationPaymentPlanId,
        ),
        bankPayment: new BankPaymentId(source.bankPaymentId),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetOrganizationPaymentPlanBankPaymentQueryResult,
    ): OrganizationPaymentPlanBankPaymentTypeormEntity => {
      return OrganizationPaymentPlanBankPaymentTypeormEntity.build({
        id: source.id.toString(),
        organizationPaymentPlanId: source.organizationPaymentPlan.toString(),
        bankPaymentId: source.bankPayment.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      mappingFunction,
    );
  }
}
