import { Test } from '@nestjs/testing';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { SetOrganizationForCustomerRequestDto } from '@module/customer/account/dto/request/set-organization-for-customer.request.dto';
import { SetOrganizationForCustomerResponseDto } from '@module/customer/account/dto/response/set-organization-for-customer.response.dto';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationNotAvailableForCustomerError } from '@module/customer/account/error/organization-not-available-for-customer.error';
import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { SetOrganizationForCustomerUseCase } from '@module/customer/account/use-case/set-organization-for-customer.use-case';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/source/node.application-variable';

import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
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
      findOneByCustomerAndOrganizationId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const reply: Partial<FastifyReply> = {
    setCookie: jest.fn(),
  };

  const mockCustomerId = {} as unknown as CustomerId;

  const createSessionData = (): SessionDataModel =>
    ({ authIdentityId: {} }) as unknown as SessionDataModel;

  const createDto = (
    overrides?: Partial<SetOrganizationForCustomerRequestDto>,
  ): SetOrganizationForCustomerRequestDto =>
    SetOrganizationForCustomerRequestDto.build({
      organizationId: new OrganizationId(),
      ...overrides,
    });

  const createOrganizationMember = (
    overrides?: Partial<GetOrganizationMemberQueryResult>,
  ): GetOrganizationMemberQueryResult =>
    GetOrganizationMemberQueryResult.build({
      id: {} as unknown as GetOrganizationMemberQueryResult['id'],
      owner: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...overrides,
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
    const orgMember = createOrganizationMember({ owner: true });

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      { id: mockCustomerId } as unknown as Awaited<
        ReturnType<
          CustomerQueryRepositoryGateway['findOneByAuthIdentityIdOrFail']
        >
      >,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationId.mockResolvedValueOnce(
      orgMember,
    );

    organizationSessionGateway.createSession.mockReturnValueOnce(
      'jwt-organization-session',
    );

    const result = await useCase.execute(
      reply as FastifyReply,
      sessionData,
      dto,
    );

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
        secure: NodeApplicationVariable.PRODUCTION_ENVIRONMENT,
        sameSite: 'lax',
        path: '/',
        maxAge: 604800,
      }),
    );

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationId,
    ).toHaveBeenCalledWith(mockCustomerId, dto.organizationId);
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
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationId,
    ).not.toHaveBeenCalled();
    expect(reply.setCookie).not.toHaveBeenCalled();
  });

  it('throws OrganizationNotAvailableForCustomerError when organization is not linked to customer', async () => {
    const sessionData = createSessionData();
    const dto = createDto();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      { id: mockCustomerId } as unknown as Awaited<
        ReturnType<
          CustomerQueryRepositoryGateway['findOneByAuthIdentityIdOrFail']
        >
      >,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationId.mockResolvedValueOnce(
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
    const orgMember = createOrganizationMember({ owner: false });

    customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail.mockResolvedValueOnce(
      { id: mockCustomerId } as unknown as Awaited<
        ReturnType<
          CustomerQueryRepositoryGateway['findOneByAuthIdentityIdOrFail']
        >
      >,
    );

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationId.mockResolvedValueOnce(
      orgMember,
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
