import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationCreditPurchaseEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/organization-credit-purchase.entity';
import { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class OrganizationCreditPurchaseEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationCreditPurchaseEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationCreditPurchaseTypeormEntity,
    ): OrganizationCreditPurchaseEntity => {
      return new OrganizationCreditPurchaseEntity({
        id: new OrganizationCreditPurchaseId(source.id),
        organization: new OrganizationId(source.organization?.id),
        bankPayment: new BankPaymentId(source.bankPayment?.id),
        creditAmount: source.creditAmount,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationCreditPurchaseTypeormEntity,
      OrganizationCreditPurchaseEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationCreditPurchaseEntity,
    ): OrganizationCreditPurchaseTypeormEntity => {
      const organization = {
        id: source.organization.toString(),
      } as OrganizationTypeormEntity;

      const bankPayment = {
        id: source.bankPayment.toString(),
      } as BankPaymentTypeormEntity;

      return OrganizationCreditPurchaseTypeormEntity.build({
        id: source.id.toString(),
        creditAmount: source.creditAmount,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
        organization,
        bankPayment,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationCreditPurchaseEntity,
      OrganizationCreditPurchaseTypeormEntity,
      mappingFunction,
    );
  }
}
