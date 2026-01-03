import { Test } from '@nestjs/testing';

import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ValidateOrganizationSessionRequestDto } from '@module/customer/account/dto/request/validate-organization-session.request.dto';
import { GetOrganizationResponseDto } from '@module/customer/account/dto/response/get-organization.response.dto';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationSessionJwtOutputModel } from '@module/customer/account/lib/organization-session/model/output/organization-session-jwt.output.model';
import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { ValidateOrganizationSessionUseCase } from '@module/customer/account/use-case/validate-organization-session.use-case';

describe(ValidateOrganizationSessionUseCase.name, () => {
  let useCase: ValidateOrganizationSessionUseCase;

  const organizationSessionGateway: jest.Mocked<OrganizationSessionGateway> = {
    createSession: jest.fn(),
    getSessionDataFromJwt: jest.fn(),
  } as unknown as jest.Mocked<OrganizationSessionGateway>;

  const organizationQueryRepositoryGateway: jest.Mocked<OrganizationQueryRepositoryGateway> =
    {
      findOneByOrganizationId: jest.fn(),
      listOrganizationsByCustomerId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationQueryRepositoryGateway>;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getOrganizationLogo: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const buildDto = (
    jwt = 'org.jwt.token',
  ): ValidateOrganizationSessionRequestDto =>
    ValidateOrganizationSessionRequestDto.build({ jwt });

  const buildSession = (
    organizationId: OrganizationId = new OrganizationId(),
  ): OrganizationSessionJwtOutputModel =>
    OrganizationSessionJwtOutputModel.build({ organizationId });

  const buildOrganization = (
    overrides?: Partial<GetOrganizationQueryResult>,
  ): GetOrganizationQueryResult =>
    GetOrganizationQueryResult.build({
      id: new OrganizationId(),
      name: 'Acme Corp',
      organizationLogo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...overrides,
    });

  beforeEach(async (): Promise<void> => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ValidateOrganizationSessionUseCase,
        {
          provide: OrganizationSessionGateway,
          useValue: organizationSessionGateway,
        },
        {
          provide: OrganizationQueryRepositoryGateway,
          useValue: organizationQueryRepositoryGateway,
        },
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
      ],
    }).compile();

    useCase = moduleRef.get(ValidateOrganizationSessionUseCase);
    jest.clearAllMocks();
  });

  it('returns GetOrganizationResponseDto with logo when session and organization are valid and logo exists', async (): Promise<void> => {
    const dto = buildDto();
    const session = buildSession();
    const org = buildOrganization({ organizationLogo: 'logos/acme.png' });
    const logoUrl = new URL(`https://cdn.example.com/${org.organizationLogo}`);

    organizationSessionGateway.getSessionDataFromJwt.mockReturnValueOnce(
      session,
    );
    organizationQueryRepositoryGateway.findOneByOrganizationId.mockResolvedValueOnce(
      org,
    );
    fileProcessorGateway.getOrganizationLogo.mockResolvedValueOnce(logoUrl);

    const result = await useCase.execute(dto);

    expect(
      organizationSessionGateway.getSessionDataFromJwt,
    ).toHaveBeenCalledWith(dto.jwt);
    expect(
      organizationQueryRepositoryGateway.findOneByOrganizationId,
    ).toHaveBeenCalledWith(session.organizationId);
    expect(fileProcessorGateway.getOrganizationLogo).toHaveBeenCalledWith(
      org.organizationLogo,
    );

    expect(result).toBeInstanceOf(GetOrganizationResponseDto);
    expect(result.organizationId).toEqual(org.id);
    expect(result.organizationName).toBe(org.name);
    expect(result.organizationLogo).toBe(logoUrl.toString());
  });

  it('returns GetOrganizationResponseDto without logo when organization has no logo', async (): Promise<void> => {
    const dto = buildDto();
    const session = buildSession();
    const org = buildOrganization({ organizationLogo: null });

    organizationSessionGateway.getSessionDataFromJwt.mockReturnValueOnce(
      session,
    );
    organizationQueryRepositoryGateway.findOneByOrganizationId.mockResolvedValueOnce(
      org,
    );

    const result = await useCase.execute(dto);

    expect(fileProcessorGateway.getOrganizationLogo).not.toHaveBeenCalled();

    expect(result).toBeInstanceOf(GetOrganizationResponseDto);
    expect(result.organizationId).toEqual(org.id);
    expect(result.organizationName).toBe(org.name);
    expect(result.organizationLogo).toBeUndefined();
  });

  it('throws InvalidOrganizationSessionError when session is invalid (null)', async (): Promise<void> => {
    const dto = buildDto('invalid.jwt');

    organizationSessionGateway.getSessionDataFromJwt.mockReturnValueOnce(null);

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      InvalidOrganizationSessionError,
    );

    expect(
      organizationQueryRepositoryGateway.findOneByOrganizationId,
    ).not.toHaveBeenCalled();
    expect(fileProcessorGateway.getOrganizationLogo).not.toHaveBeenCalled();
  });

  it('throws InvalidOrganizationSessionError when organization is not found', async (): Promise<void> => {
    const dto = buildDto();
    const session = buildSession();

    organizationSessionGateway.getSessionDataFromJwt.mockReturnValueOnce(
      session,
    );
    organizationQueryRepositoryGateway.findOneByOrganizationId.mockResolvedValueOnce(
      null,
    );

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      InvalidOrganizationSessionError,
    );

    expect(fileProcessorGateway.getOrganizationLogo).not.toHaveBeenCalled();
  });
});
