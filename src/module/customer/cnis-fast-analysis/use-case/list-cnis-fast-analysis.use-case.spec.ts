import { Test } from '@nestjs/testing';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { GetCnisFastAnalysisClientWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client/query/result/get-cnis-fast-analysis-client-with-relations.query.result';
import { GetCnisFastAnalysisResultQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisClientId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';
import { CnisFastAnalysisResultId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';
import { ListCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/list-cnis-fast-analysis.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/cnis-fast-analysis/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.gateway';
import { ListCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/list-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

describe(ListCnisFastAnalysisUseCase.name, () => {
  let useCase: ListCnisFastAnalysisUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getFileSignedUrl: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      listByOrganizationId: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisQueryRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrgSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildListDataRequestDto = (): ListDataRequestDto =>
    ListDataRequestDto.build({
      page: 1,
      limit: 10,
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    GetOrganizationMemberQueryResult.build({
      id: new OrganizationMemberId(),
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildCnisFastAnalysisQueryResult = (
    id: CnisFastAnalysisId,
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    const customerWithPicture = GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Test Customer',
      phoneNumber: new PhoneNumber('5515997752074'),
      profilePicture: `path/to/profile-${id.toString()}.jpg`,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return GetCnisFastAnalysisWithRelationsQueryResult.build({
      id,
      cnisDocument: `path/to/cnis-${id.toString()}.pdf`,
      cnisFastAnalysisClient:
        GetCnisFastAnalysisClientWithRelationsQueryResult.build({
          id: new CnisFastAnalysisClientId(),
          name: 'Client Name',
          federalDocument: null,
          email: null,
          phoneNumber: null,
          birthDate: new Date(),
          gender: null,
          clientType: null,
          cnisFastAnalysisClientInssBenefit: [],
          cnisFastAnalysisClientLegalProceeding: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      cnisFastAnalysisResult: GetCnisFastAnalysisResultQueryResult.build({
        id: new CnisFastAnalysisResultId(),
        clientName: 'Client Name',
        clientFederalDocument: null,
        clientBirthDate: new Date(),
        clientLastAffiliationDate: new Date(),
        cnisAiAnalysis: 'AI Analysis text',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
      createdBy: GetOrganizationMemberWithCustomerRelationQueryResult.build({
        ...buildOrganizationMember(),
        customer: customerWithPicture,
      }),
      updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult.build({
        ...buildOrganizationMember(),
        customer: customerWithPicture,
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ListCnisFastAnalysisUseCase,
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(ListCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should list cnis analysis and return signed URLs for all files', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const listDto = buildListDataRequestDto();
    const organizationMember = buildOrganizationMember();
    const resource = [
      buildCnisFastAnalysisQueryResult(new CnisFastAnalysisId()),
      buildCnisFastAnalysisQueryResult(new CnisFastAnalysisId()),
    ];
    const listResult = new ListDataOutputModel({
      page: listDto.page,
      limit: listDto.limit,
      resource,
      totalItems: resource.length,
    });
    const URLS_PER_ITEM = 3;

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId.mockResolvedValueOnce(
      listResult,
    );
    fileProcessorGateway.getFileSignedUrl.mockImplementation((path) =>
      Promise.resolve(new URL(`https://example.com/${path}`)),
    );

    const result = await useCase.execute(sessionData, orgSessionData, listDto);

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      sessionData.authIdentityId,
      orgSessionData.organizationId,
    );
    expect(
      cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId,
    ).toHaveBeenCalledWith(
      orgSessionData.organizationId,
      expect.any(ListDataInputModel),
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledTimes(
      resource.length * URLS_PER_ITEM,
    );

    expect(result).toBeInstanceOf(ListCnisFastAnalysisResponseDto);
    expect(result.resource.length).toBe(resource.length);
    expect(result.resource[0]?.cnisDocument).toBe(
      `https://example.com/${resource[0]?.cnisDocument ?? ''}`,
    );
    expect(result.resource[0]?.createdBy.profilePicture).toBe(
      `https://example.com/${
        resource[0]?.createdBy.customer.profilePicture ?? ''
      }`,
    );
  });

  it('should return an empty list if no analysis are found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const listDto = buildListDataRequestDto();
    const organizationMember = buildOrganizationMember();
    const listResult = new ListDataOutputModel({
      page: listDto.page,
      limit: listDto.limit,
      resource: [],
      totalItems: 0,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId.mockResolvedValueOnce(
      listResult,
    );

    const result = await useCase.execute(sessionData, orgSessionData, listDto);

    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
    expect(result.resource.length).toBe(0);
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const listDto = buildListDataRequestDto();
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, listDto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId,
    ).not.toHaveBeenCalled();
  });
});
