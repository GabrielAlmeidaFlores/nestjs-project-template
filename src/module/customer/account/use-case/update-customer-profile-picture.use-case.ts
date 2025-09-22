import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { UpdateCustomerProfilePictureResponseDto } from '@module/customer/account/dto/response/update-customer-profile-picture.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';

import type { UpdateCustomerProfilePictureRequestDto } from '@module/customer/account/dto/request/update-customer-profile-picture.request.dto';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.output.model';

export class UpdateCustomerProfilePictureUseCase {
  protected readonly _type = UpdateCustomerProfilePictureUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerCommandRepositoryGateway)
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
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

    const uploadFile = await this.bucketGateway.create(
      dto.profilePicture.buffer,
    );

    const updatedCustomer = new CustomerEntity({
      ...customer,
      profilePicture: uploadFile,
    });

    const saveUpdatedCustomer =
      this.customerCommandRepositoryGateway.updateCustomer(
        updatedCustomer.id,
        updatedCustomer,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(saveUpdatedCustomer);

    await transaction.commit();

    const profilePicture = await this.bucketGateway.get(uploadFile);

    return UpdateCustomerProfilePictureResponseDto.build({
      profilePicture: profilePicture.toString(),
    });
  }
}
