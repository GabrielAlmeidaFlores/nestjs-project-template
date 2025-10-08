import { Test } from '@nestjs/testing';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
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
import { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

describe(GetAuthenticatedCustomerDataUseCase.name, () => {
  let useCase: GetAuthenticatedCustomerDataUseCase;

  const customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway> =
    {
      findOneByAuthIdentityIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerAndOrganizationId: jest.fn(),
      findOneByCustomerAndOrganizationIdWithRelations: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getCustomerProfilePicture: jest.fn(),
    getOrganizationLogo: jest.fn(),
    processAndUploadProfilePicture: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrgSessionData = (
    orgId: OrganizationId = new OrganizationId(),
  ): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: orgId,
    });

  const now: Date = new Date();

  const buildAuthIdentity = (): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: new AuthIdentityId(),
      email: new Email('maria@example.com'),
      federalDocument: new FederalDocument('12345678901'),
      password: new HashedPassword('password'),
      authenticatorAppSecret: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });

  const buildCustomerWithAuthIdentity = (
    overrides?: Partial<GetCustomerWithAuthIdentityRelationQueryResult>,
  ): GetCustomerWithAuthIdentityRelationQueryResult =>
    GetCustomerWithAuthIdentityRelationQueryResult.build({
      id: new CustomerId(),
      name: 'Maria Silva',
      profilePicture: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      authIdentity: buildAuthIdentity(),
      ...overrides,
    });

  const buildOrganization = (
    overrides?: Partial<GetOrganizationQueryResult>,
  ): GetOrganizationQueryResult =>
    GetOrganizationQueryResult.build({
      id: new OrganizationId(),
      name: 'Org XPTO',
      organizationLogo: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      ...overrides,
    });

  const buildOrgMemberWithRelations = (
    overrides?: Partial<GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult>,
  ): GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult =>
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult.build({
      id: new OrganizationMemberId(),
      owner: false,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      customer: buildCustomerWithAuthIdentity(),
      organization: buildOrganization(),
      ...overrides,
    });

  beforeEach(async (): Promise<void> => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAuthenticatedCustomerDataUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = moduleRef.get(GetAuthenticatedCustomerDataUseCase);
    jest.clearAllMocks();
  });

  it('success: returns data with customer profile picture and organization logo', async (): Promise<void> => {
    const sessionData: SessionDataModel = buildSessionData();
    const orgSessionData: OrganizationSessionDataModel = buildOrgSessionData();

    const customer: GetCustomerWithAuthIdentityRelationQueryResult =
      buildCustomerWithAuthIdentity({ profilePicture: 'cust/pics/1.png' });
    const organization: GetOrganizationQueryResult = buildOrganization({
      organizationLogo: 'org/logos/42.png',
    });

    const orgMember: GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult =
      buildOrgMemberWithRelations({ customer, organization });

    const profileUrl: URL = new URL(
      `https://cdn.test/${customer.profilePicture}`,
    );
    const logoUrl: URL = new URL(
      `https://cdn.test/${organization.organizationLogo}`,
    );

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customer as unknown as Awaited<
        ReturnType<
          CustomerQueryRepositoryGateway['findOneByAuthIdentityIdOrFail']
        >
      >,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMember,
    );

    fileProcessorGateway.getCustomerProfilePicture.mockResolvedValueOnce(
      profileUrl,
    );
    fileProcessorGateway.getOrganizationLogo.mockResolvedValueOnce(logoUrl);

    const result = await useCase.execute(sessionData, orgSessionData);

    expect(result).toBeInstanceOf(GetAuthenticatedCustomerDataResponseDto);

    expect(result.customer.name).toBe(customer.name);
    expect(result.customer.email).toEqual(customer.authIdentity.email);
    expect(result.customer.federalDocument).toEqual(
      customer.authIdentity.federalDocument,
    );
    expect(result.customer.profilePicture).toBe(profileUrl.toString());

    expect(result.organization.organizationId).toEqual(organization.id);
    expect(result.organization.organizationName).toBe(organization.name);
    expect(result.organization.organizationLogo).toBe(logoUrl.toString());

    expect(fileProcessorGateway.getCustomerProfilePicture).toHaveBeenCalledWith(
      customer.profilePicture,
    );
    expect(fileProcessorGateway.getOrganizationLogo).toHaveBeenCalledWith(
      organization.organizationLogo,
    );
  });

  it('success: no images (does not call file processor) and returns basic data', async (): Promise<void> => {
    const sessionData: SessionDataModel = buildSessionData();
    const orgSessionData: OrganizationSessionDataModel = buildOrgSessionData();

    const customer: GetCustomerWithAuthIdentityRelationQueryResult =
      buildCustomerWithAuthIdentity({ profilePicture: null });
    const organization: GetOrganizationQueryResult = buildOrganization({
      organizationLogo: null,
    });

    const orgMember: GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult =
      buildOrgMemberWithRelations({ customer, organization });

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customer as unknown as Awaited<
        ReturnType<
          CustomerQueryRepositoryGateway['findOneByAuthIdentityIdOrFail']
        >
      >,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMember,
    );

    const result = await useCase.execute(sessionData, orgSessionData);

    expect(result.customer.profilePicture).toBeUndefined();
    expect(result.organization.organizationLogo).toBeUndefined();

    expect(
      fileProcessorGateway.getCustomerProfilePicture,
    ).not.toHaveBeenCalled();
    expect(fileProcessorGateway.getOrganizationLogo).not.toHaveBeenCalled();
  });

  it('error: propagates CustomerNotFoundError', async (): Promise<void> => {
    const sessionData: SessionDataModel = buildSessionData();
    const orgSessionData: OrganizationSessionDataModel = buildOrgSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockRejectedValueOnce(
      new CustomerNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations,
    ).not.toHaveBeenCalled();
    expect(
      fileProcessorGateway.getCustomerProfilePicture,
    ).not.toHaveBeenCalled();
    expect(fileProcessorGateway.getOrganizationLogo).not.toHaveBeenCalled();
  });

  it('error: no organization link (returns null) → throws InvalidOrganizationSessionError', async (): Promise<void> => {
    const sessionData: SessionDataModel = buildSessionData();
    const orgSessionData: OrganizationSessionDataModel = buildOrgSessionData();
    const customer: GetCustomerWithAuthIdentityRelationQueryResult =
      buildCustomerWithAuthIdentity();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customer as unknown as Awaited<
        ReturnType<
          CustomerQueryRepositoryGateway['findOneByAuthIdentityIdOrFail']
        >
      >,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(InvalidOrganizationSessionError);

    expect(
      fileProcessorGateway.getCustomerProfilePicture,
    ).not.toHaveBeenCalled();
    expect(fileProcessorGateway.getOrganizationLogo).not.toHaveBeenCalled();
  });
});
