import { Test } from '@nestjs/testing';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { ListCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/list-cnis-fast-analysis.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { ListCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/list-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import type { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';

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

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildDto = (): ListDataRequestDto =>
    ListDataRequestDto.build({
      page: 1,
      limit: 10,
    });

  const buildCnisFastAnalysisQueryResultItem = (
    id: CnisFastAnalysisId,
    withFiles: boolean,
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    return {
      id,
      cnisDocument: withFiles ? `path/cnis/${id.toString()}.pdf` : null,
      analysisToolClient: {} as GetAnalysisToolClientWithRelationsQueryResult,
      cnisFastAnalysisResult: {} as GetCnisFastAnalysisResultQueryResult,
      cnisFastAnalysisInssBenefit: [],
      cnisFastAnalysisLegalProceeding: [],
      createdBy: {
        customer: {
          id: {} as CustomerId,
          name: 'Creator User',
          profilePicture: withFiles ? `path/pic/${id.toString()}.jpg` : null,
        },
      },
      updatedBy: {
        customer: {
          id: {} as CustomerId,
          name: 'Updater User',
          profilePicture: null,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    } as unknown as GetCnisFastAnalysisWithRelationsQueryResult;
  };

  const buildListQueryOutput = (
    items: GetCnisFastAnalysisWithRelationsQueryResult[],
  ): ListDataOutputModel<GetCnisFastAnalysisWithRelationsQueryResult> => {
    return new ListDataOutputModel<GetCnisFastAnalysisWithRelationsQueryResult>(
      {
        page: 1,
        limit: 10,
        totalItems: items.length,
        resource: items,
      },
    );
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

  it('should return a list of analyses with signed URLs for available files', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const organizationMember = {} as OrganizationMemberEntity;

    const item1 = buildCnisFastAnalysisQueryResultItem(
      new CnisFastAnalysisId(),
      true,
    );
    const item2 = buildCnisFastAnalysisQueryResultItem(
      new CnisFastAnalysisId(),
      false,
    );
    const listOutput = buildListQueryOutput([item1, item2]);
    const EXPECTED_URL_CALLS = 2;

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId.mockResolvedValueOnce(
      listOutput,
    );
    fileProcessorGateway.getFileSignedUrl.mockImplementation((path) => {
      return Promise.resolve(new URL(`https://example.com/${path}`));
    });

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );

    expect(result).toBeInstanceOf(ListCnisFastAnalysisResponseDto);
    expect(result.resource).toHaveLength(2);
    expect(result.totalItems).toBe(2);

    expect(
      cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId,
    ).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledTimes(
      EXPECTED_URL_CALLS,
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      item1.cnisDocument,
    );
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledWith(
      item1.createdBy.customer.profilePicture,
    );

    const resultItem1 = result.resource[0];
    const resultItem2 = result.resource[1];

    expect(resultItem1).toBeDefined();
    expect(resultItem1?.cnisDocument).toBe(
      `https://example.com/${item1.cnisDocument}`,
    );
    expect(resultItem1?.createdBy.profilePicture).toBe(
      `https://example.com/${item1.createdBy.customer.profilePicture}`,
    );
    expect(resultItem1?.updatedBy.profilePicture).toBeUndefined();

    expect(resultItem2).toBeDefined();
    expect(resultItem2?.cnisDocument).toBeUndefined();
    expect(resultItem2?.createdBy.profilePicture).toBeUndefined();
  });

  it('should return an empty list when the repository finds no items', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const organizationMember = {} as OrganizationMemberEntity;
    const listOutput = buildListQueryOutput([]);

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId.mockResolvedValueOnce(
      listOutput,
    );

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );

    expect(result.resource).toHaveLength(0);
    expect(result.totalItems).toBe(0);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
  });

  it('throws OrganizationMemberNotFoundError when organization member is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);

    expect(
      cnisFastAnalysisQueryRepositoryGateway.listByOrganizationId,
    ).not.toHaveBeenCalled();
  });
});
