import { Test } from '@nestjs/testing';

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
import { GetCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/get-cnis-fast-analysis.response.dto';
import { CnisFastAnalysisNotFoundError } from '@module/customer/cnis-fast-analysis/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/cnis-fast-analysis/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.gateway';
import { GetCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/get-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

describe(GetCnisFastAnalysisUseCase.name, () => {
  let useCase: GetCnisFastAnalysisUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getFileSignedUrl: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByIdWithRelationsOrFail: jest.fn(),
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

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    GetOrganizationMemberQueryResult.build({
      id: new OrganizationMemberId(),
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildCnisFastAnalysisQueryResult = (
    overrides?: Partial<GetCnisFastAnalysisWithRelationsQueryResult>,
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    const customerWithPicture = GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Test Customer',
      phoneNumber: new PhoneNumber('5515997752074'),
      profilePicture: 'path/to/profile.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const createdBy =
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        ...buildOrganizationMember(),
        customer: customerWithPicture,
      });

    const updatedBy =
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        ...buildOrganizationMember(),
        customer: customerWithPicture,
      });

    const client = GetCnisFastAnalysisClientWithRelationsQueryResult.build({
      id: new CnisFastAnalysisClientId(),
      name: 'Client Name',
      email: null,
      phoneNumber: null,
      federalDocument: null,
      birthDate: null,
      gender: null,
      clientType: null,
      cnisFastAnalysisClientInssBenefit: [],
      cnisFastAnalysisClientLegalProceeding: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const result = GetCnisFastAnalysisResultQueryResult.build({
      id: new CnisFastAnalysisResultId(),
      cnisAiAnalysis: 'AI analysis text.',
      clientName: 'Client Name',
      clientFederalDocument: null,
      clientBirthDate: new Date(),
      clientLastAffiliationDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return GetCnisFastAnalysisWithRelationsQueryResult.build({
      id: new CnisFastAnalysisId(),
      cnisDocument: 'path/to/cnis.pdf',
      cnisFastAnalysisClient: client,
      cnisFastAnalysisResult: result,
      createdBy: createdBy,
      updatedBy: updatedBy,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...overrides,
    });
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetCnisFastAnalysisUseCase,
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

    useCase = module.get(GetCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should return a full cnis analysis DTO with signed URLs for all files', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const queryResult = buildCnisFastAnalysisQueryResult();

    const cnisUrl = new URL('https://example.com/cnis.pdf');
    const profileUrl = new URL('https://example.com/profile.jpg');

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      queryResult,
    );
    fileProcessorGateway.getFileSignedUrl
      .mockResolvedValueOnce(cnisUrl)
      .mockResolvedValueOnce(profileUrl)
      .mockResolvedValueOnce(profileUrl);

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
    );

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledWith(cnisFastAnalysisId, CnisFastAnalysisNotFoundError);
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      queryResult.cnisDocument,
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      queryResult.createdBy.customer.profilePicture,
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      queryResult.updatedBy.customer.profilePicture,
    );

    expect(result).toBeInstanceOf(GetCnisFastAnalysisResponseDto);
    expect(result.cnisDocument).toBe(cnisUrl.toString());
    expect(result.createdBy.profilePicture).toBe(profileUrl.toString());
    expect(result.updatedBy.profilePicture).toBe(profileUrl.toString());
    expect(result.cnisFastAnalysisResult).not.toBeNull();
  });

  it('should return an analysis DTO without calling for signed URLs when files are null', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();

    const customerWithoutPicture = GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Test Customer No Pic',
      phoneNumber: new PhoneNumber('5515997752075'),
      profilePicture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const memberWithCustomerWithoutPicture =
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        ...buildOrganizationMember(),
        customer: customerWithoutPicture,
      });

    const queryResult = buildCnisFastAnalysisQueryResult({
      cnisDocument: null,
      cnisFastAnalysisResult: null,
      createdBy: memberWithCustomerWithoutPicture,
      updatedBy: memberWithCustomerWithoutPicture,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      queryResult,
    );

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
    );

    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
    expect(result.cnisDocument).toBeUndefined();
    expect(result.createdBy.profilePicture).toBeUndefined();
    expect(result.updatedBy.profilePicture).toBeUndefined();
    expect(result.cnisFastAnalysisResult).toBeUndefined();
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).not.toHaveBeenCalled();
  });

  it('should throw CnisFastAnalysisNotFoundError when analysis is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const error = new CnisFastAnalysisNotFoundError();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockRejectedValueOnce(
      error,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
  });
});
