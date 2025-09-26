import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-address-relation.query.result';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { UpdateCustomerProfilePictureResponseDto } from '@module/customer/account/dto/response/update-customer-profile-picture.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';

import type { UpdateCustomerProfilePictureRequestDto } from '@module/customer/account/dto/request/update-customer-profile-picture.request.dto';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class UpdateCustomerProfilePictureUseCase {
  protected readonly _type = UpdateCustomerProfilePictureUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerCommandRepositoryGateway)
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateCustomerProfilePictureRequestDto,
  ): Promise<UpdateCustomerProfilePictureResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const newProfilePictureLocation =
      await this.fileProcessorGateway.processAndUploadProfilePicture(
        dto.profilePicture.buffer,
        customer.profilePicture ?? undefined,
      );

    if (newProfilePictureLocation !== customer.profilePicture) {
      await this.updateCustomerProfilePictureOnDatabase(
        customer,
        newProfilePictureLocation,
      );
    }

    const profilePicture = await this.fileProcessorGateway.getCustomerProfilePicture(
      newProfilePictureLocation,
    );

    return UpdateCustomerProfilePictureResponseDto.build({
      profilePicture: profilePicture.toString(),
    });
  }

  private async updateCustomerProfilePictureOnDatabase(
    customer: GetCustomerWithAddressRelationQueryResult,
    profilePicture: string,
  ): Promise<void> {
    const updatedCustomer = new CustomerEntity({
      ...customer,
      profilePicture,
      customerAddress: new CustomerAddressEntity({
        ...customer.customerAddress,
      }),
    });

    const saveUpdatedCustomer =
      this.customerCommandRepositoryGateway.updateCustomer(
        updatedCustomer.id,
        updatedCustomer,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(saveUpdatedCustomer);

    await transaction.commit();
  }
}
