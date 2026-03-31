import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetCustomerWithOrganizationForListQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-organization-for-list.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

@Injectable()
export class GetCustomerWithOrganizationForListQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCustomerWithOrganizationForListQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: CustomerTypeormEntity,
    ): GetCustomerWithOrganizationForListQueryResult => {
      if (!source.authIdentity) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetCustomerWithOrganizationForListQueryResult.name,
          sourceClass: CustomerTypeormEntity.name,
        });
      }

      const organizationMember = source.organizationMember?.[0];
      const organization = organizationMember?.organization;

      const isOrganizationOwner =
        source.organizationMember?.some((member) => member.owner === true) ??
        false;

      return new GetCustomerWithOrganizationForListQueryResult({
        customerId: new CustomerId(source.id),
        customerName: source.name,
        customerPhoneNumber: new PhoneNumber(source.phoneNumber),
        customerEmail: new Email(source.authIdentity.email),
        customerDocument: new FederalDocument(
          source.authIdentity.federalDocument,
        ),
        customerCreatedAt: source.createdAt,
        customerDeletedAt: source.authIdentity.deletedAt,
        customerIsActive: source.authIdentity.isActive,
        organizationId:
          organization?.id !== undefined
            ? new OrganizationId(organization.id)
            : null,
        organizationName: organization?.name ?? null,
        isOrganizationOwner,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      CustomerTypeormEntity,
      GetCustomerWithOrganizationForListQueryResult,
      mappingFunction,
    );
  }
}
