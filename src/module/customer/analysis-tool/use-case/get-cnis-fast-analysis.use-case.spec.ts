import { Test } from '@nestjs/testing';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-cnis-fast-analysis.response.dto';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import type { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';

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

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildCnisFastAnalysisQueryResult = (
    options: {
      withDocument?: boolean;
      withResult?: boolean;
      withProfilePictures?: boolean;
    } = {},
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    return {
      id: new CnisFastAnalysisId(),
      cnisDocument: options.withDocument === true ? 'path/to/cnis.pdf' : null,
      analysisToolClient: {} as GetAnalysisToolClientWithRelationsQueryResult,
      cnisFastAnalysisResult:
        options.withResult === true
          ? ({} as GetCnisFastAnalysisResultQueryResult)
          : null,
      cnisFastAnalysisInssBenefit: [],
      cnisFastAnalysisLegalProceeding: [],
      createdBy: {
        customer: {
          id: new CustomerId(),
          name: 'Creator User',
          profilePicture:
            options.withProfilePictures === true
              ? 'path/to/creator_pic.jpg'
              : null,
        },
      },
      updatedBy: {
        customer: {
          id: new CustomerId(),
          name: 'Updater User',
          profilePicture:
            options.withProfilePictures === true
              ? 'path/to/updater_pic.jpg'
              : null,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    } as unknown as GetCnisFastAnalysisWithRelationsQueryResult;
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

  it('should return a complete cnis fast analysis DTO with signed URLs when all data exists', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = {} as OrganizationMemberEntity;
    const queryResult = buildCnisFastAnalysisQueryResult({
      withDocument: true,
      withResult: true,
      withProfilePictures: true,
    });
    const EXPECTED_SIGNED_URL_CALLS = 3;

    const cnisSignedUrl = new URL('https://example.com/cnis.pdf');
    const creatorPicSignedUrl = new URL('https://example.com/creator.jpg');
    const updaterPicSignedUrl = new URL('https://example.com/updater.jpg');

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      queryResult,
    );
    fileProcessorGateway.getFileSignedUrl
      .mockResolvedValueOnce(cnisSignedUrl)
      .mockResolvedValueOnce(creatorPicSignedUrl)
      .mockResolvedValueOnce(updaterPicSignedUrl);

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );

    expect(result).toBeInstanceOf(GetCnisFastAnalysisResponseDto);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledWith(cnisFastAnalysisId, CnisFastAnalysisNotFoundError);

    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledTimes(
      EXPECTED_SIGNED_URL_CALLS,
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      queryResult.cnisDocument,
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      queryResult.createdBy.customer.profilePicture,
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      queryResult.updatedBy.customer.profilePicture,
    );

    expect(result.cnisDocument).toBe(cnisSignedUrl.toString());
    expect(result.cnisFastAnalysisResult).not.toBeNull();
    expect(result.createdBy.profilePicture).toBe(
      creatorPicSignedUrl.toString(),
    );
    expect(result.updatedBy.profilePicture).toBe(
      updaterPicSignedUrl.toString(),
    );
  });

  it('should return a cnis fast analysis DTO without signed URLs when optional files are null', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = {} as OrganizationMemberEntity;
    const queryResult = buildCnisFastAnalysisQueryResult({
      withDocument: false,
      withResult: false,
      withProfilePictures: false,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      queryResult,
    );

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );

    expect(result).toBeInstanceOf(GetCnisFastAnalysisResponseDto);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();

    expect(result.cnisDocument).toBeUndefined();
    expect(result.cnisFastAnalysisResult).toBeUndefined();
    expect(result.createdBy.profilePicture).toBeUndefined();
    expect(result.updatedBy.profilePicture).toBeUndefined();
  });

  it('throws OrganizationMemberNotFoundError when organization member is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);

    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).not.toHaveBeenCalled();
  });

  it('throws CnisFastAnalysisNotFoundError when analysis is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = {} as OrganizationMemberEntity;

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockRejectedValueOnce(
      new CnisFastAnalysisNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
  });
});
