import { Test } from '@nestjs/testing';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
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

  const customerQueryRepositoryGateway: jest.Mocked<
    Pick<
      CustomerQueryRepositoryGateway,
      'findOneByAuthIdentityIdWithCustomerAddressRelationOrFail'
    >
  > = {
    findOneByAuthIdentityIdWithCustomerAddressRelationOrFail: jest.fn(),
  };

  const organizationMemberQueryRepositoryGateway: jest.Mocked<
    Pick<
      OrganizationMemberQueryRepositoryGateway,
      'findOneByCustomerIdAndOrganizationIdWithRelations'
    >
  > = {
    findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
  };

  const fileProcessorGateway: jest.Mocked<
    Pick<
      FileProcessorGateway,
      'getCustomerProfilePicture' | 'getOrganizationLogo'
    >
  > = {
    getCustomerProfilePicture: jest.fn(),
    getOrganizationLogo: jest.fn(),
  };

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      owner: true,
      organizationId: new OrganizationId(),
    });

  const buildCustomerBaseResult = (
    opt: { withPicture?: boolean } = {},
  ): GetCustomerQueryResult =>
    GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Nome do Cliente',
      profilePicture: (opt.withPicture ?? false) ? 'path/profile.jpg' : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildCustomerAddress = (): GetCustomerAddressQueryResult =>
    GetCustomerAddressQueryResult.build({
      id: new CustomerAddressId(),
      postalCode: new PostalCode('12345678'),
      stateCode: StateCodeEnum.SP,
      city: 'Cidade Mock',
      neighborhood: 'Bairro Mock',
      street: 'Rua Mock',
      addressNumber: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildAuthIdentity = (): GetAuthIdentityQueryResult =>
    GetAuthIdentityQueryResult.build({
      id: new AuthIdentityId(),
      email: new Email('test@email.com'),
      federalDocument: new FederalDocument('12345678900'),
      password: new HashedPassword('MOCK_HASH'),
      authenticatorAppSecret: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildCustomerWithAddress = (
    customer: GetCustomerQueryResult,
    address: GetCustomerAddressQueryResult,
  ): GetCustomerWithCustomerAddressRelationQueryResult =>
    GetCustomerWithCustomerAddressRelationQueryResult.build({
      ...customer,
      customerAddress: address,
    });

  const buildCustomerWithAuthIdentity = (
    customer: GetCustomerQueryResult,
    auth: GetAuthIdentityQueryResult,
  ): GetCustomerWithAuthIdentityRelationQueryResult =>
    GetCustomerWithAuthIdentityRelationQueryResult.build({
      ...customer,
      authIdentity: auth,
    });

  const buildOrgMember = (
    customer: GetCustomerWithAuthIdentityRelationQueryResult,
    opt: { withLogo?: boolean } = {},
  ): GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult =>
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult.build({
      id: new OrganizationMemberId(),
      owner: true,
      customer,
      organization: GetOrganizationQueryResult.build({
        id: new OrganizationId(),
        name: 'Nome da Org',
        organizationLogo: (opt.withLogo ?? false) ? 'path/logo.png' : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
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
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
      ],
    }).compile();

    useCase = module.get(GetAuthenticatedCustomerDataUseCase);
    jest.clearAllMocks();
  });

  it('should return complete data and signed URLs', async () => {
    const session = buildSessionData();
    const org = buildOrganizationSessionData();

    const base = buildCustomerBaseResult({ withPicture: true });
    const address = buildCustomerAddress();
    const auth = buildAuthIdentity();

    const customerAddress = buildCustomerWithAddress(base, address);
    const customerAuth = buildCustomerWithAuthIdentity(base, auth);
    const orgMember = buildOrgMember(customerAuth, { withLogo: true });

    const PIC = new URL('https://cdn/pic');
    const LOGO = new URL('https://cdn/logo');

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValue(
      customerAddress,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations.mockResolvedValue(
      orgMember,
    );

    fileProcessorGateway.getCustomerProfilePicture.mockResolvedValue(PIC);
    fileProcessorGateway.getOrganizationLogo.mockResolvedValue(LOGO);

    const result = await useCase.execute(session, org);

    expect(result.customer.customerAddress.city).toBe('Cidade Mock');
    expect(result.customer.profilePicture).toBe(PIC.toString());
    expect(result.organization.organizationLogo).toBe(LOGO.toString());
  });

  it('should return profilePicture/logo as undefined when they do not exist', async () => {
    const session = buildSessionData();
    const org = buildOrganizationSessionData();

    const base = buildCustomerBaseResult({ withPicture: false });
    const address = buildCustomerAddress();
    const auth = buildAuthIdentity();

    const customerAddress = buildCustomerWithAddress(base, address);
    const customerAuth = buildCustomerWithAuthIdentity(base, auth);
    const orgMember = buildOrgMember(customerAuth, { withLogo: false });

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValue(
      customerAddress,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations.mockResolvedValue(
      orgMember,
    );

    const result = await useCase.execute(session, org);

    expect(result.customer.profilePicture).toBeUndefined();
    expect(result.organization.organizationLogo).toBeUndefined();
  });

  it('should throw CustomerNotFoundError', async () => {
    const session = buildSessionData();
    const org = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockRejectedValue(
      new CustomerNotFoundError(),
    );

    await expect(useCase.execute(session, org)).rejects.toBeInstanceOf(
      CustomerNotFoundError,
    );
  });

  it('should throw InvalidOrganizationSessionError', async () => {
    const session = buildSessionData();
    const org = buildOrganizationSessionData();

    const base = buildCustomerBaseResult();
    const address = buildCustomerAddress();

    const customerAddress = buildCustomerWithAddress(base, address);

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValue(
      customerAddress,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationIdWithRelations.mockResolvedValue(
      null,
    );

    await expect(useCase.execute(session, org)).rejects.toBeInstanceOf(
      InvalidOrganizationSessionError,
    );
  });
});
