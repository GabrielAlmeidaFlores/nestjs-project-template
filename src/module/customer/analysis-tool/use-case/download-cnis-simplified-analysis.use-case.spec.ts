import { StreamableFile } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CnisFastAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-does-not-contain-complete-analysis.error';
import { CnisFastAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-does-not-contain-simplified-analysis.error copy';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';

describe(DownloadCnisSimplifiedAnalysisUseCase.name, () => {
  let useCase: DownloadCnisSimplifiedAnalysisUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerAndOrganizationId: jest.fn(),
      findOneByCustomerAndOrganizationIdWithRelations: jest.fn(),
    };

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByIdWithRelationsOrFail: jest.fn(),
      findOneByCnisFastAnalysisAndOrganizationIdOrFail: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const cnisFastAnalysisResultCommandRepositoryGateway: jest.Mocked<CnisFastAnalysisResultCommandRepositoryGateway> =
    {
      updateCnisFastAnalysisResult: jest.fn(),
      createCnisFastAnalysisResult: jest.fn(),
    };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const exportDocumentGateway: jest.Mocked<ExportDocumentGateway> = {
    downloadFileAsStreamable: jest.fn(),
    convertHtmlToMarkdown: jest.fn(),
    convertMarkdownToHtml: jest.fn(),
    downloadFile: jest.fn(),
  };

  const analysisProcessorGateway: jest.Mocked<AnalysisProcessorGateway> = {
    getCnisSimplifiedAnalysis: jest.fn(),
    validateCnisDocument: jest.fn(),
    parseCnisDocument: jest.fn(),
    getCnisCompleteAnalysis: jest.fn(),
    getLegalPleadingCompleteAnalysis: jest.fn(),
    getLegalPleadingSimplifiedAnalysis: jest.fn(),
    getLegalPleadingQuickDocumentAnalysis: jest.fn(),
  };

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

  const buildCnisFastAnalysisResult = (options: {
    complete?: string | null;
    simplified?: string | null;
  }): GetCnisFastAnalysisResultQueryResult =>
    GetCnisFastAnalysisResultQueryResult.build({
      id: new CnisFastAnalysisResultId(),
      cnisCompleteAnalysis: options.complete ?? null,
      cnisSimplifiedAnalysis: options.simplified ?? null,
      clientName: null,
      clientFederalDocument: null,
      clientBirthDate: null,
      clientLastAffiliationDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildCnisFastAnalysisQueryResult = (
    resultMock: GetCnisFastAnalysisResultQueryResult | null,
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
          name: 'Test Customer',
          profilePicture: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      });

    return GetCnisFastAnalysisWithRelationsQueryResult.build({
      id: new CnisFastAnalysisId(),
      cnisDocument: null,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient: {} as GetAnalysisToolClientWithRelationsQueryResult,
      cnisFastAnalysisResult: resultMock,
      cnisFastAnalysisInssBenefit: [],
      cnisFastAnalysisLegalProceeding: [],
      createdBy: responsible,
      updatedBy: responsible,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  };

  const buildStreamableFile = (): StreamableFile =>
    new StreamableFile(Buffer.from('fake-file-data'));

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DownloadCnisSimplifiedAnalysisUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisResultCommandRepositoryGateway,
          useValue: cnisFastAnalysisResultCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: ExportDocumentGateway,
          useValue: exportDocumentGateway,
        },
        {
          provide: AnalysisProcessorGateway,
          useValue: analysisProcessorGateway,
        },
      ],
    }).compile();

    useCase = module.get(DownloadCnisSimplifiedAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('deve baixar a análise simplificada quando ela já existe', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const format = ExportDocumentFormatEnum.PDF;
    const member = buildOrganizationMember();
    const existingAnalysis = 'Análise simplificada existente.';
    const resultMock = buildCnisFastAnalysisResult({
      complete: 'Análise completa.',
      simplified: existingAnalysis,
    });
    const analysisResult = buildCnisFastAnalysisQueryResult(resultMock);
    const streamableFile = buildStreamableFile();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );
    exportDocumentGateway.downloadFileAsStreamable.mockResolvedValueOnce(
      streamableFile,
    );

    // Act
    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
      format,
    );

    expect(result).toBe(streamableFile);
    expect(
      analysisProcessorGateway.getCnisSimplifiedAnalysis,
    ).not.toHaveBeenCalled();
    expect(
      cnisFastAnalysisResultCommandRepositoryGateway.updateCnisFastAnalysisResult,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
    expect(exportDocumentGateway.downloadFileAsStreamable).toHaveBeenCalledWith(
      existingAnalysis,
      format,
      'analise_simplificada_rapida_cnis',
    );
  });

  it('deve gerar, salvar e baixar a análise simplificada se ela não existir', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const format = ExportDocumentFormatEnum.DOCX;
    const member = buildOrganizationMember();
    const completeAnalysis = 'Análise completa para processar.';
    const resultMock = buildCnisFastAnalysisResult({
      complete: completeAnalysis,
      simplified: null,
    });
    const analysisResult = buildCnisFastAnalysisQueryResult(resultMock);
    const newSimplifiedAnalysis = 'Análise simplificada gerada agora.';
    const streamableFile = buildStreamableFile();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );
    analysisProcessorGateway.getCnisSimplifiedAnalysis.mockResolvedValueOnce(
      newSimplifiedAnalysis,
    );
    cnisFastAnalysisResultCommandRepositoryGateway.updateCnisFastAnalysisResult.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);
    exportDocumentGateway.downloadFileAsStreamable.mockResolvedValueOnce(
      streamableFile,
    );

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
      format,
    );

    expect(result).toBe(streamableFile);
    expect(
      analysisProcessorGateway.getCnisSimplifiedAnalysis,
    ).toHaveBeenCalledTimes(1);
    expect(
      cnisFastAnalysisResultCommandRepositoryGateway.updateCnisFastAnalysisResult,
    ).toHaveBeenCalledTimes(1);
    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
    expect(exportDocumentGateway.downloadFileAsStreamable).toHaveBeenCalledWith(
      newSimplifiedAnalysis,
      format,
      'analise_simplificada_rapida_cnis',
    );
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar CnisFastAnalysisNotFoundError se a análise não for encontrada', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockRejectedValueOnce(
      new CnisFastAnalysisNotFoundError(),
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
  });

  it('deve lançar CnisFastAnalysisDoesNotContainCompleteAnalysisError se cnisFastAnalysisResult for nulo', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const member = buildOrganizationMember();
    const analysisResult = buildCnisFastAnalysisQueryResult(null);

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(
      CnisFastAnalysisDoesNotContainCompleteAnalysisError,
    );
  });

  it('deve lançar CnisFastAnalysisDoesNotContainCompleteAnalysisError se cnisCompleteAnalysis for nulo', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const member = buildOrganizationMember();
    const resultMock = buildCnisFastAnalysisResult({
      complete: null,
      simplified: null,
    });
    const analysisResult = buildCnisFastAnalysisQueryResult(resultMock);

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(
      CnisFastAnalysisDoesNotContainCompleteAnalysisError,
    );
  });

  it('deve lançar CnisFastAnalysisDoesNotContainSimplifiedAnalysisError se a geração da análise falhar (retornar nulo)', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const member = buildOrganizationMember();
    const completeAnalysis = 'Análise completa para processar.';
    const resultMock = buildCnisFastAnalysisResult({
      complete: completeAnalysis,
      simplified: null,
    });
    const analysisResult = buildCnisFastAnalysisQueryResult(resultMock);
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );
    analysisProcessorGateway.getCnisSimplifiedAnalysis.mockResolvedValueOnce(
      null,
    );
    cnisFastAnalysisResultCommandRepositoryGateway.updateCnisFastAnalysisResult.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(
      CnisFastAnalysisDoesNotContainSimplifiedAnalysisError,
    );
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });
});
