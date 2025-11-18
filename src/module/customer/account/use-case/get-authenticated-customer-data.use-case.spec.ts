import { Test } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { GetAuthenticatedCustomerDataResponseDto } from '@module/customer/account/dto/response/get-authenticated-customer-data.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { GetAuthenticatedCustomerDataUseCase } from '@module/customer/account/use-case/get-authenticated-customer-data.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import type { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';

describe(GetAuthenticatedCustomerDataUseCase.name, () => {
  let useCase: GetAuthenticatedCustomerDataUseCase;

  const customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway> =
    {
      findOneByAuthIdentityIdOrFail: jest.fn(),
      findOneByCustomerId: jest.fn(),
      findOneByAuthIdentityIdWithCustomerAddressRelationOrFail: jest.fn(),
    } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getCustomerProfilePicture: jest.fn(),
    getOrganizationLogo: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

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

  const buildCustomerResult = (
    options: { withPicture?: boolean } = {},
  ): GetCustomerQueryResult =>
    GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Nome do Cliente',
      profilePicture:
        (options.withPicture ?? false) ? 'path/profile.jpg' : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildOrgMemberQueryResult = (
    customer: GetCustomerWithAuthIdentityRelationQueryResult,
    options: { withLogo?: boolean } = {},
  ): GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult =>
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult.build({
      id: new OrganizationMemberId(),
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      customer: customer,
      organization: GetOrganizationQueryResult.build({
        id: new OrganizationId(),
        name: 'Nome da Org',
        organizationLogo: (options.withLogo ?? false) ? 'path/logo.png' : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetAuthenticatedCustomerDataUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: FileProcessorGateway,
          useValue: fileProcessorGateway,
        },
      ],
    }).compile();

    useCase = module.get(GetAuthenticatedCustomerDataUseCase);
    jest.clearAllMocks();
  });

  it('deve retornar dados completos e URLs assinadas para logo e foto', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const customerResult = buildCustomerResult({ withPicture: true });

    const customerWithAuthIdentity = {
      ...customerResult,
      authIdentity: {
        email: new Email('test@email.com'),
        federalDocument: new FederalDocument('12345678900'),
      } as GetAuthIdentityQueryResult,
    } as GetCustomerWithAuthIdentityRelationQueryResult;

    const orgMemberResult = buildOrgMemberQueryResult(
      customerWithAuthIdentity,
      { withLogo: true },
    );

    const MOCK_PROFILE_URL = new URL('https://cdn.example.com/signed/profile');
    const MOCK_LOGO_URL = new URL('https://cdn.example.com/signed/logo');

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberResult,
    );
    fileProcessorGateway.getCustomerProfilePicture.mockResolvedValueOnce(
      MOCK_PROFILE_URL,
    );
    fileProcessorGateway.getOrganizationLogo.mockResolvedValueOnce(
      MOCK_LOGO_URL,
    );

    const result = await useCase.execute(sessionData, orgSessionData);

    expect(result).toBeInstanceOf(GetAuthenticatedCustomerDataResponseDto);

    expect(result.customer.customerId).toEqual(customerResult.id);
    expect(result.customer.email).toEqual(
      orgMemberResult.customer.authIdentity.email,
    );
    expect(result.customer.profilePicture).toBe(MOCK_PROFILE_URL.toString());

    expect(result.organization.organizationId).toEqual(
      orgMemberResult.organization.id,
    );
    expect(result.organization.organizationLogo).toBe(MOCK_LOGO_URL.toString());
    expect(result.organization.organizationOwner).toBe(true);

    expect(fileProcessorGateway.getCustomerProfilePicture).toHaveBeenCalledWith(
      customerResult.profilePicture,
    );
    expect(fileProcessorGateway.getOrganizationLogo).toHaveBeenCalledWith(
      orgMemberResult.organization.organizationLogo,
    );
  });

  it('deve retornar dados e profilePicture/Logo nulos se não houver caminho', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const customerResult = buildCustomerResult({ withPicture: false });
    const customerWithAuthIdentity = {
      ...customerResult,
      authIdentity: {
        email: new Email('test@email.com'),
        federalDocument: new FederalDocument('12345678900'),
      } as GetAuthIdentityQueryResult,
    } as GetCustomerWithAuthIdentityRelationQueryResult;
    const orgMemberResult = buildOrgMemberQueryResult(
      customerWithAuthIdentity,
      { withLogo: false },
    );

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberResult,
    );

    const result = await useCase.execute(sessionData, orgSessionData);

    expect(result.customer.profilePicture).toBeUndefined();
    expect(result.organization.organizationLogo).toBeUndefined();
    expect(
      fileProcessorGateway.getCustomerProfilePicture,
    ).not.toHaveBeenCalled();
    expect(fileProcessorGateway.getOrganizationLogo).not.toHaveBeenCalled();
  });

  it('deve lançar CustomerNotFoundError se o cliente não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockRejectedValueOnce(
      new CustomerNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('deve lançar InvalidOrganizationSessionError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const customerResult = buildCustomerResult();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(InvalidOrganizationSessionError);
  });
});
