import { Test } from '@nestjs/testing';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { ListAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client.response.dto';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

describe(ListAnalysisToolClientUseCase.name, () => {
  let useCase: ListAnalysisToolClientUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getFileSignedUrl: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      listByOrganizationId: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientQueryRepositoryGateway>;

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildDto = (): ListDataRequestDto =>
    ListDataRequestDto.build({
      page: 1,
      limit: 10,
    });

  const buildClientQueryResultItem = (
    id: AnalysisToolClientId,
    withPictures: boolean,
  ): GetAnalysisToolClientWithRelationsQueryResult => {
    const buildResponsible = (
      name: string,
      picPath: string | null,
    ): GetOrganizationMemberWithCustomerRelationQueryResult =>
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        id: new OrganizationMemberId(),
        owner: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        customer: GetCustomerQueryResult.build({
          id: new CustomerId(),
          name,
          profilePicture: picPath,
          phoneNumber: new PhoneNumber('5515997752075'),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      });

    return GetAnalysisToolClientWithRelationsQueryResult.build({
      id,
      name: `Client ${id.toString()}`,
      federalDocument: null,
      email: null,
      phoneNumber: null,
      birthDate: new Date(),
      gender: null,
      clientType: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: buildResponsible(
        'Creator User',
        withPictures ? `path/pic/creator_${id.toString()}.jpg` : null,
      ),
      updatedBy: buildResponsible(
        'Updater User',
        withPictures ? `path/pic/updater_${id.toString()}.jpg` : null,
      ),
    });
  };

  const buildListQueryOutput = (
    items: GetAnalysisToolClientWithRelationsQueryResult[],
  ): ListDataOutputModel<GetAnalysisToolClientWithRelationsQueryResult> => {
    return new ListDataOutputModel<GetAnalysisToolClientWithRelationsQueryResult>(
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
        ListAnalysisToolClientUseCase,
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(ListAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('should return a list of clients with signed URLs for profile pictures', async () => {
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const TOTAL_ITEMS = 3;

    const item1 = buildClientQueryResultItem(new AnalysisToolClientId(), true);
    const item2 = buildClientQueryResultItem(new AnalysisToolClientId(), false);
    const item3 = buildClientQueryResultItem(new AnalysisToolClientId(), true);
    const listOutput = buildListQueryOutput([item1, item2, item3]);
    const EXPECTED_URL_CALLS = 4;

    analysisToolClientQueryRepositoryGateway.listByOrganizationId.mockResolvedValueOnce(
      listOutput,
    );
    fileProcessorGateway.getFileSignedUrl.mockImplementation((path) =>
      Promise.resolve(new URL(`https://example.com/${path}`)),
    );

    const result = await useCase.execute(orgSessionData, dto);

    expect(result).toBeInstanceOf(ListAnalysisToolClientResponseDto);
    expect(result.resource).toHaveLength(TOTAL_ITEMS);
    expect(result.totalItems).toBe(TOTAL_ITEMS);

    expect(
      analysisToolClientQueryRepositoryGateway.listByOrganizationId,
    ).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledTimes(
      EXPECTED_URL_CALLS,
    );

    const resultItem1 = result.resource[0];
    expect(resultItem1).toBeDefined();
    expect(resultItem1?.createdBy.profilePicture).toBe(
      `https://example.com/${item1.createdBy.customer.profilePicture}`,
    );
    expect(resultItem1?.updatedBy.profilePicture).toBe(
      `https://example.com/${item1.updatedBy.customer.profilePicture}`,
    );

    const resultItem2 = result.resource[1];
    expect(resultItem2).toBeDefined();
    expect(resultItem2?.createdBy.profilePicture).toBeUndefined();
    expect(resultItem2?.updatedBy.profilePicture).toBeUndefined();
  });

  it('should return a list of clients without calling for signed URLs if no pictures exist', async () => {
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const TOTAL_ITEMS = 2;

    const item1 = buildClientQueryResultItem(new AnalysisToolClientId(), false);
    const item2 = buildClientQueryResultItem(new AnalysisToolClientId(), false);
    const listOutput = buildListQueryOutput([item1, item2]);

    analysisToolClientQueryRepositoryGateway.listByOrganizationId.mockResolvedValueOnce(
      listOutput,
    );

    const result = await useCase.execute(orgSessionData, dto);

    expect(result.resource).toHaveLength(TOTAL_ITEMS);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();

    const resultItem1 = result.resource[0];
    expect(resultItem1).toBeDefined();
    expect(resultItem1?.createdBy.profilePicture).toBeUndefined();
    expect(resultItem1?.updatedBy.profilePicture).toBeUndefined();
  });

  it('should return an empty list when the repository finds no items', async () => {
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const listOutput = buildListQueryOutput([]);

    analysisToolClientQueryRepositoryGateway.listByOrganizationId.mockResolvedValueOnce(
      listOutput,
    );

    const result = await useCase.execute(orgSessionData, dto);

    expect(result.resource).toHaveLength(0);
    expect(result.totalItems).toBe(0);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
  });
});
