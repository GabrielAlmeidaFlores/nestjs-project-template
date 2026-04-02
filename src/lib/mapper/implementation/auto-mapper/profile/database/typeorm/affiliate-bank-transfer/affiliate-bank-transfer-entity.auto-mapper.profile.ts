import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AffiliateBankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-bank-transfer.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AffiliateBankTransferEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/affiliate-bank-transfer.entity';
import { AffiliateBankTransferId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/value-object/affiliate-bank-transfer-id/affiliate-bank-transfer-id.value-object';
import { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

@Injectable()
export class AffiliateBankTransferEntityAutoMapperProfile {
  protected readonly _type = AffiliateBankTransferEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AffiliateBankTransferTypeormEntity,
    ): AffiliateBankTransferEntity => {
      if (
        !source.affiliatePlanCommission ||
        !source.bankPayment ||
        !source.bankTransfer
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AffiliateBankTransferEntity.name,
          sourceClass: AffiliateBankTransferTypeormEntity.name,
        });
      }

      return new AffiliateBankTransferEntity({
        ...source,
        id: new AffiliateBankTransferId(source.id),
        affiliatePlanCommission:
          new OrganizationPaymentPlanAffiliateCommissionId(
            source.affiliatePlanCommission.id,
          ),
        bankPayment: new BankPaymentId(source.bankPayment.id),
        bankTransfer: new BankTransferId(source.bankTransfer.id),
      });
    };

    createMap(
      this.mapper,
      AffiliateBankTransferTypeormEntity,
      AffiliateBankTransferEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AffiliateBankTransferEntity,
    ): AffiliateBankTransferTypeormEntity => {
      return AffiliateBankTransferTypeormEntity.build({
        id: source.id.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AffiliateBankTransferEntity,
      AffiliateBankTransferTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
