import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import {
  CnisOutputModel,
  CnisAffiliateIdentificationOutputModel,
  CnisSocialSecurityRelationOutputModel,
  CnisSessionSocialSecurityAffiliationInfoOutputModel,
} from '@lib/cnis-processor/model/output/cnis.output.model';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { GetCnisFastAnalysisClientWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client/query/result/get-cnis-fast-analysis-client-with-relations.query.result';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisClientId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CnisDocumentRequiredError } from '@module/customer/cnis-fast-analysis/error/cnis-document-required.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/cnis-fast-analysis/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/cnis-fast-analysis/error/organization-member-not-found-error.error';
import { CnisIaAnalysisGateway } from '@module/customer/cnis-fast-analysis/lib/cnis-ia-analysis/cnis-ia-analysis.gateway';
import { FileProcessorGateway } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.gateway';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis-result.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

describe(CreateCnisFastAnalysisResultUseCase.name, () => {
  let useCase: CreateCnisFastAnalysisResultUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getCnisDocumentBuffer: jest.fn(),
    parseCnisDocument: jest.fn(),
  } as unknown as jest.Mocked<FileProcessorGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const cnisFastAnalysisCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisCommandRepositoryGateway> =
    {
      updateCnisFastAnalysis: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisCommandRepositoryGateway>;

  const cnisFastAnalysisResultCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisResultCommandRepositoryGateway> =
    {
      createCnisFastAnalysisResult: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisResultCommandRepositoryGateway>;

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByIdWithRelationsOrFail: jest.fn(),
    } as unknown as jest.Mocked<CnisFastAnalysisQueryRepositoryGateway>;

  const cnisIaAnalysisGateway: jest.Mocked<CnisIaAnalysisGateway> = {
    analyzeCnis: jest.fn(),
  } as unknown as jest.Mocked<CnisIaAnalysisGateway>;

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

  const buildCustomerQueryResult = (): GetCustomerQueryResult =>
    GetCustomerQueryResult.build({
      id: new CustomerId(),
      name: 'Test Customer',
      phoneNumber: new PhoneNumber('5515997752074'),
      profilePicture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildOrgMemberWithCustomerRelation =
    (): GetOrganizationMemberWithCustomerRelationQueryResult =>
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        ...buildOrganizationMember(),
        customer: buildCustomerQueryResult(),
      });

  const buildCnisFastAnalysisQueryResult = (
    overrides?: Partial<GetCnisFastAnalysisWithRelationsQueryResult>,
  ): GetCnisFastAnalysisWithRelationsQueryResult =>
    GetCnisFastAnalysisWithRelationsQueryResult.build({
      id: new CnisFastAnalysisId(),
      cnisDocument: 'path/to/document.pdf',
      cnisFastAnalysisClient:
        GetCnisFastAnalysisClientWithRelationsQueryResult.build({
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
        }),
      cnisFastAnalysisResult: null,
      createdBy: buildOrgMemberWithCustomerRelation(),
      updatedBy: buildOrgMemberWithCustomerRelation(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...overrides,
    });

  const buildCnisOutputModel = (): CnisOutputModel =>
    CnisOutputModel.build({
      affiliateIdentification: CnisAffiliateIdentificationOutputModel.build({
        nome: 'John Doe',
        cpf: '12345678900',
        dataDeNascimento: new Date('1990-01-01T00:00:00.000Z'),
      }),
      socialSecurityRelations: [
        CnisSocialSecurityRelationOutputModel.build({
          socialSecurityAffiliationInfo:
            CnisSessionSocialSecurityAffiliationInfoOutputModel.build({
              dataFim: new Date('2020-12-31T00:00:00.000Z'),
            }),
          socialSecurityAffiliationEarningsHistory: [],
        }),
        CnisSocialSecurityRelationOutputModel.build({
          socialSecurityAffiliationInfo:
            CnisSessionSocialSecurityAffiliationInfoOutputModel.build({
              dataFim: new Date('2022-01-01T00:00:00.000Z'),
            }),
          socialSecurityAffiliationEarningsHistory: [],
        }),
        CnisSocialSecurityRelationOutputModel.build({
          socialSecurityAffiliationInfo:
            CnisSessionSocialSecurityAffiliationInfoOutputModel.build({}),
          socialSecurityAffiliationEarningsHistory: [],
        }),
      ],
    });

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
        { provide: CnisIaAnalysisGateway, useValue: cnisIaAnalysisGateway },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateCnisFastAnalysisResultUseCase);
    jest.clearAllMocks();
  });

  it('should process cnis document, generate analysis, save results, and return response', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const cnisFastAnalysisQueryResult = buildCnisFastAnalysisQueryResult();
    const cnisOutputModel = buildCnisOutputModel();
    const mockCnisBuffer = Buffer.from('cnis-pdf-content');
    const mockAiAnalysis = 'This is the AI analysis.';

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      cnisFastAnalysisQueryResult,
    );
    fileProcessorGateway.getCnisDocumentBuffer.mockResolvedValueOnce(
      mockCnisBuffer,
    );
    fileProcessorGateway.parseCnisDocument.mockResolvedValueOnce(
      cnisOutputModel,
    );
    cnisIaAnalysisGateway.analyzeCnis.mockResolvedValueOnce(mockAiAnalysis);

    const createResultTx: TransactionType = jest.fn();
    const updateAnalysisTx: TransactionType = jest.fn();
    cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult.mockReturnValueOnce(
      createResultTx,
    );
    cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis.mockReturnValueOnce(
      updateAnalysisTx,
    );

    const commit = jest.fn().mockResolvedValue(undefined);
    const rollback = jest.fn().mockResolvedValue(undefined);
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(
      new TransactionOutputModel(commit, rollback),
    );

    // Act
    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
    );

    // Assert
    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.getCnisDocumentBuffer).toHaveBeenCalledWith(
      cnisFastAnalysisQueryResult.cnisDocument,
    );
    expect(fileProcessorGateway.parseCnisDocument).toHaveBeenCalledWith(
      mockCnisBuffer,
    );
    expect(cnisIaAnalysisGateway.analyzeCnis).toHaveBeenCalledTimes(1);

    expect(
      cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult,
    ).toHaveBeenCalledTimes(1);
    const [[resultEntityArg]] = cnisFastAnalysisResultCommandRepositoryGateway
      .createCnisFastAnalysisResult.mock.calls as [
      [CnisFastAnalysisResultEntity],
    ];
    expect(resultEntityArg).toBeInstanceOf(CnisFastAnalysisResultEntity);
    expect(resultEntityArg.cnisAiAnalysis).toBe(mockAiAnalysis);
    expect(resultEntityArg.clientName).toBe(
      cnisOutputModel.affiliateIdentification?.nome,
    );
    expect(resultEntityArg.clientFederalDocument).toEqual(
      new FederalDocument(
        cnisOutputModel.affiliateIdentification?.cpf as string,
      ),
    );
    expect(resultEntityArg.clientBirthDate).toEqual(
      cnisOutputModel.affiliateIdentification?.dataDeNascimento,
    );
    expect(resultEntityArg.clientLastAffiliationDate).toEqual(
      new Date('2022-01-01T00:00:00.000Z'),
    );

    expect(
      cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    const [[, analysisEntityArg]] = cnisFastAnalysisCommandRepositoryGateway
      .updateCnisFastAnalysis.mock.calls as [
      [CnisFastAnalysisId, CnisFastAnalysisEntity],
    ];
    expect(analysisEntityArg).toBeInstanceOf(CnisFastAnalysisEntity);
    expect(analysisEntityArg.cnisFastAnalysisResult).toBe(resultEntityArg);
    expect(analysisEntityArg.updatedBy).toBe(organizationMember.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledWith([
      createResultTx,
      updateAnalysisTx,
    ]);
    expect(commit).toHaveBeenCalledTimes(1);

    expect(result).toBeInstanceOf(CreateCnisFastAnalysisResultResponseDto);
    expect(result.cnisAiAnalysis).toBe(mockAiAnalysis);
  });

  it('should throw OrganizationMemberNotFoundError if member is not found', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);

    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });

  it('should throw CnisFastAnalysisNotFoundError if analysis is not found', async () => {
    // Arrange
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

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBe(error);

    expect(fileProcessorGateway.getCnisDocumentBuffer).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });

  it('should throw CnisDocumentRequiredError if cnis document is null', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrgSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const cnisFastAnalysisQueryResult = buildCnisFastAnalysisQueryResult({
      cnisDocument: null,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      cnisFastAnalysisQueryResult,
    );

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisDocumentRequiredError);

    expect(fileProcessorGateway.getCnisDocumentBuffer).not.toHaveBeenCalled();
    expect(cnisIaAnalysisGateway.analyzeCnis).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });
});
