import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetCustomerProfileQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-profile.query.result';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

@Injectable()
export class GetCustomerProfileQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCustomerProfileQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: CustomerTypeormEntity,
    ): GetCustomerProfileQueryResult => {
      if (!source.authIdentity) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetCustomerProfileQueryResult.name,
          sourceClass: CustomerTypeormEntity.name,
        });
      }

      const firstOrgMember = source.organizationMember?.[0];
      const organization = firstOrgMember?.organization;
      const orgPaymentPlan = organization?.organizationPaymentPlan?.[0];

      return GetCustomerProfileQueryResult.build({
        customerId: new CustomerId(source.id),
        name: source.name,
        email: new Email(source.authIdentity.email.toString()),
        federalDocument: new FederalDocument(
          source.authIdentity.federalDocument.toString(),
        ),
        phoneNumber: new PhoneNumber(source.phoneNumber),
        customerIsActive: source.authIdentity.isActive,
        organizationId:
          organization?.id !== undefined
            ? new OrganizationId(organization.id)
            : null,
        ...(firstOrgMember !== undefined && {
          isOrganizationOwner: firstOrgMember.owner,
        }),
        maxMemberCount: orgPaymentPlan?.maxMemberCount ?? null,
        createdAt: source.createdAt,
        ...(orgPaymentPlan && {
          paymentPlanName: orgPaymentPlan.name,
          paymentPlanPrice: new DecimalValue(orgPaymentPlan.price),
          paymentPlanCycle: orgPaymentPlan.cycle,
        }),
        ...(source.customerAddress && {
          customerAddress: this.mapper.map(
            source.customerAddress,
            CustomerAddressTypeormEntity,
            GetCustomerAddressQueryResult,
          ),
        }),
      });
    };

    createMap(
      this.mapper,
      CustomerTypeormEntity,
      GetCustomerProfileQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
