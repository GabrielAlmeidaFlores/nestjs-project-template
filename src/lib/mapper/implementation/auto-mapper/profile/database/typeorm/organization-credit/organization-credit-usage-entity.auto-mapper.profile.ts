import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationCreditUsageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-usage.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { OrganizationCreditUsageEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/organization-credit-usage.entity';
import { OrganizationCreditUsageId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/value-object/organization-credit-usage-id/organization-credit-usage-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class OrganizationCreditUsageEntityAutoMapperProfile {
  protected readonly _type =
    OrganizationCreditUsageEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: OrganizationCreditUsageTypeormEntity,
    ): OrganizationCreditUsageEntity => {
      if (!source.createdBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: OrganizationCreditUsageEntity.name,
          sourceClass: OrganizationCreditUsageTypeormEntity.name,
        });
      }

      return new OrganizationCreditUsageEntity({
        id: new OrganizationCreditUsageId(source.id),
        creditAmount: source.creditAmount,
        paymentPlanPaidResource: new PaymentPlanPaidResourceId(
          source.paymentPlanPaidResource?.id,
        ),
        createdBy: new OrganizationMemberId(source.createdBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationCreditUsageTypeormEntity,
      OrganizationCreditUsageEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationCreditUsageEntity,
    ): OrganizationCreditUsageTypeormEntity => {
      const paymentPlanPaidResource = {
        id: source.paymentPlanPaidResource.toString(),
      } as PaymentPlanPaidResourceTypeormEntity;

      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      return OrganizationCreditUsageTypeormEntity.build({
        id: source.id.toString(),
        creditAmount: source.creditAmount,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        paymentPlanPaidResource,
        createdBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationCreditUsageEntity,
      OrganizationCreditUsageTypeormEntity,
      mappingFunction,
    );
  }
}
