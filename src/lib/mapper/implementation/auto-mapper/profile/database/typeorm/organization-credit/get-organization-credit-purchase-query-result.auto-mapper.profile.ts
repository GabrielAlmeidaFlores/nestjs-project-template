import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetOrganizationCreditPurchaseQueryResult } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/result/get-organization-credit-purchase.query.result';
import { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class GetOrganizationCreditPurchaseQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationCreditPurchaseQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: OrganizationCreditPurchaseTypeormEntity,
    ): GetOrganizationCreditPurchaseQueryResult => {
      if (!source.organization) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetOrganizationCreditPurchaseQueryResult.name,
          sourceClass: OrganizationCreditPurchaseTypeormEntity.name,
        });
      }

      return GetOrganizationCreditPurchaseQueryResult.build({
        id: new OrganizationCreditPurchaseId(source.id),
        organization: new OrganizationId(source.organization.id),
        bankPayment: source.bankPayment
          ? new BankPaymentId(source.bankPayment.id)
          : null,
        creditAmount: source.creditAmount,
        validFrom: source.validFrom,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      OrganizationCreditPurchaseTypeormEntity,
      GetOrganizationCreditPurchaseQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetOrganizationCreditPurchaseQueryResult,
    ): OrganizationCreditPurchaseTypeormEntity => {
      const organization = {
        id: source.organization.toString(),
      } as OrganizationTypeormEntity;

      const bankPayment = source.bankPayment
        ? ({
            id: source.bankPayment.toString(),
          } as BankPaymentTypeormEntity)
        : undefined;

      return OrganizationCreditPurchaseTypeormEntity.build({
        id: source.id.toString(),
        creditAmount: source.creditAmount,
        validFrom: source.validFrom ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
        organization,
        bankPayment,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetOrganizationCreditPurchaseQueryResult,
      OrganizationCreditPurchaseTypeormEntity,
      mappingFunction,
    );
  }
}
