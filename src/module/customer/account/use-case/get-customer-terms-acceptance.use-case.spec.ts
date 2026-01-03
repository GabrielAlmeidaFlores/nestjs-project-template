import { Test } from '@nestjs/testing';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { GetCustomerTermsQueryResult } from '@module/customer/account/domain/repository/customer-terms/query/result/get-customer-terms.query.result';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { GetCustomerTermsAcceptanceQueryResult } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/result/get-customer-terms-acceptance.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';
import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';
import { GetCustomerTermsAcceptanceDataResponseDto } from '@module/customer/account/dto/response/get-terms-acceptance-data.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { CustomerTermsNotFoundError } from '@module/customer/account/error/customer-terms-not-found.error';
import { GetCustomerTermsAcceptanceUseCase } from '@module/customer/account/use-case/get-customer-terms-acceptance.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

describe(GetCustomerTermsAcceptanceUseCase.name, () => {
  let useCase: GetCustomerTermsAcceptanceUseCase;

  const customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway> =
    {
      findOneByAuthIdentityIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const customerTermsQueryRepositoryGateway: jest.Mocked<CustomerTermsQueryRepositoryGateway> =
    {
      findOneByStatus: jest.fn(),
    } as unknown as jest.Mocked<CustomerTermsQueryRepositoryGateway>;

  const customerTermsAcceptanceQueryRepositoryGateway: jest.Mocked<CustomerTermsAcceptanceQueryRepositoryGateway> =
    {
      findOneByTermsIdAndCustomerId: jest.fn(),
    } as unknown as jest.Mocked<CustomerTermsAcceptanceQueryRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const customerQueryResult = GetCustomerQueryResult.build({
    id: new CustomerId(),
    name: 'Test Customer',
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const termsQueryResult = GetCustomerTermsQueryResult.build({
    id: new CustomerTermsId(),
    content: '<p>Estes são os termos de uso.</p>',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const termsAcceptanceQueryResult =
    GetCustomerTermsAcceptanceQueryResult.build({
      id: new CustomerTermsAcceptanceId(),
      customer: customerQueryResult,
      customerTerms: termsQueryResult,
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetCustomerTermsAcceptanceUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        {
          provide: CustomerTermsQueryRepositoryGateway,
          useValue: customerTermsQueryRepositoryGateway,
        },
        {
          provide: CustomerTermsAcceptanceQueryRepositoryGateway,
          useValue: customerTermsAcceptanceQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(GetCustomerTermsAcceptanceUseCase);
    jest.clearAllMocks();
  });

  it('should return "accepted: true" when customer has already accepted terms', async () => {
    const sessionData = buildSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      termsQueryResult,
    );
    customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId.mockResolvedValueOnce(
      termsAcceptanceQueryResult,
    );

    const result = await useCase.execute(sessionData);

    expect(result).toBeInstanceOf(GetCustomerTermsAcceptanceDataResponseDto);
    expect(result.accepted).toBe(true);
    expect(result.content).toBe(termsQueryResult.content);
    expect(
      customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId,
    ).toHaveBeenCalledWith(termsQueryResult.id, customerQueryResult.id);
  });

  it('should return "accepted: false" when customer has not yet accepted terms', async () => {
    const sessionData = buildSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      termsQueryResult,
    );
    customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId.mockResolvedValueOnce(
      null,
    );

    const result = await useCase.execute(sessionData);

    expect(result.accepted).toBe(false);
  });

  it('should throw CustomerTermsNotFoundError when no active terms exist', async () => {
    const sessionData = buildSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      null,
    );

    await expect(useCase.execute(sessionData)).rejects.toBeInstanceOf(
      CustomerTermsNotFoundError,
    );
  });

  it('should propagate CustomerNotFoundError when customer is not found', async () => {
    const sessionData = buildSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockRejectedValueOnce(
      new CustomerNotFoundError(),
    );

    await expect(useCase.execute(sessionData)).rejects.toBeInstanceOf(
      CustomerNotFoundError,
    );
  });
});
