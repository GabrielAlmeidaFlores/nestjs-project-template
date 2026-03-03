import { Inject, Injectable } from '@nestjs/common';

import { CustomerTypeEnum } from '@module/admin/customer-management/dto/enum/customer-type.enum';
import {
  CustomerAddressResponseDto,
  GetCustomerProfileResponseDto,
} from '@module/admin/customer-management/dto/response/get-customer-profile.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';

@Injectable()
export class GetCustomerProfileUseCase {
  protected readonly _type = GetCustomerProfileUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    customerId: CustomerId,
  ): Promise<GetCustomerProfileResponseDto> {
    const customerProfile =
      await this.customerQueryRepository.findOneByCustomerIdWithProfileData(
        customerId,
      );

    if (!customerProfile) {
      throw new CustomerNotFoundError();
    }

    const addressData = customerProfile.customerAddress
      ? CustomerAddressResponseDto.build({
          recipient: customerProfile.name,
          street: customerProfile.customerAddress.street,
          number: customerProfile.customerAddress.addressNumber.toString(),
          neighborhood: customerProfile.customerAddress.neighborhood,
          city: customerProfile.customerAddress.city,
          state: customerProfile.customerAddress.stateCode,
          postalCode: customerProfile.customerAddress.postalCode.toString(),
        })
      : undefined;
    const customerType = this.determineCustomerType(
      customerProfile.isOrganizationOwner ?? false,
      customerProfile.organizationId,
      customerProfile.maxMemberCount,
    );

    return GetCustomerProfileResponseDto.build({
      customerId: customerProfile.customerId,
      name: customerProfile.name,
      email: customerProfile.email,
      federalDocument: customerProfile.federalDocument,
      phoneNumber: customerProfile.phoneNumber,
      customerType,
      registrationDate: customerProfile.createdAt,
      customerIsActive: customerProfile.customerIsActive,
      ...(customerProfile.paymentPlanName !== undefined && {
        paymentPlanName: customerProfile.paymentPlanName,
      }),
      ...(customerProfile.paymentPlanPrice !== undefined && {
        paymentPlanPrice: customerProfile.paymentPlanPrice,
      }),
      ...(customerProfile.paymentPlanCycle !== undefined && {
        paymentPlanCycle: customerProfile.paymentPlanCycle,
      }),
      ...(addressData && { address: addressData }),
    });
  }

  private determineCustomerType(
    isOrganizationOwner: boolean,
    organizationId: OrganizationId | null,
    maxMemberCount: number | null,
  ): CustomerTypeEnum {
    if (organizationId === null) {
      return CustomerTypeEnum.INDIVIDUAL;
    }

    if (!isOrganizationOwner) {
      return CustomerTypeEnum.COLLABORATOR;
    }

    if (maxMemberCount === null || maxMemberCount === 1) {
      return CustomerTypeEnum.INDIVIDUAL;
    }

    return CustomerTypeEnum.ORGANIZATION;
  }
}
