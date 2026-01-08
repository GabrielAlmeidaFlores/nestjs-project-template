import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanBankPaymentEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.entity';
import { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class OrganizationPaymentPlanBankPaymentEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationPaymentPlanBankPaymentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationPaymentPlanBankPaymentTypeormEntity,
    ): OrganizationPaymentPlanBankPaymentEntity => {
      if (!source.organizationPaymentPlan || !source.bankPayment) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: OrganizationPaymentPlanBankPaymentEntity.name,
          sourceClass: OrganizationPaymentPlanBankPaymentTypeormEntity.name,
        });
      }
      return new OrganizationPaymentPlanBankPaymentEntity({
        id: new OrganizationPaymentPlanBankPaymentId(source.id),
        organizationPaymentPlan: new OrganizationPaymentPlanId(
          source.organizationPaymentPlan.id,
        ),
        bankPayment: new BankPaymentId(source.bankPayment.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      OrganizationPaymentPlanBankPaymentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationPaymentPlanBankPaymentEntity,
    ): OrganizationPaymentPlanBankPaymentTypeormEntity => {
      return OrganizationPaymentPlanBankPaymentTypeormEntity.build({
        id: source.id.toString(),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationPaymentPlanBankPaymentEntity,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      mappingFunction,
    );
  }
}
