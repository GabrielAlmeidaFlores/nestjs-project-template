import { Inject, Injectable } from '@nestjs/common';

import {
  CustomerAddressResponseDto,
  GetCustomerProfileResponseDto,
} from '@module/admin/customer-management/dto/response/get-customer-profile.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
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

    return GetCustomerProfileResponseDto.build({
      customerId: customerProfile.customerId,
      name: customerProfile.name,
      email: customerProfile.email,
      federalDocument: customerProfile.federalDocument,
      phoneNumber: customerProfile.phoneNumber,
      registrationDate: customerProfile.createdAt,
      paymentPlanName: customerProfile.paymentPlanName,
      paymentPlanPrice: customerProfile.paymentPlanPrice,
      paymentPlanCycle: customerProfile.paymentPlanCycle,
      ...(addressData && { address: addressData }),
    });
  }
}
