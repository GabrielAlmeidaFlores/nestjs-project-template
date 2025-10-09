import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';
import { UpdateCustomerProfilePictureRequestDto } from '@module/customer/account/dto/request/update-customer-profile-picture.request.dto';
import { UpdateCustomerProfilePictureResponseDto } from '@module/customer/account/dto/response/update-customer-profile-picture.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { FileModel } from '@shared/system/model/generic/file.model';

describe(UpdateCustomerProfilePictureUseCase.name, () => {
  let useCase: UpdateCustomerProfilePictureUseCase;

  const txRepo: jest.Mocked<BaseTransactionRepositoryGateway> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const customerCmdRepo: jest.Mocked<CustomerCommandRepositoryGateway> = {
    updateCustomer: jest.fn(),
  } as unknown as jest.Mocked<CustomerCommandRepositoryGateway>;

  const customerQueryRepo: jest.Mocked<CustomerQueryRepositoryGateway> = {
    findOneByAuthIdentityIdWithCustomerAddressRelationOrFail: jest.fn(),
  } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const fileProcessor: jest.Mocked<FileProcessorGateway> = {
    processAndUploadProfilePicture: jest.fn(),
    getCustomerProfilePicture: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const sessionData = SessionDataModel.build({
    authIdentityId: new AuthIdentityId(),
    sessionId: new Guid(),
    userLevel: UserLevelEnum.CUSTOMER,
  });

  const fileBuffer = Buffer.from('fake-image');
  const fileModel: FileModel = {
    fieldname: 'profilePicture',
    originalName: 'avatar.png',
    encoding: '7bit',
    mimetype: MimeTypeEnum.IMAGE_PNG,
    size: fileBuffer.length,
    buffer: fileBuffer,
    stream: undefined,
    destination: undefined,
    filename: undefined,
    path: undefined,
  } as unknown as FileModel;

  const dto = UpdateCustomerProfilePictureRequestDto.build({
    profilePicture: fileModel,
  });

  const now = new Date();

  const addressQueryResult = GetCustomerAddressQueryResult.build({
    id: new CustomerAddressId(),
    postalCode: new PostalCode('01001000'),
    stateCode: StateCodeEnum.SP,
    city: 'São Paulo',
    neighborhood: 'Centro',
    addressNumber: 123,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  });

  const baseCustomerQueryResult =
    GetCustomerWithCustomerAddressRelationQueryResult.build({
      id: new CustomerId(),
      name: 'Maria Silva',
      phoneNumber: new PhoneNumber('5511999999999'),
      profilePicture: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      customerAddress: addressQueryResult,
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateCustomerProfilePictureUseCase,
        { provide: BaseTransactionRepositoryGateway, useValue: txRepo },
        {
          provide: CustomerCommandRepositoryGateway,
          useValue: customerCmdRepo,
        },
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepo,
        },
        { provide: FileProcessorGateway, useValue: fileProcessor },
      ],
    }).compile();

    useCase = module.get(UpdateCustomerProfilePictureUseCase);
    jest.clearAllMocks();
  });

  it('should process, upload, update when changed, commit transaction and return final URL', async () => {
    const uploadedKey = 'bucket/uploads/cust-1/profile.png';
    const finalUrl = new URL(`https://cdn.example.com/${uploadedKey}`);

    customerQueryRepo.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      baseCustomerQueryResult,
    );

    fileProcessor.processAndUploadProfilePicture.mockResolvedValueOnce(
      uploadedKey,
    );

    const updateWork: TransactionType = async () => Promise.resolve();
    customerCmdRepo.updateCustomer.mockReturnValueOnce(updateWork);

    const commit = jest.fn<Promise<void>, []>().mockResolvedValue();
    const rollback = jest.fn<Promise<void>, []>().mockResolvedValue();
    txRepo.execute.mockResolvedValueOnce(
      new TransactionOutputModel(commit, rollback),
    );

    fileProcessor.getCustomerProfilePicture.mockResolvedValueOnce(finalUrl);

    const result = await useCase.execute(sessionData, dto);

    expect(
      customerQueryRepo.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail,
    ).toHaveBeenCalledWith(sessionData.authIdentityId, CustomerNotFoundError);

    expect(fileProcessor.processAndUploadProfilePicture).toHaveBeenCalledWith(
      fileBuffer,
      undefined,
    );

    expect(customerCmdRepo.updateCustomer).toHaveBeenCalledTimes(1);
    const [calledId, calledEntity] = customerCmdRepo.updateCustomer.mock
      .calls[0] as unknown as [CustomerId, CustomerEntity];

    expect(calledId).toBeInstanceOf(CustomerId);
    expect(calledEntity).toBeInstanceOf(CustomerEntity);
    expect(calledEntity.profilePicture).toBe(uploadedKey);
    expect(calledEntity.customerAddress).toBeInstanceOf(CustomerAddressEntity);

    expect(txRepo.execute).toHaveBeenCalledWith(updateWork);
    expect(commit).toHaveBeenCalledTimes(1);

    expect(fileProcessor.getCustomerProfilePicture).toHaveBeenCalledWith(
      uploadedKey,
    );

    expect(result).toBeInstanceOf(UpdateCustomerProfilePictureResponseDto);
    expect(result.profilePicture).toBe(finalUrl.toString());
  });

  it('should not update database when processor returns same location; still return final URL', async () => {
    const existingKey = 'bucket/uploads/cust-1/existing.png';
    const customerWithPicQuery =
      GetCustomerWithCustomerAddressRelationQueryResult.build({
        ...baseCustomerQueryResult,
        profilePicture: existingKey,
      });

    const finalUrl = new URL(`https://cdn.example.com/${existingKey}`);

    customerQueryRepo.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      customerWithPicQuery,
    );

    fileProcessor.processAndUploadProfilePicture.mockResolvedValueOnce(
      existingKey,
    );
    fileProcessor.getCustomerProfilePicture.mockResolvedValueOnce(finalUrl);

    const result = await useCase.execute(sessionData, dto);

    expect(fileProcessor.processAndUploadProfilePicture).toHaveBeenCalledWith(
      fileBuffer,
      existingKey,
    );
    expect(customerCmdRepo.updateCustomer).not.toHaveBeenCalled();
    expect(txRepo.execute).not.toHaveBeenCalled();
    expect(fileProcessor.getCustomerProfilePicture).toHaveBeenCalledWith(
      existingKey,
    );

    expect(result).toBeInstanceOf(UpdateCustomerProfilePictureResponseDto);
    expect(result.profilePicture).toBe(finalUrl.toString());
  });

  it('should propagate CustomerNotFoundError and not call processor or repos', async () => {
    const error = new CustomerNotFoundError();

    customerQueryRepo.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockRejectedValueOnce(
      error,
    );

    await expect(useCase.execute(sessionData, dto)).rejects.toBe(error);

    expect(fileProcessor.processAndUploadProfilePicture).not.toHaveBeenCalled();
    expect(customerCmdRepo.updateCustomer).not.toHaveBeenCalled();
    expect(txRepo.execute).not.toHaveBeenCalled();
    expect(fileProcessor.getCustomerProfilePicture).not.toHaveBeenCalled();
  });
});
