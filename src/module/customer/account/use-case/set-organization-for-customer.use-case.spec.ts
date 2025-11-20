import { Test } from '@nestjs/testing';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { SetOrganizationForCustomerRequestDto } from '@module/customer/account/dto/request/set-organization-for-customer.request.dto';
import { SetOrganizationForCustomerResponseDto } from '@module/customer/account/dto/response/set-organization-for-customer.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationNotAvailableForCustomerError } from '@module/customer/account/error/organization-not-available-for-customer.error';
import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { SetOrganizationForCustomerUseCase } from '@module/customer/account/use-case/set-organization-for-customer.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { FastifyReply } from 'fastify';

describe(SetOrganizationForCustomerUseCase.name, () => {
  let useCase: SetOrganizationForCustomerUseCase;

  const organizationSessionGateway: jest.Mocked<OrganizationSessionGateway> = {
    createSession: jest.fn(),
    getSession: jest.fn(),
  } as unknown as jest.Mocked<OrganizationSessionGateway>;

  const customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway> =
    {
      findOneByAuthIdentityIdOrFail: jest.fn(),
    } as unknown as jest.Mocked<CustomerQueryRepositoryGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndOrganizationId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const reply: Partial<FastifyReply> = {
    setCookie: jest.fn(),
  };

  const createSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const createDto = (): SetOrganizationForCustomerRequestDto =>
    SetOrganizationForCustomerRequestDto.build({
      organizationId: new OrganizationId(),
    });

  const createCustomerResult = (): GetCustomerQueryResult =>
    GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Test Customer',
      profilePicture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const createOrgMemberResult = (
    owner: boolean,
  ): GetOrganizationMemberQueryResult =>
    GetOrganizationMemberQueryResult.build({
      id: new OrganizationMemberId(),
      owner: owner,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SetOrganizationForCustomerUseCase,
        {
          provide: OrganizationSessionGateway,
          useValue: organizationSessionGateway,
        },
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = moduleRef.get(SetOrganizationForCustomerUseCase);

    jest.clearAllMocks();
  });

  it('success path: sets cookie and returns owner=true', async () => {
    const sessionData = createSessionData();
    const dto = createDto();
    const customerResult = createCustomerResult();
    const orgMemberResult = createOrgMemberResult(true); // owner = true

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerResult,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId.mockResolvedValueOnce(
      orgMemberResult,
    );

    organizationSessionGateway.createSession.mockReturnValueOnce(
      'jwt-organization-session',
    );

    const result = await useCase.execute(
      reply as FastifyReply,
      sessionData,
      dto,
    );

    // Assert
    expect(result).toBeInstanceOf(SetOrganizationForCustomerResponseDto);
    expect(result.owner).toBe(true);

    expect(organizationSessionGateway.createSession).toHaveBeenCalledWith(
      dto.organizationId,
    );

    expect(reply.setCookie).toHaveBeenCalledWith(
      ApiCookieEnum.ORGANIZATION,
      'jwt-organization-session',
      expect.objectContaining({
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 604800,
      }),
    );

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId,
    ).toHaveBeenCalledWith(customerResult.id, dto.organizationId);
  });

  it('throws CustomerNotFoundError when customer does not exist', async () => {
    const sessionData = createSessionData();
    const dto = createDto();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockRejectedValueOnce(
      new CustomerNotFoundError(),
    );

    await expect(
      useCase.execute(reply as FastifyReply, sessionData, dto),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId,
    ).not.toHaveBeenCalled();
    expect(reply.setCookie).not.toHaveBeenCalled();
  });

  it('throws OrganizationNotAvailableForCustomerError when organization is not linked to customer', async () => {
    const sessionData = createSessionData();
    const dto = createDto();
    const customerResult = createCustomerResult();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerResult,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(reply as FastifyReply, sessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationNotAvailableForCustomerError);

    expect(reply.setCookie).not.toHaveBeenCalled();
    expect(organizationSessionGateway.createSession).not.toHaveBeenCalled();
  });

  it('returns owner=false when the member is not owner', async () => {
    const sessionData = createSessionData();
    const dto = createDto();
    const customerResult = createCustomerResult();
    const orgMemberResult = createOrgMemberResult(false);

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      customerResult,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId.mockResolvedValueOnce(
      orgMemberResult,
    );

    organizationSessionGateway.createSession.mockReturnValueOnce('jwt-org');

    const result = await useCase.execute(
      reply as FastifyReply,
      sessionData,
      dto,
    );

    expect(result.owner).toBe(false);
    expect(reply.setCookie).toHaveBeenCalledWith(
      ApiCookieEnum.ORGANIZATION,
      'jwt-org',
      expect.any(Object),
    );
  });
});
