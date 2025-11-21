import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import {
  CnisAffiliateIdentificationOutputModel,
  CnisOutputModel,
  CnisSessionSocialSecurityAffiliationInfoOutputModel,
  CnisSocialSecurityRelationOutputModel,
} from '@lib/cnis-processor/model/output/cnis.output.model';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CnisDocumentRequiredError } from '@module/customer/analysis-tool/error/cnis-document-required.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

describe(CreateCnisFastAnalysisResultUseCase.name, () => {
  let useCase: CreateCnisFastAnalysisResultUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getFileBuffer: jest.fn(),
    uploadFile: jest.fn(),
    getOriginalFileName: jest.fn(),
    getFileSignedUrl: jest.fn(),
  };

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
    };

  const cnisFastAnalysisCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisCommandRepositoryGateway> =
    {
      updateCnisFastAnalysis: jest.fn(),
      createCnisFastAnalysis: jest.fn(),
      deleteCnisFastAnalysis: jest.fn(),
    };

  const cnisFastAnalysisResultCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisResultCommandRepositoryGateway> =
    {
      createCnisFastAnalysisResult: jest.fn(),
      updateCnisFastAnalysisResult: jest.fn(),
    };

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail:
        jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const analysisProcessorGateway: jest.Mocked<AnalysisProcessorGateway> = {
    parseCnisDocument: jest.fn(),
    getCnisCompleteAnalysis: jest.fn(),
    getCnisSimplifiedAnalysis: jest.fn(),
    validateCnisDocument: jest.fn(),
    getLegalPleadingCompleteAnalysis: jest.fn(),
    getLegalPleadingSimplifiedAnalysis: jest.fn(),
    getLegalPleadingQuickDocumentAnalysis: jest.fn(),
  };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

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

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildCnisFastAnalysisQueryResult = (
    override: Partial<GetCnisFastAnalysisWithRelationsQueryResult> = {},
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    const responsible =
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        id: new OrganizationMemberId(),
        owner: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        customer: GetCustomerQueryResult.build({
          id: new CustomerId(),
          name: 'Creator User',
          profilePicture: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      });

    const client = GetAnalysisToolClientWithRelationsQueryResult.build({
      id: new AnalysisToolClientId(),
      name: 'Client Name',
      createdBy: responsible,
      updatedBy: responsible,
      federalDocument: null,
      email: null,
      inssPassword: null,
      phoneNumber: null,
      birthDate: null,
      gender: null,
      clientType: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      analysisToolClientInssBenefit: [],
      analysisToolClientLegalProceeding: [],
    });

    return GetCnisFastAnalysisWithRelationsQueryResult.build({
      id: new CnisFastAnalysisId(),
      cnisDocument: 'path/to/document.pdf',
      analysisToolClient: client,
      cnisFastAnalysisResult: null,
      cnisFastAnalysisInssBenefit: [],
      cnisFastAnalysisLegalProceeding: [],
      createdBy: responsible,
      updatedBy: responsible,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      status: AnalysisStatusEnum.IN_PROGRESS,
      ...override,
    });
  };

  const buildParsedCnisDocumentData = (): CnisOutputModel => {
    return CnisOutputModel.build({
      affiliateIdentification: CnisAffiliateIdentificationOutputModel.build({
        nome: 'John Doe',
        cpf: '12345678901',
        dataDeNascimento: new Date('1990-01-15'),
      }),
      socialSecurityRelations: [
        CnisSocialSecurityRelationOutputModel.build({
          socialSecurityAffiliationInfo:
            CnisSessionSocialSecurityAffiliationInfoOutputModel.build({
              dataFim: new Date('2022-08-20'),
            }),
          socialSecurityAffiliationEarningsHistory: [],
        }),
      ],
    });
  };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateCnisFastAnalysisResultUseCase,
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisCommandRepositoryGateway,
          useValue: cnisFastAnalysisCommandRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisResultCommandRepositoryGateway,
          useValue: cnisFastAnalysisResultCommandRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
        },
        {
          provide: AnalysisProcessorGateway,
          useValue: analysisProcessorGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateCnisFastAnalysisResultUseCase);
    jest.clearAllMocks();
  });

  it('should successfully create a CNIS fast analysis result', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const cnisFastAnalysisQueryResult = buildCnisFastAnalysisQueryResult();
    const parsedCnisData = buildParsedCnisDocumentData();
    const mockDocumentBuffer = Buffer.from('pdf-content');
    const mockAiAnalysis = 'This is the complete AI analysis.';
    const mockTransaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockResolvedValueOnce(
      cnisFastAnalysisQueryResult,
    );
    fileProcessorGateway.getFileBuffer.mockResolvedValueOnce(
      mockDocumentBuffer,
    );
    analysisProcessorGateway.parseCnisDocument.mockResolvedValueOnce(
      parsedCnisData,
    );
    analysisProcessorGateway.getCnisCompleteAnalysis.mockResolvedValueOnce(
      mockAiAnalysis,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(
      mockTransaction,
    );
    cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult.mockReturnValue(
      {} as TransactionType,
    );
    cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis.mockReturnValue(
      {} as TransactionType,
    );

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );

    expect(result).toBeInstanceOf(CreateCnisFastAnalysisResultResponseDto);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail,
    ).toHaveBeenCalledWith(
      cnisFastAnalysisId,
      organizationSessionData.organizationId,
      CnisFastAnalysisNotFoundError,
    );
    expect(fileProcessorGateway.getFileBuffer).toHaveBeenCalledWith(
      cnisFastAnalysisQueryResult.cnisDocument,
    );
    expect(
      analysisProcessorGateway.getCnisCompleteAnalysis,
    ).toHaveBeenCalledTimes(1);

    const [[capturedResult]] = cnisFastAnalysisResultCommandRepositoryGateway
      .createCnisFastAnalysisResult.mock.calls as [
      [CnisFastAnalysisResultEntity],
    ];
    expect(capturedResult.cnisCompleteAnalysis).toBe(mockAiAnalysis);

    const [[, capturedAnalysis]] = cnisFastAnalysisCommandRepositoryGateway
      .updateCnisFastAnalysis.mock.calls as [
      [CnisFastAnalysisId, CnisFastAnalysisEntity],
    ];
    expect(capturedAnalysis.status).toBe(AnalysisStatusEnum.COMPLETED);
    expect(capturedAnalysis.updatedBy).toBe(organizationMember.id);

    expect(mockTransaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should throw OrganizationMemberNotFoundError when organization member is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('should throw CnisFastAnalysisNotFoundError when analysis is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockRejectedValueOnce(
      new CnisFastAnalysisNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
  });

  it('should throw CnisDocumentRequiredError when cnisDocument is null', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const queryResultWithNullDoc = buildCnisFastAnalysisQueryResult({
      cnisDocument: null,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockResolvedValueOnce(
      queryResultWithNullDoc,
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisDocumentRequiredError);
  });
});
