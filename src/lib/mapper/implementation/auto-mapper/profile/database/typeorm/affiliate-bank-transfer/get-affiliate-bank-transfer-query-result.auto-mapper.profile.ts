import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateBankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-bank-transfer.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetAffiliateBankTransferQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/result/get-affiliate-bank-transfer.query.result';
import { AffiliateBankTransferId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/value-object/affiliate-bank-transfer-id/affiliate-bank-transfer-id.value-object';
import { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

@Injectable()
export class GetAffiliateBankTransferQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAffiliateBankTransferQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AffiliateBankTransferTypeormEntity,
    ): GetAffiliateBankTransferQueryResult => {
      if (
        !source.affiliatePlanCommission ||
        !source.bankPayment ||
        !source.bankTransfer
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetAffiliateBankTransferQueryResult.name,
          sourceClass: AffiliateBankTransferTypeormEntity.name,
        });
      }

      return GetAffiliateBankTransferQueryResult.build({
        ...source,
        id: new AffiliateBankTransferId(source.id),
        affiliatePlanCommissionId:
          new OrganizationPaymentPlanAffiliateCommissionId(
            source.affiliatePlanCommission.id,
          ),
        bankPaymentId: new BankPaymentId(source.bankPayment.id),
        bankTransferId: new BankTransferId(source.bankTransfer.id),
      });
    };

    createMap(
      this.mapper,
      AffiliateBankTransferTypeormEntity,
      GetAffiliateBankTransferQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAffiliateBankTransferQueryResult,
    ): AffiliateBankTransferTypeormEntity => {
      return AffiliateBankTransferTypeormEntity.build({
        id: source.id.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetAffiliateBankTransferQueryResult,
      AffiliateBankTransferTypeormEntity,
      constructUsing(convertQueryResultToOrmEntity),
    );
  }
}
