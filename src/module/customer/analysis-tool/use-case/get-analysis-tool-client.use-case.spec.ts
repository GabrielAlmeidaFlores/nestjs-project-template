import { Test } from '@nestjs/testing';

import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/query/result/get-analysis-tool-client-inss-benefit.query.result';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

describe(GetAnalysisToolClientUseCase.name, () => {
  let useCase: GetAnalysisToolClientUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getFileSignedUrl: jest.fn(),
    uploadFile: jest.fn(),
    getFileBuffer: jest.fn(),
    getOriginalFileName: jest.fn(),
  };

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientIdOrFail: jest.fn(),
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByFederalDocument: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const analysisToolRecordQueryRepositoryGateway: jest.Mocked<AnalysisToolRecordQueryRepositoryGateway> =
    {
      countAnalysisByAnalysisToolClientId: jest.fn(),
      findOneByIdWithRelationsOrFail: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn(),
      findByAnalysisToolClientAndOrganizationIdWithRelations: jest.fn(),
    };

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      countByLegalPleadingIdAndOrganizationId: jest.fn(),
      findOneByLegalPleadingAndOrganizationIdOrFail: jest.fn(),
      findByAnalysisToolClientAndOrganizationId: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildClientQueryResult = (
    options: { withProfilePictures?: boolean } = {},
  ): GetAnalysisToolClientWithRelationsQueryResult => {
    const responsible = (picPath: string | null) =>
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        id: new OrganizationMemberId(),
        owner: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        customer: GetCustomerQueryResult.build({
          id: new CustomerId(),
          name: 'Test Customer',
          profilePicture: picPath,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      });

    return GetAnalysisToolClientWithRelationsQueryResult.build({
      id: new AnalysisToolClientId(),
      name: 'Test Client',
      federalDocument: null,
      email: null,
      phoneNumber: null,
      birthDate: null,
      gender: null,
      clientType: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      analysisToolClientInssBenefit: [
        GetAnalysisToolClientInssBenefitQueryResult.build({
          id: new AnalysisToolClientInssBenefitId(),
          inssBenefitNumber: '123456',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      ],
      analysisToolClientLegalProceeding: [
        GetAnalysisToolClientLegalProceedingQueryResult.build({
          id: new AnalysisToolClientLegalProceedingId(),
          legalProceedingNumber: '987654',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      ],
      createdBy: responsible(
        options.withProfilePictures === true ? 'path/creator.jpg' : null,
      ),
      updatedBy: responsible(
        options.withProfilePictures === true ? 'path/updater.jpg' : null,
      ),
    });
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetAnalysisToolClientUseCase,
        {
          provide: FileProcessorGateway,
          useValue: fileProcessorGateway,
        },
        {
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolRecordQueryRepositoryGateway,
          useValue: analysisToolRecordQueryRepositoryGateway,
        },
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(GetAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('deve retornar um cliente com contagens e URLs de perfil assinadas', async () => {
    const orgSessionData = buildOrganizationSessionData();
    const clientId = new AnalysisToolClientId();
    const clientQueryResult = buildClientQueryResult({
      withProfilePictures: true,
    });
    const analysisCount = 2;
    const legalPleadingCount = 1;
    const totalCount = analysisCount + legalPleadingCount;

    const creatorPicSignedUrl = new URL('https://example.com/creator.jpg');
    const updaterPicSignedUrl = new URL('https://example.com/updater.jpg');

    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdOrFail.mockResolvedValueOnce(
      clientQueryResult,
    );
    analysisToolRecordQueryRepositoryGateway.countAnalysisByAnalysisToolClientId.mockResolvedValueOnce(
      analysisCount,
    );
    legalPleadingQueryRepositoryGateway.countByLegalPleadingIdAndOrganizationId.mockResolvedValueOnce(
      legalPleadingCount,
    );
    fileProcessorGateway.getFileSignedUrl
      .mockResolvedValueOnce(creatorPicSignedUrl)
      .mockResolvedValueOnce(updaterPicSignedUrl);

    const result = await useCase.execute(orgSessionData, clientId);

    expect(result).toBeInstanceOf(GetAnalysisToolClientResponseDto);
    expect(result.id).toBe(clientQueryResult.id);
    expect(result.analysisCount).toBe(totalCount);
    expect(result.inssBenefitNumber).toEqual(['123456']);
    expect(result.legalProceedingNumber).toEqual(['987654']);

    expect(
      analysisToolRecordQueryRepositoryGateway.countAnalysisByAnalysisToolClientId,
    ).toHaveBeenCalledWith(orgSessionData.organizationId, clientQueryResult.id);
    expect(
      legalPleadingQueryRepositoryGateway.countByLegalPleadingIdAndOrganizationId,
    ).toHaveBeenCalledWith(orgSessionData.organizationId, clientQueryResult.id);

    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledTimes(2);
    expect(result.createdBy.profilePicture).toBe(
      creatorPicSignedUrl.toString(),
    );
    expect(result.updatedBy.profilePicture).toBe(
      updaterPicSignedUrl.toString(),
    );
  });

  it('deve retornar um cliente sem URLs de perfil se elas não existirem', async () => {
    const orgSessionData = buildOrganizationSessionData();
    const clientId = new AnalysisToolClientId();
    const clientQueryResult = buildClientQueryResult({
      withProfilePictures: false,
    });

    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdOrFail.mockResolvedValueOnce(
      clientQueryResult,
    );
    analysisToolRecordQueryRepositoryGateway.countAnalysisByAnalysisToolClientId.mockResolvedValueOnce(
      0,
    );
    legalPleadingQueryRepositoryGateway.countByLegalPleadingIdAndOrganizationId.mockResolvedValueOnce(
      0,
    );

    const result = await useCase.execute(orgSessionData, clientId);

    expect(result).toBeInstanceOf(GetAnalysisToolClientResponseDto);
    expect(result.analysisCount).toBe(0);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
    expect(result.createdBy.profilePicture).toBeUndefined();
    expect(result.updatedBy.profilePicture).toBeUndefined();
  });

  it('deve lançar AnalysisToolClientNotFoundError se o cliente não for encontrado', async () => {
    const orgSessionData = buildOrganizationSessionData();
    const clientId = new AnalysisToolClientId();

    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdOrFail.mockRejectedValueOnce(
      new AnalysisToolClientNotFoundError(),
    );

    await expect(
      useCase.execute(orgSessionData, clientId),
    ).rejects.toBeInstanceOf(AnalysisToolClientNotFoundError);
  });
});
