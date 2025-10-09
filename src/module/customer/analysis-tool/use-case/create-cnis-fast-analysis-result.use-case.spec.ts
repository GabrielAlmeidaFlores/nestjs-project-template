import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import {
  CnisAffiliateIdentificationOutputModel,
  CnisOutputModel,
  CnisSessionSocialSecurityAffiliationInfoOutputModel,
  CnisSocialSecurityRelationOutputModel,
} from '@lib/cnis-processor/model/output/cnis.output.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
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
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';

describe(CreateCnisFastAnalysisResultUseCase.name, () => {
  let useCase: CreateCnisFastAnalysisResultUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getDocumentBuffer: jest.fn(),
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

  const analysisProcessorGateway: jest.Mocked<AnalysisProcessorGateway> = {
    parseCnisDocument: jest.fn(),
    analyzeCnis: jest.fn(),
  } as unknown as jest.Mocked<AnalysisProcessorGateway>;

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

  const buildOrganizationMember = (): OrganizationMemberEntity =>
    new OrganizationMemberEntity({
      id: new OrganizationMemberId(),
      organization: {} as OrganizationEntity,
      customer: {} as CustomerEntity,
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildCnisFastAnalysisQueryResult = (
    override: Partial<GetCnisFastAnalysisWithRelationsQueryResult> = {},
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    const createdByMember = buildOrganizationMember();
    const updatedByMember = buildOrganizationMember();
    const client = new AnalysisToolClientEntity({
      id: new AnalysisToolClientId(),
      name: 'Client Name',
      createdBy: createdByMember.id,
      updatedBy: updatedByMember.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return {
      id: new CnisFastAnalysisId(),
      analysisToolClient: client,
      cnisDocument: 'path/to/document.pdf',
      cnisFastAnalysisResult: null,
      createdBy: createdByMember,
      updatedBy: updatedByMember,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...override,
    } as unknown as GetCnisFastAnalysisWithRelationsQueryResult;
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
              dataFim: new Date('2020-05-10'),
            }),
          socialSecurityAffiliationEarningsHistory: [],
        }),
        CnisSocialSecurityRelationOutputModel.build({
          socialSecurityAffiliationInfo:
            CnisSessionSocialSecurityAffiliationInfoOutputModel.build({
              dataFim: new Date('2022-08-20'),
            }),
          socialSecurityAffiliationEarningsHistory: [],
        }),
        CnisSocialSecurityRelationOutputModel.build({
          socialSecurityAffiliationInfo:
            CnisSessionSocialSecurityAffiliationInfoOutputModel.build({
              dataFim: new Date('2019-03-01'),
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
    const mockAiAnalysis = 'This is the AI analysis result.';
    const mockTransaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      cnisFastAnalysisQueryResult,
    );
    fileProcessorGateway.getDocumentBuffer.mockResolvedValueOnce(
      mockDocumentBuffer,
    );
    analysisProcessorGateway.parseCnisDocument.mockResolvedValueOnce(
      parsedCnisData,
    );
    analysisProcessorGateway.createCnisFastAnalysis.mockResolvedValueOnce(
      mockAiAnalysis,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(
      mockTransaction,
    );
    cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult.mockReturnValue(
      {} as unknown as TransactionType,
    );
    cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis.mockReturnValue(
      {} as unknown as TransactionType,
    );

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      sessionData.authIdentityId,
      organizationSessionData.organizationId,
    );

    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledWith(cnisFastAnalysisId, CnisFastAnalysisNotFoundError);

    expect(fileProcessorGateway.getDocumentBuffer).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.getDocumentBuffer).toHaveBeenCalledWith(
      cnisFastAnalysisQueryResult.cnisDocument,
    );

    expect(analysisProcessorGateway.parseCnisDocument).toHaveBeenCalledTimes(1);
    expect(analysisProcessorGateway.parseCnisDocument).toHaveBeenCalledWith(
      mockDocumentBuffer,
    );

    expect(
      analysisProcessorGateway.createCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);

    expect(
      cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult,
    ).toHaveBeenCalledTimes(1);
    const [[capturedResult]] = cnisFastAnalysisResultCommandRepositoryGateway
      .createCnisFastAnalysisResult.mock.calls as [
      [CnisFastAnalysisResultEntity],
    ];
    expect(capturedResult).toBeInstanceOf(CnisFastAnalysisResultEntity);
    expect(capturedResult.clientName).toBe('John Doe');
    expect(capturedResult.clientBirthDate).toEqual(new Date('1990-01-15'));
    expect(capturedResult.clientFederalDocument).toBeInstanceOf(
      FederalDocument,
    );
    expect(capturedResult.clientFederalDocument?.toString()).toBe(
      '12345678901',
    );
    expect(capturedResult.clientLastAffiliationDate).toEqual(
      new Date('2022-08-20'),
    );
    expect(capturedResult.cnisAiAnalysis).toBe(mockAiAnalysis);

    expect(
      cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis,
    ).toHaveBeenCalledTimes(1);
    const [[, capturedAnalysis]] = cnisFastAnalysisCommandRepositoryGateway
      .updateCnisFastAnalysis.mock.calls as [
      [CnisFastAnalysisId, CnisFastAnalysisEntity],
    ];
    expect(capturedAnalysis).toBeInstanceOf(CnisFastAnalysisEntity);
    expect(capturedAnalysis.cnisFastAnalysisResult).toBe(capturedResult);
    expect(capturedAnalysis.updatedBy).toBe(organizationMember.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(mockTransaction.commit).toHaveBeenCalledTimes(1);

    expect(result).toBeInstanceOf(CreateCnisFastAnalysisResultResponseDto);
    expect(result.clientName).toBe('John Doe');
    expect(result.cnisAiAnalysis).toBe(mockAiAnalysis);
    expect(result.clientLastAffiliationDate).toEqual(new Date('2022-08-20'));
  });

  it('should throw OrganizationMemberNotFoundError when organization member is not found', async () => {
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
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });

  it('should throw CnisFastAnalysisNotFoundError when analysis is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockRejectedValueOnce(
      new CnisFastAnalysisNotFoundError(),
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.getDocumentBuffer).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });

  it('should throw CnisDocumentRequiredError when cnisDocument is null', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const cnisFastAnalysisQueryResult = buildCnisFastAnalysisQueryResult({
      cnisDocument: null,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember as unknown as GetOrganizationMemberQueryResult,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      cnisFastAnalysisQueryResult,
    );

    await expect(
      useCase.execute(sessionData, organizationSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(CnisDocumentRequiredError);

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail,
    ).toHaveBeenCalledTimes(1);
    expect(fileProcessorGateway.getDocumentBuffer).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });
});
