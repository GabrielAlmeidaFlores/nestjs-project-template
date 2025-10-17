import { Test } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { GetCustomerTermsQueryResult } from '@module/customer/account/domain/repository/customer-terms/query/result/get-customer-terms.query.result';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { GetCustomerTermsAcceptanceQueryResult } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/result/get-customer-terms-acceptance.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';
import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { GetCustomerTermsAcceptanceDataResponseDto } from '@module/customer/account/dto/response/get-terms-acceptance-data.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { CustomerTermsNotFoundError } from '@module/customer/account/error/customer-terms-not-found.error';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';
import { GetCustomerTermsAcceptanceUseCase } from '@module/customer/account/use-case/get-customer-terms-acceptance.use-case';
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';

describe(GetCustomerTermsAcceptanceUseCase.name, () => {
  let useCase: GetCustomerTermsAcceptanceUseCase;

  const customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway> =
    {
      findOneByAuthIdentityIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndOrganizationIdWithRelations: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const customerTermsQueryRepositoryGateway: jest.Mocked<CustomerTermsQueryRepositoryGateway> =
    {
      findOneByStatus: jest.fn(),
    };

  const customerTermsAcceptanceQueryRepositoryGateway: jest.Mocked<CustomerTermsAcceptanceQueryRepositoryGateway> =
    {
      findOneByTermsIdAndCustomerId: jest.fn(),
    };

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const customerBaseResult = GetCustomerQueryResult.build({
    id: new CustomerId(),
    name: 'Test Customer',
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const customerWithAuthIdentityResult =
    GetCustomerWithAuthIdentityRelationQueryResult.build({
      ...customerBaseResult,
      authIdentity: GetAuthIdentityQueryResult.build({
        id: new AuthIdentityId(),
        email: new Email('test@example.com'),
        federalDocument: new FederalDocument('52649000865'),
        password: new HashedPassword('hashed-password'),
        authenticatorAppSecret: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    });

  const orgMemberQueryResult =
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult.build({
      id: new OrganizationMemberId(),
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      customer: customerWithAuthIdentityResult,
      organization: {} as GetOrganizationQueryResult,
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
      customer: customerBaseResult,
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
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
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

  it('deve retornar "accepted: true" se o cliente já aceitou os termos', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerBaseResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      termsQueryResult,
    );
    customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId.mockResolvedValueOnce(
      termsAcceptanceQueryResult,
    );

    // Act
    const result = await useCase.execute(sessionData, orgSessionData);

    expect(result).toBeInstanceOf(GetCustomerTermsAcceptanceDataResponseDto);
    expect(result.accepted).toBe(true);
    expect(result.content).toBe(termsQueryResult.content);
    expect(
      customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId,
    ).toHaveBeenCalledWith(termsQueryResult.id, customerBaseResult.id);
  });

  it('deve retornar "accepted: false" se o cliente ainda não aceitou os termos', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerBaseResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      termsQueryResult,
    );
    customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId.mockResolvedValueOnce(
      null,
    );

    const result = await useCase.execute(sessionData, orgSessionData);

    expect(result.accepted).toBe(false);
  });

  it('deve lançar InvalidOrganizationSessionError se o membro da organização não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerBaseResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(InvalidOrganizationSessionError);
  });

  it('deve lançar CustomerTermsNotFoundError se não houver termos ativos', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerBaseResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(CustomerTermsNotFoundError);
  });

  it('deve propagar CustomerNotFoundError se o cliente não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockRejectedValueOnce(
      new CustomerNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });
});
